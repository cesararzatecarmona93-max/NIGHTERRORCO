import unittest
import json
from src.core.ocg_protocol import OCGCoreSovereign

class TestOCGCoreSovereign(unittest.TestCase):
    def setUp(self):
        self.engine = OCGCoreSovereign()

    def test_generate_merkle_root(self):
        payload = json.dumps({"test": "data"})
        merkle = self.engine.generate_merkle_root(payload)
        self.assertIsInstance(merkle, str)
        self.assertEqual(len(merkle), 64)  # SHA-256 length in hex

    def test_execute_logic_to_cash(self):
        task = "Test Task"
        result = {"status": "OK"}
        receipt = self.engine.execute_logic_to_cash(task, result)

        self.assertIn("folio", receipt)
        self.assertTrue(receipt["folio"].startswith("CERT-OCG-2026-"))
        self.assertEqual(receipt["status"], "VALIDATED_BY_OCG_CORE")
        self.assertEqual(receipt["owner"], "César Arzate Carmona")
        self.assertIn("merkle_root", receipt)
        self.assertIn("latency_p95", receipt)
        self.assertEqual(receipt["compliance"], "100.0% (LFPDPPP 2025)")
        self.assertEqual(receipt["data"], result)

if __name__ == '__main__':
    unittest.main()
