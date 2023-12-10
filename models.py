# models.py
import psycopg2

# Replace these with your actual connection details
dbname = "usersdatabase"
user = "<usersdatabase_user>"
password = "<EdpD0EYTo1Yw2UbXm9jzuomLa7Lg1EXt>"
host = "localhost"

# Establish a connection to the PostgreSQL server
conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host)

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Example: Execute a simple query
cursor.execute("SELECT * FROM your_table_name;")
rows = cursor.fetchall()

# Display the results
for row in rows:
    print(row)

# Close the cursor and connection
cursor.close()
conn.close()
