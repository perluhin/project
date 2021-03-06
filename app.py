#!/usr/bin/python
# *-*coding: utf-8 *-*

from flask import Flask,render_template, request,json,jsonify
import time
import os
import math
import random


app = Flask(__name__)

@app.route('/')
def hello():
	return render_template('index.html')


@app.route('/word', methods=['POST'])
def ajaxWord():
	f = open('static/data/word.txt', 'r')
	word_list = []
	for line in f:
	    word_list.append(line.split('\t'))
	f.close()

	#step = math.floor(len(word_list)/100)
	step = math.floor(2500/100)
	count = 0
	random_word = []
	dict_random_word = {}
	for i in xrange(100):
		random_number = random.randint(count,count+step)
		count +=step
		random_word.append(word_list[random_number])
		dict_random_word[word_list[random_number][0]] = word_list[random_number]

	
	return jsonify( success = True, word_list=random_word, dict_random_word = dict_random_word )
	#return json.dumps(Fr)


if __name__=="__main__":
	app.run(debug=True)
	
