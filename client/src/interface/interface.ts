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
    [key: string]: any;
}


export interface ImageUploaderProps {
    images: {
        frontpage: { file: File | null; preview: string | null };
        backpage: { file: File | null; preview: string | null };
    };
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, key: "frontpage" | "backpage") => void;
    handleUploadImage: () => void;
    loading: boolean;
}