from lxml import html
import lxml
import requests

page = requests.get("https://wiki.teamfortress.com/wiki/Halloween_Boss_voice_responses")
tree = html.fromstring(page.content)

texts = tree.xpath('//div/table[@class="headertemplate"]/tr[./preceding-sibling::tr/td/a[contains(text(), "Mann Brothers")]]/td[@style="padding:5px"]/ul/li/a[@class="internal"]')
links = tree.xpath('//div/table[@class="headertemplate"]/tr[./preceding-sibling::tr/td/a[contains(text(), "Mann Brothers")]]/td[@style="padding:5px"]/ul/li/a[@class="internal"]/@href')

texts = [el.text_content() for el in texts]
links = [link.split("?")[0] for link in links]

for i in range(0, len(texts)):
    text = "\"" + texts[i].replace("\"", "") + "\""
    print("{\"cls\": \"Mann Brothers\", \"text\": " + text + ", \"link\": \"https://wiki.teamfortress.com" + links[i] + "\"},")
