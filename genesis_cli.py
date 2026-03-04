import argparse
import asyncio
import json

from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent
)

async def main():
    parser = argparse.ArgumentParser(description="Genesis V2 CLI")
    parser.add_argument(
        "--agent",
        type=str,
        required=True,
        choices=["context", "security", "business", "legal"],
        help="The agent to execute"
    )
    parser.add_argument(
        "--input",
        type=str,
        required=True,
        help="Input text for the agent"
    )

    args = parser.parse_args()

    if args.agent == "context":
        agent = ContextEngineeringAgent()
    elif args.agent == "security":
        agent = SecurityAuditorAgent()
    elif args.agent == "business":
        agent = BusinessStrategistAgent()
    elif args.agent == "legal":
        agent = LegalAuditorAgent()
    else:
        raise ValueError(f"Unknown agent type: {args.agent}")

    result = await agent.execute(args.input)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
