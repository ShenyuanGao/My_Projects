from sqlalchemy.orm import Session
from models import Product, PriceHistory
from datetime import datetime

def create_or_update_product(db: Session, url: str, price: float, email: str):
    product = db.query(Product).filter(Product.url == url).first()
    if not product:
        product = Product(url=url, email=email)
        db.add(product)
        db.commit()
        db.refresh(product)
    # Add price history
    price_entry = PriceHistory(product_id=product.id, price=price, checked_at=datetime.utcnow())
    db.add(price_entry)
    db.commit()
    return product

def get_price_history(db: Session, product_id: int):
    return db.query(PriceHistory).filter(PriceHistory.product_id == product_id).order_by(PriceHistory.checked_at.desc()).all()
