from playwright.sync_api import sync_playwright, expect

def test_sentinel_audit(page):
    # 1. Arrange: Go to the app
    print("Navigating to app...")
    page.goto("http://localhost:8080/index.html")

    # 2. Act: Fill in the contract text with risky clauses
    print("Filling contract text...")
    risky_text = """
    CONTRATO DE SERVICIOS
    1. La vigencia será de un año con renovación automática si ninguna parte avisa lo contrario.
    2. En caso de incumplimiento, se aplicará una pena convencional del 60% del valor total.
    3. Las partes renuncian a su fuero y se someten a los tribunales de Timbuctú.
    4. Recabaremos datos personales para fines de marketing.
    """
    page.fill("#contract-text", risky_text)

    # 3. Act: Click Audit
    print("Clicking Audit button...")
    page.click("button.action-btn")

    # 4. Assert: Check for results
    print("Waiting for results...")
    # Wait for the table to appear
    table = page.locator("table.risk-table")
    expect(table).to_be_visible()

    # Check for specific risk flags
    expect(page.get_by_text("Renovación Automática Silenciosa")).to_be_visible()
    expect(page.get_by_text("Pena Convencional del 60%")).to_be_visible()
    expect(page.get_by_text("Renuncia de Jurisdicción")).to_be_visible()
    expect(page.get_by_text("Uso de Datos sin Aviso de Privacidad")).to_be_visible()

    # 5. Screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/sentinel_result.png")
    print("Verification complete.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_sentinel_audit(page)
        except Exception as e:
            print(f"Test failed: {e}")
            page.screenshot(path="verification/sentinel_failure.png")
            raise
        finally:
            browser.close()
