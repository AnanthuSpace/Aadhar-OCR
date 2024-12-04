export interface ImageData {
    file: File | null;
    preview: string | null;
}

export interface ApiResponseData {
    AadharNumber?: string;
    Name?: string;
    DOB?: string;
    Gender?: string;
    Address?: string;
  }
  

export interface ImageUploaderProps {
    images: {
        frontpage: ImageData;
        backpage: ImageData;
    };
    handleImageUpload: (
        e: React.ChangeEvent<HTMLInputElement>,
        key: "frontpage" | "backpage"
    ) => void;
    handleUploadImage: () => void;
    loading: boolean;
}
