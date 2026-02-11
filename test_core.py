import unittest
from ocg_core import OCGCoreSovereign

class TestOCGCoreSovereign(unittest.TestCase):

    def test_generate_merkle_root_reproducibility(self):
        """Test that generate_merkle_root produces the same hash for the same timestamp."""
        core = OCGCoreSovereign()
        timestamp = 1678886400.0
        hash1 = core.generate_merkle_root(timestamp)
        hash2 = core.generate_merkle_root(timestamp)
        self.assertEqual(hash1, hash2, "Hashes should be identical for the same timestamp")

    def test_generate_merkle_root_uniqueness(self):
        """Test that generate_merkle_root produces different hashes for different timestamps."""
        core = OCGCoreSovereign()
        timestamp1 = 1678886400.0
        timestamp2 = 1678886401.0
        hash1 = core.generate_merkle_root(timestamp1)
        hash2 = core.generate_merkle_root(timestamp2)
        self.assertNotEqual(hash1, hash2, "Hashes should be different for different timestamps")

    def test_generate_merkle_root_format(self):
        """Test that the output is a valid SHA-256 hex string."""
        core = OCGCoreSovereign()
        timestamp = 1678886400.0
        hash_value = core.generate_merkle_root(timestamp)
        self.assertEqual(len(hash_value), 64, "SHA-256 hash should be 64 characters long")
        int(hash_value, 16) # Should not raise ValueError

if __name__ == '__main__':
    unittest.main()
