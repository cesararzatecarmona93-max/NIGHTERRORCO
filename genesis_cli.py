import argparse
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
)

def main():
    parser = argparse.ArgumentParser(description="Genesis V2 CLI")
    parser.add_argument(
        "--agent",
        choices=["context", "security", "business", "legal"],
        required=True,
        help="The agent to execute.",
    )
    parser.add_argument(
        "--input",
        required=True,
        help="The input text to provide to the agent.",
    )

    args = parser.parse_args()

    agents = {
        "context": ContextEngineeringAgent,
        "security": SecurityAuditorAgent,
        "business": BusinessStrategistAgent,
        "legal": LegalAuditorAgent,
    }

    agent_class = agents[args.agent]
    agent = agent_class()
    result = agent.execute(args.input)
    print(result)

if __name__ == "__main__":
    main()
