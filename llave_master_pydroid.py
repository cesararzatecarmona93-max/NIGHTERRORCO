# -*- coding: utf-8 -*-
"""
🏆 RECURSO DIGITAL: LLAVE MÁSTER GOLD V2.0 (ARQUITECTURA SEMÁNTICA & TDD)
=========================================================================
AUTOR ORIGINAL Y ARQUITECTO: César Arzate Carmona
(Arquitecto de Software Senior & Científico de Datos Forense Sigma L5)
=========================================================================
"""

import os
import sys

print("=== INSTALANDO DEPENDENCIAS PARA PYDROID 3 ===")
print("Esto puede tardar unos segundos...")
# Pydroid 3 usa pip internamente
os.system(f'"{sys.executable}" -m pip install "pydantic>=2.0" pytest pytest-asyncio')
print("=== INSTALACIÓN COMPLETADA ===")

import asyncio
import hashlib
import json
import logging
import re
import time
from abc import ABC, abstractmethod
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional, Annotated
from uuid import uuid4

# =============================================================================
# 0. CONFIGURACIÓN E INFRAESTRUCTURA (LOGGING & TYPING)
# =============================================================================

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)s | %(name)s | %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("NEXUS_CORE")

try:
    from pydantic import (
        BaseModel, Field, field_validator, ValidationInfo,
        AfterValidator, PrivateAttr, ConfigDict, model_validator
    )
except ImportError:
    print("Error: No se pudo importar Pydantic. Asegúrate de tener conexión a internet para que Pydroid lo descargue.")
    sys.exit(1)

# =============================================================================
# 1. CAPA DE SEGURIDAD Y AUDITORÍA (FORENSIC AUDITOR & ISE)
# =============================================================================

class SecurityLevel(str, Enum):
    SYSTEM = "SYSTEM_LEVEL_ROOT"
    USER = "USER_LEVEL_INPUT"
    DATA = "DATA_LEVEL_CONTEXT"

class InstructionalSegment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    content: str
    level: SecurityLevel
    timestamp: float = Field(default_factory=time.time)
    signature: str = Field(default="")

    model_config = ConfigDict(frozen=False, validate_assignment=True)

    @model_validator(mode='after')
    def sign_segment(self) -> 'InstructionalSegment':
        payload = f"{self.level}:{self.content}:{self.timestamp}"
        new_signature = hashlib.sha256(payload.encode()).hexdigest()
        if self.signature != new_signature:
            self.signature = new_signature
        return self

class MerkleNode(BaseModel):
    hash: str
    left: Optional['MerkleNode'] = None
    right: Optional['MerkleNode'] = None
    data: Optional[str] = None

class ForensicAuditor:
    def __init__(self):
        self.leaves: List[str] = []
        self._root: Optional[MerkleNode] = None
        self._audit_trail: List[dict] = []
        self._salt = "OxAetherShadowUnbreakable"

    def _hash_data(self, data: str) -> str:
        return hashlib.sha256((data + self._salt).encode()).hexdigest()

    def log_event(self, actor: str, action: str, result: str) -> str:
        timestamp = datetime.now(timezone.utc).isoformat()
        event_payload = {
            "timestamp": timestamp,
            "actor": actor,
            "action": action,
            "result_sample": result[:100],
            "result_full_hash": hashlib.sha256(result.encode()).hexdigest()
        }
        event_json = json.dumps(event_payload, sort_keys=True)
        event_hash = self._hash_data(event_json)
        self.leaves.append(event_hash)
        self._audit_trail.append(event_payload)
        self._rebuild_tree()
        logger.info(f"AUDIT | Evento registrado: {event_hash[:8]}... | Actor: {actor}")
        return event_hash

    def _build_tree_recursive(self, hashes: List[str]) -> MerkleNode:
        if not hashes:
            return MerkleNode(hash=self._hash_data(""))
        if len(hashes) == 1:
            return MerkleNode(hash=hashes[0], data=hashes[0])
        mid = len(hashes) // 2
        left_node = self._build_tree_recursive(hashes[:mid])
        right_node = self._build_tree_recursive(hashes[mid:])
        combined_hash = hashlib.sha256((left_node.hash + right_node.hash).encode()).hexdigest()
        return MerkleNode(hash=combined_hash, left=left_node, right=right_node)

    def _rebuild_tree(self):
        self._root = self._build_tree_recursive(self.leaves)

    def get_root_hash(self) -> str:
        return self._root.hash if self._root else ""

    def verify_integrity(self) -> bool:
        if not self.leaves: return True
        temp_root = self._build_tree_recursive(self.leaves)
        return temp_root.hash == self._root.hash

# =============================================================================
# 2. MODELOS DE DOMINIO Y VALIDACIÓN
# =============================================================================

def validate_sovereign_vocabulary(v: str) -> str:
    forbidden = ["barato", "descuento", "tratar", "ojalá", "servicio", "costo"]
    normalized = v.lower()
    found_violations = []
    for word in forbidden:
        if re.search(r'\b' + re.escape(word) + r'\b', normalized):
            found_violations.append(word)
    if found_violations:
        raise ValueError(f"VIOLACIÓN DE PROTOCOLO: Palabras prohibidas detectadas -> {found_violations}.")
    return v

SovereignString = Annotated[str, AfterValidator(validate_sovereign_vocabulary)]

class AgentResponse(BaseModel):
    agent_id: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    content: SovereignString
    metadata: Dict[str, Any] = Field(default_factory=dict)
    audit_hash: str

# =============================================================================
# 3. MOTORES DE AGENTES
# =============================================================================

