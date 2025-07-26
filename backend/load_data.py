import csv
import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Nothing@57",  # Replace with your actual password
    database="ecommerce_ai"
)

cursor = conn.cursor()

# Open and read CSV file
with open('products.csv/products.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        cursor.execute("""
            INSERT INTO products (product_id, name, category, price, stock)
            VALUES (%s, %s, %s, %s, %s)
        """, (row['product_id'], row['name'], row['category'], row['price'], row['stock']))

conn.commit()
cursor.close()
conn.close()

print("Data successfully inserted into MySQL database.")
