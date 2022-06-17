import json
import requests
import pymongo
from pymongo import MongoClient
import pickle
from flask import Flask, jsonify,request
from flask_cors import CORS;
from flask import json


def initilaizeClient():
    global client
    client=MongoClient('localhost',27017)
    global db
    db=client['Binary-beast']


def fetchUsers():
    x=list(db.users.find({}))
    print(x)
    return pd.DataFrame(client['Binary-beast'].users.find({}))

def fetchTest(p_id):
    return pd.DataFrame(db.tests.find({'p_id':int(p_id)}))

def postTestData(data):
    #loading the model for prediction
    model = pickle.load(open('DSSModel.pkl','rb'))
    #Predict function here
    data['consultation_recommended']=True
    return db.tests.insert(data)
    
def fetchTestQuestions(test_id):
    return pd.DataFrame(db.test_questions.find({"test_id":int(test_id)}))  

def registerUser(data):
    db.users.insert(data)
    
#API'S for the frontend

app = Flask(__name__)

# api=Api(app)
CORS(app)
initilaizeClient()


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
    #p_id,test_id,q1..q20, calculate consultation_recommended
    response=request.json
    test_results=postTestData(response)
    
    response = app.response_class(
        response=json.dumps("Saved"),
        status=200,
        mimetype='application/json'
    )
    
    return response

@app.route("/registerUsers",methods=['GET','POST'])
def registerUsers():
    response=request.json
    registerUsers(response)
    
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