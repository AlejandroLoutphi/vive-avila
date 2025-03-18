import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "./App";
import "./Gallery.css";

const photos = [
  "http://cerroelavila.com/wp-content/uploads/2017/07/foto-5-1024x768.jpg",
  "https://estaticos.sfo2.digitaloceanspaces.com/estaticos/var/www/html/wp-content/uploads/2024/01/24171410/avila.jpg-1068x801.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHpvq_JxH-DFv1XgyZgVYKw7gmuUxDJb8zVw&s",
  "https://s0.wklcdn.com/image_47/1424830/53903928/36207165.400x300.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDkc6wUXz3bsxCshvGzzZ8qdN8G8yyglDGutU8mgf_rtLxGXfGaRczFYhMmqwUoFIsB98&usqp=CAU",
  "https://live.staticflickr.com/4196/34018161063_38f23a1e79_b.jpg",
  "https://www.excursionesyrutasporcastillayleon.com/wp-content/uploads/2018/08/DSC_0169_2-400x267.jpg",
  "https://www.alltrails.com/_next/image?url=https%3A%2F%2Fimages.alltrails.com%2FeyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvOTM3MDAxMzgvYWNiNDZmN2JjMDEyZDE3ZDU1NjY4MWRhYjk4YmYyNTkuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoxMDgwLCJoZWlnaHQiOjcwMCwiZml0IjoiY292ZXIifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0%3D&w=3840&q=90",
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
};
