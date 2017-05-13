from lxml import html
import lxml
import requests

cls = "Spy"

page = requests.get("https://wiki.teamfortress.com/wiki/" + cls + "_voice_commands")
tree = html.fromstring(page.content)

texts = tree.xpath('//table[@class="headertemplate"]/tr/td[@style="padding:5px"]/ul/li/a[@class="internal"]')
links = tree.xpath('//table[@class="headertemplate"]/tr/td[@style="padding:5px"]/ul/li/a[@class="internal"]/@href')

texts = [el.text_content() for el in texts]
links = [link.split("?")[0] for link in links]

for i in range(0, len(texts)):
    text = "\"" + texts[i].replace("\"", "") + "\""
    print("{\"cls\": \"" + cls + "\", \"text\": " + text + ", \"link\": \"https://wiki.teamfortress.com" + links[i] + "\"},")
