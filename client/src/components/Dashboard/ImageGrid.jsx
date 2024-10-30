import { useState, useEffect, useRef } from "react";
import info from "../../../public/images/icon/info.png";
import Image from "next/image";
import EditableModal from "./EditableModal";

function ImageGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const modalRef = useRef(null);

    const handleShowDetails = (image) => {
        setSelectedImage(image);
    };

    const handleCloseDetails = () => {
        setSelectedImage(null);
    };

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
                        className="absolute top-2 right-2 bg-green-300 text-white text-sm py-1 px-2 rounded hover:bg-green-500"
                    >
                        <Image src={info} alt="info" width={20} height={20} />
                    </button>
                </div>
            )) : (
                <p>No images</p>
            )}

            {selectedImage && < EditableModal selectedImage={selectedImage} onClose={handleCloseDetails} />}
        </div>
    );
}

export default ImageGallery;
