from urllib.parse import urlparse
import psycopg2
from flask import Flask, request

app = Flask(__name__)

def get_db_connection():
    result = urlparse("postgres://phonebook_db_2b2q_user:w9BUub1vm0NcjayoxmOyTEr6GiWDyUu6@dpg-ckarld7s0fgc73dnpadg-a.singapore-postgres.render.com/phonebook_db_2b2q")
    username = result.username
    password = result.password
    database = result.path[1:]
    hostname = result.hostname
    port = result.port
    connection = psycopg2.connect(
        database = database,
        user = username,
        password = password,
        host = hostname,
        port = port
    )
    return connection


@app.route('/data')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM phonebook;')
    columns = list(cur.description)
    phonebook = cur.fetchall()

    results = []
    for row in phonebook:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)
        
    cur.close()
    conn.close()

    return results

@app.route('/create', methods = ['POST'])
def create():
    conn = get_db_connection()
    cur = conn.cursor()

    json_data = request.get_json()

    name = json_data['name']
    phone_number = json_data['phone_number']
    address_field = json_data['address_field']

    query = "INSERT INTO phonebook (name, phone_number, address_field) VALUES ('" + name + "', '" + phone_number + "', '" + address_field + "');"
    cur.execute(query)
    conn.commit()

    cur.close()
    conn.close()
    return '', 200

@app.route('/edit/<id>', methods = ['GET', 'POST'])
def edit(id):
    conn = get_db_connection()
    cur = conn.cursor()
    if request.method == 'GET':
        cur.execute("SELECT * FROM phonebook WHERE id = " + id + ";")
        columns = list(cur.description)
        row = cur.fetchall()

        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[0][i]
            
        cur.close()
        conn.close()

        print(row_dict)

        return row_dict
    else:
        json_data = request.get_json()

        name = json_data['name']
        phone_number = json_data['phone_number']
        address_field = json_data['address_field']

        query = "UPDATE phonebook SET name = '" + name + "', phone_number = '" + phone_number + "', address_field = '" +  address_field + "' WHERE id = " + id + ";"
        cur.execute(query)
        conn.commit()

        cur.close()
        conn.close()
        return '', 200
    
@app.route('/<id>', methods = ['DELETE'])
def delete(id):
    print('here')
    conn = get_db_connection()
    cur = conn.cursor()
    query = "DELETE FROM phonebook WHERE id = " + id + ";"
    cur.execute(query)
    conn.commit()

    cur.close()
    conn.close()
    return '', 200

@app.route('/data/<filter>')
def filter(filter):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM phonebook WHERE name LIKE '%" + filter + "%';")
    columns = list(cur.description)
    phonebook = cur.fetchall()

    results = []
    for row in phonebook:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)
        
    cur.close()
    conn.close()

    return results