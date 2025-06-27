from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get('message', '')

    X_vec = vectorizer.transform([message])
    prediction = model.predict(X_vec)[0]

    return jsonify({ 'category': prediction })

if __name__ == '__main__':
    app.run(port=6000)