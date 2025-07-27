import smtplib
from email.mime.text import MIMEText
import os

def send_price_alert(to_email, product_url, old_price, new_price):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    msg = MIMEText(f"Price dropped for {product_url}! Old: ${old_price}, New: ${new_price}")
    msg["Subject"] = "Price Drop Alert!"
    msg["From"] = smtp_user
    msg["To"] = to_email
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, [to_email], msg.as_string())
