import { Card } from "@nextui-org/react";

const ApiResponse = ({ data }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Parsed Data</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Aadhaar Number</label>
            <div className="border-b border-gray-200 pb-1">
              {data.AadharNumber}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Name on Aadhaar</label>
            <div className="border-b border-gray-200 pb-1">{data.Name}</div>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Date of Birth</label>
            <div className="border-b border-gray-200 pb-1">{data.DOB}</div>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Gender</label>
            <div className="border-b border-gray-200 pb-1">MALE</div>
          </div>
          <div className="col-span-2 space-y-1">
            <label className="text-sm text-gray-500">Address</label>
            <div className="border-b border-gray-200 pb-1">{data.Address}</div>
          </div>
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
              No Data Avaliable
            </pre>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ApiResponse;
