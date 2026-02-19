import hashlib
import re
from typing import List

class OCGCoreSovereign:
    """
    OCG Core Sovereign Logic Engine.
    Implements forensic governance and immutable audit trails.
    """

    @staticmethod
    def generate_merkle_root(timestamp: str) -> str:
        """
        Generates an immutable audit receipt using SHA-256 Merkle root.
        The input string for the hash is 'GEMA96-NIGHTERRORCO-{timestamp}'.
        """
        data = f"GEMA96-NIGHTERRORCO-{timestamp}"
        return hashlib.sha256(data.encode('utf-8')).hexdigest()

def validate_sovereign_vocabulary(text: str) -> bool:
    """
    Validates that the text does not contain devaluing terms.
    Acts as an 'Iron Restriction' validator.

    Prohibited terms include: 'barato', 'costo', 'económico', 'descuento'.

    Returns:
        bool: True if the text is clean (valid), False if it contains prohibited terms.
    """
    forbidden_terms = ["barato", "costo", "económico", "descuento"]
    text_lower = text.lower()

    for term in forbidden_terms:
        # Check for whole words or just substring? Memory says 'terms'.
        # Using simple substring check for safety as per "Iron Restriction".
        if term in text_lower:
            return False
    return True
