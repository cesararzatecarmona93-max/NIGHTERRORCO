import os
import sys
from playwright.sync_api import sync_playwright

def test_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Listen for console logs
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PageError: {err}"))

        # Load the local index.html
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Check title
        assert "Protocolo Genesis V2" in page.title()

        # Check sidebar exists
        assert page.is_visible(".sidebar")

        # Check agents exist
        agents = page.locator(".agent-item")
        print(f"Found {agents.count()} agents")
        assert agents.count() == 4

        # Check first agent is active
        first_agent_title = agents.nth(0).locator(".agent-name").inner_text()
        assert "Agente de Ingeniería de Contexto" in first_agent_title
        assert "active" in agents.nth(0).get_attribute("class")

        # Click second agent (Security Auditor)
        agents.nth(1).click()

        # Check second agent is active
        assert "active" in agents.nth(1).get_attribute("class")

        # Check terminal title updates
        terminal_title = page.locator(".terminal-header .title")
        print(f"Terminal Title: {terminal_title.inner_text()}")
        assert "Auditor de Seguridad Black" in terminal_title.inner_text()

        # Check terminal content updates
        # Typewriter effect takes time
        print("Waiting for typewriter effect...")
        page.wait_for_timeout(5000)
        terminal_content = page.locator(".terminal-content")
        content_text = terminal_content.inner_text()
        print(f"Terminal Content Length: {len(content_text)}")
        print(f"Terminal Content Start: '{content_text[:100]}'")

        assert len(content_text) > 50
        assert "# SYSTEM PROMPT" in content_text or "The Elite Security Auditor" in content_text

        print("UI Tests Passed")
        browser.close()

if __name__ == "__main__":
    test_ui()
