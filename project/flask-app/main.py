from flask import Flask, jsonify, request
from db import get_users, get_events, get_reminders, add_user, add_event, add_reminder, get_user_by_email, get_reminders_by_email, get_events_by_email, user_update, reminder_update, event_update

app = Flask(__name__)

@app.route('/users', methods=['POST', 'GET'])
def users():
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400  

        add_user(request.get_json())
        return 'User Added'

    return get_users()    

@app.route('/events', methods=['POST', 'GET'])
def events():
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400  

        add_event(request.get_json())
        return 'Event Added'

    return get_events()  

@app.route('/reminders', methods=['POST', 'GET'])
def reminders():
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400  

        add_reminder(request.get_json())
        return 'Reminder Added'

    return get_reminders()  

@app.route('/users/<email_address>', methods=['GET'])
def user_by_email(email_address):
    return get_user_by_email(email_address)  

@app.route('/reminders/<email_address>', methods=['GET'])
def reminders_by_email(email_address):
    return get_reminders_by_email(email_address)  

@app.route('/events/<email_address>', methods=['GET'])
def events_by_email(email_address):
    return get_events_by_email(email_address)  


@app.route('/users/update/<email_address>', methods=['PUT'])
def update_user(email_address):
    user_update(request.get_json(), email_address)  
    return 'User Updated Sucessfully'

@app.route('/reminders/update/<reminder_id>', methods=['PUT'])
def update_reminders(reminder_id):
    reminder_update(request.get_json(), reminder_id)  
    return 'Reminder Updated Successfully'

@app.route('/events/update/<event_id>', methods=['PUT'])
def update_events(event_id):
    event_update(request.get_json(), event_id)  
    return 'Event Updated Successfully'



if __name__ == '__main__':
    app.run()