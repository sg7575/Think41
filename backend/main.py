from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

# Define a Pydantic model for a product
class Product(BaseModel):
    product_id: int
    name: str
    category: str
    price: float
    stock: int

# MySQL connection details
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Nothing@57",   # Use your actual MySQL password
    database="think41"
)

@app.get("/products", response_model=List[Product])
def get_products():
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()
    cursor.close()
    return rows
