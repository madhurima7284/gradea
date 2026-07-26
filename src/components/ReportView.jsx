import React from 'react';
import { 
  GraduationCap, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  Award, 
  Sparkles,
  ArrowLeft,
  Building,
  User,
  BookOpen
} from 'lucide-react';

export const ReportView = ({ result, user, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `GradeInsight Transcript - ${result?.semester}`,
        text: `Check out my academic performance report: CGPA ${result?.cgpa}, Percentage ${result?.percentage}%`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`GradeInsight Transcript - ${result?.semester}: CGPA ${result?.cgpa}, Percentage ${result?.percentage}%`);
      alert('Report link copied to clipboard!');
    }
  };

  if (!result) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Controls Bar (Hidden during Print) */}
      <div className="flex items-center justify-between no-print pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] text-[#2D2A26] dark:text-[#FAF7F2] border border-[#EAE4DC] dark:border-[#3B3630] hover:bg-[#EAE4DC]/50 font-medium text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630] hover:bg-[#FAF7F2] dark:hover:bg-[#1C1A17] text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Share Transcript"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Official Academic Transcript Document Card */}
      <div className="print-container bg-white dark:bg-[#282521] rounded-[20px] p-8 sm:p-12 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-8">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#2D2A26] dark:border-[#FAF7F2]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#2D2A26] text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif-title text-3xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] tracking-tight">
                GradeInsight
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-[#6E685F] font-semibold">Official Academic Grade Report</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] font-semibold text-[10px] uppercase border border-[#8AAE92]/30">
              {result.status} Status
            </span>
            <p className="text-xs text-[#6E685F] mt-1">Report ID: #{result.id.substring(0, 8)}</p>
            <p className="text-xs text-[#6E685F] font-medium">Issued: {result.uploadDate}</p>
          </div>
        </div>

        {/* Student & Institution Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630]">
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Student Details
            </p>
            <p className="text-base font-serif-title font-normal text-[#2D2A26] dark:text-[#FAF7F2]">{result.studentName || user?.studentName}</p>
            <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">Email: {user?.email}</p>
            <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">Regulation: {user?.regulation}</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              Academic Term
            </p>
            <p className="text-base font-serif-title font-normal text-[#2D2A26] dark:text-[#FAF7F2]">{result.university || user?.university}</p>
            <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">Branch: {result.branch || user?.branch}</p>
            <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">Term: {result.semester} ({result.academicYear})</p>
          </div>
        </div>

        {/* Subject Results Table */}
        <div className="space-y-3">
          <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8AAE92]" />
            Course Grade Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EAE4DC] dark:border-[#3B3630] text-[10px] uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Course Name</th>
                  <th className="py-2.5 px-3 text-center">Marks</th>
                  <th className="py-2.5 px-3 text-center">Letter Grade</th>
                  <th className="py-2.5 px-3 text-center">Credits</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE4DC]/60 dark:divide-[#3B3630]">
                {result.subjects && result.subjects.map((sub, idx) => (
                  <tr key={sub.id} className="hover:bg-[#FAF7F2]/50">
                    <td className="py-2.5 px-3 text-xs text-[#6E685F] font-medium">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-[#2D2A26] dark:text-[#FAF7F2]">{sub.subjectName}</td>
                    <td className="py-2.5 px-3 text-center font-medium">{sub.marks !== undefined ? sub.marks : '-'}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-[#8AAE92]">{sub.grade}</td>
                    <td className="py-2.5 px-3 text-center font-medium">{sub.credits}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        sub.status === 'Pass'
                          ? 'bg-[#8AAE92]/20 text-[#5C7E63] dark:text-[#A3C8AB]'
                          : 'bg-[#D98C8C]/20 text-[#C87575]'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Performance Metrics Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] text-center">
          <div>
            <p className="text-[10px] text-[#6E685F] font-semibold uppercase">CGPA (Out of 10)</p>
            <p className="text-3xl font-extrabold text-[#7C9DC5] mt-1">{result.cgpa}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#6E685F] font-semibold uppercase">Percentage</p>
            <p className="text-3xl font-extrabold text-[#8AAE92] mt-1">{result.percentage}%</p>
          </div>
          <div>
            <p className="text-[10px] text-[#6E685F] font-semibold uppercase">Credits Cleared</p>
            <p className="text-3xl font-extrabold text-[#2D2A26] dark:text-[#FAF7F2] mt-1">{result.earnedCredits} / {result.totalCredits}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#6E685F] font-semibold uppercase">Overall Classification</p>
            <p className="text-sm font-semibold text-[#2D2A26] dark:text-[#FAF7F2] mt-2">{result.overallGrade}</p>
          </div>
        </div>

        {/* AI Recommendations in Report */}
        <div className="space-y-3 pt-2">
          <h4 className="font-serif-title text-lg font-normal text-[#2D2A26] dark:text-[#FAF7F2] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8AAE92]" />
            AI Performance Feedback
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#2D2A26] dark:text-[#FAF7F2]">
            {result.recommendations && result.recommendations.map((rec, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8AAE92] shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Footer */}
        <div className="pt-6 border-t border-[#EAE4DC] dark:border-[#3B3630] flex items-center justify-between text-xs text-[#6E685F]">
          <p>© {new Date().getFullYear()} GradeInsight EdTech. Verified Server Analytics.</p>
          <p>Page 1 of 1</p>
        </div>

      </div>

    </div>
  );
};
