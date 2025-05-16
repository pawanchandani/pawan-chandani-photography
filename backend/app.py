from flask import Flask, request, jsonify, send_from_directory
import os
import requests
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY'  # Replace with your actual ImgBB API key

photos = []  # In-memory gallery; for production, use DB or persistent storage

@app.route('/api/upload', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files or 'date' not in request.form:
        return jsonify({'message': 'Missing photo or date'}), 400

    photo = request.files['photo']
    date = request.form['date']

    filename = secure_filename(photo.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    photo.save(filepath)

    # Upload to ImgBB
    with open(filepath, 'rb') as file:
        res = requests.post(
            'https://api.imgbb.com/1/upload',
            params={'key': IMGBB_API_KEY},
            files={'image': file}
        )

    if res.status_code != 200:
        return jsonify({'message': 'Failed to upload to ImgBB'}), 500

    data = res.json()
    img_url = data['data']['url']

    photos.append({'url': img_url, 'date': date})

    # Optionally delete local file after upload
    os.remove(filepath)

    return jsonify({'message': 'Upload successful', 'url': img_url})

@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    return jsonify({'photos': photos})

@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
