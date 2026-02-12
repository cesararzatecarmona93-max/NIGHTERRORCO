import unittest
import hashlib
from ocg_core import OCGCoreSovereign

class TestOCGCoreSovereign(unittest.TestCase):
    def test_generate_merkle_root(self):
        ocg = OCGCoreSovereign()
        timestamp = "1678886400"
        expected_raw = f"GEMA96-NIGHTERRORCO-{timestamp}"
        expected_hash = hashlib.sha256(expected_raw.encode('utf-8')).hexdigest()

        result = ocg.generate_merkle_root(timestamp)
        self.assertEqual(result, expected_hash)

    def test_generate_merkle_root_different_timestamp(self):
        ocg = OCGCoreSovereign()
        timestamp = "1234567890"
        expected_raw = f"GEMA96-NIGHTERRORCO-{timestamp}"
        expected_hash = hashlib.sha256(expected_raw.encode('utf-8')).hexdigest()

        result = ocg.generate_merkle_root(timestamp)
        self.assertEqual(result, expected_hash)

if __name__ == '__main__':
    unittest.main()
