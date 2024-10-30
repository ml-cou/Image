import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit , faClose } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function EditableModal({ selectedImage, onClose }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(selectedImage.title);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    

    const toggleEdit = () => setIsEditing(!isEditing);

    const handleTitleChange = (e) => {
        setEditTitle(e.target.value);
        e.target.style.height = "auto"; // Reset the height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the scroll height
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
            <div
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-red-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <img
                    className="object-cover w-full rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={selectedImage.image}
                    alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <div className="flex items-center">
                        {isEditing ? (
                            <textarea
                            type="text"
                            value={editTitle}
                            onChange={handleTitleChange}
                            className="block w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none overflow-hidden"
                        />
                        
                        ) : (
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
                                {editTitle}
                            </h5>
                        )}
                        <button
                            onClick={toggleEdit}
                            className="px-2 py-1 ml-4 text-sm text-green-500  rounded-full border border-green-500"
                        >
                            {isEditing ? <FontAwesomeIcon icon={faFloppyDisk} /> : <FontAwesomeIcon icon={faEdit} />}
                        </button>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                    <div className="flex items-center justify-end">
                        <button
                            onClick={onClose}
                            className="px-2 py-1 ml-4 text-sm text-red-500  rounded-full border border-red-500"
                        >
                            Close
                        </button>
                        <button
                            className="px-2 py-1 ml-4 text-sm bg-red-500 text-white rounded-full border border-red-500"
                        >
                            Delete
                        </button>
                        <button
                            className="px-2 py-1 ml-4 text-sm bg-green-500 text-white rounded-full border border-green-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditableModal;
