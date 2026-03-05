import argparse
import asyncio
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
    EducadorAgent
)

def get_agent(agent_name: str):
    agents = {
        "context": ContextEngineeringAgent,
        "security": SecurityAuditorAgent,
        "business": BusinessStrategistAgent,
        "legal": LegalAuditorAgent,
        "educador": EducadorAgent
    }
    agent_class = agents.get(agent_name)
    if agent_class is None:
        raise ValueError(f"Unknown agent: {agent_name}")
    return agent_class()

async def async_main():
    parser = argparse.ArgumentParser(description="Genesis V2 Agent CLI")
    parser.add_argument("--agent", required=True, choices=["context", "security", "business", "legal", "educador"], help="The agent to execute.")
    parser.add_argument("--input", required=True, help="The input data for the agent.")
    args = parser.parse_args()

    agent = get_agent(args.agent)
    output = await agent.execute(args.input)
    print(output)

def main():
    asyncio.run(async_main())

if __name__ == "__main__":
    main()
