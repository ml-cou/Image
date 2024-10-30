import React from 'react';

export default function ImageList({ images }) {
  console.log(images);

  return (
    <>
      {images && images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {images.map((image, index) => (
            <div key={index} className="flex items-center bg-gray-800 rounded-lg p-2 hover:bg-gray-700 text-white shadow-md relative ">
              <img
                src={image.image}
                alt={image.filename}
                className="h-16 w-16 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <div className="text-xs font-semibold">FILENAME : {image.title}</div>
                <div className="text-xs">
                  ANNOTATIONS : {image.annotations} {image.classes}
                </div>
                {/* <div className="mt-2">
                  <button className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs">
                    🚶‍♂️ {image.split}
                  </button>
                </div> */}
              </div>
              {/* Icons for expand and check */}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="bg-teal-600 p-1 rounded">
                ⬆️ 
                </button>
                <button className="bg-teal-600 p-1 rounded">
                  ✔️ {/* Icon for check */}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images</p>
      )}
    </>
  );
}
