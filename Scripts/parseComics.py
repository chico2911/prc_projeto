import re,json

comics = []

file = open('comics1.csv', 'r', encoding='utf-8')

string =file.read()

string = re.sub('\n([0-9]+-)','\1',string)

file.close()

file = open('comics1.csv', 'w', encoding='utf-8')

file.write(string)
file.close()
file = open('comics1.csv', 'r', encoding='utf-8')

string = file.readlines()

print(string[1])

for i in range(0,len(string)):
    campos = string[i].split(',')
    comic = {
            'comicID':'c'+campos[0],
            'title':campos[1],
            'issueNumber':campos[2]
        }
    comics.append(comic)

fp = open('comics.json','w', encoding='utf-8')

json.dump(comics, fp)
