import requests
from bs4 import BeautifulSoup

import logging

def get_price(url: str) -> float:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Connection": "keep-alive",
        "DNT": "1",
        "Upgrade-Insecure-Requests": "1"
    }
    resp = requests.get(url, headers=headers)
    logging.warning(f"Amazon response status code: {resp.status_code}")
    html_snippet = resp.text[:2000]
    logging.warning(f"Amazon HTML (first 2000 chars): {html_snippet}")
    # Check for bot detection or price presence
    lower_html = resp.text.lower()
    logging.warning(f"Contains 'captcha': {'captcha' in lower_html}")
    logging.warning(f"Contains 'robot': {'robot' in lower_html}")
    logging.warning(f"Contains 'a-price': {'a-price' in lower_html}")
    if resp.status_code != 200:
        return None
    soup = BeautifulSoup(resp.text, "html.parser")
    # Amazon price selectors (robust)
    selectors = [
        # Amazon selectors
        "#priceblock_ourprice",
        "#priceblock_dealprice",
        "#priceblock_saleprice",
        ".a-price .a-offscreen",
        "#corePrice_feature_div .a-offscreen",
        ".a-price-whole",
        # Generic selectors for other e-commerce sites
        ".price",
        ".product-price",
        ".current-price",
        ".our-price",
        ".sale-price",
        ".special-price",
        ".amount",
        "[itemprop='price']",
        "[class*='price']"
    ]
    for selector in selectors:
        el = soup.select_one(selector)
        if el and el.text:
            price_text = el.text.strip().replace("$", "").replace(",", "").replace("\u00a0", "")
            try:
                return float(price_text)
            except Exception:
                continue
    # Try Open Graph meta tag (og:price:amount)
    og_price = soup.find("meta", property="og:price:amount")
    if og_price and og_price.get("content"):
        try:
            return float(og_price["content"])
        except Exception:
            pass
    return None
