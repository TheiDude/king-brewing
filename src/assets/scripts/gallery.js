// King Brewing Photo Gallery
import { albums } from './albums.js';

const albumGrid = document.querySelector('.album-grid');
const photoGallery = document.getElementById('photo-gallery');
const photoGrid = document.getElementById('photo-grid');
const galleryTitle = document.getElementById('gallery-title');
const btnBack = document.getElementById('btn-back');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentAlbum = null;
let currentPhotoIndex = 0;
let currentPhotos = [];

// Set album cover images (use first photo from each album)
document.querySelectorAll('.album-card').forEach(card => {
  const albumName = card.dataset.album;
  if (albums[albumName] && albums[albumName].length > 0) {
    const firstPhoto = albums[albumName][0];
    const coverDiv = card.querySelector('.album-cover');
    coverDiv.style.backgroundImage = `url('/assets/images/photos/${albumName}/${firstPhoto}_thumb.jpg')`;

    // Add photo count
    const count = albums[albumName].length;
    const countSpan = document.createElement('span');
    countSpan.className = 'photo-count';
    countSpan.textContent = `${count} photos`;
    card.querySelector('p').appendChild(document.createTextNode(' — '));
    card.querySelector('p').appendChild(countSpan);
  }
});

// Album click handler
albumGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.album-card');
  if (!card) return;

  const albumName = card.dataset.album;
  openAlbum(albumName, card.querySelector('h2').textContent);
});

function openAlbum(albumName, title) {
  currentAlbum = albumName;
  currentPhotos = albums[albumName] || [];
  galleryTitle.textContent = title;

  // Clear and populate photo grid
  photoGrid.innerHTML = '';

  currentPhotos.forEach((photo, index) => {
    const img = document.createElement('img');
    img.dataset.src = `/assets/images/photos/${albumName}/${photo}_thumb.jpg`;
    img.alt = `${title} - Photo ${index + 1}`;
    img.className = 'gallery-photo lazy';
    img.dataset.index = index;
    img.addEventListener('click', () => openLightbox(index));
    photoGrid.appendChild(img);
  });

  // Show gallery, hide albums
  albumGrid.hidden = true;
  photoGallery.hidden = false;

  // Lazy load images
  lazyLoadImages();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeAlbum() {
  albumGrid.hidden = false;
  photoGallery.hidden = true;
  currentAlbum = null;
  currentPhotos = [];
}

// Back button
btnBack.addEventListener('click', closeAlbum);

// Lightbox functions
function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightboxImage();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function updateLightboxImage() {
  const photo = currentPhotos[currentPhotoIndex];
  lightboxImg.src = `/assets/images/photos/${currentAlbum}/${photo}_thumb.jpg`;
  lightboxImg.alt = `Photo ${currentPhotoIndex + 1} of ${currentPhotos.length}`;
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
  updateLightboxImage();
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
  updateLightboxImage();
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextPhoto);
lightboxPrev.addEventListener('click', prevPhoto);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft') prevPhoto();
});

// Lazy loading
function lazyLoadImages() {
  const images = document.querySelectorAll('.lazy');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px'
  });

  images.forEach(img => observer.observe(img));
}
