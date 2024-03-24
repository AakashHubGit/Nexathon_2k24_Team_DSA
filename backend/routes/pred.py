from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_squared_error
from sklearn.model_selection import train_test_split, GridSearchCV
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# !pip install --upgrade scikit-learn

df=pd.read_csv("Mumbai House Prices.csv")

df.head()

df.isnull().sum()

df1=df.drop("locality",axis=1)

df2=df1.drop("age",axis=1)

df2.head()

df2['bhk'].unique()

df2['type'].unique()

df2['region'].unique()

selected_regions = ['Andheri West','Andheri East','Bandra East','Bandra West','Bandra' ,'Thane West','Thane East','Ghatkopar East','Ghatkopar West','Lower Parel']

# Filter the dataset to include only the rows with selected regions
df3 = df2[df2['region'].isin(selected_regions)]

print(df3)

df3['region'].unique()

df3["status"].unique()

from sklearn.preprocessing import LabelEncoder
label_encoder = LabelEncoder()
df3['status'] = label_encoder.fit_transform(df3['status'])

region_mappings = dict(zip(label_encoder.transform(label_encoder.classes_), label_encoder.classes_))
print("Encoded Labels and Corresponding Regions:")
for label, region in region_mappings.items():
    print(f"Label: {label}, Region: {region}")


from sklearn.preprocessing import LabelEncoder
label_encoder = LabelEncoder()
df3['type'] = label_encoder.fit_transform(df3['type'])


# Print the numerical labels and their corresponding regions


from sklearn.preprocessing import LabelEncoder
label_encoder = LabelEncoder()
df3['region'] = label_encoder.fit_transform(df3['region'])



df3

df3.shape

df3['type'].unique()

def convert_to_lakhs(price, unit):
    if unit == 'Cr':
        return price * 100
    elif unit == 'L':
        return price

df3['price_lakhs'] = df3.apply(lambda row: convert_to_lakhs(row['price'], row['price_unit']), axis=1)





df3.drop(['price', 'price_unit'], axis=1, inplace=True)


print(df3)

df3['type']

df3.head()

X1=df3.drop('price_lakhs',axis=1)

X=X1.drop('status',axis=1)

y=df3['price_lakhs']

print(X)

print(y)

X.info()

y.info()


# import sklearn
# print("Scikit-learn version:", sklearn.__version__)

# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42)


# import joblib
# model = RandomForestRegressor(n_estimators=100, random_state=42)


# model.fit(X_train, y_train)
# joblib.dump(model, 'iris_model.joblib')

y_pred = model.predict(X_test)

r2 = r2_score(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
print(f'R^2 Score: {r2}')
print(f'Mean Squared Error: {mse}')