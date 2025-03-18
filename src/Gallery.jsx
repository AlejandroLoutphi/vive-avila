import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "./App";
import "./Gallery.css";

const photos = [
  "/foto-5-1024x768.jpg",
  "/avila.jpg-1068x801.webp",
  "/images.jpg",
  "/36207165.400x300.jpg",
  "/images2.jpg",
  "/34018161063_38f23a1e79_b.jpg",
  "DSC_0169_2-400x267.jpg",
  "/images3.webp",
];

export function Gallery({ user, setPage }) {
  useEffect(() => void window.history.pushState(null, "", "gallery"), []);
  const [currentIndex, setCurrentIndex] = useState();

  const showFullscreen = (index) => setCurrentIndex(index);

  const hideFullscreen = () => setCurrentIndex();

  const showPrev = () => setCurrentIndex((prevIndex) =>
    prevIndex > 0 ? prevIndex - 1 : photos.length - 1
  );

  const showNext = () => setCurrentIndex((prevIndex) =>
    prevIndex < photos.length - 1 ? prevIndex + 1 : 0
  );

  return <>
    <Navbar user={user} setPage={setPage} />
    <div className="gallery_hero-section">
      <img
        loading="lazy"
        src="/landscape.png"
        className="gallery_hero-background"
        alt="Hero background"
      />
      <div className="gallery_hero-content">
        <div className="gallery_hero-layout">
          <div className="gallery_text-column">
            <div className="gallery_text-container">
              <h1 className="gallery_main-title">Galería</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="gallery_main-container">
      <div className="gallery_container">
        <div className="gallery_gallery">
          {photos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Foto ${index + 1}`}
              className="gallery_photo"
              onClick={() => showFullscreen(index)}
            />
          ))}
        </div>
        {currentIndex !== undefined && (
          <div className="gallery_fullscreen">
            <button className="gallery_back" onClick={hideFullscreen}>
              Volver
            </button>
            <img
              className="gallery_fullscreen-content"
              src={photos[currentIndex]}
              alt={`Foto ${currentIndex + 1}`}
            />
            <div className="gallery_navigation">
              <span className="gallery_prev" onClick={showPrev}>
                &#10094;
              </span>
              <span className="gallery_next" onClick={showNext}>
                &#10095;
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
  </>;
}
