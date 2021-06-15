import json

charactersFile = open('characters.json')

characters = json.loads(charactersFile.read())

charactersID = []
for char in characters:
    charactersID.append(char['id'])
 
comics2keep = [] 

char2comicFile = open('charactersToComics.csv', 'r',encoding='utf-8')
char2comic = char2comicFile.readlines()

comicchars = {}

for i in range(1,len(char2comic)):
    campos = char2comic[i].strip().split(',')
    if campos[1] in charactersID:
        try:
            lista = comicchars[campos[0]]
            lista.append(campos[1])
            comicchars[campos[0]] = lista
        except:
            lista = [campos[1]]
            comicchars[campos[0]] = lista 


'''
for char in characters:
    for i in range(1, len(char2comic)):
        campos = char2comic[i].strip().split(',')
        if char['id'] == campos[1]:
            try:
                lista = char['apareceEm']
                if campos[0] not in lista:
                    lista.append(campos[0])
                    char['apareceEm'] = lista
            except :
                lista = [campos[0]]
                char['apareceEm'] = lista

fp = open('characters.json','w')
json.dump(characters, fp,indent=4) '''


charactersFile = open('comics.json')
comics = json.loads(charactersFile.read())

for comic in comics:
    try:
        id = comic['comicID']
        lista = comicchars[str(id)]
        comic['temPersonagem'] = lista
    except:
        comics.remove(comic)
        #print('Não existe na lista')

fp = open('comics.json','w')
json.dump(comics, fp,indent=4)
