import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const imgbbApiKey = process.env.REACT_APP_IMGBB_API_KEY;
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Please select an image first.");
      return;
    }
    setUploading(true);
    setMessage("");
    try {
      // Upload image to backend
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(`${backendUrl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Image uploaded successfully!");
    } catch (err) {
      setMessage("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Pawan Chandani Photography</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
