import pytest
import asyncio
from pro_genesis_bridge import ClientProfile, DigitalDispatcher, NexusBridge

def test_client_profile_initialization():
    client = ClientProfile(
        id="C-001",
        name="Test User",
        entry_product="Basic Script",
        investment=10.0
    )
    assert client.technical_pain_score == 0
    assert client.is_whale_candidate == False

@pytest.mark.asyncio
async def test_digital_dispatcher_delivery():
    client = ClientProfile(
        id="C-002",
        name="Delivery Test",
        entry_product="PDF Guide",
        investment=20.0
    )
    dispatcher = DigitalDispatcher()
    result = await dispatcher.deliver_asset(client)
    assert result == True

def test_nexus_bridge_scoring_low():
    client = ClientProfile(
        id="C-003",
        name="Low Score User",
        entry_product="Small Tool",
        investment=10.0 # Score: 0 ( < 49)
    )
    nexus = NexusBridge()
    # Clicks: 0 (+0), Errors: 0 (+0)
    nexus.analyze_behavior(client, clicks=0, errors_reported=0)

    assert client.technical_pain_score == 0
    assert client.is_whale_candidate == False

def test_nexus_bridge_scoring_whale():
    client = ClientProfile(
        id="C-004",
        name="Whale User",
        entry_product="Pro Script",
        investment=49.0 # Score: +20
    )
    nexus = NexusBridge()
    # Clicks: 1 (+50), Errors: 1 (+30) -> Total: 100
    nexus.analyze_behavior(client, clicks=1, errors_reported=1)

    assert client.technical_pain_score == 100
    assert client.is_whale_candidate == True

def test_nexus_bridge_scoring_partial():
    client = ClientProfile(
        id="C-005",
        name="Mid User",
        entry_product="Mid Tool",
        investment=49.0 # Score: +20
    )
    nexus = NexusBridge()
    # Clicks: 1 (+50), Errors: 0 (+0) -> Total: 70
    nexus.analyze_behavior(client, clicks=1, errors_reported=0)

    assert client.technical_pain_score == 70
    assert client.is_whale_candidate == False
