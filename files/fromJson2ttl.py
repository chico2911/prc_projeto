import json

charsF = open('characters.json')
chars = json.loads(charsF.read())
comicsF = open('comics.json')
comics = json.loads(comicsF.read())
powersF = open('powers.json')
powers = json.loads(powersF.read())

add2ttl = open('marvel_comics.ttl','w')


def getlink(id):
    return '<http://www.di.uminho.pt/prc2020/marvel_comics#'+id+'>'


prefrix = '''@prefix : <http://www.di.uminho.pt/prc2020/marvel_comics#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@base <http://www.di.uminho.pt/prc2020/marvel_comics> .

<http://www.di.uminho.pt/prc2020/marvel_comics> rdf:type owl:Ontology .

#################################################################
#    Object Properties
#################################################################

###  http://www.di.uminho.pt/prc2020/marvel_comics#apareceEm
:apareceEm rdf:type owl:ObjectProperty ;
           owl:inverseOf :temPersonagem ;
           rdfs:domain :Personagem ;
           rdfs:range :Comic .


###  http://www.di.uminho.pt/prc2020/marvel_comics#temPersonagem
:temPersonagem rdf:type owl:ObjectProperty ;
               rdfs:subPropertyOf owl:topObjectProperty ;
               rdfs:domain :Comic ;
               rdfs:range :Personagem .


###  http://www.di.uminho.pt/prc2020/marvel_comics#temPoder
:temPoder rdf:type owl:ObjectProperty ;
          rdfs:domain :Personagem ;
          rdfs:range :Power .


#################################################################
#    Data properties
#################################################################

###  http://www.di.uminho.pt/prc2020/marvel_comics#alignment
:alignment rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#combat
:combat rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#durability
:durability rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#eyecolor
:eyecolor rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#gender
:gender rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#haircolor
:haircolor rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#height
:height rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#intelligence
:intelligence rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#issueNumber
:issueNumber rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#name
:name rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#power
:power rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#publisher
:publisher rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#race
:race rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#skincolor
:skincolor rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#speed
:speed rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#strength
:strength rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#title
:title rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#total
:total rdf:type owl:DatatypeProperty .


###  http://www.di.uminho.pt/prc2020/marvel_comics#weight
:weight rdf:type owl:DatatypeProperty .


#################################################################
#    Classes
#################################################################

###  http://www.di.uminho.pt/prc2020/marvel_comics#Comic
:Comic rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2020/marvel_comics#Personagem
:Personagem rdf:type owl:Class .


###  http://www.di.uminho.pt/prc2020/marvel_comics#Power
:Power rdf:type owl:Class .


#################################################################
#    Individuals
#################################################################\n\n''' 


add2ttl.write(prefrix)





###  http://www.di.uminho.pt/prc2020/marvel_comics#Accelerated_Healing
#:Accelerated_Healing rdf:type owl:NamedIndividual ,
#                              :Power .
for power in powers:
    add2ttl.write('###  http://www.di.uminho.pt/prc2020/marvel_comics#'+ power.replace(" ","_").replace('/','_')+'\n')
    add2ttl.write(':'+power.replace(" ","_") +' rdf:type owl:NamedIndividual ,\n')
    add2ttl.write('                              :Power .\n\n')

###  http://www.di.uminho.pt/prc2020/marvel_comics#0
#<http://www.di.uminho.pt/prc2020/marvel_comics#0> rdf:type owl:NamedIndividual ,
#                                                           :Personagem ;
#                                                  :temPoder :Accelerated_Healing ;
#                                                  :alignment "good" ;
#                                                  :combat 64 ;
#                                                  :durability 80 ;
#                                                  :eyecolor "yellow" ;
#                                                  :gender "Male" ;
#                                                  :haircolor "No Hair" ;
#                                                  :height 203 ;
#                                                  :intelligence 38 ;
#                                                  :name "A-Bomb" ;
#                                                  :power 17 ;
#                                                  :publisher "Marvel Comics" ;
#                                                  :race "Human" ;
#                                                  :skincolor "-" ;
#                                                  :speed 17 ;
#                                                  :strength 100 ;
#                                                  :total 316 ;
#                                                  :weight 441 .

