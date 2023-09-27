export async function sendMessageToTelegramBot(botToken: string, chatId: number, text: string) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    console.log(response.status);
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
  }
}