class BaseAgent(ABC):
    def __init__(self, auditor: ForensicAuditor):
        self.auditor = auditor
        self.identity = "UNKNOWN_AGENT"

    @abstractmethod
    async def process(self, context: InstructionalSegment) -> AgentResponse:
        pass

class LazarusArchitect(BaseAgent):
    def __init__(self, auditor: ForensicAuditor):
        super().__init__(auditor)
        self.identity = "LAZARUS_ARCHITECT_L5"

    async def process(self, context: InstructionalSegment) -> AgentResponse:
        logger.info(f"{self.identity} | Iniciando Protocolo Lazarus...")
        dockerfile = "FROM python:3.8-slim-buster\nWORKDIR /app\nCOPY . /app\nRUN pip install fastapi\nCMD [\"uvicorn\", \"app:app\"]"
        audit_hash = self.auditor.log_event(self.identity, "LEGACY_TRANSFORMATION", dockerfile)
        return AgentResponse(agent_id=self.identity, content=dockerfile, audit_hash=audit_hash)

class GovernanceSentinel(BaseAgent):
    def __init__(self, auditor: ForensicAuditor):
        super().__init__(auditor)
        self.identity = "GOVERNANCE_SENTINEL"

    async def process(self, context: InstructionalSegment) -> AgentResponse:
        logger.info(f"{self.identity} | Analizando Scope Creep...")
        triggers = ["cambio pequeño", "rápido", "solo esto más", "agrégalo", "sin costo", "detalle", "gratis", "cambio adicional"]
        if any(t in context.content.lower() for t in triggers):
            response_text = "ASUNTO: NOTIFICACIÓN DE CONTROL DE CAMBIOS (CR-001)\nSolicitud excede el alcance. Se requiere inversión adicional."
            meta_risk = "HIGH_RISK_SCOPE_CREEP"
        else:
            response_text = "Solicitud validada. Procediendo."
            meta_risk = "NORMAL_OPERATION"
        audit_hash = self.auditor.log_event(self.identity, "SCOPE_DEFENSE", response_text)
        return AgentResponse(agent_id=self.identity, content=response_text, metadata={"risk_level": meta_risk}, audit_hash=audit_hash)

class PotEngine(BaseAgent):
    def __init__(self, auditor: ForensicAuditor):
        super().__init__(auditor)
        self.identity = "SIGMA_FINANCE_CORE"

    async def process(self, context: InstructionalSegment) -> AgentResponse:
        logger.info(f"{self.identity} | Iniciando PoT...")
        try:
            match = re.search(r'\{.*\}', context.content, re.DOTALL)
            if match:
                data = json.loads(match.group(0))
            else:
                raise ValueError("JSON inválido")
            rev, costs, tax = float(data.get("revenue", 0)), float(data.get("costs", 0)), float(data.get("tax_rate", 0.3))
            net = (rev - costs) * (1 - tax)
            out = f"REPORTE FINANCIERO\nIngresos: ${rev}\nUtilidad Neta: ${net}"
        except Exception as e:
            out = f"ERROR: {e}"
        audit_hash = self.auditor.log_event(self.identity, "FINANCE_CALC", out)
        return AgentResponse(agent_id=self.identity, content=out, audit_hash=audit_hash)

# =============================================================================
# 4. ORQUESTADOR
# =============================================================================

class NexusEngine:
    def __init__(self):
        self.auditor = ForensicAuditor()
        self.agents = {
            "LAZARUS": LazarusArchitect(self.auditor),
            "SENTINEL": GovernanceSentinel(self.auditor),
            "FINANCE": PotEngine(self.auditor)
        }

    async def process_request(self, raw_input: str) -> AgentResponse:
        purified = re.sub(r'\(.*?\)', '', raw_input).strip()
        segment = InstructionalSegment(content=purified, level=SecurityLevel.USER)
        content = segment.content.lower()
        if any(x in content for x in ["legacy", "migrar"]): agent = "LAZARUS"
        elif any(x in content for x in ["alcance", "cambio", "gratis"]): agent = "SENTINEL"
        elif any(x in content for x in ["ingresos", "revenue", "json"]): agent = "FINANCE"
        else: return AgentResponse(agent_id="SYSTEM", content="No reconocido.", audit_hash="")
        return await self.agents[agent].process(segment)

# =============================================================================
# 5. EJECUCIÓN INTERACTIVA EN PYDROID 3
# =============================================================================

async def main():
    print("\n" + "="*50)
    print(" LLAVE MÁSTER GOLD V2.0 - INICIADA EN PYDROID 3")
    print("="*50 + "\n")
    engine = NexusEngine()

    print("Escribe tus consultas para probar el sistema (escribe 'salir' para terminar).\n")
    print("Ejemplos que puedes probar:")
    print("1. 'Necesito migrar este legacy a Python 3'")
    print("2. 'Haz este cambio pequeño gratis'")
    print("3. '{\"revenue\": 50000, \"costs\": 10000}'\n")

    while True:
        try:
            req = input("\n[TU MENSAJE]: ")
            if req.lower().strip() in ["salir", "exit", "quit"]:
                break

            response = await engine.process_request(req)
            print(f"\n[RESPUESTA DE {response.agent_id}]:\n{response.content}")
            print(f"[HASH DE AUDITORÍA]: {response.audit_hash}")
        except Exception as e:
            print(f"[ERROR]: {e}")

    print("\n=== VERIFICACIÓN FORENSE FINAL ===")
    print(f"Árbol de Merkle Válido: {engine.auditor.verify_integrity()}")
    print(f"Raíz del Sistema: {engine.auditor.get_root_hash()}")
    print("¡Hasta luego!")

if __name__ == "__main__":
    asyncio.run(main())
