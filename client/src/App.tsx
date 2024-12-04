import { useState, useEffect, ChangeEvent } from "react";
import ImageUploader from "./components/ImageUploader";
import ApiResponse from "./components/ApiResponse";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { ImageData, ApiResponseData } from "./interface/interface";

const App: React.FC = () => {
  const [images, setImages] = useState<{
    frontpage: ImageData;
    backpage: ImageData;
  }>({
    frontpage: { file: null, preview: null },
    backpage: { file: null, preview: null },
  });

  const [response, setResponse] = useState<ApiResponseData>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    key: "frontpage" | "backpage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (images[key]?.preview) {
        URL.revokeObjectURL(images[key].preview as string);
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

      if (images.frontpage?.file) {
        formData.append("frontpage", images.frontpage.file);
      }
      if (images.backpage?.file) {
        formData.append("backpage", images.backpage.file);
      }

      setLoading(true);

      const response = await axios.post(
        `https://ocr.vuepix.shop/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(response.data.data || {});
      toast.success("Images uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);
      if (error.response) {
        toast.error(
          `Error: ${
            error.response.data.message ||
            "Something went wrong. Please try again."
          }`
        );
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your network connection."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (images.frontpage?.preview) {
        URL.revokeObjectURL(images.frontpage.preview);
      }
      if (images.backpage?.preview) {
        URL.revokeObjectURL(images.backpage.preview);
      }
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
