import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

function EditableModal({ selectedImage, onClose, fetchImages }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(selectedImage.title);
    const modalRef = useRef(null);
    const textareaRef = useRef(null); // Create a ref for the textarea

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete!',
            text: 'Do you want to continue?',
            icon: 'error',
            showCancelButton: true, // Show the cancel button
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true // Optional: Makes the Cancel button appear first
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed deletion
                axios
                    .delete(`http://localhost:8000/image/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        fetchImages(); // Refresh the image list
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your image has been deleted.',
                            icon: 'success',
                            confirmButtonText: 'Okay'
                        });
                        onClose(); // Close the modal or perform any other action
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an error deleting the image.',
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        });
                    });
            } else if (result.isDismissed) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your image is safe!',
                    icon: 'info',
                    confirmButtonText: 'Okay'
                });
            }
        });
    };
    

    const toggleEdit = () => setIsEditing(!isEditing);

    const handleTitleChange = (e) => {
        setEditTitle(e.target.value);
        e.target.style.height = "auto"; // Reset the height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the scroll height
    };

    const handleSave = (id) => {
        console.log(editTitle);
        axios
            .put(`http://localhost:8000/image/${id}/`, {
                title: editTitle
            })
            .then((res) => {
                console.log(res.data);
                setIsEditing(false);
                fetchImages();
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height before calculating
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
        }
    }, [isEditing, editTitle]); // Update on edit state or title change

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
                ref={modalRef}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-red-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <img
                    className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={selectedImage.image}
                    alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <div className="flex items-center">
                        {isEditing ? (
                            <textarea
                                ref={textareaRef} // Attach the ref here
                                value={editTitle}
                                onChange={handleTitleChange}
                                className="block w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none overflow-hidden"
                                rows={1} // Initial row count to 1
                            />
                        ) : (
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {editTitle}
                            </h5>
                        )}
                        <button
                            onClick={toggleEdit}
                            className="px-2 py-1 ml-4 text-sm text-green-500 rounded-full border border-green-500"
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
                            className="px-2 py-1 ml-4 text-sm text-red-500 rounded-full border border-red-500"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => handleDelete(selectedImage.id)}
                            className="px-2 py-1 ml-4 text-sm bg-red-500 text-white rounded-full border border-red-500"
                        >
                            Delete
                        </button>
                        <button 
                            onClick={() => handleSave(selectedImage.id)}
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
