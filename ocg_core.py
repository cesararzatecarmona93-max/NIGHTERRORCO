import hashlib
import time

class OCGCoreSovereign:
    def __init__(self):
        pass

    def generate_merkle_root(self, timestamp: float) -> str:
        """
        Generates a SHA-256 hash (Merkle root) based on the provided timestamp.
        The timestamp ensures reproducibility and forensic auditing.
        """
        data = f"GEMA96-NIGHTERRORCO-{timestamp}"
        return hashlib.sha256(data.encode()).hexdigest()
