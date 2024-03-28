from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import pandas as pd
import joblib
from fuzzywuzzy import process, fuzz
import spacy
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')

# Define the list of stopwords
stop_words = set(stopwords.words('english'))

# Function to remove stopwords from text
def remove_stopwords(text):
    words = text.split()
    filtered_words = [word for word in words if word.lower() not in stop_words]
    return ' '.join(filtered_words)

# Iterate through projects and remove stopwords from 'name' field


# Load the English language model
nlp = spacy.load("en_core_web_sm")
# Initialize Flask application
app = Flask(__name__)

CORS(app)
model = joblib.load('iris_model.joblib')
data = pd.read_csv('Mumbai House Prices.csv')
sorted_data = pd.read_csv('SortedData.csv')
projects = [
{'name': 'Sunrise Heights Apartments in Ghatkopar with an area of 1077 sqft', 'type': 'Apartments', 'location': 'Ghatkopar', 'area': 1077},
{'name': 'Sunrise Heights Apartments in Parel with an area of 780 sqft', 'type': 'Apartments', 'location': 'Parel', 'area': 780},
{'name': 'Serenity Springs Studio Apartments in Ghatkopar with an area of 749 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 749},
{'name': 'Golden Retreat Studio Apartments in Parel with an area of 1709 sqft', 'type': 'Studio Apartments', 'location': 'Parel', 'area': 1709},
{'name': 'Serenity Springs Bungalows in Bandra with an area of 1905 sqft', 'type': 'Bungalows', 'location': 'Bandra', 'area': 1905},
{'name': 'Sunrise Heights Apartments in Dadar with an area of 1519 sqft', 'type': 'Apartments', 'location': 'Dadar', 'area': 1519},
{'name': 'Harmony Heights Studio Apartments in Ghatkopar with an area of 1073 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 1073},
{'name': 'Skyline Towers Villas in Dadar with an area of 1228 sqft', 'type': 'Villas', 'location': 'Dadar', 'area': 1228},
{'name': 'Palm Grove  Villas in Ghatkopar with an area of 819 sqft', 'type': 'Villas', 'location': 'Ghatkopar', 'area': 819},
{'name': 'Sapphire Residences Villas in Bandra with an area of 1726 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 1726},
{'name': 'Skyline Towers Apartments in Ghatkopar with an area of 1460 sqft', 'type': 'Apartments', 'location': 'Ghatkopar', 'area': 1460},
{'name': 'Lakeview Estates Apartments in Bandra with an area of 1090 sqft', 'type': 'Apartments', 'location': 'Bandra', 'area': 1090},
{'name': 'Luxury Homes Apartments in Dadar with an area of 1831 sqft', 'type': 'Apartments', 'location': 'Dadar', 'area': 1831},
{'name': 'Lakeview Estates Apartments in Andheri with an area of 1510 sqft', 'type': 'Apartments', 'location': 'Andheri', 'area': 1510},
{'name': 'Green Valley Apartments Bungalows in Ghatkopar with an area of 814 sqft', 'type': 'Bungalows', 'location': 'Ghatkopar', 'area': 814},
{'name': 'Sapphire Residences Bungalows in Ghatkopar with an area of 878 sqft', 'type': 'Bungalows', 'location': 'Ghatkopar', 'area': 878},
{'name': 'Dream Residency Apartments in Bandra with an area of 1483 sqft', 'type': 'Apartments', 'location': 'Bandra', 'area': 1483},
{'name': 'Palm Grove  Apartments in Dadar with an area of 937 sqft', 'type': 'Apartments', 'location': 'Dadar', 'area': 937},
{'name': 'Sapphire Residences Villas in Bandra with an area of 1802 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 1802},
{'name': 'Elegant Enclave Studio Apartments in Ghatkopar with an area of 1267 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 1267},
{'name': 'Elegant Enclave Studio Apartments in Bandra with an area of 532 sqft', 'type': 'Studio Apartments', 'location': 'Bandra', 'area': 532},
{'name': 'Skyline Towers Villas in Parel with an area of 1614 sqft', 'type': 'Villas', 'location': 'Parel', 'area': 1614},
 {'name': 'Green Valley  Villas in Parel with an area of 938 sqft', 'type': 'Villas', 'location': 'Parel', 'area': 938},
{'name': 'Luxury Homes Bungalows in Dadar with an area of 1712 sqft', 'type': 'Bungalows', 'location': 'Dadar', 'area': 1712},
{'name': 'Harmony Heights Studio Apartments in Bandra with an area of 1346 sqft', 'type': 'Studio Apartments', 'location': 'Bandra', 'area': 1346},
{'name': 'Luxury Homes Villas in Bandra with an area of 910 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 910}  ,
{'name': 'Golden Retreat Studio Apartments in Dadar with an area of 1999 sqft', 'type': 'Studio Apartments', 'location': 'Dadar', 'area': 1999},
{'name': 'Serenity Springs Villas in Parel with an area of 1245 sqft', 'type': 'Villas', 'location': 'Parel', 'area': 1245},
{'name': 'Luxury Homes Villas in Bandra with an area of 1111 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 1111},{'name': 'Harmony Heights Apartments in Bandra with an area of 1961 sqft', 'type': 'Apartments', 'location': 'Bandra', 'area': 1961},
{'name': 'Royal Mansions Bungalows in Andheri with an area of 1126 sqft', 'type': 'Bungalows', 'location': 'Andheri', 'area': 1126},
{'name': 'Skyline Towers Bungalows in Andheri with an area of 1106 sqft', 'type': 'Bungalows', 'location': 'Andheri', 'area': 1106},
{'name': 'Dream Residency Studio Apartments in Ghatkopar with an area of 964 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 964},
{'name': 'Sunrise Heights Bungalows in Andheri with an area of 953 sqft', 'type': 'Bungalows', 'location': 'Andheri', 'area': 953},
{'name': 'Luxury Homes Apartments in Parel with an area of 1825 sqft', 'type': 'Apartments', 'location': 'Parel', 'area': 1825},
{'name': 'Luxury Homes Bungalows in Parel with an area of 1290 sqft', 'type': 'Bungalows', 'location': 'Parel', 'area': 1290},
{'name': 'Sapphire Residences Studio Apartments in Dadar with an area of 684 sqft', 'type': 'Studio Apartments', 'location': 'Dadar', 'area': 684},
{'name': 'Green Valley  Bungalows in Andheri with an area of 1193 sqft', 'type': 'Bungalows', 'location': 'Andheri', 'area': 1193},
{'name': 'Green Valley  Studio Apartments in Ghatkopar with an area of 639 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 639},
{'name': 'Green Valley  Bungalows in Bandra with an area of 1452 sqft', 'type': 'Bungalows', 'location': 'Bandra', 'area': 1452},
{'name': 'Green Valley  Bungalows in Dadar with an area of 1801 sqft', 'type': 'Bungalows', 'location': 'Dadar', 'area': 1801},
{'name': 'Dream Residency Apartments in Parel with an area of 773 sqft', 'type': 'Apartments', 'location': 'Parel', 'area': 773},
{'name': 'Elegant Enclave Apartments in Andheri with an area of 1464 sqft', 'type': 'Apartments', 'location': 'Andheri',
'area': 1464},
{'name': 'Green Valley Bungalows in Bandra with an area of 1884 sqft', 'type': 'Bungalows', 'location': 'Bandra', 'area': 1884},
{'name': 'Green Valley  Villas in Bandra with an area of 644 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 644},
{'name': 'Skyline Towers Bungalows in Parel with an area of 544 sqft', 'type': 'Bungalows', 'location': 'Parel', 'area':
544},
{'name': 'Green Valley  Studio Apartments in Dadar with an area of 1756 sqft', 'type': 'Studio Apartments', 'location': 'Dadar', 'area': 1756},
{'name': 'Elegant Enclave Bungalows in Parel with an area of 982 sqft', 'type': 'Bungalows', 'location': 'Parel', 'area': 982},
{'name': 'Tranquil Towers Bungalows in Andheri with an area of 1347 sqft', 'type': 'Bungalows', 'location': 'Andheri', 'area': 1347},
{'name': 'Royal Mansions Villas in Dadar with an area of 1373 sqft', 'type': 'Villas', 'location': 'Dadar', 'area': 1373},{'name': 'Elegant Enclave Villas in Ghatkopar with an area of 630 sqft', 'type': 'Villas', 'location': 'Ghatkopar', 'area': 630},
{'name': 'Golden Retreat Studio Apartments in Ghatkopar with an area of 1557 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 1557},
{'name': 'Green Valley Apartments Bungalows in Bandra with an area of 1819 sqft', 'type': 'Bungalows', 'location': 'Bandra', 'area': 1819},
{'name': 'Golden Retreat Studio Apartments in Ghatkopar with an area of 1364 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 1364},
{'name': 'Sunrise Heights Villas in Andheri with an area of 821 sqft', 'type': 'Villas', 'location': 'Andheri', 'area': 821},
{'name': 'Golden Retreat Villas in Andheri with an area of 809 sqft', 'type': 'Villas', 'location': 'Andheri', 'area': 809},
{'name': 'Luxury Homes Studio Apartments in Bandra with an area of 1860 sqft', 'type': 'Studio Apartments', 'location': 'Bandra', 'area': 1860}     ,
{'name': 'Skyline Towers Studio Apartments in Bandra with an area of 1201 sqft', 'type': 'Studio Apartments', 'location': 'Bandra', 'area': 1201},
{'name': 'Dream Residency Apartments in Bandra with an area of 1043 sqft', 'type': 'Apartments', 'location': 'Bandra', 'area': 1043},
{'name': 'Green Valley Apartments Bungalows in Parel with an area of 627 sqft', 'type': 'Bungalows', 'location': 'Parel', 'area': 627},
{'name': 'Dream Residency Studio Apartments in Dadar with an area of 1448 sqft', 'type': 'Studio Apartments', 'location': 'Dadar', 'area': 1448},
{'name': 'Palm Grove Villas Villas in Parel with an area of 1129 sqft', 'type': 'Villas', 'location': 'Parel', 'area': 1129},
{'name': 'Lakeview Estates Bungalows in Ghatkopar with an area of 1028 sqft', 'type': 'Bungalows', 'location': 'Ghatkopar', 'area': 1028},
{'name': 'Green Valley Apartments Villas in Parel with an area of 1113 sqft', 'type': 'Villas', 'location': 'Parel', 'area': 1113},
{'name': 'Green Valley Apartments Villas in Bandra with an area of 1981 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 1981},
{'name': 'Luxury Homes Studio Apartments in Andheri with an area of 867 sqft', 'type': 'Studio Apartments', 'location': 'Andheri', 'area': 867},
{'name': 'Serenity Springs Studio Apartments in Dadar with an area of 651 sqft', 'type': 'Studio Apartments', 'location': 'Dadar', 'area': 651},
{'name': 'Tranquil Towers Studio Apartments in Bandra with an area of 933 sqft', 'type': 'Studio Apartments', 'location': 'Bandra', 'area': 933},
{'name': 'Serenity Springs Apartments in Parel with an area of 504 sqft', 'type': 'Apartments', 'location': 'Parel', 'area': 504},
{'name': 'Skyline Towers Bungalows in Parel with an area of 1343 sqft', 'type': 'Bungalows', 'location': 'Parel', 'area': 1343},
{'name': 'Lakeview Estates Apartments in Bandra with an area of 969 sqft', 'type': 'Apartments', 'location': 'Bandra', 'area': 969},
{'name': 'Golden Retreat Studio Apartments in Bandra with an area of 1350 sqft', 'type': 'Studio Apartments', 'location': 'Bandra', 'area': 1350},
{'name': 'Green Valley Apartments Apartments in Parel with an area of 654 sqft', 'type': 'Apartments', 'location': 'Parel', 'area': 654},
{'name': 'Sapphire Residences Studio Apartments in Ghatkopar with an area of 1985 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 1985},
{'name': 'Dream Residency Villas in Bandra with an area of 978 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 978},
{'name': 'Sapphire Residences Apartments in Parel with an area of 1998 sqft', 'type': 'Apartments', 'location': 'Parel',
'area': 1998},
{'name': 'Majestic Gardens Apartments in Parel with an area of 848 sqft', 'type': 'Apartments', 'location': 'Parel', 'area': 848},
{'name': 'Majestic Gardens Apartments in Mumbai with an area of 848 sqft', 'type': 'Apartments', 'location': 'Mumbai', 'area': 848},
{'name': 'Sapphire Residences Bungalows in Parel with an area of 1691 sqft', 'type': 'Bungalows', 'location': 'Parel', 'area': 1691},
{'name': 'Sapphire Residences Apartments in Ghatkopar with an area of 509 sqft', 'type': 'Apartments', 'location': 'Ghatkopar', 'area': 509},
{'name': 'Royal Mansions Villas in Dadar with an area of 960 sqft', 'type': 'Villas', 'location': 'Dadar', 'area': 960}  ,
{'name': 'Sunrise Heights Apartments in Parel with an area of 618 sqft', 'type': 'Apartments', 'location': 'Parel', 'area': 618},
{'name': 'Palm Grove Villas Villas in Andheri with an area of 1316 sqft', 'type': 'Villas', 'location': 'Andheri', 'area': 1316},
{'name': 'Skyline Towers Villas in Dadar with an area of 1130 sqft', 'type': 'Villas', 'location': 'Dadar', 'area': 1130},{'name': 'Lakeview Estates Apartments in Parel with an area of 1657 sqft', 'type': 'Apartments', 'location': 'Parel', 'area': 1657},
{'name': 'Lakeview Estates Studio Apartments in Ghatkopar with an area of 1047 sqft', 'type': 'Studio Apartments', 'location': 'Ghatkopar', 'area': 1047},
{'name': 'Royal Mansions Studio Apartments in Parel with an area of 849 sqft', 'type': 'Studio Apartments', 'location': 'Parel', 'area': 849},
{'name': 'Green Valley Apartments Studio Apartments in Andheri with an area of 1572 sqft', 'type': 'Studio Apartments', 'location': 'Andheri', 'area': 1572},
{'name': 'Sunrise Heights Villas in Parel with an area of 1442 sqft', 'type': 'Villas', 'location': 'Parel', 'area': 1442},
{'name': 'Skyline Towers Studio Apartments in Parel with an area of 503 sqft', 'type': 'Studio Apartments', 'location': 'Parel', 'area': 503},
{'name': 'Harmony Heights Studio Apartments in Parel with an area of 1061 sqft', 'type': 'Studio Apartments', 'location': 'Parel', 'area': 1061},
{'name': 'Skyline Towers Studio Apartments in Andheri with an area of 1081 sqft', 'type': 'Studio Apartments', 'location': 'Andheri', 'area': 1081},
{'name': 'Tranquil Towers Bungalows in Ghatkopar with an area of 1307 sqft', 'type': 'Bungalows', 'location': 'Ghatkopar', 'area': 1307},
{'name': 'Luxury Homes Apartments in Andheri with an area of 1437 sqft', 'type': 'Apartments', 'location': 'Andheri', 'area': 1437},
{'name': 'Sapphire Residences Studio Apartments in Parel with an area of 1286 sqft', 'type': 'Studio Apartments', 'location': 'Parel', 'area': 1286},
{'name': 'Luxury Homes Bungalows in Dadar with an area of 983 sqft', 'type': 'Bungalows', 'location': 'Dadar', 'area': 983},
{'name': 'Harmony Heights Villas in Andheri with an area of 1276 sqft', 'type': 'Villas', 'location': 'Andheri', 'area':
1276},
{'name': 'Elegant Enclave Villas in Bandra with an area of 933 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 933},
{'name': 'Elegant Enclave Studio Apartments in Andheri with an area of 660 sqft', 'type': 'Studio Apartments', 'location': 'Andheri', 'area': 660},
{'name': 'Elegant Enclave Villas in Ghatkopar with an area of 1422 sqft', 'type': 'Villas', 'location': 'Ghatkopar', 'area': 1422},
{'name': 'Skyline Towers Villas in Bandra with an area of 574 sqft', 'type': 'Villas', 'location': 'Bandra', 'area': 574},

]


for project in projects:
    project['name'] = remove_stopwords(project['name'])
# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json['data']
        sqft_ranges = {
        'A': range(300, 700),
        'B': range(700,1200),
        'C': range(1200, 1801),
        'D': range(1800,2500)
        }
        def search_projects(location, type_):
            if location or type_:
                relevant_projects =[]
                for project in projects:
                    if location and type_:
                        if location.lower() in project["location"].lower() and type_.lower() in project["type"].lower():
                            relevant_projects.append(project)
                    elif location:
                        if location.lower() in project["location"].lower():
                            relevant_projects.append(project)
                    elif type_:
                        if type_.lower() in project["type"].lower():
                            relevant_projects.append(project)
                    return relevant_projects
            else:
                return []

# Function to extract location and type from user query using fuzzy matching and spaCy
        def extract_location_type(query):
            doc = nlp(query)
            location = None
            type_ = None
  
            for token in doc:
                # Check if token is a location
                location_match = process.extractOne(token.text, [project["location"].split()[0] for project in projects], scorer=fuzz.partial_ratio)
                
                if location_match[1] > 80:  # Adjust the threshold as needed
                    location = location_match[0]
                # Check if token is a type
                type_match = process.extractOne(token.text, [project["type"] for project in projects], scorer=fuzz.partial_ratio)
                if type_match[1] > 70:  # Adjust the threshold as needed
                    type_ = type_match[0]
                if location or type_:
                    break
            return location, type_

# Example usage
        user_query = input_data
        location, type_ = extract_location_type(user_query)

        if location or type_:
            print("Location extracted:", location)
            print("Type extracted:", type_)
            search_results = search_projects(location, type_)
            if search_results:
                for result in search_results:
                    print(result["name"], "in", result["location"], "with area of", result["area"], "sqft")
            else:
                print("No projects found near", location, "with type", type_)
        else:
            print("Location and/or type not found in the query.")

        # Extract sqft information
        sqft_match = re.search(r'\d+', input_data)
        if sqft_match:
            sqft = int(sqft_match.group())
            for category, sqft_range in sqft_ranges.items():
                if sqft in sqft_range:
                    cat = category
                    break
            else:
                cat = 'E'  # Assign default category if sqft doesn't fall into any range
        else:
            cat = 'E'  # Assign default category if sqft information is not found

        return jsonify({'location': location, 'category': cat, 'type': type_}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# Load the dataset
@app.route('/ratepred', methods=['POST'])
def ratepred():
    try:
        # Extract the input data from the request
        input_data = request.json['data']
        bhk = input_data['bhk']
        area = input_data['area']
        region = input_data['region']
        type_ = input_data['type']

        # Perform prediction using the model
        prediction = model.predict([[bhk, type_, area, region]])
        
        # Return the prediction result
        return jsonify({'prediction': prediction[0]}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
# Endpoint for providing search recommendations
@app.route('/search-recommendations', methods=['GET'])
def search_recommendations():
    query = request.args.get('query', '')  # Get the query parameter from the request
    # Filter the dataset based on the query
    recommendations = sorted_data[sorted_data['region'].str.contains(query, case=False)]['region'].unique().tolist()
    return jsonify(recommendations)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)