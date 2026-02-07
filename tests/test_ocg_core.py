import unittest
import json
import hashlib
import time
from ocg_core import OCGCoreSovereign

class TestOCGCoreSovereign(unittest.TestCase):
    def setUp(self):
        self.core = OCGCoreSovereign()

    def test_generate_merkle_root_reproducibility(self):
        data = "test_transaction"
        timestamp = 1234567890.0

        root1, ts1 = self.core.generate_merkle_root(data, timestamp)
        root2, ts2 = self.core.generate_merkle_root(data, timestamp)

        self.assertEqual(root1, root2)
        self.assertEqual(ts1, timestamp)
        self.assertEqual(ts2, timestamp)

    def test_generate_merkle_root_uniqueness(self):
        data = "test_transaction"

        root1, ts1 = self.core.generate_merkle_root(data)
        # Sleep briefly to ensure different timestamp if not provided
        time.sleep(0.01)
        root2, ts2 = self.core.generate_merkle_root(data)

        self.assertNotEqual(root1, root2)
        self.assertNotEqual(ts1, ts2)

    def test_logic_to_cash_audit(self):
        data = {"amount": 100, "currency": "USD"}
        receipt = self.core.logic_to_cash_audit(data)

        self.assertIn('folio', receipt)
        self.assertIn('merkle_root', receipt)
        self.assertIn('latency_p95', receipt)
        self.assertIn('timestamp', receipt)
        self.assertEqual(receipt['status'], 'AUDITED')
        self.assertEqual(receipt['protocol'], 'GEMA96-NIGHTERRORCO')

if __name__ == '__main__':
    unittest.main()
