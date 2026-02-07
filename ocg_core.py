import hashlib
import json
import time
import uuid

class OCGCoreSovereign:
    PROTOCOL_SIGNATURE = 'GEMA96-NIGHTERRORCO'

    def __init__(self):
        pass

    def generate_merkle_root(self, data, timestamp=None):
        """
        Generates a SHA-256 hash (Merkle Root) for the given data.
        Ensures reproducibility by accepting an optional timestamp.
        """
        if timestamp is None:
            timestamp = time.time()

        # Ensure data is consistent for hashing
        payload = {
            'data': data,
            'timestamp': timestamp,
            'signature': self.PROTOCOL_SIGNATURE
        }

        # Serialize with sorted keys for reproducibility
        serialized_payload = json.dumps(payload, sort_keys=True).encode('utf-8')
        merkle_root = hashlib.sha256(serialized_payload).hexdigest()

        return merkle_root, timestamp

    def logic_to_cash_audit(self, transaction_data):
        """
        Simulates the Logic-to-Cash execution and compliance auditing.
        Returns an audit receipt.
        """
        merkle_root, timestamp = self.generate_merkle_root(transaction_data)

        receipt = {
            'folio': str(uuid.uuid4()),
            'merkle_root': merkle_root,
            'latency_p95': '15ms', # Simulated
            'timestamp': timestamp,
            'status': 'AUDITED',
            'protocol': self.PROTOCOL_SIGNATURE
        }
        return receipt
