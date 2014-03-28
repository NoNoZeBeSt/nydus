#!/usr/bin/env python
# -*- coding: utf-8 -*-
import urllib2
import re
import json

addressBase='http://www.zagaz.com/station.php?id_s='
carteBase='http://www.zagaz.com/carte.php?id_s='

def getGoodPart(linesList):
	debut=re.compile('<table border="0" class="render_station">')
	fin=re.compile('(.*)</table>')
	goodPart=[]
	writeIt=False
	goHome=False
	cptEnd=0
	for line in linesList:
		#print line
		#print debut.match(line)
		if(not writeIt):
			if(debut.match(line)):
				writeIt=True
			
		else:
			if(fin.match(line)):
					cptEnd+=1
					if cptEnd==2:
						goHome=True
			else:
				goodPart.append(line.decode('latin-1').encode("utf-8"))
		if(goHome):
			return goodPart
	return goodPart
		

def getNom(liste):
	td=re.compile("(.*)<td( class=(.*))?>")
	cptTd=0
	sendNext=False
	strip=re.compile("<p>(?P<nomStation>.*) - <strong>(?P<localisation>.*)</strong></p>")
	for i in liste:
		if sendNext:
			return [strip.search(i).group('nomStation'),strip.search(i).group('localisation')]
		if(td.match(i)):
			cptTd+=1
		if cptTd==2:
			sendNext=True
	return "Error"
		
#Latitude: 43.729997, longitude: 7.185539
def getPosition(liste):
	pos=re.compile("(.*)Latitude: (?P<latitude>[0-9]+\.[0-9]+), longitude: (?P<longitude>[0-9]+\.[0-9]+)")
	for i in liste:
		if pos.match(i):
			return [pos.search(i).group('latitude'),pos.search(i).group('longitude')]

def getAddress(liste):
	clearp=re.compile('(.*)<p class="clear">')
	addr=[]
	for i in range(len(liste)):
		if(clearp.match(liste[i])):
			addr=[liste[i+1].replace("\t",""),liste[i+2].replace("\t","")]
			break
	addr[0]=addr[0].replace('<br/>','')
	form=re.compile('(?P<cp>[0-9]+) <a (.*)>(?P<ville>.*)</a>')
	tmp=form.search(addr[1])
	addr[1]=tmp.group('cp')+" "+tmp.group('ville')
	return addr

#print file.info()
#file=urllib2.urlopen(addressBase+"3488")
#print file.info()
file=urllib2.urlopen(addressBase+"13045")
lines=file.read().split("\n")

#print "\n".join(getGoodPart(lines))
#gp=getGoodPart(lines)
#print getNom(gp)
#print getAddress(gp)
#file=urllib2.urlopen(carteBase+"13045")
#lines=file.read().split("\n")
#print getPosition(lines)
theWhole=[]
for i in range(0,13045):
	ll=divmod(i,1000)
	if(ll[1]==0):
		print (i/13045)*100
		
	file=urllib2.urlopen(addressBase+str(i))
	lines=file.read().split("\n")
	gp=getGoodPart(lines)
	if(gp!=[]):
		tmp={}
		tmp['id']=i
		tmp['nom']=getNom(gp)
		tmp['adresse']=getAddress(gp)
		file2=urllib2.urlopen(carteBase+"13045")
		lines2=file2.read().split("\n")
		tmp['position']=getPosition(lines2)
		theWhole.append(tmp)
file=open("listeZagaz.json","w")	
#print theWhole
data=json.dumps(theWhole)
file.write(data)
file.close()