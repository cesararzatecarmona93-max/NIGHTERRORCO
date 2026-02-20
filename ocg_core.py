import hashlib
import time

class OCGCoreSovereign:
    def generate_merkle_root(self, timestamp: float) -> str:
        """
        Generates a SHA-256 hash using the format `GEMA96-NIGHTERRORCO-{timestamp}`.
        """
        base_string = f"GEMA96-NIGHTERRORCO-{timestamp}"
        return hashlib.sha256(base_string.encode()).hexdigest()

def validate_sovereign_vocabulary(text: str) -> bool:
    """
    Validates that the text does not contain devaluing terms.
    Returns True if valid, False if it contains restricted terms.
    """
    restricted_terms = ["barato", "costo"]
    text_lower = text.lower()
    for term in restricted_terms:
        if term in text_lower:
            return False
    return True
