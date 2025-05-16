from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)
IMGBB_API_KEY = os.getenv('IMGBB_API_KEY')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image = request.files['image']
    response = requests.post(
        'https://api.imgbb.com/1/upload',
        params={'key': IMGBB_API_KEY},
        files={'image': image}
    )

    return response.json()

if __name__ == '__main__':
    app.run(debug=True)
