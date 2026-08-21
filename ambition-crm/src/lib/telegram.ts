/**
 * Service d'envoi d'alertes instantanées Telegram
 * Utilise les identifiants configurés pour les notifications
 */

const TELEGRAM_BOT_TOKEN = '8475611920:AAFEXvqhoC_LnC-ODSQrVyRwILvE3e9kIow';
const TELEGRAM_CHAT_ID = '7739695120';

export interface TelegramFeedbackPayload {
  id: string;
  auteur: string;
  email?: string;
  page: string;
  type: string;
  message: string;
  imageUrl?: string | null;
  date: string;
}

export async function sendTelegramFeedbackNotification(payload: TelegramFeedbackPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const text = `🔔 *[AMBITION CAMPUS] Nouveau Retour Utilisateur*\n\n` +
      `👤 *Auteur :* ${payload.auteur} ${payload.email ? `(${payload.email})` : ''}\n` +
      `📍 *Page / Section :* ${payload.page}\n` +
      `🏷️ *Type de retour :* ${payload.type}\n` +
      `📅 *Date :* ${payload.date}\n\n` +
      `💬 *Message :*\n${payload.message}\n` +
      `${payload.imageUrl ? `\n🖼️ *Capture / Image jointe :*\n${payload.imageUrl}` : ''}\n\n` +
      `🔗 *Accéder au tableau des retours :*\nhttps://ambition-campus-crm.vercel.app`;

    // Si une image est présente et accessible publiquement, on peut envoyer une photo ou le message formaté
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
        disable_web_page_preview: false,
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.warn('Telegram API warning:', data);
      return { success: false, error: data.description };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error sending Telegram message:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}
