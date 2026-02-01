from html.parser import HTMLParser

class H2Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.titles = []
        self.in_h2 = False

    def handle_starttag(self, tag, attrs):
        if tag == 'h2':
            self.in_h2 = True

    def handle_endtag(self, tag):
        if tag == 'h2':
            self.in_h2 = False

    def handle_data(self, data):
        if self.in_h2:
            self.titles.append(data)

def scrape_h2_titles(html_content):
    parser = H2Parser()
    parser.feed(html_content)
    return parser.titles
