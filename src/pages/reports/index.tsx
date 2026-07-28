import React, { useEffect, useState } from 'react';
import { getReports } from '@/services/reports';
import ReportCard from '@/components/ReportCard';
import ReportViewer from '@/components/ReportViewer';
import { Report } from '@/types/report';

export default function ReportsIndexPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Report | null>(null);

  useEffect(() => {
    (async () => {
      const r = await getReports(50);
      setReports(r);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((r) => (
              <ReportCard key={r.id} report={r} onOpen={(rep) => setSelected(rep)} />
            ))}
          </div>
        )}

        {selected && (
          <ReportViewer pdfUrl={selected.pdfUrl || ''} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}
