# 🔌 Guide — Connexion Google ↔ n8n (Ambition Campus)

> **Configuration validée de bout en bout le 31/08/2026** : envoi Gmail ✅ · création fichier Drive ✅ · événement Calendar + invitation ✅
> Compte Google : `ambitioncampus.finance@gmail.com`

---

## 1. Infrastructure

| Élément | Valeur |
|---|---|
| Instance n8n | `https://n8n.srv1238259.hstgr.cloud` (Hostinger VPS) |
| Compte Google | `ambitioncampus.finance@gmail.com` |
| Client OAuth GCP | « n8n Ambition Campus » (type Application Web) |
| **Client ID** | `447753960690-oj94fn0lmvjirpa73mk9716581rcpees.apps.googleusercontent.com` |
| **Client Secret** | 🔒 dans `docs/SECRETS.local.md` (fichier local, **jamais commité** — repo public) |
| Redirect URI déclarée | `https://n8n.srv1238259.hstgr.cloud/rest/oauth2-credential/callback` |
| APIs activées | Gmail, Sheets, Drive, Calendar |
| Statut de l'app OAuth | **En production** (tokens permanents, pas d'expiration 7 jours) |

## 2. Credentials n8n (créés le 31/08/2026)

| Service | Nom du credential | ID n8n | Autorisé |
|---|---|---|---|
| Gmail | Gmail — Ambition Campus | `4Etys7DQjGC1ZuRb` | ✅ |
| Drive | Drive — Ambition Campus | `SB7Z92KSXMB0szVV` | ✅ |
| Calendar | Calendar — Ambition Campus | `ktUH31vPsjGtggUO` | ✅ |
| Sheets | Sheets — Ambition Campus | `eb3hAwwRXRghfdze` | ⏳ Sign in à faire |

Lien direct vers un credential : `https://n8n.srv1238259.hstgr.cloud/home/credentials/<ID>`

## 3. Workflow de test E2E

| | |
|---|---|
| Nom | TEST — Connexion Google Ambition Campus |
| ID | `hXma68ZNrIxuKBol` |
| URL | https://n8n.srv1238259.hstgr.cloud/workflow/hXma68ZNrIxuKBol |
| Webhook (workflow actif uniquement) | `GET https://n8n.srv1238259.hstgr.cloud/webhook/test-google-ambition-campus` |
| État | **Désactivé volontairement** (le webhook est public et déclenche des envois réels) |

Il teste les 3 services : envoi d'un mail, création d'un `.txt` dans Drive, événement Calendar avec invité.

## 4. Liens Google Cloud utiles

| Page | URL |
|---|---|
| Clients OAuth (ID + secret) | https://console.cloud.google.com/auth/clients |
| Audience / publication / testeurs | https://console.cloud.google.com/auth/audience |
| Branding (écran de consentement) | https://console.cloud.google.com/auth/overview |
| Activer une API | `https://console.cloud.google.com/apis/library/<api>` — `gmail.googleapis.com`, `sheets.googleapis.com`, `drive.googleapis.com`, `calendar-json.googleapis.com` |

## 5. Procédure complète (pour refaire de zéro ou ajouter un service)

1. **GCP** : créer le projet → activer les 4 APIs (liens §4)
2. **Branding** (`auth/overview`) : nom app, email support, **email de contact développeur**, et les 3 liens obligatoires pour les scopes sensibles :
   - Page d'accueil : `https://n8n.srv1238259.hstgr.cloud`
   - Confidentialité : `https://n8n.srv1238259.hstgr.cloud/privacy`
   - CGU : `https://n8n.srv1238259.hstgr.cloud/terms`
   - ⚠️ **Ne jamais importer de logo** → déclencherait la validation Google obligatoire
