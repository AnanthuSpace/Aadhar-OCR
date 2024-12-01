import { toast } from "sonner";

const ImageUploader = ({ images, handleImageUpload, handleUploadImage, loading }) => {
  const handleButtonClick = () => {
    if (!images.frontpage?.preview || !images.backpage?.preview) {
      toast.error("Both Front Page and Back Page images are required!");
      return;
    }
    handleUploadImage();
  };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-evenly p-4 bg-white">
        {/* Front Page Upload */}
        <div className="relative w-60 h-40">
          {images.frontpage?.preview ? (
            <div className="relative group">
              <img
                src={images.frontpage.preview}
                alt="Front Page"
                className="w-60 h-40 object-cover border rounded-lg shadow-md"
              />
              <label
                htmlFor="frontpageUpload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white text-sm font-medium rounded-lg cursor-pointer"
              >
                Change Image
              </label>
              <input
                type="file"
                id="frontpageUpload"
                onChange={(e) => handleImageUpload(e, "frontpage")}
                className="hidden"
              />
            </div>
          ) : (
            <div className="w-60 h-40 flex items-center justify-center border-dashed border-2 border-gray-400 rounded-lg">
              <label
                htmlFor="frontpageUpload"
                className="cursor-pointer text-gray-600"
              >
                Upload Front Page
              </label>
              <input
                type="file"
                id="frontpageUpload"
                onChange={(e) => handleImageUpload(e, "frontpage")}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Back Page Upload */}
        <div className="relative w-60 h-40">
          {images.backpage?.preview ? (
            <div className="relative group">
              <img
                src={images.backpage.preview}
                alt="Back Page"
                className="w-60 h-40 object-cover border rounded-lg shadow-md"
              />
              <label
                htmlFor="backpageUpload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white text-sm font-medium rounded-lg cursor-pointer"
              >
                Change Image
              </label>
              <input
                type="file"
                id="backpageUpload"
                onChange={(e) => handleImageUpload(e, "backpage")}
                className="hidden"
              />
            </div>
          ) : (
            <div className="w-60 h-40 flex items-center justify-center border-dashed border-2 border-gray-400 rounded-lg">
              <label
                htmlFor="backpageUpload"
                className="cursor-pointer text-gray-600"
              >
                Upload Back Page
              </label>
              <input
                type="file"
                id="backpageUpload"
                onChange={(e) => handleImageUpload(e, "backpage")}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>

      {/* Parse Aadhar Button */}
      <div className="flex flex-wrap gap-4 items-center">
        <button
          className={`${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? "Loading..." : "PARSE AADHAR"}
        </button>
      </div>
    </>
  );
};

export default ImageUploader;
