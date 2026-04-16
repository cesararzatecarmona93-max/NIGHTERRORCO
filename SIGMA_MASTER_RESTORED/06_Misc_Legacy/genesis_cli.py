import argparse
import asyncio
import sys

from pydantic import ValidationError

from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    SalesSiloArchitectAgent,
    LegalAuditorAgent
)


async def main():
    parser = argparse.ArgumentParser(description="Protocolo Genesis V2 CLI")
    parser.add_argument(
        "--agent",
        choices=[
            "context",
            "security",
            "business",
            "legal"],
        required=True,
        help="Agent to execute")
    parser.add_argument(
        "--input",
        required=True,
        help="Input data for the agent")

    args = parser.parse_args()

    agent_map = {
        "context": ContextEngineeringAgent,
        "security": SecurityAuditorAgent,
        "business": SalesSiloArchitectAgent,
        "legal": LegalAuditorAgent
    }

    AgentClass = agent_map[args.agent]

    try:
        agent = AgentClass(input_data=args.input)
        result = await agent.execute()
        # Ensure purely technical and functional output per protocol
        # 0x0_MIN_EXEC_ENGINE
        print(result)
    except ValidationError as e:
        for error in e.errors():
            msg = error.get("msg", "")
            if msg.startswith("Value error, "):
                print(msg[len("Value error, "):])
            else:
                print(msg)
        sys.exit(1)
    except Exception as e:
        print(str(e))
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())
