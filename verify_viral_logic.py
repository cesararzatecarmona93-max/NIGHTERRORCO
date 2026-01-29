from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:8000")

    # Wait for the page to load
    expect(page).to_have_title("Protocolo Genesis V2 | Arquitectura de Orquestacion")

    # Click on the new agent: Motor Lógico Viral
    # It should be in the list.
    page.get_by_text("Motor Lógico Viral").click()

    # Wait for update
    page.wait_for_timeout(2000)

    # Check if the title changed
    expect(page.locator("#agent-title")).to_contain_text("Motor Lógico Viral")

    # Check if the content is correct (part of the new system prompt)
    expect(page.locator("#terminal-text")).to_contain_text("VIRAL_LOGIC_ENGINE")
    expect(page.locator("#terminal-text")).to_contain_text("Program-of-Thoughts")

    # Take a screenshot
    page.screenshot(path="/home/jules/verification/viral_logic_agent.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
