import logging
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import Config

logger = logging.getLogger(__name__)

class NotificationAgent:
    def __init__(self):
        self.telegram_token = Config.TELEGRAM_BOT_TOKEN
        self.telegram_chat_id = Config.TELEGRAM_CHAT_ID
        self.smtp_server = Config.SMTP_SERVER
        self.smtp_port = Config.SMTP_PORT
        self.smtp_username = Config.SMTP_USERNAME
        self.smtp_password = Config.SMTP_PASSWORD
        self.recipient_email = Config.RECIPIENT_EMAIL

    def send_telegram(self, message: str) -> bool:
        if not self.telegram_token or not self.telegram_chat_id:
            logger.warning("Telegram configuration missing. Skipping Telegram notification.")
            return False
            
        url = f"https://api.telegram.org/bot{self.telegram_token}/sendMessage"
        payload = {
            "chat_id": self.telegram_chat_id,
            "text": message,
            "parse_mode": "HTML"
        }
        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            logger.info("Successfully sent Telegram notification.")
            return True
        except Exception as e:
            logger.error(f"Failed to send Telegram notification: {e}")
            return False

    def send_email(self, subject: str, body: str) -> bool:
        if not all([self.smtp_server, self.smtp_port, self.smtp_username, self.smtp_password, self.recipient_email]):
            logger.warning("Email configuration missing. Skipping Email notification.")
            return False
            
        try:
            msg = MIMEMultipart()
            msg['From'] = self.smtp_username
            msg['To'] = self.recipient_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'plain'))
            
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.smtp_username, self.smtp_password)
            text = msg.as_string()
            server.sendmail(self.smtp_username, self.recipient_email, text)
            server.quit()
            logger.info("Successfully sent Email notification.")
            return True
        except Exception as e:
            logger.error(f"Failed to send Email notification: {e}")
            return False

    def notify(self, final_draft: str, article_url: str, verification_result: dict) -> bool:
        """Sends the compiled notification."""
        
        confidence = verification_result.get('confidence', 'unknown')
        flags = verification_result.get('flags', [])
        
        message = (
            f"<b>New LinkedIn Post Ready for Review</b>\n\n"
            f"<b>Source Article:</b> {article_url}\n"
            f"<b>AI Confidence:</b> {confidence.upper()}\n"
        )
        if flags:
            message += f"<b>Flags:</b> {', '.join(flags)}\n"
            
        message += f"\n<b>Draft:</b>\n{final_draft}\n"
        
        # Try telegram first
        if self.send_telegram(message):
            return True
            
        # Fallback to email
        email_body = f"New LinkedIn Post Ready for Review\n\nSource Article: {article_url}\nAI Confidence: {confidence.upper()}\n"
        if flags:
            email_body += f"Flags: {', '.join(flags)}\n"
        email_body += f"\nDraft:\n{final_draft}\n"
        
        return self.send_email("AI LinkedIn Agent: Post Ready for Review", email_body)
