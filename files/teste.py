f = open('toAdd.ttl', 'r', encoding='utf-8')

lista = f.readlines()

f=open('toAdd1.ttl', 'w', encoding='utf-8')
for i in range(0,53316):
    f.write(lista[i])

x = open('marvel_comics.ttl')

string = x.read()

f.write('\n')

f.write(string)
