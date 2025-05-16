# Pawan Chandani Photography Website

This is a photography portfolio website with:

- Frontend gallery and upload page
- Backend API with Flask to upload photos to ImgBB and serve gallery JSON
- Contact info and Instagram link

## Setup

1. Clone the repo.
2. Run `pip install flask requests`.
3. Replace `YOUR_IMGBB_API_KEY` in `backend/app.py` with your ImgBB API key.
4. Run the backend server with `python backend/app.py`.
5. Open `frontend/index.html` in browser (or serve with a local server).

## Features

- Upload photos via the upload form
- Gallery dynamically loads photos from backend
- Uses ImgBB API for image hosting
