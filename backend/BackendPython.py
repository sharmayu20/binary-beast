#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
import numpy as np 
import pandas as pd
import seaborn as sn
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix
from sklearn.metrics import plot_confusion_matrix
from sklearn.metrics import f1_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier

import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB


# In[ ]:


df = pd.read_csv('data.csv', sep=r'\t', engine='python')

DASS_keys = {'Depression': [3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42],
             'Anxiety': [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41],
             'Stress': [1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39]}

DASS_bins = {'Depression': [(0, 10), (10, 14), (14, 21), (21, 28)],
             'Anxiety': [(0, 8), (8, 10), (10, 15), (15, 20)],
             'Stress': [(0, 15), (15, 19), (19, 26), (26, 34)]}


only_q = df.filter(regex='Q\d{1,2}A')

def sub(df):
    return df.subtract(1, axis=1)

dep = []
for i in DASS_keys["Depression"]:
    dep.append('Q'+str(i)+'A')
stress = []
for i in DASS_keys["Stress"]:
    stress.append('Q'+str(i)+'A')
anx = []
for i in DASS_keys["Anxiety"]:
    anx.append('Q'+str(i)+'A')

depression_q = only_q.filter(dep)
stress_q = only_q.filter(stress)
anxiety_q = only_q.filter(anx)

depression_q = sub(depression_q)
stress_q = sub(stress_q)
anxiety_q = sub(anxiety_q)


# In[ ]:


def scores(df):
    col = list(df)
    df["Scores"] = df[col].sum(axis=1)
    return df

train_dep = scores(depression_q)
train_str = scores(stress_q)
train_anx = scores(anxiety_q)

def append(df, string):
    conditions = [
    ((df['Scores'] >= DASS_bins[string][0][0])  & (df['Scores'] < DASS_bins[string][0][1])),
    ((df['Scores'] >= DASS_bins[string][1][0])  & (df['Scores'] < DASS_bins[string][1][1])),
    ((df['Scores'] >= DASS_bins[string][2][0])  & (df['Scores'] < DASS_bins[string][2][1])),
    ((df['Scores'] >= DASS_bins[string][3][0])  & (df['Scores'] < DASS_bins[string][3][1])),
    (((df['Scores'] >= DASS_bins[string][3][1])))
    ]
    values = ['Normal','Mild', 'Moderate', 'Severe', 'Extremely Severe']
    df['Category'] = np.select(conditions, values)
    return df
    
train_dep = append(train_dep, 'Depression')

train_anx = append(train_dep, 'Anxiety')


cat = train_dep['Category']
train_dep.drop('Category', inplace=True, axis=1)


Xtrain,Xtest,ytrain,ytest = train_test_split(train_dep, cat, train_size=0.75,random_state=2)


model1 = RandomForestClassifier(random_state=0)
model1.fit(Xtrain,ytrain)

predictions = model1.predict(Xtest)

# print(predictions.head(5))
#f1_score(ytest,predictions, average = 'micro')


# In[ ]:


import json
import requests
import pymongo
from pymongo import MongoClient
##import mongoengine
import json
import requests
import pickle
import datetime
from flask import Flask, jsonify,request,url_for,redirect,send_from_directory;
from flask_cors import CORS;
import math
#import json
from flask import json


# In[ ]:


global client,db

def fetchUsers():
    client=MongoClient('localhost',27017)
    db=client['Binary-beast']
    x=list(db.users.find({}))
    print(x)
    return pd.DataFrame(client['Binary-beast'].users.find({}))

def fetchTest(p_id):
    print(p_id)
    client=MongoClient('localhost',27017)
    db=client['Binary-beast']
    return pd.DataFrame(db.tests.find({'p_id':int(p_id)}))

def postTestData(data):
    client=MongoClient('localhost',27017)
    db=client['Binary-beast']
    #logic for prediction here 
    data['consultation_recommended']=True
    return db.tests.insert(data)
    
def fetchTestQuestions(test_id):
    client=MongoClient('localhost',27017)
    db=client['Binary-beast']
    return pd.DataFrame(db.test_questions.find({'test_id':int(test_id)}))    


# In[ ]:


#API'S for the frontend

app = Flask(__name__,static_folder='static' ,static_url_path='/static')

# api=Api(app)
CORS(app)
client=MongoClient('localhost',27017)
db=client['binary-beast']


@app.route("/getUsers",methods=['GET'])
def getUsers():
    #Get all customers from the db
    df1=fetchUsers()   
    if '_id' in df1.columns:
        del df1['_id']
  
    return df1.to_json(orient ='records')

@app.route("/getPastTest",methods=['GET','POST'])
def getTest():
    response=request.json
    print(response)
    past_tests=fetchTest(response['p_id'])
    
    if '_id' in past_tests.columns:
        del past_tests['_id']
    
    return past_tests.to_json(orient ='records')

@app.route("/postTest",methods=['GET','POST'])
def postTestRow():
    #p_id,test_id,marks, calculate consultation_recommended
    response=request.json
    test_results=postTestData(response)
    
    response = app.response_class(
        response=json.dumps("Saved"),
        status=200,
        mimetype='application/json'
    )
    
    return response

@app.route("/getTestQuestions",methods=['GET','POST'])
def getTestQuestions():
    response=request.json
    print(response)
    test_questions=fetchTestQuestions(response['test_id'])
    
    if '_id' in test_questions.columns:
        del test_questions['_id']
    
    return test_questions.to_json(orient ='records')
     

if __name__ == '__main__':
    app.run()


# In[ ]:




