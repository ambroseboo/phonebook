import os
import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="phonebook_db",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS phonebook;')
cur.execute('CREATE TABLE phonebook (id serial PRIMARY KEY,'
                                 'name varchar (150) NOT NULL,'
                                 'phone_number varchar (20) NOT NULL,'
                                 'address_field varchar (150) NOT NULL);'
                                 )

# Insert data into the table

cur.execute('INSERT INTO phonebook (name, phone_number, address_field)'
            'VALUES (%s, %s, %s)',
            ('Charles Dickens',
             '12345678',
             '123 Charles Road')
            )


cur.execute('INSERT INTO phonebook (name, phone_number, address_field)'
            'VALUES (%s, %s, %s)',
            ('Anna Karenina',
             '98765432',
             '987 Karen Ave')
            )

conn.commit()

cur.close()
conn.close()