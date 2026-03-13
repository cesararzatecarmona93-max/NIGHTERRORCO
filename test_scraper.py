import unittest
from scraper import scrape_h2_titles

class TestWebScraper(unittest.TestCase):
    def test_extract_h2_titles(self):
        # HTML simulado
        html_simulado = "<html><body><h2>Título 1</h2><h2>Título 2</h2></body></html>"

        # Ejecutar la función
        resultado = scrape_h2_titles(html_simulado)

        # Verificar el resultado
        esperado = ['Título 1', 'Título 2']
        self.assertEqual(resultado, esperado)

if __name__ == '__main__':
    unittest.main()
