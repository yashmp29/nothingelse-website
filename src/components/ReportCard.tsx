import React from 'react';
import { Report } from '@/types/report';

type Props = {
  report: Report;
  onOpen?: (r: Report) => void;
};

export default function ReportCard({ report, onOpen }: Props) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
      <button
        onClick={() => onOpen && onOpen(report)}
        className="block text-left w-full"
      >
        <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
          {report.thumbnailUrl || report.coverImageUrl ? (
            <img src={report.thumbnailUrl || report.coverImageUrl} alt={report.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12v.01M12 6v6m0 6h.01" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">{report.title}</h3>
          {report.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{report.description}</p>}
          {report.tags && report.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {report.tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>
              ))}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
