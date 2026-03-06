import argparse
import asyncio
import sys

from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
    EducadorAgent,
    ResilienceAgent
)

AGENT_MAP = {
    "context": ContextEngineeringAgent,
    "security": SecurityAuditorAgent,
    "business": BusinessStrategistAgent,
    "legal": LegalAuditorAgent,
    "educador": EducadorAgent,
    "resilience": ResilienceAgent
}

async def main():
    parser = argparse.ArgumentParser(description="CLI entry point for Genesis V2 Agents.")
    parser.add_argument(
        "--agent",
        type=str,
        required=True,
        choices=list(AGENT_MAP.keys()),
        help="The agent to execute."
    )
    parser.add_argument(
        "--input",
        type=str,
        required=True,
        help="The input text to process."
    )

    args = parser.parse_args()

    # Instantiate the selected agent
    agent_class = AGENT_MAP[args.agent]
    agent = agent_class()

    # Execute the agent
    result = await agent.execute(args.input)

    # Strictly output TECHNICAL_FINAL_RESULT_ONLY format requirement
    print(result)

if __name__ == "__main__":
    # Check if we are running in pytest
    if "pytest" not in sys.argv[0]:
        asyncio.run(main())
