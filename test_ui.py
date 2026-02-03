import unittest
import time
import subprocess
import sys
from playwright.sync_api import sync_playwright

class TestGenesisUI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Start server
        cls.server = subprocess.Popen([sys.executable, "-m", "http.server", "8000"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        time.sleep(2) # Wait for server

    @classmethod
    def tearDownClass(cls):
        cls.server.terminate()

    def test_ui_elements(self):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto("http://localhost:8000")

            # Check Matrix Canvas
            canvas = page.locator("#matrix-bg")
            self.assertTrue(canvas.is_visible())

            # Check Sidebar
            sidebar = page.locator(".sidebar")
            self.assertTrue(sidebar.is_visible())

            # Check Agents
            agents = page.locator(".agent-btn")
            self.assertEqual(agents.count(), 4)

            # Check Initial State
            terminal = page.locator("#typewriter-text")
            self.assertIn("Initialize Protocol Genesis V2", terminal.text_content())

            # Click Context Engineer
            agents.nth(0).click()

            # Check Active Header
            header = page.locator("#active-agent-name")
            self.assertIn("CONTEXT ENGINEER", header.text_content())

            # Wait for typewriter
            time.sleep(5)
            content = terminal.text_content()
            self.assertIn("SYSTEM VECTOR INJECTION", content)
            self.assertIn("0xAetherShadowUnbreakable", content)

            browser.close()

if __name__ == "__main__":
    unittest.main()
