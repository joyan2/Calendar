import os
import pymysql
from flask import jsonify

db_user = os.environ.get('CLOUD_SQL_USERNAME')
db_password = os.environ.get('CLOUD_SQL_PASSWORD')
db_name = os.environ.get('CLOUD_SQL_DATABASE_NAME')
db_connection_name = os.environ.get('CLOUD_SQL_CONNECTION_NAME')


def open_connection():
    unix_socket = '/cloudsql/{}'.format(db_connection_name)
    try:
        if os.environ.get('GAE_ENV') == 'standard':
            conn = pymysql.connect(user=db_user, password=db_password,
                                unix_socket=unix_socket, db=db_name,
                                cursorclass=pymysql.cursors.DictCursor
                                )
    except pymysql.MySQLError as e:
        print(e)

    return conn


# METHODS:
# Get all users, reminders, or events

def get_users():
    conn = open_connection()
    with conn.cursor() as cursor:
        result = cursor.execute('SELECT * FROM Users;')
        users = cursor.fetchall()
        if result > 0:
            got_users = jsonify(users)
        else:
            got_users = 'No Users in DB'
    conn.close()
    return got_users

def get_events():
    conn = open_connection()
    with conn.cursor() as cursor:
        result = cursor.execute('SELECT * FROM Events;')
        events = cursor.fetchall()
        if result > 0:
            got_events = jsonify(events)
        else:
            got_events = 'No Events in DB'
    conn.close()
    return got_events

def get_reminders():
    conn = open_connection()
    with conn.cursor() as cursor:
        result = cursor.execute('SELECT * FROM Reminders;')
        reminders = cursor.fetchall()
        if result > 0:
            got_reminders = jsonify(reminders)
        else:
            got_reminders = 'No Reminders in DB'
    conn.close()
    return got_reminders


# METHODS:
# Add a user, reminder, or event

def add_user(user):
    conn = open_connection()
    with conn.cursor() as cursor:
        cursor.execute('INSERT INTO Users (email_address, username, phone_number, timezone, calendar_theme) VALUES(%s, %s, %s, %s, %s)', (user["email_address"], user["username"], user["phone_number"], user["timezone"], user["calendar_theme"]))
    conn.commit()
    conn.close()

def add_event(event):
    conn = open_connection()
    with conn.cursor() as cursor:
        cursor.execute('INSERT INTO Events (admin_email_address, event_name, event_date, event_time, duration, event_description, meeting_url, notes_doc_url, category, priority, attendees_emails) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (event["admin_email_address"], event["event_name"], event["event_date"], event["event_time"], int(event["duration"]), event["event_description"], event["meeting_url"], event["notes_doc_url"], event["category"], event["priority"], event["attendees_emails"]))
    conn.commit()
    conn.close()

def add_reminder(reminder):
    conn = open_connection()
    with conn.cursor() as cursor:
        cursor.execute('INSERT INTO Reminders (email_address, reminder_name, reminder_date, reminder_time, reminder_description, category, priority) VALUES(%s, %s, %s, %s, %s, %s, %s)', (reminder["email_address"], reminder["reminder_name"], reminder["reminder_date"], reminder["reminder_time"], reminder["reminder_description"], reminder["category"], reminder["priority"]))
    conn.commit()
    conn.close()


# METHODS:
# Get user, reminder, or event by the email associated with it

def get_user_by_email(email_address):
    conn = open_connection()
    with conn.cursor() as cursor:
        result = cursor.execute('SELECT * FROM Users WHERE email_address = %s;', (email_address))
        user = cursor.fetchall()
        if result > 0:
            got_user = jsonify(user)
        else:
            got_user = 'No user matches this email'
    conn.close()
    return got_user

def get_reminders_by_email(email_address):
    conn = open_connection()
    with conn.cursor() as cursor:
        result = cursor.execute('SELECT * FROM Reminders WHERE email_address = %s;', (email_address))
        reminders = cursor.fetchall()
        if result > 0:
            got_reminders = jsonify(reminders)
        else:
            got_reminders = 'No Reminders match this email'
    conn.close()
    return got_reminders

def get_events_by_email(email_address):
    conn = open_connection()
    with conn.cursor() as cursor:
        result = cursor.execute('SELECT * FROM Events WHERE admin_email_address = %s;', (email_address))
        events = cursor.fetchall()
        if result > 0:
            got_events = jsonify(events)
        else:
            got_events = 'No Events match this email'
    conn.close()
    return got_events


# METHODS:
# Update a user, reminder, or event by the email/id associated with it

def user_update(user, email_address):
    conn = open_connection()
    with conn.cursor() as cursor:
        cursor.execute('UPDATE Users SET username = %s, phone_number = %s, timezone = %s, calendar_theme = %s WHERE email_address = %s;', (user["username"], user["phone_number"], user["timezone"], user["calendar_theme"], email_address))
    conn.commit()
    conn.close()

def event_update(event, event_id):
    conn = open_connection()
    with conn.cursor() as cursor:
        cursor.execute('UPDATE Events SET admin_email_address = %s, event_name = %s, event_date = %s, event_time = %s, duration = %s, event_description = %s, meeting_url = %s, notes_doc_url = %s, category = %s, priority = %s, attendees_emails = %s WHERE event_id = %s;', (event["admin_email_address"], event["event_name"], event["event_date"], event["event_time"], int(event["duration"]), event["event_description"], event["meeting_url"], event["notes_doc_url"], event["category"], event["priority"], event["attendees_emails"], event_id))
    conn.commit()
    conn.close()

def reminder_update(reminder, reminder_id):
    conn = open_connection()
    with conn.cursor() as cursor:
        cursor.execute('UPDATE Reminders SET email_address = %s, reminder_name = %s, reminder_date = %s, reminder_time = %s, reminder_description = %s, category = %s, priority = %s WHERE reminder_id = %s;', (reminder["email_address"], reminder["reminder_name"], reminder["reminder_date"], reminder["reminder_time"], reminder["reminder_description"], reminder["category"], reminder["priority"], reminder_id))
    conn.commit()
    conn.close()