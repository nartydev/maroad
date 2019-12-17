const SystemNotifier = require('system-notifier').default;

const { NOTIFICATION_PREFIX } = require('../../config');

const notifier = new SystemNotifier({
  prefix: NOTIFICATION_PREFIX,

  telegram:
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
      ? {
          botToken: process.env.TELEGRAM_BOT_TOKEN,
          chatId: process.env.TELEGRAM_CHAT_ID
        }
      : null
});

/**
 * Send notification message
 * @param message Message to send
 * @param [notificationType=] Type de notification
 */
const notify = (message, notificationType) => {
  if (process.env.NODE_ENV === 'production') {
    notifier.notify(message, notificationType).catch(error => {
      console.error(error);
    });
  }
};

module.exports = notify;
