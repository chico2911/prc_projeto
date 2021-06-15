import json

characters = []

f = open('marvel_characters_info.csv', 'r',encoding='utf-8')

linhas = f.readlines()
for i in range(1,len(linhas)):
    campos = linhas[i].strip().split(',')
    if campos[7] == 'Marvel Comics':
        character = {
            'id': campos[0],
            'name': campos[1],
            'alignment':campos[2],
            'gender':campos[3],
            'eyecolor':campos[4],
            'race':campos[5],
            'haircolor':campos[6],
            'publisher':campos[7],
            'skincolor':campos[8],
            'height':campos[9],
            'weight':campos[10]
        }
        characters.append(character)

print(len(characters))


caractersNameIdFile = open('characters.csv', 'r',encoding='utf-8')
linhas = caractersNameIdFile.readlines()

saveName = []

for i in range(1,len(linhas)):
    campos = linhas[i].strip().split(',')
    saveName.append(campos[1])
    for j in range(0,len(characters)):
        if characters[j]['name'] == campos[1]:
            characters[j]['id'] = campos[0]
            break


fp = open('characters.json','w')
json.dump(characters, fp,indent=4)