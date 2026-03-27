import os
import re
from pathlib import Path
from datetime import datetime

# --- CONFIGURACIÓN PARA PYDROID3 / ANDROID ---
SEARCH_ROOTS = [
    "/storage/emulated/0",          # Almacenamiento interno principal
    "/sdcard",                       # Alias común
    os.path.expanduser("~"),         # Home
]

# Palabras clave
KEYWORDS_FILENAME = re.compile(
    r"crypto|wallet|bitcoin|btc|eth|ethereum|seed|mnemonic|"
    r"private.?key|keystore|metamask|ledger|trezor|binance|"
    r"coinbase|usdt|solana|sol|bnb|xrp",
    re.IGNORECASE
)

KEYWORDS_CONTENT = re.compile(
    r"private.?key|seed.?phrase|mnemonic|wallet.?address|"
    r"0x[0-9a-fA-F]{40}|"           # Dirección Ethereum
    r"[13][a-km-zA-HJ-NP-Z1-9]{25,34}|"  # Dirección Bitcoin
    r"crypto|wallet|bitcoin|ethereum|metamask|keystore",
    re.IGNORECASE
)

# Extensiones de texto (evitamos binarios y multimedia para no gastar RAM)
TEXT_EXTENSIONS = {'.txt', '.json', '.md', '.csv', '.yaml', '.yml',
                   '.py', '.js', '.ts', '.html', '.xml', '.log',
                   '.key', '.pem', '.env', '.conf', '.cfg', '.ini'}

# Carpetas a saltar para mejorar rendimiento extremo
SKIP_DIRS = {
    # Sistema
    'Android', 'proc', 'sys', 'dev', 'acct', 'cache', '.cache',
    # Multimedia pesada de Android (sin texto útil de crypto usualmente)
    'DCIM', 'Pictures', 'Movies', 'Music', 'Podcasts', 'Audiobooks', 'Alarms', 'Ringtones', 'Notifications',
    'WhatsApp', 'Telegram' # Opcional: a veces hay DBs aquí pero son binarias
}

MAX_READ_SIZE = 512 * 1024  # Leer máximo 512 KB por archivo para evitar OOM (Out Of Memory) en Pydroid3

RESULTS = []

def scan_file_content(file_path: Path) -> bool:
    """Retorna True si el contenido del archivo contiene palabras clave (Lectura segura por tamaño)."""
    try:
        # Evitar abrir archivos extremadamente grandes para no crashear la app Pydroid3
        if file_path.stat().st_size > MAX_READ_SIZE * 5: # Si es mayor a 2.5MB lo saltamos directamente
            return False

        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read(MAX_READ_SIZE)
            if KEYWORDS_CONTENT.search(content):
                return True
    except Exception:
        pass
    return False

def run_crypto_scan():
    print("=" * 55)
    print("  CRYPTO/WALLET SCANNER — NIGHTERRORCO Edition [OPTIMIZADO]")
    print(f"  Inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 55)

    visited = set()

    for root_path in SEARCH_ROOTS:
        root = Path(root_path)
        if not root.exists():
            continue

        real_path = str(root.resolve())
        if real_path in visited:
            continue
        visited.add(real_path)
        print(f"\n[>] Escaneando: {root}")

        for dirpath, dirnames, files in os.walk(root, topdown=True):
            # Poda de directorios del sistema y multimedia
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith('.')]

            for filename in files:
                file_path = Path(dirpath) / filename
                matched_by = None

                # 1. Match por nombre de archivo
                if KEYWORDS_FILENAME.search(filename):
                    matched_by = "NOMBRE"

                # 2. Match por contenido (solo archivos de texto de tamaño seguro)
                elif file_path.suffix.lower() in TEXT_EXTENSIONS:
                    if scan_file_content(file_path):
                        matched_by = "CONTENIDO"

                if matched_by:
                    size = "?"
                    try:
                        size = f"{file_path.stat().st_size / 1024:.1f} KB"
                    except Exception:
                        pass

                    result = {
                        "archivo": filename,
                        "ruta": str(file_path),
                        "deteccion": matched_by,
                        "tamaño": size
                    }
                    RESULTS.append(result)
                    print(f"  [MATCH-{matched_by}] {filename} ({size})")

    # --- REPORTE FINAL ---
    print("\n" + "=" * 55)
    print(f"  SCAN COMPLETO — {len(RESULTS)} archivos encontrados")
    print("=" * 55)

    if RESULTS:
        report_dir = Path("/storage/emulated/0/Download")
        if not report_dir.exists():
            report_dir = Path(os.path.expanduser("~")) # Fallback si no hay descargas

        report_path = report_dir / "crypto_scan_report_opt.txt"

        try:
            with open(report_path, "w", encoding="utf-8") as f:
                f.write(f"CRYPTO/WALLET SCAN REPORT [OPTIMIZADO]\n")
                f.write(f"Fecha: {datetime.now().isoformat()}\n")
                f.write(f"Total encontrados: {len(RESULTS)}\n\n")
                for r in RESULTS:
                    f.write(f"[{r['deteccion']}] {r['archivo']}\n")
                    f.write(f"  Ruta: {r['ruta']}\n")
                    f.write(f"  Tamaño: {r['tamaño']}\n\n")
            print(f"\n[+] Reporte guardado en: {report_path}")
        except Exception as e:
            print(f"[!] No se pudo guardar reporte en {report_path}: {e}")
            print("    (Verifica permisos de 'Todos los archivos' en Ajustes de Android -> Pydroid3)")

if __name__ == "__main__":
    run_crypto_scan()
