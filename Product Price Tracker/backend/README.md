# Product Price Tracker Backend

This is the backend for the Product Price Tracker project using FastAPI and PostgreSQL.

## Setup

1. Ensure you have Python 3.8+ and PostgreSQL installed.
2. Create a PostgreSQL database (default: `price_tracker`).
3. Set environment variables for database and email (see `.env.example`).
4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Run the server:
   ```sh
   uvicorn main:app --reload
   ```
