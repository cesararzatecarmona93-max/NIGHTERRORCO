# Protocolo Genesis V2: Arquitectura de Orquestación y Llaves Maestras

Este repositorio contiene la implementación del Protocolo Genesis V2, diseñado para transmutar instrucciones crudas en Llaves Maestras de alta fidelidad y desplegar agentes especializados.

## Estructura del Proyecto

*   `genesis_v2/`: Paquete principal.
    *   `prompts.py`: Almacena los System Prompts purificados y de alta fidelidad.
    *   `agents.py`: Define la lógica de los agentes (`ContextEngineeringAgent`, `SecurityAuditorAgent`, `BusinessStrategistAgent`, `LegalAuditorAgent`).
*   `genesis_cli.py`: Interfaz de Línea de Comandos (CLI) para interactuar con los agentes.

## Agentes Disponibles

### 1. Agente de Ingeniería de Contexto (God Mode)
*   **Rol:** Apex-Level Cognitive Architect & Meta-Prompt Engineer.
*   **Función:** Optimiza prompts crudos utilizando el ciclo de purificación S2A y el marco CO-STAR.
*   **Comando:** `python genesis_cli.py context "Tu prompt crudo aquí"`

### 2. Auditor de Seguridad Black (The Elite Security Auditor)
*   **Rol:** Senior Application Security (AppSec) Engineer.
*   **Función:** Realiza auditorías SAST simuladas alineadas con OWASP Top 10 (2025).
*   **Comando:** `python genesis_cli.py security "Código o configuración a auditar"`

### 3. Arquitecto de Silos de Ventas (The Business Model Innovation Strategist)
*   **Rol:** Pricing Consultant & SaaS Business Strategist.
*   **Función:** Diseña estrategias de precios y modelos de negocio.
*   **Comando:** `python genesis_cli.py business "Descripción del producto/servicio"`

### 4. Agente Auditor Legal "Sentinel"
*   **Rol:** Auditor Legal Senior (LFPDPPP y Código de Comercio).
*   **Función:** Analiza contratos para detectar cláusulas abusivas y riesgos legales.
*   **Comando:** `python genesis_cli.py legal "Texto del contrato"`

## Uso

Para ver la ayuda general:
```bash
python genesis_cli.py --help
```

Para ejecutar un agente específico:
```bash
python genesis_cli.py <agente> "<input>"
```
Ejemplo:
```bash
python genesis_cli.py context "Quiero una IA que escriba poemas"
```
