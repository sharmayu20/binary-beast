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

df = pd.read_csv('/content/drive/MyDrive/data.csv', sep=r'\t', engine='python')

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

from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
cat = train_dep['Category']
train_dep.drop('Category', inplace=True, axis=1)


Xtrain,Xtest,ytrain,ytest = train_test_split(train_dep, cat, train_size=0.75,random_state=2)

import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix

from sklearn.ensemble import RandomForestClassifier
model1 = RandomForestClassifier(random_state=0)
model1.fit(Xtrain,ytrain)

predictions = model1.predict(Xtest)
#f1_score(ytest,predictions, average = 'micro')