for char in chars:
    add2ttl.write('###  http://www.di.uminho.pt/prc2020/marvel_comics#p'+char['id']+'\n')
    add2ttl.write('<http://www.di.uminho.pt/prc2020/marvel_comics#p'+char['id']+'> rdf:type owl:NamedIndividual ,\n')
    add2ttl.write('                                                           :Personagem ;\n')
    try:
        lista = char['temPoder']
        if len(lista)>1:
            add2ttl.write('                                                  :temPoder :'+lista[0].replace(" ","_").replace('/','_')+' ,\n')
            c=1
            for i in range(1,len(lista)-1):
                add2ttl.write('                                                            :'+lista[i].replace(" ","_")+' ,\n') 
                c=i
            c+=1    
            add2ttl.write('                                                            :'+lista[c].replace(" ","_")+' ;\n') 
        else:
            add2ttl.write('                                                  :temPoder :'+lista[0].replace(" ","_")+' ;\n')       
    except:
        pass 
    try:
        lista = char['apareceEm']
        if len(lista)>1:
            add2ttl.write('                                                  :apareceEm  '+getlink('c'+lista[0])+' ,\n')
            c=1
            for i in range(1,len(lista)-1):
                add2ttl.write('                                                             '+getlink('c'+lista[i])+' ,\n') 
                c=i
            c+=1    
            add2ttl.write('                                                             '+getlink('c'+lista[c])+' ;\n') 
        else:
            add2ttl.write('                                                  :apareceEm  '+getlink('c'+lista[0])+' ;\n')       
    except:
        pass     
    try:
        add2ttl.write('                                                  :alignment "'+ char['alignment'] +'" ;\n')
    except:
        pass
    try:
        add2ttl.write('                                                  :combat '+ char['combat'] +' ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :durability '+ char['durability'] +' ;\n')
    except:
        pass     
    try:
        add2ttl.write('                                                  :eyecolor "'+ char['eyecolor'] +'" ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :gender "'+ char['gender'] +'" ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :haircolor "'+ char['haircolor'] +'" ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :height '+ char['height'] +' ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :intelligence '+ char['intelligence'] +' ;\n')
    except:
        pass
    try:
        add2ttl.write('                                                  :name "'+ char['name'] +'" ;\n')
    except:
        pass
    try:
        add2ttl.write('                                                  :power '+ char['power'] +' ;\n')
    except:
        pass
    try:
        add2ttl.write('                                                  :publisher "'+ char['publisher'] +'" ;\n')
    except:
        pass
    try:
        add2ttl.write('                                                  :race "'+ char['race'] +'" ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :skincolor "'+ char['skincolor'] +'" ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :speed '+ char['speed'] +' ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :strength '+ char['strength'] +' ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :weight '+ char['weight'] +' ;\n')
    except:
        pass 
    try:
        add2ttl.write('                                                  :total '+ char['total'] +' .\n\n')
    except:
        pass                                                                                    

###  http://www.di.uminho.pt/prc2020/marvel_comics#16232
#<http://www.di.uminho.pt/prc2020/marvel_comics#16232> rdf:type owl:NamedIndividual ,
#                                                               :Comic ;
#                                                      :temPersonagem <http://www.di.uminho.pt/prc2020/marvel_comics#0> ;
#                                                      :issueNumber 12 ;
#                                                      :title "Cap Transport (2005) #12" .

for comic in comics:
    add2ttl.write('###  http://www.di.uminho.pt/prc2020/marvel_comics#c'+ comic['comicID']+'\n')
    add2ttl.write('<http://www.di.uminho.pt/prc2020/marvel_comics#c'+comic['comicID']+'> rdf:type owl:NamedIndividual ,\n')
    add2ttl.write('                                                               :Comic ;\n')
    try:
        lista = comic['temPersonagem']
        if len(lista)>1:
            add2ttl.write('                                                  :temPersonagem  '+getlink('p'+lista[0])+' ,\n')
            c=1
            for i in range(1,len(lista)-1):
                add2ttl.write('                                                             '+getlink('p'+lista[i])+' ,\n') 
                c=i
            c+=1    
            add2ttl.write('                                                             '+getlink('p'+lista[c])+' ;\n') 
        else:
            add2ttl.write('                                                  :temPersonagem  '+getlink('p'+lista[0])+' ;\n')       
    except:
        pass     
    add2ttl.write('                                                      :issueNumber "'+str(comic['issueNumber']).replace('\"','').replace('\n','')+'" ;\n')
    add2ttl.write('                                                      :title \"'+comic['title'].replace('\"','')+'\" .\n\n')

add2ttl.write('###  Generated by the OWL API (version 4.5.9.2019-02-01T07:24:44Z) https://github.com/owlcs/owlapi')    