from playwright.sync_api import sync_playwright, expect

def verify_genesis(page):
    # 1. Load page
    page.goto("http://localhost:8000")
    page.set_viewport_size({"width": 1200, "height": 800})

    # Check title
    expect(page).to_have_title("Genesis V2 — Protocolo de Orquestación")

    # 2. Input Security request
    page.fill("#raw-input", "I need a security audit for my nodejs app")
    page.click("#transmute-btn")

    # 3. Wait for logs and agent spawn
    # The process takes some time due to delays (approx 3s total)
    page.wait_for_selector(".agent-card", timeout=10000)

    # Screenshot 1: Agent Spawned
    page.screenshot(path="verification_spawn.png")

    # 4. Interact with Security Agent
    # Find the textarea inside the agent card
    page.fill(".agent-card textarea", "const user = db.query('SELECT * FROM users WHERE id=' + req.params.id);")
    page.click(".run-agent-btn")

    # 5. Wait for report
    # The agent logic has delays too (approx 2s)
    page.wait_for_selector(".agent-output", state="visible", timeout=10000)
    # Wait for the text to appear (simulating typing or just wait a bit more)
    page.wait_for_timeout(3000)

    # Screenshot 2: Report Generated
    page.screenshot(path="verification_report.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_genesis(page)
            print("Verification successful")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
