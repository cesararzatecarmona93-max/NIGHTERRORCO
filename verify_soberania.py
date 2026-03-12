import os
import hashlib
import hmac
import json
import time
from fastapi.testclient import TestClient
from unittest.mock import MagicMock

# Create dummy .env if not exists (handled by previous command)

# Import the app
# We need to handle potential failures if Twilio Client tries to connect on init,
# though it usually doesn't.
try:
    import SOBERANIA_L5
    from SOBERANIA_L5 import app, memory, trigger
except Exception as e:
    print(f"Failed to import SOBERANIA_L5: {e}")
    exit(1)

# Mock the trigger to avoid real calls
trigger.enviar_mensaje = MagicMock(return_value="SM_FAKE_SID")

client = TestClient(app)

def test_webhook_no_signature():
    response = client.post("/webhook/liquidation", json={"id": "tx_123"})
    assert response.status_code == 401
    print("test_webhook_no_signature passed")

def test_webhook_valid_signature():
    secret = os.getenv("WEBHOOK_SECRET").encode('utf-8')
    payload = json.dumps({"id": "tx_test_1", "customer_phone": "+1234567890"}).encode('utf-8')
    signature = hmac.new(secret, payload, hashlib.sha256).hexdigest()

    response = client.post(
        "/webhook/liquidation",
        content=payload,
        headers={"x-signature": signature, "Content-Type": "application/json"}
    )

    assert response.status_code == 200
    assert response.json() == {"status": "ACK", "message": "Procesamiento asíncrono iniciado"}
    print("test_webhook_valid_signature passed")

    # Verify background task execution (simulated or checked via side effects)
    # Since background tasks run after response, we might need to wait or verify DB.
    # The async_liquidation_pipeline runs in background.
    # In TestClient, background tasks are executed?
    # Starlette TestClient runs background tasks synchronously usually.

    # Check DB
    # We might need to give it a moment if it was truly async, but TestClient handles it.

    # Verify transaction in DB
    cursor = memory.conn.execute("SELECT * FROM transactions WHERE mp_pref_id=?", ("tx_test_1",))
    row = cursor.fetchone()
    assert row is not None
    assert row[0] == "tx_test_1"
    assert row[2] == "PAID"
    print("DB verification passed")

    # Verify trigger was called
    trigger.enviar_mensaje.assert_called()
    print("Trigger verification passed")

if __name__ == "__main__":
    test_webhook_no_signature()
    test_webhook_valid_signature()

    # Check if DB file exists
    if os.path.exists("lzrs_sovereign.db"):
        print("lzrs_sovereign.db exists")
    else:
        print("lzrs_sovereign.db MISSING")

    print("ALL TESTS PASSED")
