import React from 'react';
import { 
  History as HistoryIcon, 
  Trash2, 
  FileText, 
  Clock, 
  ArrowRight, 
  Calendar, 
  Award,
  Download
} from 'lucide-react';

export const HistoryView = ({
  history,
  onSelectResult,
  onDeleteHistoryItem,
  onAnalyzeNew,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE4DC] dark:border-[#3B3630]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <h1 className="font-serif-title text-3xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
              Analysis History
            </h1>
          </div>
          <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs sm:text-sm">
            Saved transcripts, calculated terms, and extracted PDF result records.
          </p>
        </div>

        {history && history.length > 0 && (
          <button
            onClick={onAnalyzeNew}
            className="px-4 py-2 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            New Analysis
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* History Cards List */}
      {history && history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              
              {/* Left Info */}
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] text-[#8AAE92] flex flex-col items-center justify-center font-bold text-base border border-[#EAE4DC] dark:border-[#3B3630] shrink-0">
                  <span>{item.cgpa}</span>
                  <span className="text-[8px] font-medium text-[#6E685F] uppercase">CGPA</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-title text-lg font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
                      {item.semester} • {item.academicYear}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.status === 'Pass'
                        ? 'bg-[#8AAE92]/20 text-[#5C7E63] dark:text-[#A3C8AB]'
                        : 'bg-[#D98C8C]/20 text-[#C87575]'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC] flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.uploadDate}
                    </span>
                    <span>•</span>
                    <span className="truncate max-w-xs">
                      {item.fileName ? `PDF: ${item.fileName}` : `Method: ${(item.method || '').toUpperCase()}`}
                    </span>
                  </p>

                  <p className="text-xs text-[#2D2A26] dark:text-[#FAF7F2]">
                    Total Subjects: <strong>{item.totalSubjects}</strong> | Percentage: <strong>{item.percentage}%</strong> | Grade: <strong>{item.highestGrade}</strong>
                  </p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2.5 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-[#EAE4DC] dark:border-[#3B3630] w-full md:w-auto justify-end">
                <button
                  onClick={() => onSelectResult(item)}
                  className="px-3.5 py-2 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] hover:bg-[#8AAE92]/25 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  View Details
                </button>

                <button
                  onClick={() => onSelectResult(item)}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] text-[#2D2A26] dark:text-[#FAF7F2] border border-[#EAE4DC] dark:border-[#3B3630] hover:bg-[#EAE4DC]/50 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Report
                </button>

                <button
                  onClick={() => onDeleteHistoryItem(item.id)}
                  className="p-2 text-[#D98C8C] hover:bg-[#D98C8C]/15 rounded-xl transition-colors cursor-pointer"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty History State */
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-12 text-center border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] text-[#6E685F] flex items-center justify-center mx-auto border border-[#EAE4DC] dark:border-[#3B3630]">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-serif-title text-2xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
            No Analysis History Found
          </h3>
          <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs sm:text-sm">
            You have not completed any academic performance analyses yet. Calculate using marks or upload a result PDF to store your first record.
          </p>
          <button
            onClick={onAnalyzeNew}
            className="px-5 py-2.5 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs transition-all shadow-xs cursor-pointer"
          >
            Start Your First Analysis
          </button>
        </div>
      )}

    </div>
  );
};
