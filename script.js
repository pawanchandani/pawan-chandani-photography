// Simple image modal for gallery

document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('section.gallery img');

  // Create modal elements
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.visibility = 'hidden';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.3s ease';
  modal.style.cursor = 'pointer';
  modal.style.zIndex = 1000;

  const modalImg = document.createElement('img');
  modalImg.style.maxWidth = '90%';
  modalImg.style.maxHeight = '90%';
  modalImg.style.borderRadius = '8px';
  modal.appendChild(modalImg);

  document.body.appendChild(modal);

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.visibility = 'visible';
      modal.style.opacity = '1';
    });
  });

  modal.addEventListener('click', () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.visibility = 'hidden';
      modalImg.src = '';
    }, 300);
  });
});