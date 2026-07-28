import React from 'react';

type Props = {
  pdfUrl: string;
  onClose: () => void;
};

export default function ReportViewer({ pdfUrl, onClose }: Props) {
  if (!pdfUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="text-sm font-medium">Report Viewer</div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">Close</button>
        </div>
        <div className="h-[80vh]">
          <iframe src={pdfUrl} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
