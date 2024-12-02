import { useState, useEffect } from "react";
import ImageUploader from "./components/ImageUploader";
import ApiResponse from "./components/ApiResponse";
import axios from "axios";
import { Toaster, toast } from 'sonner';

const App = () => {
  const [images, setImages] = useState({
    frontpage: { file: null, preview: null },
    backpage: { file: null, preview: null },
  });
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      if (images[key]?.preview) {
        URL.revokeObjectURL(images[key].preview);
      }

      setImages((prev) => ({
        ...prev,
        [key]: { file, preview: URL.createObjectURL(file) },
      }));
      console.log("Uploaded file:", file.name);
    }
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();

      if (images.frontpage?.file) formData.append("frontpage", images.frontpage.file);
      if (images.backpage?.file) formData.append("backpage", images.backpage.file);

      setLoading(true);
      
      // Axios POST request
      const response = await axios.post(
        `https://ocr.vuepix.shop/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success response
      setResponse(response.data.data);
      toast.success("Images uploaded successfully!");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      
      // Handle Axios error
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response);
        toast.error(`Error: ${error.response.data.message || "Something went wrong. Please try again."}`);
      } else if (error.request) {
        // No response was received from the server
        console.error("Error request:", error.request);
        toast.error("No response from server. Please check your network connection.");
      } else {
        // Error setting up the request
        console.error("Error message:", error.message);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (images.frontpage?.preview) URL.revokeObjectURL(images.frontpage.preview);
      if (images.backpage?.preview) URL.revokeObjectURL(images.backpage.preview);
    };
  }, [images]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 p-4 gap-4">
      <Toaster position="top-right" richColors />
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-evenly p-4 bg-white shadow-lg rounded-lg">
        <ImageUploader
          images={images}
          loading={loading}
          handleImageUpload={handleImageUpload}
          handleUploadImage={handleUploadImage}
        />
      </div>

      <div className="w-full lg:w-1/2 p-4 bg-white shadow-lg rounded-lg">
        <div className="h-full max-h-[700px] overflow-y-auto">
          <ApiResponse data={response} />
        </div>
      </div>
    </div>
  );
};

export default App;
