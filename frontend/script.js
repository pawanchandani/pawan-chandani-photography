const photosDiv = document.getElementById("photos");
const uploadForm = document.getElementById("uploadForm");
const uploadStatus = document.getElementById("uploadStatus");

// Load photos from backend API
async function loadGallery() {
  try {
    const res = await fetch("/api/gallery");
    const data = await res.json();

    photosDiv.innerHTML = "";
    data.photos.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.url;
      img.alt = `Photo from ${photo.date}`;
      photosDiv.appendChild(img);
    });
  } catch (error) {
    photosDiv.innerHTML = "<p>Error loading gallery.</p>";
  }
}

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("photo");
  const dateInput = document.getElementById("date");

  if (!fileInput.files.length) {
    alert("Please select a photo file to upload.");
    return;
  }

  uploadStatus.textContent = "Uploading...";

  const formData = new FormData();
  formData.append("photo", fileInput.files[0]);
  formData.append("date", dateInput.value);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      uploadStatus.textContent = "Upload successful!";
      fileInput.value = "";
      dateInput.value = "";
      loadGallery();
    } else {
      uploadStatus.textContent = "Upload failed: " + result.message;
    }
  } catch (err) {
    uploadStatus.textContent = "Upload failed: " + err.message;
  }
});

loadGallery();
