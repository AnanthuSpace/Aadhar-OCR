import React from "react";
import { ImageUploaderProps } from "@/interface/interface";
import { toast } from "sonner";

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  handleImageUpload,
  handleUploadImage,
  loading,
}) => {
  const handleButtonClick = () => {
    if (!images.frontpage?.preview || !images.backpage?.preview) {
      toast.error("Both Front Page and Back Page images are required!");
      return;
    }
    handleUploadImage();
  };

  const renderImageUpload = (
    key: "frontpage" | "backpage",
    label: string,
    alt: string
  ) => (
    <div className="relative w-60 h-40">
      {images[key]?.preview ? (
        <div className="relative group">
          <img
            src={images[key]?.preview || ""}
            alt={alt}
            className="w-60 h-40 object-cover border rounded-lg shadow-md"
          />
          <label
            htmlFor={`${key}Upload`}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white text-sm font-medium rounded-lg cursor-pointer"
          >
            Change Image
          </label>
          <input
            type="file"
            id={`${key}Upload`}
            onChange={(e) => handleImageUpload(e, key)}
            className="hidden"
          />
        </div>
      ) : (
        <div className="w-60 h-40 flex items-center justify-center border-dashed border-2 border-gray-400 rounded-lg">
          <label
            htmlFor={`${key}Upload`}
            className="cursor-pointer text-gray-600"
          >
            {label}
          </label>
          <input
            type="file"
            id={`${key}Upload`}
            onChange={(e) => handleImageUpload(e, key)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Front Page Upload */}
      {renderImageUpload("frontpage", "Upload Front Page", "Front Page")}

      {/* Back Page Upload */}
      {renderImageUpload("backpage", "Upload Back Page", "Back Page")}

      {/* Parse Aadhar Button */}
      <div className="flex justify-center mt-4">
        <button
          className={`py-2 px-4 rounded font-bold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? "Loading..." : "PARSE AADHAR"}
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
