const photosDiv = document.getElementById("photos");

fetch("../api/gallery.json")
  .then((res) => res.json())
  .then((data) => {
    data.photos.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.url;
      img.alt = photo.title || "Photo";
      photosDiv.appendChild(img);
    });
  })
  .catch((err) => {
    photosDiv.innerHTML = "<p>Failed to load photos.</p>";
    console.error(err);
  });
