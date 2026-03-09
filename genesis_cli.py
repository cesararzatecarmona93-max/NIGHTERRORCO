import argparse
import asyncio
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent
)

async def main():
    parser = argparse.ArgumentParser(description="Genesis V2 CLI")
    parser.add_argument("--agent", choices=["context", "security", "business", "legal"], required=True, help="El agente a ejecutar.")
    parser.add_argument("--input", required=True, help="Datos de entrada.")
    args = parser.parse_args()

    agent_mapping = {
        "context": ContextEngineeringAgent,
        "security": SecurityAuditorAgent,
        "business": BusinessStrategistAgent,
        "legal": LegalAuditorAgent
    }

    AgentClass = agent_mapping[args.agent]

    try:
        # For LegalAuditorAgent, we pass the input_data as input_document to trigger the validator
        if args.agent == "legal":
            agent = AgentClass(input_document=args.input)
        else:
            agent = AgentClass()

        result = await agent.execute(args.input)
        print(result)
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
