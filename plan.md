1. **Understand Intent**: The user has provided an incomplete, slightly corrupted copy of `llave_master_gold_v2.py`, merging it with some Markdown and Mermaid instructions. They want the complete `llave_master_gold_v2.py` file implemented in the repo.
2. **Review Code**: Identify syntax errors caused by truncation in the user's prompt (e.g., empty lists like `self.leaves: List[str] =`, broken `handlers=`, and broken routing logic `elif any(x in content graph TD`).
3. **Draft the Full Code**: Fix these syntax errors, reconstruct the semantic router for `LAZARUS`, `SENTINEL`, and `FINANCE` agents, complete the `NexusEngine` ReAct loop, and add the Pytest test suite inside the file as specified by memory rules.
4. **Implement**: Create the `llave_master_gold_v2.py` file in the repository root.
5. **Verify**: Run `pytest llave_master_gold_v2.py` and ensure the tests pass.
6. **Complete Pre-commit Steps**: Call `pre_commit_instructions` and follow them to verify the whole codebase.
7. **Submit**: Submit the changes.
