import { useState, useEffect, useRef } from "react";

function ImageGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef(null);

    const handleShowDetails = (image) => {
        setSelectedImage(image);
    };

    const handleCloseDetails = () => {
        setSelectedImage(null);
    };

    // Close modal if click occurs outside of modal content
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseDetails();
            }
        };

        // Add event listener when modal is open
        if (selectedImage) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup event listener on close
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedImage]);

    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 md:grid-cols-4">
            {images ? images.map((image, index) => (
                <div key={index} className="relative">
                    <img
                        className="w-full object-cover h-40 max-w-full rounded-lg hover:opacity-75 border-green-600 hover:shadow-lg hover:cursor-pointer"
                        src={image.image}
                        alt="gallery-photo"
                    />
                   <p className="line-clamp-1">{image.title}</p>
                    <button
                        onClick={() => handleShowDetails(image)}
                        className="absolute top-2 right-2 bg-green-600 text-white text-sm py-1 px-2 rounded hover:bg-green-500"
                    >
                        Details
                    </button>
                </div>
            )) : (
                <p>No images</p>
            )}

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4"
                    >
                        <img
                            className="w-full h-60 object-cover rounded-lg mb-4"
                            src={selectedImage.image}
                            alt="selected-gallery-photo"
                        />
                        <h3 className="text-lg font-bold mb-2">{selectedImage.title}</h3>
                        <p>{selectedImage.description}</p> 
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageGallery;
