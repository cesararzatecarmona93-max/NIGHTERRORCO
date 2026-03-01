import argparse
import sys

from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
)

def main():
    parser = argparse.ArgumentParser(description="Genesis V2 Command Line Interface")
    parser.add_argument(
        "--agent",
        type=str,
        required=True,
        choices=["context", "security", "business", "legal"],
        help="The agent to execute.",
    )
    parser.add_argument(
        "--input",
        type=str,
        required=True,
        help="The input text to provide to the agent.",
    )

    args = parser.parse_args()

    agent_mapping = {
        "context": ContextEngineeringAgent,
        "security": SecurityAuditorAgent,
        "business": BusinessStrategistAgent,
        "legal": LegalAuditorAgent,
    }

    agent_class = agent_mapping.get(args.agent)
    if not agent_class:
        print(f"Error: Unknown agent '{args.agent}'", file=sys.stderr)
        sys.exit(1)

    agent = agent_class()
    result = agent.simulate_execution(args.input)
    print(result)

if __name__ == "__main__":
    main()
