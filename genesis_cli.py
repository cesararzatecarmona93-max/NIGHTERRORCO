import argparse
import asyncio
import sys

from genesis_v2.agents import (
    ContextEngineeringAgent,
    SecurityAuditorAgent,
    BusinessStrategistAgent,
    LegalAuditorAgent,
)
from pydantic import ValidationError

async def run_agent(agent_name: str, input_data: str):
    agent_map = {
        "context": ContextEngineeringAgent,
        "security": SecurityAuditorAgent,
        "business": BusinessStrategistAgent,
        "legal": LegalAuditorAgent,
    }

    agent_class = agent_map.get(agent_name)
    if not agent_class:
        print(f"TECHNICAL_FINAL_RESULT_ONLY\nUnknown agent: {agent_name}")
        return

    try:
        agent = agent_class(input_data=input_data)
        result = await agent.execute()
        print(result)
    except ValidationError as e:
        error_msg = str(e)
        if "ERROR DE INGESTA" in error_msg:
            print("TECHNICAL_FINAL_RESULT_ONLY\nERROR DE INGESTA: Solo proceso documentos legales para auditoría.")
        else:
            print(f"TECHNICAL_FINAL_RESULT_ONLY\nValidation Error: {error_msg}")
    except ValueError as e:
        error_msg = str(e)
        if "ERROR DE INGESTA" in error_msg:
            print("TECHNICAL_FINAL_RESULT_ONLY\nERROR DE INGESTA: Solo proceso documentos legales para auditoría.")
        else:
            print(f"TECHNICAL_FINAL_RESULT_ONLY\nValue Error: {error_msg}")
    except Exception as e:
        print(f"TECHNICAL_FINAL_RESULT_ONLY\nExecution Error: {str(e)}")


def main():
    parser = argparse.ArgumentParser(description="Genesis V2 Agent CLI")
    parser.add_argument(
        "--agent",
        required=True,
        choices=["context", "security", "business", "legal"],
        help="Agent to execute"
    )
    parser.add_argument(
        "--input",
        required=True,
        help="Input data for the agent"
    )

    args = parser.parse_args()

    asyncio.run(run_agent(args.agent, args.input))

if __name__ == "__main__":
    main()
