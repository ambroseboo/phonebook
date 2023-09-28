# Phonebook (for Illumina Coding Assessment)

## Contents
This is a web application for a phonebook which is able to:
    - Create an application to manage a list of contacts
    - Allow user to enter, edit and delete entries
    - Provide name, phone number and address field for each contact
    - Display the phone book as a list/table
    - Search function to search contacts by name
    - Display multiple search hits in a list/table

This application is built on a Flask backend, React frontend, PostgreSQL database hosted on Render.

## Contents
To run this web application, run these commands: 
- (Open terminal in this project's root)
```
cd frontend
```
```
npm i
```
```
npm run start
```
- (Open another terminal in this project's root)
```
cd backend
```
```
pip install -r requirements.txt
```
```
flask run
```

Open http://localhost:3000/ to access the web application.

Please note that there may be a small delay/latency when doing filtering by name due to the connection to the remote database.