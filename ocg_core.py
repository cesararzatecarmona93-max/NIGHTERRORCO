import hashlib

class OCGCoreSovereign:
    """
    OCG Core Sovereign Logic.
    Implements the core backend logic for the Genesis V2 Protocol.
    """
    def generate_merkle_root(self, timestamp):
        """
        Generates a SHA-256 Merkle root using the format GEMA96-NIGHTERRORCO-{timestamp}.

        Args:
            timestamp (str or int): The timestamp to include in the hash input.

        Returns:
            str: The SHA-256 hash digest in hexadecimal format.
        """
        raw_string = f"GEMA96-NIGHTERRORCO-{timestamp}"
        return hashlib.sha256(raw_string.encode('utf-8')).hexdigest()

if __name__ == "__main__":
    # Example usage
    ocg = OCGCoreSovereign()
    # Using a dummy timestamp for demonstration
    print(ocg.generate_merkle_root("1678886400"))