3. **Publier** (`auth/audience`) : « Publier l'application » → état **En production**. En mode Test, les refresh tokens meurent au bout de **7 jours**
4. **Client OAuth** (`auth/clients`) : type Application Web, URI de redirection **exacte** (champ « URI de redirection autorisés », PAS « Origines JavaScript ») : `https://n8n.srv1238259.hstgr.cloud/rest/oauth2-credential/callback`
5. **n8n** : créer un credential du bon type (`Gmail OAuth2 API`, etc.) avec Client ID + Secret → **Sign in with Google** → compte `ambitioncampus.finance` → « Paramètres avancés » → « Accéder à… (non sécurisé) » → Autoriser

## 6. Créer un credential par l'API n8n (sans passer par l'UI)

L'API n8n ne permet pas de **lister** les credentials (`Forbidden` = normal), mais permet de les **créer**.
Champs annexes obligatoires en plus de `clientId`/`clientSecret` :

```json
POST /api/v1/credentials
{
  "name": "Gmail — Ambition Campus",
  "type": "gmailOAuth2",
  "data": {
    "clientId": "<CLIENT_ID>",
    "clientSecret": "<CLIENT_SECRET>",
    "serverUrl": "",
    "sendAdditionalBodyProperties": false,
    "additionalBodyProperties": "{}"
  }
}
```

Types : `gmailOAuth2` · `googleDriveOAuth2Api` · `googleCalendarOAuth2Api` · `googleSheetsOAuth2Api`
⚠️ L'autorisation OAuth (« Sign in with Google ») reste **obligatoirement manuelle** dans l'UI n8n.

## 7. Commandes de test

```bash
# L'endpoint callback n8n répond (401 = normal, c'est bien n8n)
curl -s -o /dev/null -w "%{http_code}" https://n8n.srv1238259.hstgr.cloud/rest/oauth2-credential/callback

# Préflight OAuth (vérifie client + redirect URI + scopes sans se connecter)
# → ouvrir dans un navigateur :
# https://accounts.google.com/o/oauth2/v2/auth?client_id=<CLIENT_ID>&redirect_uri=https%3A%2F%2Fn8n.srv1238259.hstgr.cloud%2Frest%2Foauth2-credential%2Fcallback&response_type=code&scope=https%3A%2F%2Fmail.google.com%2F&access_type=offline&prompt=consent

# Déclencher le workflow de test (l'activer d'abord dans n8n)
curl "https://n8n.srv1238259.hstgr.cloud/webhook/test-google-ambition-campus"
```

## 8. Erreurs rencontrées et solutions

| Erreur | Cause | Solution appliquée |
|---|---|---|
| `redirect_uri_mismatch` | URI absente du client OAuth | Ajouter l'URI exacte dans « URI de redirection autorisés » (sans slash final) |
| `403 access_denied` — « n'a pas terminé la procédure de validation » | App en statut **Test**, compte non testeur | Publier en Production (ou ajouter le compte en testeur — mais tokens 7 jours) |
| « Configuration OAuth incomplète » au moment de publier | Liens Branding manquants (scopes sensibles) | Remplir page d'accueil + confidentialité + CGU sur le domaine autorisé |
| « Unable to sign without access token » à l'exécution | Credential créé mais « Sign in with Google » jamais complété | Refaire le Sign in sur le credential concerné |
| « Missing required credential: googleApi » à l'activation | Paramètre `authentication` absent sur le nœud Gmail | Fixer `parameters.authentication = "oAuth2"` |
| « Missing or invalid required parameters: calendar » | Resource locator calendar mal formé | `{"__rl": true, "mode": "id", "value": "ambitioncampus.finance@gmail.com"}` |

## 9. Écran « Google n'a pas validé cette application »

**Normal et permanent** pour une app interne non validée (aucun logo importé = pas de validation requise).
À chaque nouvelle autorisation : *Paramètres avancés* → *Accéder à srv1238259.hstgr.cloud (non sécurisé)* → *Autoriser*. Limite : 100 utilisateurs — largement suffisant.

## 10. Prochaine étape prévue

Workflow de prospection : Supabase (99 cibles, emails rédigés dans `prospection/*/emails_generes/`) → Gmail (cadence limitée 10-15/jour, Tier 1 d'abord) → mise à jour du statut dans le CRM. Mode « brouillons à valider » ou envoi direct, à décider.
