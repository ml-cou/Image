"use client";
import React, { useState , useEffect } from 'react';
import Dropdown from './FilterDropdown';
import SplitDropdown from './SplitDropdown';
import SortDropdown from './SortDropdown';
import ViewToggle from './ViewToggle';
import ImageList from './ImageList';
import ImageGrid from './ImageGrid';
import axios from 'axios';

export default function ImageFilter() {
    const [localSearch, setLocalSearch] = useState('');
    const [splitValue, setSplitValue] = useState('All');
    const [selectedItems, setSelectedItems] = useState([]);
    const [SortOption, setSortOption] = useState('Newest');
    const [view, setView] = useState('grid');
    const [images, setImages] = useState([]);

    const fetchImages = () => {
        axios
            .get("http://localhost:8000/image/")
            .then((res) => {
                console.log(res.data.images);
                setImages(res.data.images); 
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        fetchImages();
    }, []);


    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setLocalSearch(value);
        if (onSearchChange) {
            onSearchChange(value); // Call the parent's handler
        }
    };


    return (
        <>
            <form className="w-full py-3-600 mx-auto">
                <div className="flex mb-3">
                    <div className="relative w-full border border-green-300 rounded-xl">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-green-300 focus:outline-none rounded-xl dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Search ..."
                            value={localSearch}
                            onChange={handleSearchInputChange}
                            required
                        />
                        <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-green-700 flex items-center gap-x-2 rounded-e-xl">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </form>
            <div className="w-full pb-3 flex justify-between items-center z-10">
                <div className="flex space-x-3">
                   <SplitDropdown splitValue={splitValue} setSplitValue={setSplitValue} />
                    <Dropdown selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                    <SortDropdown sortOption={SortOption} setSortOption={setSortOption} />
                </div>
                <div className="flex">
                    <ViewToggle view={view} setView={setView} />
                </div>
            </div>

            {
                view === 'grid' ? <ImageGrid images={images} /> :<ImageList images={images} /> 
            }
            
        </>
    );
}
