import { ApiResponseData } from "../interface/interface";
import { Card } from "@nextui-org/react";

interface ApiResponseProps {
    data: ApiResponseData | null;
}

const ApiResponse: React.FC<ApiResponseProps> = ({ data }) => {
    const renderField = (
        label: string,
        value?: string,
        isFullWidth?: boolean
    ): JSX.Element => (
        <div className={`${isFullWidth ? "col-span-2" : ""} space-y-1`}>
            <label className="text-sm text-gray-500">{label}</label>
            <div className="border-b border-gray-200 pb-1">
                {value || <span className="text-gray-400">N/A</span>}
            </div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Parsed Data</h2>
                <div className="grid grid-cols-2 gap-4">
                    {renderField("Aadhaar Number", data?.AadharNumber)}
                    {renderField("Name on Aadhaar", data?.Name)}
                    {renderField("Date of Birth", data?.DOB)}
                    {renderField("Gender", data?.Gender)}
                    {renderField("Address", data?.Address, true)}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">API Response</h2>
                <Card className="p-4 border-green-500 bg-gray-50">
                    {data ? (
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    ) : (
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                            No Data Available
                        </pre>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ApiResponse;
