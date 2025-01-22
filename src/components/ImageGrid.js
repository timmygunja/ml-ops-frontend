import React from "react";

export default function ImageGrid({ images }) {
  // const defaultImage = "https://via.placeholder.com/300x300.png?text=Car+Image";
  const defaultImage =
    "https://motozitelive.blob.core.windows.net/motozite-live/newcars_images/1670405064No-Image.jpg";

  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="aspect-square relative overflow-hidden rounded-lg"
        >
          <img
            src={images[index] || defaultImage}
            className="object-cover w-full h-full"
            alt="car"
          />
        </div>
      ))}
    </div>
  );
}
