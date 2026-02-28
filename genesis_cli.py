import argparse
import sys
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
)

def main():
    parser = argparse.ArgumentParser(description="Genesis V2 CLI Entry Point")
    parser.add_argument(
        "--agent",
        type=str,
        required=True,
        choices=["context", "security", "business", "legal"],
        help="Select the agent to interact with.",
    )
    parser.add_argument(
        "--input",
        type=str,
        required=True,
        help="Input text for the agent to process.",
    )

    args = parser.parse_args()

    agent_map = {
        "context": ContextEngineeringAgent,
        "security": SecurityAuditorAgent,
        "business": BusinessStrategistAgent,
        "legal": LegalAuditorAgent,
    }

    selected_agent_class = agent_map.get(args.agent)

    if not selected_agent_class:
        print(f"Error: Unknown agent '{args.agent}'", file=sys.stderr)
        sys.exit(1)

    agent_instance = selected_agent_class()

    print(f"--- Running {agent_instance.name} ---")
    result = agent_instance.execute(args.input)
    print(result)

if __name__ == "__main__":
    main()
