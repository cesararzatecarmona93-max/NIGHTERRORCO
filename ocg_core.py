import hashlib
import datetime

class OCGCoreSovereign:
    """
    Core backend logic for the OCG Protocol.
    """
    CORE_SIGNATURE = "GEMA96-NIGHTERRORCO"

    @classmethod
    def generate_merkle_root(cls, timestamp: str) -> str:
        """
        Generates a SHA-256 hash using the format GEMA96-NIGHTERRORCO-{timestamp}.
        """
        raw_data = f"{cls.CORE_SIGNATURE}-{timestamp}"
        return hashlib.sha256(raw_data.encode()).hexdigest()

    @classmethod
    def sign_segment(cls, content: str, security_level: str) -> str:
        """
        Signs a segment by hashing content + security_level + CORE_SIGNATURE.
        Returns a hex digest.
        """
        # Using a simple deterministic signature for demonstration,
        # or including a timestamp if uniqueness is required.
        # Given "immutable audit receipts", let's include a timestamp or salt.
        # But for the purpose of a reproducible signature in tests without mocking time,
        # I'll stick to deterministic if possible, or handle time in the caller.
        # However, `sign_segment` usually implies signing *at a point in time*.
        # Let's use the current time but note that tests might need to mock this if strict equality is checked.
        # Actually, the memory says `generate_merkle_root` takes a timestamp.
        # Let's make `sign_segment` return a signature that includes the Merkle root logic.

        timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
        merkle_root = cls.generate_merkle_root(timestamp)
        raw_data = f"{content}|{security_level}|{merkle_root}"
        signature_hash = hashlib.sha256(raw_data.encode()).hexdigest()
        return f"{merkle_root}:{signature_hash}"
