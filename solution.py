# AUTOR: César Arzate Carmona - Arquitecto de Software Senior & Científico de Datos Forense (Sigma L5)
# Script optimizado para entorno Pydroid 3: Gestor para mover archivos desde Descargas

import os
import sys

# Auto-install dependencies para entorno Pydroid 3
try:
    import plyer
except ImportError:
    print("Instalando dependencias...")
    os.system(f'"{sys.executable}" -m pip install plyer')
    import plyer

import shutil
import tkinter as tk
from tkinter import messagebox
from plyer import notification
from pathlib import Path

class GestorDescargasApp:
    r"""
    Gestor de Descargas Forense.

    Fórmulas base arquitectónicas:
    Inyección Ortogonal SysVec: \mathbb{P}_{\perp} h_\ell = \left( \mathbb{I} - \frac{v_{\text{sys}} v_{\text{sys}}^\top}{\| v_{\text{sys}} \|^2} \right) h_\ell
    Suma Hash de Integridad: H_{\Sigma} = \text{Hash}(f_1) \oplus \text{Hash}(f_2) \oplus \dots \oplus \text{Hash}(f_n)
    """
    def __init__(self, root):
        """Inicializa la interfaz y configura rutas compatibles con Android."""
        self.root = root
        self.root.title("Organizador Pro - C. Arzate")
        self.root.geometry("380x450")

        # Uso de Pathlib para mayor robustez en Android
        self.ruta_descargas = Path("/storage/emulated/0/Download")
        self.ruta_base_destino = Path("/storage/emulated/0")

        self.crear_interfaz()

    def crear_interfaz(self):
        """Construye la interfaz gráfica profesional."""
        # --- Estética ---
        main_frame = tk.Frame(self.root, padx=20, pady=20)
        main_frame.pack(expand=True, fill="both")

        tk.Label(main_frame, text="Gestor de Archivos Forense", font=("Arial", 14, "bold"), fg="#2c3e50").pack(pady=10)

        # --- Campo: Nombre Carpeta ---
        tk.Label(main_frame, text="Nombre de la carpeta destino:", font=("Arial", 10)).pack(anchor="w")
        self.nombre_carpeta_var = tk.StringVar(value="Archivos_Organizados")
        self.entrada_carpeta = tk.Entry(main_frame, textvariable=self.nombre_carpeta_var, font=("Arial", 11))
        self.entrada_carpeta.pack(fill="x", pady=5)

        # --- Campo: Extensión ---
        tk.Label(main_frame, text="Filtro de extensión (ej: .pdf):", font=("Arial", 10)).pack(anchor="w", pady=(10, 0))
        self.extension_var = tk.StringVar(value="")
        # Removido el parámetro placeholder no válido en tkinter
        self.entrada_extension = tk.Entry(main_frame, textvariable=self.extension_var, font=("Arial", 11))
        self.entrada_extension.pack(fill="x", pady=5)

        # --- Botón Ejecutar ---
        self.btn_mover = tk.Button(
            main_frame, text="ORGANIZAR AHORA",
            command=self.procesar_archivos,
            bg="#27ae60", fg="white",
            font=("Arial", 11, "bold"),
            height=2, cursor="hand2"
        )
        self.btn_mover.pack(fill="x", pady=25)

        # --- Estado ---
        self.lbl_estado = tk.Label(main_frame, text="Sistema listo", font=("Arial", 9, "italic"), fg="gray")
        self.lbl_estado.pack()

    def procesar_archivos(self):
        """Lógica de negocio para el movimiento seguro de archivos."""
        nombre_carpeta = self.nombre_carpeta_var.get().strip()
        extension = self.extension_var.get().strip().lower()

        if not nombre_carpeta:
            messagebox.showwarning("Atención", "Define un nombre de carpeta válido.")
            return

        ruta_destino_final = self.ruta_base_destino / nombre_carpeta

        try:
            # Crear carpeta si no existe
            if not ruta_destino_final.exists():
                ruta_destino_final.mkdir(parents=True, exist_ok=True)

            if not self.ruta_descargas.exists():
                raise FileNotFoundError("La carpeta de descargas no es accesible.")

            archivos_movidos = 0
            for item in self.ruta_descargas.iterdir():
                if item.is_file():
                    # Lógica de filtrado
                    if not extension or item.suffix.lower() == extension or (not extension.startswith('.') and f".{extension}" == item.suffix.lower()):

                        target_file = ruta_destino_final / item.name

                        # Evitar error si el archivo ya existe en destino
                        if not target_file.exists():
                            shutil.move(str(item), str(target_file))
                            archivos_movidos += 1

            # --- Feedback Final ---
            resultado = f"Éxito: {archivos_movidos} archivos movidos."
            self.lbl_estado.config(text=resultado, fg="#1e8449")
            messagebox.showinfo("Proceso Completo", resultado)

            # Notificación Nativa (Protegida contra el error de Flags de Android)
            try:
                notification.notify(
                    title="Organizador Pydroid",
                    message=resultado,
                    timeout=5
                )
            except Exception:
                # Si falla por los flags de Android, ignoramos para no interrumpir
                pass

        except PermissionError:
            messagebox.showerror("Error", "Permiso denegado. Activa 'Acceso a todos los archivos' en Pydroid 3.")
        except Exception as e:
            messagebox.showerror("Fallo Crítico", f"Detalle: {str(e)}")

def main():
    root = tk.Tk()
    # Centrar ventana en pantalla (simulado para móviles)
    app = GestorDescargasApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
