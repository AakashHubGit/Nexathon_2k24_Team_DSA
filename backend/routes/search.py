from flask import Flask, request, jsonify
from flask_cors import CORS
import re

# Initialize Flask application
app = Flask(__name__)

CORS(app)
# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json['data']
        sqft_ranges = {
        'A': range(300, 500),
        'B': range(500,1000),
        'C': range(1000, 1250),
        'D': range(1250,1501)
        }
        X = re.search(r'\b(Bandra|Andheri|Parel|Ghatkopar|Thane|Mumbai|Lonavala)\b', input_data).group()
        sqft = int(re.search(r'\d+', input_data).group())
        for category, sqft_range in sqft_ranges.items():
            if sqft in sqft_range:
                cat = category
        return jsonify({'prediction': X,'category': cat}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)