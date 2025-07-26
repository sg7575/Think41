import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Nothing@57',  # 🔁 Replace with your actual password
    database='ecommerce_ai'
)

cursor = conn.cursor()

# Insert sample messages
conversation_id = 1  # use an existing conversation_id
messages = [
    ('user', 'What is the delivery time for order #5678?'),
    ('ai', 'It will be delivered in 3-5 business days.'),
    ('user', 'Thanks!')
]

for sender, text in messages:
    cursor.execute(
        "INSERT INTO messages (conversation_id, sender, message_text) VALUES (%s, %s, %s)",
        (conversation_id, sender, text)
    )

conn.commit()
print("✅ Messages inserted!")

cursor.close()
conn.close()
