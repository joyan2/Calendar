# Team 37 Calendar Project

### Important Note
Following the submission of our final project, our mentor has cleared us to take down the GCP database, Google App Engine API Server, and the Google Firebase Authentication Service. This will prevent us from incurring any future costs. This will impact any future ability to use our application.

### Project Introduction
Users of the Calendar Web Service will be able to make a personalized calendar, create daily reminders, and share their calendar's events with other users. The website will serve as an easy way to compile tasks and events so the user can stay on top of their work. This includes:
- Creating events for multiple users
- Creating reminders for oneself
- Viewing the events and reminders in a calendar
- Users owning a specific account with personal information that can be updated

### Technical Architecture
![image](https://github.com/CS222-UIUC-SP24/group-project-team-37/assets/79374539/25315096-64bc-41e1-a625-d64814532534)
- The GCP database hosts a database with three tables: Users, Events, and Reminders. This database is updated through interactions with the API server.
- The API service is built using Flask in Python. It can create, update, and query the database for all tables. The frontend will call  this API service to interact with user data. Unfortunately time constraints prevented us from connectingf the two.
- The frontend service is built in React. It provides a non-cluttered interface to create an account, events, and reminders. With more time, it would use the API service to update the database. It also handles authentication through Google Firebase's authentication service.
- The Google Firebase service handles the creation of accounts and future logins to these accounts. This allows for users to securely create accounts. The code connecting this service to React is written within React itself.

### Developer Roles
- Riley Morris: Worked on GCP database, firebase authentication, frontend, and backend
- Jeffrey Yan: Worked on backend architecture and frontend
- Patrick Gadula: Worked on frontend, environment setup, and business logic
- Rami Dano: Worked on frontend and text notifications service

### Environment Installation & Setup
Start by cloning repository locally
The React packages should automatically dowload themselves upon running the React app. If not, run the following command in the root directory:
```console
npm install
```
To start the React app run the commands:
```console
cd project && cd calendar-app
npm start
```
The flask backend is deployed and does not need to be run locally. The GCP database, Google Firebase service, and text notification service do not use code are also deployed and do not need to be run locally.

### Relevant Pages:
- [Database Schema](https://app.diagrams.net/#G1NKPrgNsIqiCxtKMNWC-z2i1LJPbJ_Mb_#%7B%22pageId%22%3A%22C5RBs43oDa-KdzZeNtuy%22%7D)
- [API Documentation](https://docs.google.com/document/d/16Mo4btz9C58wWZGfqmbhAhcsRkydVee9ymHXeTdWRUg/edit#heading=h.jv1134q02w71)
- [Presentation Slides](https://docs.google.com/presentation/d/1TeTaUo64dxfFv8yfjW-EI9Jw96Ds8wk4iF3wTDLrWAA/edit#slide=id.g2d9e1a0158f_2_433)
- [Demo Video](https://mediaspace.illinois.edu/media/t/1_8o3dzbc6)

### Works Cited:
- [Guide to link Firebase Auth to React](https://www.youtube.com/watch?v=WpIDez53SK4)
