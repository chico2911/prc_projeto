import json
import timeit


characters = []

file = open('superheroes_power_matrix.csv')

stats = file.readlines()

cam = stats[0].strip().split(',')

for i in range(1,len(cam)):
    characters.append(cam[i])

charactersFile = open('powers.json','w')
json.dump(characters, charactersFile,indent=4)
