import os
import shutil
import datetime
import logging
import sys

# --- CONFIGURACIÓN ---
# Define aquí las rutas de tu Android
SOURCE_DIR = "/sdcard/Download"
DEST_DIR = "/sdcard/Organized_Files"

# Categorías y palabras clave
# Puedes editar esto según tus necesidades
KEYWORDS = {
    "Arquitectura": ["plano", "corte", "fachada", "dwg", "autocad", "arquitect", "structural"],
    "Vidrios": ["vidrio", "cristal", "templado", "laminado", "espejo", "ventan", "glass"],
    "Presupuestos": ["presupuesto", "cotizacion", "costo", "precio", "factura", "invoice"],
    "Imagenes": ["jpg", "jpeg", "png", "heic", "webp", "gif", "bmp"],
    "Documentos": ["pdf", "doc", "docx", "xls", "xlsx", "txt", "ppt", "pptx"],
    "Videos": ["mp4", "mov", "avi", "mkv"]
}

# Configuración de Logging
logging.basicConfig(
    filename='organizer.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def get_file_date(entry):
    """Obtiene la fecha de modificación del archivo."""
    try:
        timestamp = entry.stat().st_mtime
        return datetime.datetime.fromtimestamp(timestamp)
    except Exception:
        return datetime.datetime.now()

def get_category(filename):
    """Determina la categoría basada en palabras clave o extensión."""
    lower_name = filename.lower()

    # 1. Búsqueda por palabras clave (Prioridad)
    for category, terms in KEYWORDS.items():
        for term in terms:
            if term in lower_name:
                return category

    # 2. Búsqueda por extensión (Fallback)
    ext = os.path.splitext(lower_name)[1].replace('.', '')

    # Check if extension matches any keyword list (naive check)
    if ext in KEYWORDS["Imagenes"]: return "Imagenes"
    if ext in KEYWORDS["Documentos"]: return "Documentos"
    if ext in KEYWORDS["Videos"]: return "Videos"
    if ext in KEYWORDS["Arquitectura"]: return "Arquitectura" # dwg, etc

    return "Otros"

def safe_move(entry, category, date_obj):
    """Mueve el archivo evitando duplicados."""
    year = date_obj.strftime("%Y")
    month = date_obj.strftime("%m-%B") # Ejemplo: 01-Enero

    target_dir = os.path.join(DEST_DIR, category, year, month)

    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)

    filename = entry.name
    target_path = os.path.join(target_dir, filename)

    # Manejo de duplicados: renombrar archivo (1), (2), etc.
    counter = 1
    base, ext = os.path.splitext(filename)
    while os.path.exists(target_path):
        target_path = os.path.join(target_dir, f"{base}_{counter}{ext}")
        counter += 1

    try:
        shutil.move(entry.path, target_path)
        return True, target_path
    except Exception as e:
        logging.error(f"Error moviendo {entry.path}: {e}")
        return False, str(e)

def main():
    print(f"--- INICIANDO ORGANIZADOR ---")
    print(f"Origen: {SOURCE_DIR}")
    print(f"Destino: {DEST_DIR}")

    if not os.path.exists(SOURCE_DIR):
        # Fallback para pruebas locales si no estamos en Android
        print(f"Advertencia: {SOURCE_DIR} no existe. Usando directorio actual para prueba.")
        # source_dir = "."
        # En producción, esto debería detenerse
        return

    count = 0
    errors = 0

    # Scandir es un iterador, muy eficiente para miles de archivos
    with os.scandir(SOURCE_DIR) as it:
        for entry in it:
            if entry.is_file():
                try:
                    # Ignorar el script mismo y logs
                    if entry.name in ["android_smart_organizer.py", "organizer.log"]:
                        continue

                    date_obj = get_file_date(entry)
                    category = get_category(entry.name)

                    success, msg = safe_move(entry, category, date_obj)

                    if success:
                        count += 1
                        if count % 100 == 0:
                            print(f"Procesados: {count} archivos...")
                    else:
                        errors += 1

                except Exception as e:
                    logging.error(f"Error procesando {entry.name}: {e}")
                    errors += 1

    print(f"--- FINALIZADO ---")
    print(f"Total movidos: {count}")
    print(f"Errores: {errors}")
    print(f"Revisa 'organizer.log' para detalles.")

if __name__ == "__main__":
    main()
