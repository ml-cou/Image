import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FileUpload from "../UploadFile/FileUpload";

const SidebarDropdown = ({ item }: any) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const pathname = usePathname();

  const handleUploadClick = () => {
    // Handle upload logic here (optional)
    // You can add validation, processing, or display a success/error message.
    console.log("Upload clicked!");
    setIsUploadOpen(!isUploadOpen); // Open the upload file component (if desired)
  };

  return (
    <>
      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => (
          <li key={index}>
            {item.label === "Upload File" ? (
              <button
                type="button"
                onClick={handleUploadClick}
                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                  pathname === item.route ? "text-white" : ""
                }`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                href={item.route}
                className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                  pathname === item.route ? "text-white" : ""
                }`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Optional Upload File Component (conditional rendering) */}
      {isUploadOpen && <FileUpload />}
    </>
  );
};

export default SidebarDropdown;