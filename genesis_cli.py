import argparse
import sys
from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
)

def main():
    parser = argparse.ArgumentParser(description="Genesis V2 Agent System CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available agents")

    # Context Engineering Agent
    parser_context = subparsers.add_parser("context", help="Run the Context Engineering Agent")
    parser_context.add_argument("input_text", help="The raw prompt or idea to optimize")

    # Security Auditor Agent
    parser_security = subparsers.add_parser("security", help="Run the Security Auditor Agent")
    parser_security.add_argument("input_text", help="The codebase or configuration to audit")

    # Business Strategist Agent
    parser_business = subparsers.add_parser("business", help="Run the Business Strategist Agent")
    parser_business.add_argument("input_text", help="The product or service description")

    # Legal Auditor Agent
    parser_legal = subparsers.add_parser("legal", help="Run the Legal Auditor Agent")
    parser_legal.add_argument("input_text", help="The contract text to analyze")

    args = parser.parse_args()

    if args.command is None:
        parser.print_help()
        sys.exit(1)

    agent = None
    if args.command == "context":
        agent = ContextEngineeringAgent()
    elif args.command == "security":
        agent = SecurityAuditorAgent()
    elif args.command == "business":
        agent = BusinessStrategistAgent()
    elif args.command == "legal":
        agent = LegalAuditorAgent()

    if agent:
        result = agent.run(args.input_text)
        print(result)

if __name__ == "__main__":
    main()
