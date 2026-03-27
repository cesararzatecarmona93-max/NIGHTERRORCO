import os
import shutil
import re
from pathlib import Path

# --- CONFIGURACIÓN DE TOPOLOGÍA PARA PYDROID3 ---
BASE_DIR = Path.cwd()
TARGET_DIR = BASE_DIR / "SIGMA_MASTER_RESTORED"

DIRECTORIES = {
    "CORE_GOLD":        TARGET_DIR / "00_Gold_Master_Orchestrators",
    "SECURITY_SYSVEC":  TARGET_DIR / "02_SysVec_Guardian_OCG",
    "CRYPTO_DOSSIER":   TARGET_DIR / "04_NOM151_SHA512_Merkle",
    "MARKETING_DATA":   TARGET_DIR / "05_Marketing_Cuantizado_Logs",
    "RAW_CODE":         TARGET_DIR / "06_Misc_Legacy"
}

# Extensiones ignoradas explícitas (basura o multimedia que corrompe lecturas en Android)
IGNORE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.mp4', '.mp3', '.pdf', '.docx', '.zip', '.rar', '.db', '.sqlite'}

# Extensiones de texto que procesaremos para buscar ADN (seguras)
TEXT_EXTENSIONS = {'.py', '.json', '.txt', '.md', '.ipynb', '.yaml', '.yml', '.csv', '.log', '.html', '.css', '.js', '.sh'}

# Patrones de ADN compilados en memoria
DNA_PROFILES = {
    "CORE_GOLD": re.compile(r"llave_gold_master|orquestador|sigmasl5|framework", re.I),
    "SECURITY_SYSVEC": re.compile(r"sysvec|guardian|v_sys|inyeccion_ortogonal|context_eng", re.I),
    "CRYPTO_DOSSIER": re.compile(r"nom[- s]?15|sha-?512|rfcs3161|blockchain|ledger", re.I),
    "MARKETING_DATA": re.compile(r"marketings*cuantisado|valoracion|gtm|sales_deck", re.I),
}

MAX_READ_SIZE = 256 * 1024 # Solo leer primeros 256KB para evitar colapso de RAM

def initialize_spaces():
    print(f"[*] Inicializando espacios de resurrección en: {TARGET_DIR.name}")
    for path in DIRECTORIES.values():
        path.mkdir(parents=True, exist_ok=True)

def safe_rename(target_dir: Path, filename: str) -> Path:
    """Evita sobrescribir archivos (colisión de nombres). Devuelve una ruta única."""
    base_target = target_dir / filename
    if not base_target.exists():
        return base_target

    # Si existe `main.py`, intentamos `main_1.py`, `main_2.py`, etc.
    stem = base_target.stem
    ext = base_target.suffix
    counter = 1

    while True:
        new_name = f"{stem}_{counter}{ext}"
        new_target = target_dir / new_name
        if not new_target.exists():
            return new_target
        counter += 1

def extract_dna(file_path: Path) -> str:
    """Clasifica por ADN sin leer archivos binarios y con un tope máximo."""
    ext = file_path.suffix.lower()

    if ext in IGNORE_EXTENSIONS:
        return "RAW_CODE"  # O podrías omitir copiarlo por completo si lo prefieres

    if ext not in TEXT_EXTENSIONS:
        return "RAW_CODE"

    try:
        # Pydroid puede crashear si intentamos meter 50MB a la memoria
        if file_path.stat().st_size > MAX_READ_SIZE * 5:
            return "RAW_CODE"

        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read(MAX_READ_SIZE).lower()

        for category, pattern in DNA_PROFILES.items():
            if pattern.search(content):
                return category
    except Exception:
        pass
    return "RAW_CODE"

def run_resurrection():
    initialize_spaces()
    count = 0
    print("[!] Iniciando escaneo profundo... (Limitado a texto)")

    # Evitamos imprimir TODO para que la terminal de Pydroid3 no de lag
    for root, dirs, files in os.walk(BASE_DIR):
        # Ignorar la propia carpeta de destino y el entorno git
        if TARGET_DIR.name in root or '.git' in root:
            continue

        for file in files:
            source = Path(root) / file

            # Opcional: Saltar archivos inútiles totalmente
            if source.suffix.lower() in IGNORE_EXTENSIONS:
                continue

            category = extract_dna(source)
            target_dir = DIRECTORIES.get(category, DIRECTORIES["RAW_CODE"])

            # Anti-colisiones de nombres
            target_file = safe_rename(target_dir, file)

            try:
                shutil.copy2(source, target_file)
                # print(f"[+] {file} -> {category} (as {target_file.name})") # Comentar para no saturar log
                count += 1

                # Barra de progreso visual minimalista
                if count % 50 == 0:
                    print(f"  ... {count} archivos analizados y copiados")

            except Exception as e:
                pass # Silencioso en Pydroid para no trabarlo

    print(f"\n[FIN EXCELENCIA] {count} activos intelectuales organizados sin pérdida de datos.")

if __name__ == "__main__":
    run_resurrection()
