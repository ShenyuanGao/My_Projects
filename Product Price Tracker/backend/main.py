from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import List
from database import SessionLocal, engine
import models, crud, scraper, emailer

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductURL(BaseModel):
    url: HttpUrl
    email: str

@app.post("/track")
def track_product(product: ProductURL):
    # Scrape price
    price = scraper.get_price(product.url)
    if price is None:
        raise HTTPException(status_code=400, detail="Could not fetch price.")
    # Store product and price
    db = SessionLocal()
    db_product = crud.create_or_update_product(db, str(product.url), price, product.email)
    # Send instant confirmation email
    from emailer import send_price_alert
    try:
        send_price_alert(product.email, str(product.url), price, price)  # old_price and new_price are the same for confirmation
    except Exception as e:
        import logging
        logging.warning(f"Failed to send confirmation email: {e}")
    db.close()
    return {"url": product.url, "current_price": price}

@app.get("/history/{product_id}")
def get_history(product_id: int):
    db = SessionLocal()
    history = crud.get_price_history(db, product_id)
    db.close()
    return history
