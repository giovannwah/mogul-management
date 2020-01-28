import smtplib
import sys

from flask import Flask, request
from flask_restful import Resource, Api
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

class MarathonManagement(Resource):
    pass

def send_email(msg, subject, recipients):
    server = 'smtp.sendgrid.net'
    ports = [25, 587, 465]
    username = 'apikey'

    try:
        s = smtplib.SMTP(host=server, port=ports[1])
        s.starttls()
        s.login(user=username, password=api_mm_key)

        for recipient in recipients:
            message = MIMEMultipart()

            message['From'] = username
            message['To'] = recipient
            message['Subject'] = subject

            message.attach(MIMEText(msg, 'plain'))
            print(message)
            print('sending message...')
            s.send_message(message)

            del message
    except Exception as e:
        print('An exception occurred while trying to send email message \"{0}\" to recipients \"{1}\"'
              .format(msg, recipients))
        print(e)


if __name__ == '__main__':
    sys.exit(0)
