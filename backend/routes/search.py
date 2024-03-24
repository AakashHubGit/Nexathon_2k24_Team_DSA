from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import pandas as pd

# Initialize Flask application
app = Flask(__name__)

CORS(app)

data = pd.read_csv('Mumbai House Prices.csv')

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

        location_match = re.search(r'\b(Bandra|Andheri|Parel|Ghatkopar|Thane|Mumbai|Lonavala|Pune|Alibaug)\b', input_data)
        if location_match:
            X = location_match.group()
        else:
            X = None
        
        # Set a default value for X_size
        X_size = None

        # Extract size information
        size_match = re.search(r'\b(1BHK|2BHK|3BHK|4BHK|5BHK)\b', input_data)
        if size_match:
            X_size = size_match.group()
        else:
            X_size = None

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

        return jsonify({'prediction': X, 'category': cat, 'size': X_size}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Load the dataset

# Endpoint for providing search recommendations
@app.route('/search-recommendations', methods=['GET'])
def search_recommendations():
    query = request.args.get('query', '')  # Get the query parameter from the request
    # Filter the dataset based on the query
    recommendations = data[data['region'].str.contains(query, case=False)]['region'].unique().tolist()
    return jsonify(recommendations)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)