#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
#CAS Number verification

def checkCas(nb):
    num=nb.replace("-","")
    check=num[-1]
    l=len(num)-1
    num=num[0:l]
    summ=0
    for i in range(0,l):
        summ=summ+(int(num[i])*(l-i))
    return (summ%10 == int(check))

if len(sys.argv)<2:
    print "Usage : script <cas number>"
    print "Will print True or False, depending wether the cas number is valid"
else:
    print sys.argv[1],":",checkCas(sys.argv[1])
