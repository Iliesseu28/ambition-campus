# Rapport de vérification OSINT des contacts entreprises — 2026-09-03

Sources : Firecrawl search (résultats Google `site:linkedin.com/in`, aucun scraping de LinkedIn) et Perplexity (mode pro). Les emails sont évalués sur leur **format** uniquement : aucune vérification SMTP (nécessite Hunter / Dropcontact / Reoon).

## Synthèse

| Indicateur | Valeur |
|---|---|
| Contacts analysés | 81 (dont 4 entités génériques) |
| LinkedIn identique à la base | 6 |
| LinkedIn trouvé mais **différent** de la base | 69 |
| Personne **introuvable** sur LinkedIn (Google) | 2 |
| Poste **confirmé** par Perplexity | 38 / 77 |
| Poste **différent** selon Perplexity | 6 |
| Personne **introuvable** selon Perplexity | 22 |
| Emails génériques (contact@, rse@…) | 11 |
| Emails au format cohérent avec le domaine | 18 |
| Emails au format douteux | 6 |
| Emails au format non déterminable | 46 |

## Détail par entreprise

### ENT-01 — PwC France et Maghreb

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Adélaïde de Tourtier | Directrice RSE & Engagement | [adelaide-de-tourtier-audras-4a423a1](https://www.linkedin.com/in/adelaide-de-tourtier-audras-4a423a1) | Adelaide de Tourtier Audras - PwC France - LinkedIn | haute | différent | introuvable | adelaide.de.tourtier@pwc.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Candice Galopeau | Resp. Engagement Sociétal | [candice-galopeau-16a6b291](https://www.linkedin.com/in/candice-galopeau-16a6b291) | Candice Galopeau - Fondation PwC France et Maghreb - LinkedIn | haute | absent dans la base | introuvable | candice.galopeau@pwc.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Adélaïde de Tourtier: introuvable dans le poste actuel; sources montrent des rôles liés à RSE et à la Fondation PwC, mais pas le titre exact de Directrice RSE & Engagement en sept. 2026. Introuvable.[1][2] - Candice Galopeau: introuvable dans le poste actuel; aucune source confirmant son titre chez PwC France et Maghreb en sept. 2026. Introuvable.[1][3]

Sources Perplexity : [1](https://www.pwc.fr/fr/publications/voix-inspirantes.html) · [2](https://www.pwc.fr/fr/espace-presse/communiques-de-presse/2025/juillet/emmanuel-benoist-devient-president-de-pwc.html) · [3](https://www.pwc.fr/fr/qui-sommes-nous/notre-organisation.html) · [4](https://www.pwc.fr/fr/contactez-nous.html) · [5](https://www.pwc.fr/fr/espace-presse/communiques-de-presse/2023/juillet/pwc-france-et-maghreb-coopte-36-associes-et-accueille-2-nouveaux-associes.html) · [6](https://mesinfos.fr/ile-de-france/pwc-france-et-maghreb-31-nouvelles-nominations-110694.html)

### ENT-02 — Deloitte France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Guilène Bertin-Perri | Secrétaire Générale Fondation Deloitte | [guilène-bertin-60298b91](https://www.linkedin.com/in/guil%C3%A8ne-bertin-60298b91) | Guilène Bertin - Déléguée Générale de la Fondation Deloitte / LinkedIn | haute | différent | introuvable | gbertinperri@deloitte.fr | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Bertrand Boisselier | Président Fondation Deloitte | [bertrand-boisselier-63b7176](https://www.linkedin.com/in/bertrand-boisselier-63b7176) | Bertrand Boisselier - Deloitte France & Francophone Africa Board ... | haute | absent dans la base | confirmé | frpoleattractivite@deloitte.fr | générique : vérifier sur le site | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** Bertrand Boisselier — confirmé comme Président du Conseil d’Administration Deloitte France et Afrique francophone; actuel poste: Président du Conseil d’Administration Deloitte France et Afrique francophone et Président de la Fondation Deloitte. Source: Deloitte France pages indiquant sa fonction et titres.[1][2][3][4] Guilène Bertin-Perri — introuvable; aucune source dans les résultats indiquant son poste actuel ou son départ. Si elle occupait Secrétaire Générale Fondation Deloitte, l’information actuelle n’est pas confirmée dans les résultats fournis. Source: absence d’info correspondante dans les résultats.[1][2][3][4]

Sources Perplexity : [1](https://www.deloitte.com/global/en/about/people/profiles/gbod-bertrand-boisselier.html) · [2](https://www.deloitte.com/fr/fr/about/people/conseil-administration.html) · [3](https://www.deloitte.com/fr/fr/about.html) · [4](https://www.deloitte.com/fr/fr/about/people/profiles.bertrand-boisselier+a27499ed.html) · [5](https://www.deloitte.com/afrique/fr/about/people/profiles.bertrand-boisselier+a27499ed.html) · [6](https://www.deloitte.com/fr/fr.html)

### ENT-03 — KPMG France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Bouchra Aliouat | Directrice de l'Engagement Citoyen & Secrétaire Générale | [bouchra-aliouat-b62a0012](https://www.linkedin.com/in/bouchra-aliouat-b62a0012) | Bouchra Aliouat - Fonds de dotation KPMG - LinkedIn | haute | différent | confirmé | baliouat@kpmg.fr | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |
| Khalid Hima | Délégué Général Fonds de Dotation | [khalid-hima-66712b7b](https://www.linkedin.com/in/khalid-hima-66712b7b) | Khalid Hima - Délégué Général du Fonds de Dotation, Manager ... | haute | absent dans la base | introuvable | khima@kpmg.fr | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** - Bouchra Aliouat — confirmée? poste actuel: Directrice de l’Engagement Citoyen & Secrétaire Générale, Fonds de dotation KPMG; Secrétaire générale, KPMG France. Source: LinkedIn et page KPMG (références ).[1][2] - Khalid Hima — introuvable? poste exact actuel non confirmé dans les résultats fournis; absence d’indication claire sur son rôle actuel chez KPMG France en septembre 2026. Source: aucune preuve disponible dans les résultats fournis.

Sources Perplexity : [1](https://www.linkedin.com/in/bouchra-aliouat-b62a0012) · [2](https://awards-inclusion-economique.eventmaker.io/kpmg) · [3](https://assets.kpmg.com/content/dam/kpmg/fr/pdf/2024/08/bios-externes-nomination-nouveaux-associes-fy25.pdf) · [4](https://kpmg.com/fr/fr/media/press-releases/2026/07/nomination-21-nouveaux-associes-juillet-2026.html) · [5](https://assets.kpmg.com/content/dam/kpmgsites/fr/pdf/corporate/nominations-biographies-associes-kpmg-promotion-2026.pdf.coredownload.inline.pdf) · [6](https://kpmg.com/fr/fr/media/press-releases/2026/07/nomination-comex-valerie-besson-mathieu-schohn-laurent-choain.html)

### ENT-04 — EY France (Ernst & Young)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Fabienne Marqueste | Déléguée Générale Mécénat | [fabienne-marqueste-32864526](https://www.linkedin.com/in/fabienne-marqueste-32864526) | Fabienne Marqueste - Déléguée générale de la Fondation d ... | haute | différent | non mentionné | fabienne.marqueste@fr.ey.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn** |
| Orane Tribouley | Resp. accompagnement projets | [oranetribouley](https://www.linkedin.com/in/oranetribouley) | Orane Tribouley - Responsable de projets - Fondation EY / LinkedIn | haute | absent dans la base | non mentionné | orane.tribouley@fr.ey.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** introuvable; aucune source fiable disponible dans les résultats fournis pour confirmer leur poste actuel chez EY France en septembre 2026.

Sources Perplexity : [1](https://www.ey.com/fr_fr/people/fabienne-marqueste) · [2](https://fr.wikipedia.org/wiki/EY_(entreprise)) · [3](https://www.ey.com/fr_fr/newsroom/2024/10/nomination-du-comite-executif-d-ey-france) · [4](https://www.ey.com/fr_fr/newsroom/2023/01/cooptations-ey) · [5](https://www.ey.com/fr_fr/newsroom/2024/07/cooptations-ey-2024) · [6](https://www.ey.com/fr_fr/about-us/france-leadership)

### ENT-05 — Forvis Mazars France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Marie-Anne Brin | Directrice RSE & Fondation Forvis Mazars | [marie-anne-brin-14330131](https://www.linkedin.com/in/marie-anne-brin-14330131) | Marie-Anne BRIN - Chef de Projet Evenementiel chez Mazars / LinkedIn | haute | différent | non mentionné | marie-anne.brin@mazars.fr | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** introuvable.

Sources Perplexity : [1](https://www.forvismazars.com/fr/fr/a-propos/la-rse-chez-forvis-mazars/nos-implications-societales/la-fondation-d-entreprise-forvis-mazars/l-equipe-de-la-fondation-d-entreprise) · [2](https://www.forvismazars.com/fr/fr/a-propos/forvis-mazars-en-france/l-equipe-de-direction) · [3](https://fr.wikipedia.org/wiki/Forvis_Mazars) · [4](https://www.forvismazars.com/fr/fr/a-propos/communiques-de-presse/communiques-de-presse-2026) · [5](https://www.forvismazars.com/fr/fr/contacts/Notre-equipe) · [6](https://www.forvismazars.com/fr/fr/offices)

### ENT-06 — Wavestone

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Hélène Cambournac | Responsable RSE & Engagements Durables | [helene-cambournac](https://www.linkedin.com/in/helene-cambournac) | Hélène Cambournac - EXCOM Member at Wavestone - LinkedIn | haute | identique | confirmé | helene.cambournac@wavestone.com | format non déterminable (aucun exemple public) | **LinkedIn OK · poste LinkedIn différent de la base** |
| Cédric Baecher | Partner Sustainability | [cedricbaecher](https://www.linkedin.com/in/cedricbaecher) | Cedric Baecher - Partner (Wavestone) - Expert in ... - LinkedIn | haute | absent dans la base | confirmé | cedric.baecher@wavestone.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** confirmé for Hélène Cambournac as Responsable RSE, France; poste actuel: Responsable RSE, France. Source: Wavestone équipe dirigeante page.[1] confirmé for Cédric Baecher as Partner Sustainability; poste actuel: Partner at Wavestone, Sustainability (France/International). Source: Cédric Baecher bio.[2]

Sources Perplexity : [1](https://www.wavestone.com/fr/decouvrir-wavestone/equipe-dirigeante/) · [2](https://www.wavestone.com/en/people/cedric-baecher/) · [3](https://www.boursorama.com/videos/actualites/la-strategie-esg-de-wavestone-est-elle-convaincante-3cd1234fad8cd2055d5e6533ffb76267) · [4](https://www.wavestone.com/fr/news/frnouveaux-partners-associate-partners-promotion-de-printemps-2026/) · [5](https://www.wavestone.com/fr/news/wavestone-nouveaux-partners-associate-partners/) · [6](https://www.wavestone.com/fr/)

### ENT-07 — Boston Consulting Group (BCG Paris)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Patrick Dupoux | Senior Partner, Head of Social Impact EMESA | [patrick-dupoux-0211b9](https://www.linkedin.com/in/patrick-dupoux-0211b9) | Patrick Dupoux - France / Profil professionnel - LinkedIn | moyenne | différent | confirmé | dupoux.patrick@bcg.com | format DOUTEUX : différent des exemples publics | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |
| Thomas Payen | Partner, Social Impact Lead Paris | [thomas-payen-2581472b](https://www.linkedin.com/in/thomas-payen-2581472b) | Thomas Payen - Managing Director and Partner at BCG / Healthcare | haute | absent dans la base | introuvable | payen.thomas@bcg.com | format DOUTEUX : différent des exemples publics | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Patrick Dupoux: confirmé. Poste actuel: Managing Director & Senior Partner; Head of Social Impact Practice for EMESA; Member of BCG's Executive Committee Paris. Source:[1][2] - Thomas Payen: introuvable. Poste exact actuel non démontré dans les sources fournies; mentions de son rôle passé incluent Directeur associé et MD/Partner à Paris, mais sans confirmation actuelle sept. 2026. Sources pertinentes:[3][4]

Sources Perplexity : [1](https://www.bcg.com/about/people/experts/patrick-dupoux) · [2](https://www.bcg.com/about/people-culture/leadership) · [3](https://www.bcg.com/press/11july2022-cinq-nouveaux-directeurs-associes-nommes-au-boston-consulting-group-bcg-a-paris) · [4](https://www.consultor.fr/articles/4-nouveaux-associes-au-bcg-a-paris) · [5](https://www.bcg.com/offices/paris/default) · [6](https://www.consultancy.eu/news/12790/boston-consulting-group-appoints-new-managing-directors-partners-in-france)

### ENT-08 — McKinsey & Company Paris

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Alain Imbert | Research & Analytics Manager, Mécénat & Projets | [alain-imbert-8952583](https://www.linkedin.com/in/alain-imbert-8952583) | Alain Imbert - Paris, Île-de-France, France / Profil professionnel | moyenne | différent | non mentionné | alain_imbert@mckinsey.com | format non déterminable (aucun exemple public) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |
| Christophe Rohel | Talent Acquisition Director | [christopherohel](https://www.linkedin.com/in/christopherohel) | Christophe ROHEL - Talent Acquisition Director / LinkedIn | haute | absent dans la base | non mentionné | christophe_rohel@mckinsey.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** introuvable; pas de source fiable confirmant leur maintien dans ces postes à McKinsey Paris en septembre 2026.

Sources Perplexity : [1](https://www.mckinsey.com/fr/our-people) · [2](https://www.mckinsey.com/fr/our-insights) · [3](https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-people) · [4](https://www.mckinsey.com/fr) · [5](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-people) · [6](https://www.mckinsey.com/capabilities/tech-and-ai/how-we-help-clients/experience-studio/our-locations/paris)

### ENT-09 — Banque de France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Mission RSE & Solidarité | Responsable Mécénat Participatif & Inclusion (« Vos voix, nos dons ») | — |  | aucune | entité | introuvable | rse@banque-france.fr | générique : vérifier sur le site | **Entité générique : identifier une personne** |
| Comité Mécénat |  | — |  | aucune | entité | introuvable | mecenat@banque-france.fr | générique : vérifier sur le site | **Entité générique : identifier une personne** |

**Perplexity (2026) :** Introuvable. Aucune source fiable et récente vérifiant en septembre 2026 les titulaires exacts des postes « Mission RSE & Solidarité (Responsable Mécénat Participatif & Inclusion) » et « Comité Mécénat (Responsable Mécénat Participatif & Inclusion) » à Banque de France, ni leur occupant actuel.

Sources Perplexity : [1](https://www.banque-france.fr/system/files/2024-04/Livret_bilan_actions_RSE_2023.pdf) · [2](https://www.banque-france.fr/fr/actualites/le-mecenat-participatif-de-la-banque-de-france) · [3](https://www.banque-france.fr/fr) · [4](https://www.banque-france.fr/fr/recherche) · [5](https://www.banque-france.fr/fr/banque-de-france/banque-centrale-engagee/responsabilite-sociale-environnementale) · [6](https://www.banque-france.fr/fr/la-banque-de-france/une-banque-centrale-engagee/investissement-responsable)

### ENT-10 — BNP Paribas

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Anne Pointet | Directrice de l'Engagement d'Entreprise | [anne-pointet](https://www.linkedin.com/in/anne-pointet) | Anne Pointet - BNP Paribas - LinkedIn | haute | identique | confirmé | anne.pointet@bnpparibas.com | format DOUTEUX : différent des exemples publics | **LinkedIn OK** |
| Isabelle Giordano | Déléguée Générale Fondation BNP Paribas | [isabelle-giordano](https://www.linkedin.com/in/isabelle-giordano) | Isabelle Giordano - Head of Corporate Philanthropy @fondation BNP ... | haute | absent dans la base | introuvable | isabelle.giordano@bnpparibas.com | format DOUTEUX : différent des exemples publics | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** - Anne Pointet: confirmée — Directrice de l’Engagement d’entreprise et membre du Comité exécutif du groupe BNP Paribas. Source: BNP Paribas et communiqués affiliés (notamment https://group.bnpparibas/press et articles presse récapitulant la nomination au 1er juillet 2024)[1][2] - Isabelle Giordano: introuvable / poste différent — Déléguée Générale de la Fondation BNP Paribas n’est plus mentionnée comme telle dans les communiqués récents; son poste actuel n’est pas confirmé dans les sources publiques disponibles. Source: absence de confirmation dans les communiqués récentsBNP Paribas et articles connexes[3][4]

Sources Perplexity : [1](https://www.boursorama.com/bourse/actualites/bnp-paribas-anne-pointet-succede-a-antoine-sire-au-comite-executif-du-groupe-61e5d212be0911223423562335c4696e) · [2](https://group.bnpparibas/en/press-release/bnp-paribas-announces-appointments-within-its-executive-committee-and-company-engagement-department) · [3](https://group.bnpparibas/communique-de-presse/nominations-au-sein-du-comite-executif-et-de-la-direction-de-lengagement-dentreprise-de-bnp-paribas) · [4](https://group.bnpparibas/decouvrez-le-groupe/notre-gouvernance/direction-generale-et-comite-executif/anne-pointet-2) · [5](https://group.bnpparibas/en/group/our-governance/general-management-and-the-executive-committee/anne-pointet-1) · [6](https://www.agefi.fr/news/banque-assurance/bnp-paribas-fait-evoluer-une-partie-de-son-comite-executif)

### ENT-11 — Crédit Agricole CIB (Corporate & Investment Bank)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Tanguy Claquin | Global Head of Sustainable Banking & ESG CACIB | [tanguy-claquin-30ba124a](https://www.linkedin.com/in/tanguy-claquin-30ba124a) | Tanguy Claquin - Head of Sustainable Banking at Credit Agricole CIB | haute | différent | confirmé | tanguy.claquin@ca-cib.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** Tanguy Claquin est confirmé en poste: Global Head of Sustainability [source: CA-CIB presse 2021]. Introuvable ou poste différent pour les autres noms demandés: aucune information fournie dans les résultats sur des collaborateurs spécifiques à septembre 2026. Si vous souhaitez, je peux rechercher des confirmations actuelles.

Sources Perplexity : [1](https://www.ca-cib.com/sites/default/files/2021-12/PR-Tanguy-Claquin-appointed-Global-Head-of-Sustainability.pdf) · [2](https://www.ca-cib.fr/sites/default/files/2021-12/Cr%C3%A9dit-Agricole%20CIB_Nomination-Tanguy-Claquin-Responsable-mondial-Sustainability.pdf) · [3](https://www.proparco.fr/fr/auteur/tanguy-claquin) · [4](https://www.proparco.fr/en/author/tanguy-claquin) · [5](https://www.ca-cib.com/sites/default/files/2019-05/09.05.2019-LAgefiHebdo-Virginie-Deneuville-Un-homme-une-equipe.pdf) · [6](https://en.wikipedia.org/wiki/Cr%C3%A9dit_Agricole_Corporate_and_Investment_Bank)

### ENT-12 — Groupe BPCE / Natixis

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Benoît Gausseron | Directeur RSE & Impact Natixis IM | [beno%c3%aet-gausseron-8ba0b378](https://www.linkedin.com/in/beno%25C3%25AEt-gausseron-8ba0b378) | Benoît Gausseron - Directeur de la communication du groupe EDF | moyenne | différent | confirmé | benoit.gausseron@natixis.com | format non déterminable (aucun exemple public) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |
| Virginie Normand | Directrice RSE Groupe BPCE | [virginienormand](https://www.linkedin.com/in/virginienormand) | Virginie Normand - Directrice Générale de la Fédération ... | haute | absent dans la base | introuvable | rse@bpce.fr | générique : vérifier sur le site | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** - Benoît Gausseron: confirmé — Directeur marque, communication et RSE chez Natixis Investment Managers. Source: Natixis IM leadership page and press releases.[1][2] - Virginie Normand: introuvable — aucune source confirmant son poste actuel en septembre 2026 dans le BPCE/Groupe BPCE; dernier poste identifiable non spécifié ici. Sources citées: Nomination BPCE Newsroom et BPCE pages ne mentionnent pas son poste actuel de manière claire.[3]

Sources Perplexity : [1](https://www.im.natixis.com/fr-fr/about/leadership-team/benoit-gausseron) · [2](https://www.im.natixis.com/fr-fr/about/newsroom/press-releases/2024/natixis-investment-managers-announces-the-appointment-of-benoit-gausseron-as-global-head-of-communications-brand-and-csr) · [3](https://newsroom.groupebpce.fr/nomination.html) · [4](https://www.boursorama.com/bourse/actualites/natixis-im-benoit-gausseron-au-poste-de-directeur-communication-marque-et-rse-b274fed7d426bdecd83fca80d3de0b0c) · [5](https://natixis.groupebpce.com/fr/nos-engagements/responsabilite-sociale-et-environnementale/) · [6](https://www.optionfinance.fr/nominations/nomination/benoit-gausseron/directeur-communication-marque-et-rse/natixis-im.html)

### ENT-13 — Lazard Frères SAS (Paris)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Sophie de Nadaillac | Directrice Générale Déléguée & Fondation Lazard Frères Gestion | [sophie-de-nadaillac](https://www.linkedin.com/in/sophie-de-nadaillac) | Sophie de Nadaillac - Lazard Frères Gestion - LinkedIn | haute | différent | confirmé | sophie.denadaillac@lazard.fr | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** - Sophie de Nadaillac — confirmé — Présidente de Lazard Frères Gestion (depuis le 1er janvier 2026)[1][2][3][4] - François-Marc Durand — poste différent — Président de la Compagnie Financière Lazard Frères (structure mère), après avoir quitté la présidence de Lazard Frères Gestion en 2026[2][3][5][6] - Introuvable — pas d’indication d’un autre poste actuel pour les personnes liées à Lazard Frères SAS Paris dans les sources fournies[1][2][3][7] - Autre poste (à confirmer) — aucune source indiquant le remplacement exact ou le nom actuel pour tout autre participant potentiel au sein de Lazard Frères SAS Paris au-delà des noms ci-dessus dans les résultats fournis.

Sources Perplexity : [1](https://www.boursorama.com/bourse/actualites/sophie-de-nadaillac-prend-la-presidence-de-lazard-freres-gestion-77a4cfa2ff083aaea43614b1c74f14c7) · [2](https://www.challenges.fr/entreprise/banque-et-assurance/elle-y-a-ete-preparee-depuis-des-annees-sophie-de-nadaillac-prend-la-tete-de-lazard-freres-gestion_636778) · [3](https://www.optionfinance.fr/info-financiere-en-continu/d/2026-01-16-sophie-de-nadaillac-nommee-presidente-de-lazard-freres-gestion.html) · [4](https://www.newsassetpro.com/lazard-freres-gestion-sophie-de-nadaillac-a-la-presidence/016941497) · [5](https://fundsmagazine.optionfinance.fr/linfo-asset-en-continu/detail/2026-01-16-sophie-de-nadaillac-nommee-presidente-de-lazard-freres-gestion.html) · [6](https://www.wansquare.com/012-44289-Francois-Marc-Durand-laisse-la-place-a-la-nouvelle-generation-chez-Lazard-Freres-Gestion.html)

### ENT-14 — Rothschild & Co (Paris)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Anne Imbach | Group Head of Sustainability | [anne-imbach](https://www.linkedin.com/in/anne-imbach) | Anne Imbach née Beerlink - Chief Sustainability Officer at Rothschild ... | haute | identique | confirmé | anne.imbach@rothschildandco.com | format non déterminable (aucun exemple public) | **LinkedIn OK** |
| Ludivine de Quincerot | Head of Sustainable Investment AM | [ludivine-de-quincerot-7763661](https://www.linkedin.com/in/ludivine-de-quincerot-7763661) | Ludivine De Quincerot - Paris et périphérie / Profil professionnel | moyenne | absent dans la base | confirmé | ludivine.dequincerot@rothschildandco.com | format non déterminable (aucun exemple public) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |

**Perplexity (2026) :** - Anne Imbach: confirmé — Group Head of Sustainability chez Rothschild & Co Asset Management Europe (poste confirmé)****[1] - Ludivine de Quincerot: confirmé — Head of Sustainable Investment AM / Responsable ESG et analyse financière chez Rothschild & Co Asset Management Europe (poste confirmé)****[2][3]

Sources Perplexity : [1](https://www.rothschildandco.com/en/newsroom/insights/2024/12/perspectives-podcast-in-conversation-with-our-group-head-of-sustainability/) · [2](https://www.rothschildandco.com/fr-ch/gestion-dactifs/nos-equipes/ludivine-de-quincerot/) · [3](https://www.rothschildandco.com/en-it/asset-management/our-people/ludivine-de-quincerot/) · [4](https://am.eu.rothschildandco.com/stock/file/news/549/20210527-focus-esg.pdf) · [5](https://am.eu.rothschildandco.com/fr/actualites/3-minutes-chrono-pour-decouvrir-notre-expertise-net-zero/) · [6](https://am.eu.rothschildandco.com/fr/actualites/des-ambitions-aux-actions-en-faveur-dune-finance-responsable/)

### ENT-15 — Gide Loyrette Nouel

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Carole Malinvaud | Associée, Présidente de la Commission Pro Bono & Fonds Gide Pro Bono | [carole-malinvaud-73472335](https://www.linkedin.com/in/carole-malinvaud-73472335) | Carole Malinvaud - Associée chez Gide Loyrette Nouel - LinkedIn | haute | différent | introuvable | carole.malinvaud@gide.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Carole Malinvaud: introuvable - Poste actuel et source: introuvable

Sources Perplexity : [1](https://www.swissarbitration.org/wp-content/uploads/2021/05/carole-malinvaud.pdf) · [2](https://fr.wikipedia.org/wiki/Gide_Loyrette_Nouel) · [3](https://www.legal500.fr/firms/10224-gide-loyrette-nouel-aarpi/c-france/lawyers/576263-carole-malinvaud) · [4](https://www.gide.com/news-insights/c-malinvaud-designee-par-le-gouvernement-francais-pour-figurer-sur-la-liste-des-arbitres-du-cirdi/) · [5](https://www.gide.com/gide-pro-bono-et-rse/pro-bono-accompagner-soutenir-et-defendre/) · [6](https://www.gide.com/en/our-firm/)

### ENT-16 — August Debouzy

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Fabienne Haas | Associée, Référente Pro Bono & Solidarité « ADay to give » | [fabienne-haas-bb1b15a](https://www.linkedin.com/in/fabienne-haas-bb1b15a) | Fabienne Haas - Avocat à la Cour Associé/Partner August Debouzy ... | haute | différent | introuvable | fhaas@august-debouzy.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn** |
| Emmanuelle Barbara | Senior Partner | [emmanuelle-barbara-3a178860](https://www.linkedin.com/in/emmanuelle-barbara-3a178860) | Emmanuelle Barbara - Avocat associé - Senior Partner August Debouzy | haute | absent dans la base | introuvable | contact@august-debouzy.com | générique : vérifier sur le site | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** introuvable; aucune source fiable et récente ne confirme leur situation actuelle en septembre 2026. Fabienne Haas — introuvable (sources indiquent son association chez August Debouzy mais pas son poste exact en 2026). Emmanuelle Barbara — introuvable (sources disponibles indiquent qu’elle était Senior Partner, mais pas confirmation actuelle en septembre 2026).

Sources Perplexity : [1](https://fr.wikipedia.org/wiki/August_Debouzy) · [2](https://my.legal500.fr/firms/13777-august-debouzy/14605-paris-france/lawyers/501693-fabienne-haas/) · [3](https://www.legal500.fr/firms/13777-august-debouzy/global/lawyers) · [4](https://www.legal500.fr/firms/13777-august-debouzy/c-france/lawyers) · [5](https://www.legal500.com/firms/13777-august-debouzy/c-france/lawyers) · [6](https://contactout.com/Emmanuelle-Barbara-241809336)

### ENT-17 — Clifford Chance Paris

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Charles-Henri Boeringer | Partner, Responsible Business & ESG Lead Paris | [charles-henri-boeringer-42566342](https://www.linkedin.com/in/charles-henri-boeringer-42566342) | Charles-Henri Boeringer - Litigation Partner at Law firm Clifford Chance ... | haute | différent | confirmé | charles-henri.boeringer@cliffordchance.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |
| Mathieu Remy | Managing Partner Paris | [mathieu-remy-398a375](https://www.linkedin.com/in/mathieu-remy-398a375) | Mathieu Remy - Managing Partner I Clifford Chance Paris - LinkedIn | haute | absent dans la base | confirmé | mathieu.remy@cliffordchance.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** - Charles-Henri Boeringer — confirmé; Poste actuel: Contentieux & Arbitrage, Associé chez Clifford Chance Paris. Source: CFNews/Clifford Chance profiles et annuaire Legal500 indiquant Boeringer en Contentieux & Arbitrage à Paris.[1][2][3] - Mathieu Remy — confirmé; Poste actuel: Managing Partner Paris (Gestion du bureau Paris). Source: article Clifford Chance et Chambers/Lawyer profiles indiquant Mathieu Remy comme Managing Partner Paris.[1][4]

Sources Perplexity : [1](https://www.cliffordchance.com/news/news/2019/10/clifford-chance-appoints-new-managing-partner-in-paris---mathieu.html) · [2](https://www.cliffordchance.com/news/news/2018/04/clifford-chance-nomme-2-nouveaux-associes-a-paris.html) · [3](https://www.legal500.com/firms/679-clifford-chance-llp/c-france/lawyers/727729-charles-henri-boeringer) · [4](https://chambers.com/department/clifford-chance-llp-corporate-ma-high-end-capability-france-121:1151:86:1:83) · [5](https://www.cfnews.net/L-actualite/Nominations/Avocat/Un-nouveau-managing-partner-pour-Clifford-Chance-a-Paris-329339) · [6](https://www.cliffordchance.com/news/news/2026/04/clifford-chance-boosts-global-offering-in-private-capital--energ.html)

### ENT-18 — Linklaters Paris

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Anne Wachsmann | Associée, Présidente de la Fondation d'entreprise Linklaters | [anne-wachsmann-guigon-710261126](https://www.linkedin.com/in/anne-wachsmann-guigon-710261126) | Anne Wachsmann-Guigon - President of the board of the Palais de Tokyo | moyenne | différent | introuvable | anne.wachsmann@linklaters.com | format DOUTEUX : différent des exemples publics | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |

**Perplexity (2026) :** introuvable; sources indiquent Anne Wachsmann-Guigon comme présidente de la Fondation Linklaters à Paris et associée, mais aucun document publié en septembre 2026 ne confirme qu’elle occupe toujours ce poste; d’après des éléments 2024–2025, elle est associée en droit de la concurrence et présidente de la fondation, mais le poste précis actuel en septembre 2026 n’est pas vérifiable dans les sources fournies.[1][2][3]

Sources Perplexity : [1](https://www.linklaters.com/en/about-us/alumni/alumni-features/june-2024) · [2](https://www.linklaters.com/fr-fr/about-us/sustainability/linklaters-foundation/the-board-of-the-foundation) · [3](https://www.linklaters.com/fr-fr/locations/france) · [4](https://www.lesechos.fr/2015/11/anne-wachsmann-guigon-avocate-dans-les-regles-de-lart-1109123) · [5](https://www.globallegalpost.com/news/linklaters-appoints-real-estate-lawyer-as-new-paris-office-managing-partner-1888795206) · [6](https://alumni.unistra.fr/fr/article/anne-wachsmann-avocate-associee-du-cabinet-linklaters-avocate-des-fusions/19/02/2021/2122)

### ENT-19 — Google France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Benoît Tabaka | Secrétaire Général & Directeur Relations Institutionnelles et Politiques Publiques | [benoittabaka](https://www.linkedin.com/in/benoittabaka) | Benoit Tabaka - Secrétaire général, Directeur des relations ... - LinkedIn | haute | identique | non mentionné | btabaka@google.com | format non déterminable (aucun exemple public) | **LinkedIn OK** |

**Perplexity (2026) :** introuvable.

Sources Perplexity : [1](https://www.lexpress.fr/economie/google-renforce-son-lobby-en-france_1114125.html) · [2](https://www.usinenouvelle.com/article/benoit-tabaka-rejoint-google-france.N174582) · [3](https://www.livreshebdo.fr/article/benoit-tabaka-au-lobbying) · [4](https://www.zdnet.fr/actualites/beno-t-tabaka-du-cnn-rejoint-google-france-au-lobbying-39771687.htm) · [5](https://www.itespresso.fr/benoit-tabaka-va-faire-du-lobbying-pour-le-compte-de-google-53215.html) · [6](https://www.revuepolitique.fr/author/benoit-tabaka/)

### ENT-20 — Microsoft France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Eneric Lopez | Directeur IA & Impact Social | [elopezfr](https://www.linkedin.com/in/elopezfr) | Eneric Lopez - AI National Initiative & Social Impact Director at Microsoft | haute | différent | confirmé | eneric.lopez@microsoft.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Philippe Trotin | Directeur Inclusion et Accessibilité | [ptrotin](https://www.linkedin.com/in/ptrotin) | Philippe Trotin - Paris et périphérie / Profil professionnel - LinkedIn | moyenne | absent dans la base | introuvable | philippe.trotin@microsoft.com | format non déterminable (aucun exemple public) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |

**Perplexity (2026) :** - Eneric Lopez: confirmé — Directeur IA et Impact social chez Microsoft France. Source:[1][2] - Philippe Trotin: introuvable (poste actuel non identifié dans les résultats fournis). Source: aucune page confirmant son poste actuel en septembre 2026.[3][4][5]

Sources Perplexity : [1](https://news.microsoft.com/fr-fr/exec/eneric-lopez/) · [2](https://news.microsoft.com/source/emea/2025/11/microsoft-lia-en-france-une-ambition-collective-des-resultats-concrets/?lang=fr) · [3](https://news.microsoft.com/fr-fr/exec/philippe-trotin/philippe-trotin/) · [4](https://www.silver-economy-expo.com/conferences/intervenants/philippe-trotin-2032) · [5](https://www.entreprendre.fr/article/entreprises/2022/10/27/6219/microsoft-france-innovation-et-accessibilite-numerique-une-relation-porteuse-de-sens/) · [6](https://news.microsoft.com/fr-fr/equipe-dirigeante/)

### ENT-21 — Amazon France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Elise Beuriot | Responsable du Programme Amazon Future Engineer France | [elisebeuriot](https://www.linkedin.com/in/elisebeuriot) | Elise Beuriot - Head of Public Policy, Amazon France - LinkedIn | haute | identique | non mentionné | ebeuriot@amazon.fr | format non déterminable (aucun exemple public) | **LinkedIn OK · poste LinkedIn différent de la base** |

**Perplexity (2026) :** introuvable

Sources Perplexity : [1](https://aws.amazon.com/fr/careers/) · [2](https://fr.wikipedia.org/wiki/Amazon) · [3](https://press.aboutamazon.com/fr/actualites/environnement-de-travail/2025/10/amazon-intensifie-son-engagement-pour-la-formation-aux-metiers-davenir-en-france) · [4](https://www.epita.fr/2021/11/09/amazon-future-engineer-saison-2-mixite-numerique/) · [5](https://www.maddyness.com/2025/10/22/recrutement-a-station-f-amazon-a-la-rencontre-des-etudiants-et-professionnels/) · [6](https://www.linkedin.com/in/elisebeuriot)

### ENT-22 — Groupe TF1 (RSE & Marque Employeur)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Arnaud Bosom | Directeur Général Adjoint RH & RSE | [arnaudbosom](https://www.linkedin.com/in/arnaudbosom) | Arnaud BOSOM - Président Abordage Conseil - LinkedIn | moyenne | différent | poste différent | abosom@tf1.fr | format cohérent avec le domaine (non vérifié SMTP) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre) · POSTE À METTRE À JOUR (Perplexity)** |
| Sophie Danis | Directrice Communication Programmes & RSE | [sophie-danis-verloove](https://www.linkedin.com/in/sophie-danis-verloove) | Sophie Danis Verloove - Directrice de la communication en ... - LinkedIn | haute | absent dans la base | poste différent | sdanis@tf1.fr | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn · POSTE À METTRE À JOUR (Perplexity)** |

**Perplexity (2026) :** - Arnaud Bosom: introuvable (ancien poste: Directeur Général Adjoint RH & RSE; a été remplacé par Valérie Languille en 2022, puis présence dans les organigrammes du Groupe TF1 montre Valérie Languille comme DGA Relations humaines et RSE à partir de septembre 2022; poste actuel sollicité non confirmé dans les résultats fournis)[1][2] - Sophie Danis: poste différent (anciennement Directrice Communication Programmes & RSE; les sources indiquent des évolutions organisationnelles autour de Maylis Çarçabal et réorganisation de la communication, mais Sophie Danis est mentionnée comme Directrice de la Communication Business, Digital et RSE, élargissant son périmètre à la Communication programmes selon une source de The Media Leader)[3]

Sources Perplexity : [1](https://groupe-tf1.fr/fr/communiques/valerie-languille-nommee-dga-relations-humaines-et-rse-du-groupe-tf1) · [2](https://www.zonebourse.com/cours/action/TF1-4714/actualite/TF1-VALERIE-LANGUILLE-NOMMEE-DGA-RELATIONS-HUMAINES-ET-RSE-DU-GROUPE-TF1-41667508/) · [3](https://fr.themedialeader.com/nouvelle-organisation-a-la-communication-du-groupe-tf1/) · [4](https://groupe-tf1.fr/fr/groupe/comite-executif) · [5](https://groupe-tf1.fr/sites/default/files//communiques/Communiqu%C3%A9%20de%20presse%20Groupe%20TF1%20Evolution%20de%20la%20direction%20de%20TF1.pdf) · [6](https://groupe-tf1.fr/fr/talents/notre-politique-rh)

### ENT-23 — L'Oréal France (Direction RSE)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Anne-Laure Thomas | Directrice Diversité, Équité et Inclusion France | [anne-laure-thomas-b056581](https://www.linkedin.com/in/anne-laure-thomas-b056581) | Anne-Laure Thomas - L'Oréal / LinkedIn | haute | différent | introuvable | anne-laure.thomas@loreal.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** introuvable – les sources disponibles ne confirment pas que Anne-Laure Thomas occupe toujours ce poste en septembre 2026 chez L’Oréal France; les documents montrent plutôt son rôle de Directrice Diversité, Équité et Inclusion France et ses activités associatives, sans mise à jour confirmant un changement récent. Autrefois en poste, aucun remplaçant clairement identifié dans les résultats fournis.[1][2][3]

Sources Perplexity : [1](https://lehub.laposte.fr/anne-laure-thomas-loreal) · [2](https://www.loreal.com/fr/nos-engagements/pour-toutes-et-tous/promoting-diversity-and-inclusion/key-figures/) · [3](https://www.womens-forum.com/e/women-s-forum-global-meeting-2025/speaker/9a360993-5114-4a62-a9f7-0c0de02b4d26/anne-laure-thomas-briand) · [4](https://fr.linkedin.com/posts/anne-laure-thomas-b056581_lor%C3%A9al-r%C3%A9pond-cette-ann%C3%A9e-encore-%C3%A0-lappel-activity-7285551391874428928-XWc8) · [5](https://reseau-dcf.fr/congres-dcf-loreal-engagements-rse/) · [6](https://www.monentrepriseinclusive.com/linclusion-par-anne-laure-thomas/)

### ENT-24 — LVMH (Moët Hennessy Louis Vuitton)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Alexandre Boquel | Directeur des Métiers d'Excellence LVMH | [alexandre-boquel-33277910a](https://www.linkedin.com/in/alexandre-boquel-33277910a) | Alexandre BOQUEL - Directeur des métiers d'Excellence chez LVMH | haute | différent | introuvable | a.boquel@lvmh.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |
| Antoine Arnault | Directeur Image & Environnement | [antoine-arnault-lvmh](https://www.linkedin.com/in/antoine-arnault-lvmh) | Antoine Arnault - Image and Environment Director, LVMH | haute | absent dans la base | introuvable | antoine.arnault@lvmh.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Alexandre Boquel: introuvable - Antoine Arnault: introuvable

Sources Perplexity : [1](https://www.lvmh.com/fr/publications/nominations-au-comite-executif-du-groupe-lvmh) · [2](https://www.lvmh.com/fr/notre-groupe/notre-gouvernance/antoine-arnault) · [3](https://www.lvmh.com/en/our-group/governance/antoine-arnault) · [4](https://fr.wikipedia.org/wiki/LVMH_-_Mo%C3%ABt_Hennessy_Louis_Vuitton) · [5](https://fr.wikipedia.org/wiki/Antoine_Arnault) · [6](https://www.lvmh.com/fr/notre-groupe/notre-gouvernance/bernard-arnault)

### ENT-25 — Bouygues Construction / SA Bouygues

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Patrizia Gatti-Gregori | Directrice Environnement, Décarbonation et RSE | [patrizia-gatti-a659276a](https://www.linkedin.com/in/patrizia-gatti-a659276a) | Patrizia GATTI - Chief Environment, Decarbonation & CSR Officer. SBTi ... | haute | différent | introuvable | p.gatti-gregori@bouygues-construction.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |
| Marie-Luce Godinot | DGA Innovation & DD Groupe | [marie-luce-godinot](https://www.linkedin.com/in/marie-luce-godinot) | Marie-Luce GODINOT - Senior VP - Innovation, Sustainability, IT | moyenne | absent dans la base | confirmé | rse@bouygues-construction.com | générique : vérifier sur le site | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |

**Perplexity (2026) :** - Patrizia Gatti-Gregori: introuvable dans les résultats fournis pour septembre 2026; aucune source confirmant son poste actuel. Introuvable - Marie-Luce Godinot: confirmée comme Directrice générale adjointe du groupe Bouygues, en charge de l’innovation, du développement durable et des systèmes d’information (DG adjointe au sein du Groupe Bouygues, comité de direction générale) avec sources. Confirmé[1][2]

Sources Perplexity : [1](https://www.bouygues.com/gouvernance/marie-luce-godinot/) · [2](https://www.corporate.bouyguestelecom.fr/marie-luce-godinot/) · [3](https://www.bouygues-construction.com/presse/communique/marie-luce-godinot-nouvelle-directrice-innovation-developpement-durable-de-bouygues-construction) · [4](https://www.bouygues.com/wp-content/uploads/2022/09/cp_nomination_mlg_en.pdf) · [5](https://www.bouygues.com/app/uploads/2022/09/cp_nomination_mlg_en.pdf) · [6](https://fr.wikipedia.org/wiki/Bouygues_Construction)

### ENT-26 — Saint-Gobain France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Claire Pedini | Directrice Générale Adjointe, Directrice des RH & RSE Groupe | [claire-pedini-652b0610b](https://www.linkedin.com/in/claire-pedini-652b0610b) | Claire PEDINI - Directrice Générale Adjointe, Ressources Humaines et ... | haute | différent | non mentionné | claire.pedini@saint-gobain.com | format DOUTEUX : différent des exemples publics | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** introuvable

Sources Perplexity : [1](https://www.saint-gobain.com/fr/tribunes-linkedin-de-saint-gobain) · [2](https://www.saint-gobain.com/fr/le-groupe/gouvernance/comite-executif) · [3](https://www.edf.fr/groupe-edf/espaces-dedies/journalistes/tous-les-communiques-de-presse/conseil-dadministration-dedf-proposition-de-nomination-de-claire-pedini-directrice-generale-adjointe-chargee-des-ressources-humaines-de-saint-gobain-en-qualite-dadministratrice) · [4](https://www.lsa-conso.fr/annuaire-professionnels-grande-consommation/pedini-claire/384118) · [5](https://www.aefinfo.fr/depeche/272325-saint-gobain-claire-pedini-nommee-directeur-general-adjoint-en-charge-des-ressources-humaines) · [6](https://contactout.com/Claire-Pedini-438337126)

### ENT-27 — Sia Partners

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Anatole de la Brosse | Directeur Général Adjoint, Pilote du Programme « Consulting for Good » | [anatole-de-la-brosse-2110666](https://www.linkedin.com/in/anatole-de-la-brosse-2110666) | Anatole de LA BROSSE - Winemaker @ Domaine des Closiers / LinkedIn | haute | différent | non mentionné | anatole.delabrosse@sia-partners.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** introuvable[1][2] confirmé[3] poste différent[4][5]

Sources Perplexity : [1](https://fr.wikipedia.org/wiki/Sia_(cabinet_de_conseil)) · [2](https://en.wikipedia.org/wiki/Sia_(consulting_firm)) · [3](https://www.sia-partners.com/fr/a-propos/notre-organisation/equipe-dirigeante) · [4](https://www.sia-partners.com/fr/a-propos/notre-organisation/equipe-dirigeante?page=13) · [5](https://www.sia-partners.com/en/about-us/our-organization/governance?page=1) · [6](https://www.sia-partners.com/fr/a-propos/notre-organisation/equipe-dirigeante?page=8)

### ENT-28 — BearingPoint France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Axelle Paquer | Présidente France & Resp. RSE Firmwide | [axellepaquer](https://www.linkedin.com/in/axellepaquer) | Axelle Paquer - BearingPoint - LinkedIn | haute | différent | confirmé | axelle.paquer@bearingpoint.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Sébastien Guéchot | Head of Sustainability Consulting | [s%c3%a9bastien-gu%c3%a9chot](https://www.linkedin.com/in/s%25C3%25A9bastien-gu%25C3%25A9chot) | Sébastien Guéchot - Partner Sustainability at I Care by ... - LinkedIn | haute | absent dans la base | confirmé | sebastien.guechot@bearingpoint.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** - Axelle Paquer: confirmé — Présidente France, Belgique, Luxembourg et Afrique de BearingPoint (et Responsable RSE Firmwide); source: BearingPoint France presse (2024) et profil Axelle Paquer ( BearingPoint).[1][2] - Sébastien Guéchot: confirmé — Head of Sustainability Consulting for France (Sustainability Transformation Executive / Partner); source: LinkedIn (BearingPoint) et article RSE BearPoint (2024).[3][4]

Sources Perplexity : [1](https://www.bearingpoint.com/fr-fr/qui-sommes-nous/actualites/presse/communiques-de-presse/bearingpoint-continue-renforcer-son-partnership-avec-nomination-6-associes-france/) · [2](https://www.bearingpoint.com/en-us/about-us/meet-our-people/axelle-paquer/) · [3](https://www.linkedin.com/in/s%C3%A9bastien-gu%C3%A9chot) · [4](https://fr.linkedin.com/posts/bearingpoint_rapport-rse-france-2023-activity-7187036963839823872-9Vix) · [5](https://www.lesechos.fr/industrie-services/services-conseils/conseil-changement-de-generation-chez-bearingpoint-1274718) · [6](https://www.bearingpoint.com/fr-fr/qui-sommes-nous/actualites/presse/communiques-de-presse/bearingpoint-nomination-4-associes-partnership/)

### ENT-29 — Arthur D. Little France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Vincent Bamberger | Managing Partner France | [vincent-bamberger-5a4723133](https://www.linkedin.com/in/vincent-bamberger-5a4723133) | Vincent Bamberger - Managing Partner chez Arthur D. Little - LinkedIn | haute | différent | confirmé | bamberger.vincent@adlittle.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn** |
| Florent Nanse | Partner Global ESG Committee | [florentnanse](https://www.linkedin.com/in/florentnanse) | Florent NANSE - Partner at Arthur D. Little - LinkedIn | haute | absent dans la base | introuvable | nanse.florent@adlittle.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Vincent Bamberger: confirmé. Managing Partner France; Head Western Europe (France-Belgique-Pays-BBas). Source:[1][2] - Florent Nanse: introuvable. Les sources accessibles mentionnent Florent Nanse comme partner/esg, mais pas nécessairement le poste exact actuel chez ADL France en 2026; position Global ESG Committee non corroborée comme titulaire précis. Source:[3]

Sources Perplexity : [1](https://www.adlittle.com/fr-fr/country/france) · [2](https://www.adlittle.com/en/about-us/locations/paris) · [3](https://www.lalettreduconseil.com/mercato/un-francais-a-la-tete-du-comite-esg-darthur-d-little/) · [4](https://www.adlittle.com/fr/service-team-members/55) · [5](https://www.adlittle.com/fr-fr/our-team) · [6](https://www.consultor.fr/associes/vincent-bamberger)

### ENT-30 — Oliver Wyman France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Bruno Despujol | Market Leader France & Belgium, Head of Sustainability | [bruno-despujol-8224197](https://www.linkedin.com/in/bruno-despujol-8224197) | Bruno Despujol - Partner at Oliver Wyman Head of Consumer Tech ... | haute | différent | confirmé | bruno.despujol@oliverwyman.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn** |
| Marc Boilard | Partner Social Impact | [marc-boilard](https://www.linkedin.com/in/marc-boilard) | Marc Boilard - Paris, Île-de-France, France / Profil professionnel | moyenne | absent dans la base | introuvable | marc.boilard@oliverwyman.com | format cohérent avec le domaine (non vérifié SMTP) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |

**Perplexity (2026) :** - Bruno Despujol: confirmé — Market Leader France & Belgium, Head of Sustainability (anciennement; actuellement en tant que Responsable des bureaux de Paris et Bruxelles). Source: articles 2023 nomination et profil Olivier Wyman France.[1][2][3] - Marc Boilard: introuvable — aucun élément indiquant son poste actuel en septembre 2026 dans les sources accessibles. Source: absence d’information confirmable dans les résultats fournis.[1]

Sources Perplexity : [1](https://www.oliverwyman.com/media-center/2023/jan/oliver-wyman-appoints-new-chairs-in-two-key-european-markets.html) · [2](https://www.oliverwyman.com/our-culture/our-people/bruno-despujol.html) · [3](https://www.consultor.fr/articles/l-ambition-xxl-du-nouveau-boss-d-oliver-wyman) · [4](https://www.consultor.fr/articles/climat-permacrise-ia-matins-de-hec-comment-oliver-wyman-veut-faire-la-difference-en-france) · [5](https://fr.linkedin.com/posts/oliver-wyman_bruno-despujol-market-leader-france-and-activity-7030822935888064513-nJVD) · [6](https://mediadreams.fr/nominations-chez-oliver-wyman/)

### ENT-31 — Kearney France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Delphine Bourrilly | Présidente & Managing Partner France | [delphine-bourrilly-b4699b](https://www.linkedin.com/in/delphine-bourrilly-b4699b) | Delphine Bourrilly - France / Profil professionnel - LinkedIn | moyenne | différent | confirmé | delphine.bourrilly@kearney.com | format cohérent avec le domaine (non vérifié SMTP) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |
| Nicolas Lioliakis | Chairman Paris & Référent Social Impact | [nicolaslioliakis](https://www.linkedin.com/in/nicolaslioliakis) | Nicolas Lioliakis - Kearney / LinkedIn | haute | absent dans la base | poste différent | nicolas.lioliakis@kearney.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn · POSTE À METTRE À JOUR (Perplexity)** |

**Perplexity (2026) :** - Delphine Bourrilly — confirmé: Présidente et Managing Partner France (Kearney France). Source:[1][2] - Nicolas Lioliakis — introuvable: selon l’article de 2025, Jérôme Souied prend la tête de Kearney France; Lioliakis serait remplacé. Source:[2]

Sources Perplexity : [1](https://www.consultancy.eu/news/6300/delphine-bourrilly-leads-strategy-consultancy-kearney-in-france) · [2](https://www.consultor.fr/articles/un-nouveau-president-et-managing-partner-pour-kearney-france) · [3](https://www.consultor.fr/articles/info-consultor-delphine-bourrilly-presidente-et-gerante-de-kearney-france) · [4](https://www.consultor.fr/associes/delphine-bourrilly) · [5](https://www.consultor.fr/associes/nicolas-lioliakis) · [6](https://www.lesdirigeantes.com/index.php/fr/delphine-bourrilly-nommee-presidente-et-associee-gerante-de-kearney-france)

### ENT-32 — Simon-Kucher France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| David Vidal | Managing Partner France | [david-vidal-0ab7427](https://www.linkedin.com/in/david-vidal-0ab7427) | David Vidal - Managing Partner Western & Southern Europe, Africa | haute | différent | confirmé | david.vidal@simon-kucher.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |
| Kai Bandilla | Senior Partner | [kai-bandilla-35b3b19](https://www.linkedin.com/in/kai-bandilla-35b3b19) | Kai Bandilla - Executive Vice President at Simon-Kucher & Partners | haute | absent dans la base | introuvable | kai.bandilla@simon-kucher.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Camille Fouillade | Head of Communications & ESG | [camille-fouillade-26711267](https://www.linkedin.com/in/camille-fouillade-26711267) | Camille Fouillade - Marketing & Communication Manager - LinkedIn | haute | absent dans la base | introuvable | david.vidal@simon-kucher.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - David Vidal (Managing Partner France): confirmé. Poste actuel: Managing Partner Western & Southern Europe, Africa; Managing Director France. Source:[1][2] - Kai Bandilla (Senior Partner): introuvable. Source: résultats rétournés, mais aucune annonce récente confirmant son poste actuel; anciennement Executive VP et Kai Bandilla mentionné; pas d update claire en 2026. Source:[3][4] - Camille Fouillade (Head of Communications & ESG): introuvable. Dossier de presse 2025 mentionne Camille Fouillade comme responsable communications; pas d confirmation d’un poste exact en sept. 2026 dans les pages publiques. Source:[1][5]

Sources Perplexity : [1](https://www.linkedin.com/in/david-vidal-0ab7427) · [2](https://www.simon-kucher.com/fr/qui-sommes-nous/dirigeants-experts/david-vidal) · [3](https://www.simon-kucher.com/fr/qui-sommes-nous/presse/david-vidal-nomme-managing-partner-france-du-cabinet-de-conseil-simon-kucher) · [4](https://www.consultor.fr/associes/kai-bandilla) · [5](https://www.simon-kucher.com/fr/qui-sommes-nous/dirigeants-experts) · [6](https://www.simon-kucher.com/fr/qui-sommes-nous/presse/simon-kucher-france-ouvre-deux-nouvelles-antennes-en-france)

### ENT-33 — Capgemini Invent

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Cyril Garcia | Global Head of Sustainability Services & Corporate Responsibility (ex-CEO Invent) | [cyrilgarcia1](https://www.linkedin.com/in/cyrilgarcia1) | Cyril Garcia - Capgemini Group Executive Board Member - LinkedIn | haute | différent | confirmé | cyril.garcia@capgemini.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Cyril Garcia — confirmé. Poste actuel: Global Head of Sustainability Services, Corporate Responsibility and Group Accelerators; Membre du Group Executive Board. Source:[1][2] - Autres personnes demandées? Introuvable / aucune autre personne listée dans les résultats fournis.

Sources Perplexity : [1](https://www.capgemini.com/about-us/management-and-governance/management-team/cyril-garcia/) · [2](https://www.capgemini.com/in-en/about-us/management-and-governance/management-team/cyril-garcia/) · [3](https://www.bruegel.org/people/cyril-garcia) · [4](https://www.design-reuse.com/news/13486-capgemini-reinforces-its-focus-on-global-industries-and-sustainability-services-with-top-leadership-appointments/) · [5](https://www.lesrencontreseconomiques.fr/2022/intervenants/cyril-garcia/) · [6](https://www.businessgreen.com/interview/4415063/cyril-garcia-organisations-struggle-evaluate-link-business-biodiversity-change)

### ENT-34 — Roland Berger France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Laurent Benarousse | Managing Partner France | [laurent-benarousse](https://www.linkedin.com/in/laurent-benarousse) | Laurent Benarousse - Managing Partner France/Morocco - LinkedIn | haute | différent | confirmé | laurent.benarousse@rolandberger.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |
| Anne Corteggiano | Director of External Affairs and Engagement | [anne-corteggiano-1a06ba46](https://www.linkedin.com/in/anne-corteggiano-1a06ba46) | Anne Corteggiano - External Affairs and Engagement Director at ... | haute | absent dans la base | poste différent | anne.corteggiano@rolandberger.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · POSTE À METTRE À JOUR (Perplexity)** |

**Perplexity (2026) :** confirmé, Laurent Benarousse est toujours Managing Partner France; source: Roland Berger France - Nouvelle gouvernance pour Roland Berger Paris (Présidents et équipe de direction, dont Laurent Benarousse), Laurent Benarousse page (Senior Partner, Managing Partner France).[1][2] poste différent, Anne Corteggiano introuvable dans les résultats fournis. source: page de gouvernance Roland Berger Paris mentionnant Laurent Benarousse et autres, sans référence à Anne Corteggiano.[1]

Sources Perplexity : [1](https://www.rolandberger.com/fr/Media/Une-nouvelle-gouvernance-pour-Roland-Berger-Paris.html) · [2](https://www.rolandberger.com/en/Persons/Laurent.Benarousse.html) · [3](https://www.rolandberger.com/fr/Locations/France/Experts/) · [4](https://www.rolandberger.com/fr/About/People/) · [5](https://www.theofficialboard.fr/organigramme/roland-berger-france) · [6](https://www.consultor.fr/associes/laurent-benarousse)

### ENT-35 — Bredin Prat

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Myriam Epelbaum | Associée, Référente Gouvernance & RSE | [myriam-epelbaum-a2088576](https://www.linkedin.com/in/myriam-epelbaum-a2088576) | Myriam Epelbaum - Associée/Partner - Bredin Prat - LinkedIn | haute | différent | confirmé | myriamepelbaum@bredinprat.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Florence Haas | Associée, Comité de Direction & Pro Bono | [florence-haas-368b936b](https://www.linkedin.com/in/florence-haas-368b936b) | Florence Haas - Partner at Bredin Prat - LinkedIn | haute | absent dans la base | confirmé | florencehaas@bredinprat.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** confirmé — Myriam Epelbaum est associée, Référente Gouvernance & RSE, chez Bredin Prat; source: Legal 500 et page du cabinet indiquant qu’elle dirige la pratique Gouvernance[1][2][3] confirmé — Florence Haas est associée, Comité de Direction & Pro Bono, chez Bredin Prat; source: Legal 500 et page du cabinet indiquant son profil[2][4][5]

Sources Perplexity : [1](https://www.legal500.fr/firms/10088-bredin-prat/c-france/lawyers/516199-myriam-epelbaum) · [2](https://www.bredinprat.fr/fr/competences/corporate/gouvernance/) · [3](https://www.bredinprat.fr/fr/avocat/myriam-epelbaum/) · [4](https://www.legal500.fr/firms/10088-bredin-prat/c-france/lawyers/223496-florence-haas) · [5](https://www.legal500.fr/firms/10088-bredin-prat/c-france/lawyers/-florence-haas) · [6](https://www.legal500.com/firms/10088-bredin-prat/c-france/lawyers/516199-myriam-epelbaum)

### ENT-36 — Darrois Villey Maillot Brochier

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Matthieu Brochier | Associé Gérant, Référent Pro Bono & Clinique du droit | [matthieu-brochier-baaa3887](https://www.linkedin.com/in/matthieu-brochier-baaa3887) | Matthieu Brochier / Co-Head of Civil, Commercial & Stock-Market Litigation | haute | différent | confirmé | mbrochier@darroisvilley.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Jean-Michel Darrois | Associé Fondateur | — |  | aucune | introuvable | introuvable | contact@darroisvilley.com | générique : vérifier sur le site | **PERSONNE NON RETROUVÉE : identité ou poste probablement faux** |

**Perplexity (2026) :** - Matthieu Brochier: confirmé, Associé Contentieux civil, commercial et boursier; co-dirige l’équipe contentieux au sein du cabinet.[1] - Jean-Michel Darrois: introuvable (aucune source indiquant son poste actuel en septembre 2026 dans le cabinet; les pages disponibles montrent qu’il est fondateur/partner mais pas son poste exact actuel à cette date).[2][3]

Sources Perplexity : [1](https://www.darrois.com/avocats/matthieu-brochier/) · [2](https://www.darrois.com/avocats/jean-michel-darrois/) · [3](https://www.darrois.com/en/partners/jean-michel-darrois/) · [4](https://www.darrois.com/) · [5](https://www.darrois.com/cabinet/) · [6](https://www.legal500.fr/rankings/ranking/c-paris/resolution-des-litiges/contentieux-commercial-et-de-droit-des-societes/10140-darrois-villey-maillot-brochier)

### ENT-37 — White & Case Paris

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Michael Polkinghorne | Partner, Head of Paris Pro Bono Practice | [michaelpolkinghorne](https://www.linkedin.com/in/michaelpolkinghorne) | Michael Polkinghorne - White & Case - LinkedIn | haute | différent | confirmé | mpolkinghorne@whitecase.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Michael Polkinghorne — poste exact actuel (à confirmer pour septembre 2026) : Partner, Head of Paris Pro Bono Practice (co-head de la pratique pro bono de l’office de Paris) — confirmé.[1] Poste exact actuel (confirmé sur les listes) : head of White & Case’s Paris arbitration group et co-head de la pro bono practice à Paris.[1] (Sa page “people” White & Case le présente toujours avec ces rôles.)[1] - Autre personne : introuvable (la liste de “les personnes suivantes” ne contient qu’un seul nom dans ta demande).

Sources Perplexity : [1](https://www.whitecase.com/people/michael-polkinghorne) · [2](https://find-and-update.company-information.service.gov.uk/company/OC324340/officers?page=15) · [3](https://www.benchmarklitigation.com/practitioners/michael-polkinghorne) · [4](https://www.legal500.com/firms/51054-white-case-llp/c-france/contact) · [5](https://www.legal500.com/rankings/ranking/c-france/dispute-resolution-international-arbitration/51054-white-case-llp) · [6](https://www.whitecase.com/locations/emea/paris)

### ENT-38 — Eurazeo

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Sophie Flak | Membre du Directoire, Managing Partner RSE, Sustainability & Impact | [sophie-flak-631a212](https://www.linkedin.com/in/sophie-flak-631a212) | Sophie Flak - Paris et périphérie / Profil professionnel - LinkedIn | moyenne | différent | confirmé | sflak@eurazeo.com | format non déterminable (aucun exemple public) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |

**Perplexity (2026) :** confirmé, Sophie Flak est toujours Membre du Directoire et Managing Partner Sustainability & Impact chez Eurazeo. Source: Eurazeo pages indiquant son titre et rôle actuels.[1][2]

Sources Perplexity : [1](https://www.eurazeo.com/en/group/teams/profile/sophie-flak) · [2](https://www.eurazeo.com/fr/groupe/equipes) · [3](https://evenements.bpifrance.fr/e/catch-up-du-hub-secrets-d-une-strategie-climat/speaker/d388c861-8b85-ef11-8473-6045bd89bd6e/sophie-flak-eurazeo) · [4](https://www.eurazeo.com/fr/responsabilite/gouvernance-ESG) · [5](https://www.eurazeo.com/en/group/teams) · [6](https://bourse.lefigaro.fr/actu-conseils/eurazeo-sophie-flak-entre-au-comite-executif-20200921)

### ENT-39 — Tikehau Capital

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Mario Mitri | Chief Sustainability Officer | [mario-mitri](https://www.linkedin.com/in/mario-mitri) | Mario Mitri - Chief Sustainability Officer @ Tikehau Capital - LinkedIn | haute | identique | confirmé | mmitri@tikehaucapital.com | format cohérent avec le domaine (non vérifié SMTP) | **LinkedIn OK** |
| Pierre Abadie | Group Climate Director | [pierreabadie](https://www.linkedin.com/in/pierreabadie) | Pierre Abadie - MD / ExCo Tikehau's Private Equity / Energy Transition | haute | absent dans la base | confirmé | pabadie@tikehaucapital.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** confirmé, avec le poste actuel: Mario Mitri est Chief Sustainability Officer chez Tikehau Capital; source: LinkedIn post (Mario Mitri).[1] confirmé, avec le poste actuel: Pierre Abadie est Group Climate Director chez Tikehau Capital; sources: profil et fiches (Pierre Abadie).[2][3]

Sources Perplexity : [1](https://www.linkedin.com/posts/mario-mitri_esg-sustainability-biodiversity-activity-7345763965186039808-5KG5) · [2](https://informaconnect.com/superreturn-tech-sovereignty/speakers/pierre-abadie/) · [3](https://docs.cfnews.net/ESG/2024/ESG-TEAM/Tikehau-FICHE-3-ESG-24-25-FR-V2.pdf) · [4](https://www.ipem-market.com/paris-2021/speakers/) · [5](https://finascope.fr/communique/tikehau-capital-cree-un-centre-daction-climat/) · [6](https://www.businesswire.com/news/home/20211003005081/fr)

### ENT-40 — Ardian

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Candice Brenet | Managing Director, Head of Sustainability | [candice-brenet](https://www.linkedin.com/in/candice-brenet) | Candice BRENET - Senior Advisor to Private Equity / Board Member | haute | différent | confirmé | candice.brenet@ardian.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Mathias Burghardt | Président de la Fondation Ardian | [mathias-burghardt](https://www.linkedin.com/in/mathias-burghardt) | Mathias Burghardt - Executive President of Ardian - LinkedIn | haute | absent dans la base | confirmé | fondation@ardian.com | générique : vérifier sur le site | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Candice Brenet: confirmé — Managing Director, Head of Sustainability chez Ardian France. Source: Ardian annonce une évolution de sa gouvernance et Ardian annonce les nominations; Candice Brenet est mentionnée comme Holding et sustainability leadership dans les communiqués (sources, ). Introuvable dans les documents fournis si aucun poste exact n’est donné ailleurs; toutefois les communiqués indiquent une réorganisation incluant Ardian France Executive leadership où Brenet figure comme dirigeante associée au sustainability.[1][2] - Mathias Burghardt: confirmé — Directeur Général Délégué et CEO d’Ardian France S.A. (et Président du Directoire de Ardian France après réorganisation, selon les communiqués de juillet 2026). Sources:,,,.[1][3][4][5]

Sources Perplexity : [1](https://www.ardian.com/fr/actualites-perspectives/communiques-de-presse/ardian-annonce-une-evolution-de-sa-gouvernance-pour) · [2](https://www.ardian.com/fr/la-societe/gouvernance) · [3](https://www.wealthbriefing.com/html/article.php/ardian-makes-raft-of-executive-appointments) · [4](https://www.ardian.com/governance/mathias-burghardt) · [5](https://www.agefi.fr/private-equity/actualites/ardian-poursuit-la-reorganisation-de-sa-gouvernance) · [6](https://www.ardian.com/fr/gouvernance/mathias-burghardt)

### ENT-41 — Amundi

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Elodie Laugel | Chief Responsible Investment Officer (Comex) | — |  | aucune | introuvable | confirmé | elodie.laugel@amundi.com | format non déterminable (aucun exemple public) | **LinkedIn introuvable (Google) mais poste confirmé par Perplexity : chercher à la main** |
| Caroline Le Meaux | Global Head of ESG Research & Engagement | [carolinelemeauxlambert](https://www.linkedin.com/in/carolinelemeauxlambert) | Caroline Le Meaux - Amundi - LinkedIn | haute | absent dans la base | confirmé | caroline.lemeaux@amundi.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Elodie Laugel — confirmé; Directrice de l’Investissement Responsable et Membre du Comité Exécutif chez Amundi. - Caroline Le Meaux — confirmé; Global Head of ESG Research, Engagement and Voting chez Amundi. Source: Amundi newsroom pages et fiches presse.[1][2][3]

Sources Perplexity : [1](https://fr.media.amundi.com/experts/elodie-laugel.html) · [2](https://fr.media.amundi.com/news/elodie-laugel?page=9) · [3](https://uk.media.amundi.com/experts/caroline-le-meaux.html) · [4](https://int.media.amundi.com/experts/?page=2) · [5](https://fr.media.amundi.com/news/caroline-le-meaux?page) · [6](https://int.media.amundi.com/news/caroline-le-meaux?page=2)

### ENT-42 — ODDO BHF

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Valentin Pernet | Global Head of Sustainable Investment Solutions & Fonds « Agir pour demain » | [valentin-pernet-6396744b](https://www.linkedin.com/in/valentin-pernet-6396744b) | Valentin Pernet - ODDO BHF - LinkedIn | haute | différent | non mentionné | valentin.pernet@oddo-bhf.com | format cohérent avec le domaine (non vérifié SMTP) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** poste: Global Head of Sustainable Investment Solutions, ODDO BHF AM; statut: confirmé; source:[1][2]

Sources Perplexity : [1](https://am.oddo-bhf.com/fr-en/distributor-ifa/people/valentin-pernet/) · [2](https://am.oddo-bhf.com/fi-en/non-professional-investor/people/valentin-pernet/) · [3](https://www.boersen-zeitung.de/esg-pro/qualitaet-geht-vor-quantitaet) · [4](https://am.oddo-bhf.com/fr-fr/investisseur-professionnel/a-propos-gouvernance/) · [5](https://am.oddo-bhf.com/lu-fr/distributeur-cgp/a-propos-gouvernance/) · [6](https://am.oddo-bhf.com/fr-en/professional-investor/about-us-governance/)

### ENT-43 — BlackRock France SAS

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Estelle Castres | Country Head France, Belux, Monaco | [estelle-castres-49ab9419](https://www.linkedin.com/in/estelle-castres-49ab9419) | Estelle Castres - Directrice Générale BlackRock France, Belgique ... | haute | différent | confirmé | estelle.castres@blackrock.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |
| Henri Chabadel | Chief Investment Officer France | [henri-chabadel-374419110](https://www.linkedin.com/in/henri-chabadel-374419110) | Henri CHABADEL - FraBeLux Chief Investment Officer chez BlackRock | haute | absent dans la base | poste différent | henri.chabadel@blackrock.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · POSTE À METTRE À JOUR (Perplexity)** |

**Perplexity (2026) :** - Estelle Castres: confirm é, Directrice générale France, Belgique et Luxembourg (FraBeLux) chez BlackRock France SAS. Source: BlackRock France page et articles récapitulatifs.[1][2][3] - Henri Chabadel: poste différent; ancien CIO France (France, Belgium, Luxembourg) selon les sources; occupant actuellement un autre rôle ou inconnu dans les résultats fournis. Source: articles récapitulatifs mentionnant son CIO passé et absence d’indication d’un poste actuel précis.[4]

Sources Perplexity : [1](https://www.blackrock.com/fr/particuliers/nous-connaitre/blackrock-en-france) · [2](https://www.lepoint.fr/economie/etat-major-blackrock-24-12-2023-2548124_28.php) · [3](https://www.blackrock.com/fr/intermediaries/nous-connaitre/blackrock-en-france) · [4](https://bourse.lefigaro.fr/fonds-trackers/actu-conseils/blackrock-nomme-henri-chabadel-au-poste-de-cio-pour-la-france-la-belgique-et-le-luxembourg-6498283) · [5](https://www.challenges.fr/femmes/estelle-castres-va-diriger-le-bureau-parisien-de-blackrock_806090) · [6](https://www.maddyness.com/2024/06/18/estelle-castres-blackrock-la-france-est-un-pays-attractif-en-termes-dinvestissements-et-de-talents/)

### ENT-44 — Allianz France

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Marie-Doha Besancenot | Directrice Marque, Communication & RSE France | [mdohabesancenot](https://www.linkedin.com/in/mdohabesancenot) | Marie-Doha Besancenot - Senior advisor for Strategic ... - LinkedIn | haute | différent | poste différent | rse@allianz.fr | générique : vérifier sur le site | **Remplacer l'URL LinkedIn · POSTE À METTRE À JOUR (Perplexity)** |
| Direction RSE |  | — |  | aucune | entité | non mentionné | communication@allianz.fr | générique : vérifier sur le site | **Entité générique : identifier une personne** |

**Perplexity (2026) :** introuvable — sources indiquent des changements en 2024 et 2026 mais sans confirmation clair du poste actuel pour Marie-Doha Besancenot; aucune source fiable ne confirme son maintien ou son remplacement exact en septembre 2026.[1][2]

Sources Perplexity : [1](https://www.newsassurancespro.com/allianz-france-marie-doha-besancenot-sur-le-depart/01691550290) · [2](https://presse.tripalio.fr/allianz-france-accueille-sa-nouvelle-directrice-marque-et-communication/) · [3](https://www.challenges.fr/entreprise/green-economie/marie-doha-besancenot-allianz-l-assureur-a-un-role-a-jouer-pour-dessiner-l-economie-de-demain_806461) · [4](https://fr.linkedin.com/posts/news-assurances-pro_allianz-france-marie-doha-besancenot-sur-activity-7067042699324870656-q5sb) · [5](https://adopte.co/paroles-d-experts/marie-doha-besancenot-rse-allianz/) · [6](https://www.lassuranceenmouvement.com/2021/09/08/marie-doha-besancenot-en-podcast/)

### ENT-45 — Groupama

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| François Coste | Directeur Groupe Durabilité | [francoisbcoste](https://www.linkedin.com/in/francoisbcoste) | Francois Coste - Directeur Groupe pour la Durabilité/Sustainability ... | moyenne | différent | non mentionné | francois.coste@groupama.com | format non déterminable (aucun exemple public) | **URL LinkedIn candidate à confirmer (entreprise non visible dans le titre)** |
| Direction Durabilité | Sustainability Groupama | — |  | aucune | entité | non mentionné | rse@groupama.com | générique : vérifier sur le site | **Entité générique : identifier une personne** |

**Perplexity (2026) :** introuvable[1][2]

Sources Perplexity : [1](https://www.linkedin.com/in/francoisbcoste) · [2](https://fr.linkedin.com/posts/francoisbcoste_les-engagements-de-groupama-pour-la-durabilit%C3%A9-activity-7179752338348199937-_KcR) · [3](https://www.groupama.fr/regions/mediterranee/bilan-rse-2025/) · [4](https://www.groupama.com/app/uploads/2024/07/DPEF_Groupe-Groupama_2023-1.pdf) · [5](https://fr.wikipedia.org/wiki/Groupama) · [6](https://www.groupama.com/fr/notre-gouvernance/)

### ENT-46 — Danone

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Nathalie Alquier | Chief Sustainability Officer | [nathalie-alquier-9063499a](https://www.linkedin.com/in/nathalie-alquier-9063499a) | Nathalie Alquier - Danone / LinkedIn | haute | différent | confirmé | nathalie.alquier@danone.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |
| Thomas Kyriaco | Directeur RSE & Impact Journey | [thomas-kyriaco-4211a05](https://www.linkedin.com/in/thomas-kyriaco-4211a05) | Thomas KYRIACO - Directeur RSE Clients - One Planet One Health | haute | absent dans la base | introuvable | thomas.kyriaco@danone.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn** |

**Perplexity (2026) :** - Nathalie Alquier: confirmé — Chief Sustainability Officer chez Danone (France)[1] - Thomas Kyriaco: introuvable — pas d’information vérifiée sur son poste actuel chez Danone France dans les résultats disponibles[2][3]

Sources Perplexity : [1](https://www.linkedin.com/in/nathalie-alquier-9063499a) · [2](https://www.danone.com/fr/engagements/notre-approche/danone-impact-journey.html) · [3](https://fr.le360.ma/economie/nomination-dun-nouveau-pdg-a-la-tete-de-centrale-danone-199949/) · [4](https://danone.ca/fr/about-us/our-leaders/) · [5](https://www.danone.com/content/dam/corp/global/danonecom/investors/fr-all-publications/2026/shareholders-meeting/Danonecommitteereport.pdf.coredownload.pdf) · [6](https://www.danone.com/fr/groupe/qui-sommes-nous/gouvernance.html)

### ENT-47 — Schneider Electric

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Gilles Vermot Desroches | Chief Sustainability Officer & Délégué Général Fondation Schneider Electric | [gilles-vermot-desroches](https://www.linkedin.com/in/gilles-vermot-desroches) | Gilles Vermot Desroches - Corporate Activist - Schneider Electric // CESE | haute | différent | confirmé | gilles.vermot-desroches@se.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** confirmé: Gilles Vermot Desroches — Senior Vice-Président Citoyenneté & Affaires Institutionnelles, Schneider Electric; introuvable: poste actuel exact inconnu dans les résultats fournis; source:[1][2]

Sources Perplexity : [1](https://www.se.com/fr/fr/about-us/newsroom/experts/details/gilles-vermot-desroches-5642058c9b3e9d62158b4571/) · [2](https://www.linkedin.com/in/gilles-vermot-desroches) · [3](https://www.hec.edu/en/dare/authors/vermot-desroches-gilles) · [4](https://www.hec.edu/en/knowledge/authors/vermot-desroches-gilles) · [5](https://www.carenews.com/evpa-the-investing-for-impact-community/news/gilles-vermot-desroches-schneider-electric-choisir-d) · [6](https://www.carenews.com/fr/news/acteurs-de-l-engagement-gilles-vermot-desroches-directeur-du-developpement-durable-de)

### ENT-48 — Capgemini (Groupe)

| Contact | Poste (base) | LinkedIn trouvé | Titre LinkedIn (Google) | Confiance | Slug | Perplexity | Email | Verdict email | Action |
|---|---|---|---|---|---|---|---|---|---|
| Cyril Garcia | Global Head of Sustainability Services & Corporate Responsibility (Comex) | [cyrilgarcia1](https://www.linkedin.com/in/cyrilgarcia1) | Cyril Garcia - Capgemini Group Executive Board Member - LinkedIn | haute | différent | confirmé | cyril.garcia@capgemini.com | format non déterminable (aucun exemple public) | **Remplacer l'URL LinkedIn · poste LinkedIn différent de la base** |

**Perplexity (2026) :** - Cyril Garcia — confirmé. Poste actuel: Global Head of Sustainability Services, Corporate Responsibility and Group Accelerators; Membre du Group Executive Board. Source: Capgemini management page.[1]

Sources Perplexity : [1](https://www.capgemini.com/about-us/management-and-governance/management-team/cyril-garcia/) · [2](https://www.capgemini.com/fr-fr/notre-groupe/gestion-gouvernance/equipe-de-direction/cyril-garcia/) · [3](https://lesrencontreseconomiques.fr/2023/intervenants/cyril-garcia/) · [4](https://www.businessgreen.com/interview/4415063/cyril-garcia-organisations-struggle-evaluate-link-business-biodiversity-change) · [5](https://www.worldclimatesummit.org/speakers2023/cyril-garcia) · [6](https://capgemini.swoogo.com/business-to-planet-connect/speaker/1107964/cyril-garcia)
