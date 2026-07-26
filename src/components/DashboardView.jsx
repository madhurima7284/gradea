import React from 'react';
import { 
  Calculator, 
  FileUp, 
  Award, 
  TrendingUp, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  BarChart2,
  FileCheck,
  Zap,
  Sparkles
} from 'lucide-react';

export const DashboardView = ({
  user,
  history,
  latestResult,
  setActiveTab,
  onNavigate,
  onSelectResult,
  onSelectHistoryResult,
}) => {
  const navigate = (tab) => {
    if (onNavigate) onNavigate(tab);
    else if (setActiveTab) setActiveTab(tab);
  };

  const handleSelectResultItem = (res) => {
    if (onSelectResult) onSelectResult(res);
    if (onSelectHistoryResult) onSelectHistoryResult(res);
  };

  const latestAnalysis = latestResult || (history && history.length > 0 ? history[0] : null);

  // Compute average CGPA across history
  const avgCgpa = history && history.length > 0
    ? (history.reduce((acc, curr) => acc + curr.cgpa, 0) / history.length).toFixed(2)
    : '0.00';

  const totalPassed = history ? history.reduce((acc, curr) => acc + curr.passedSubjects, 0) : 0;
  const totalSubjectsAnalyzed = history ? history.reduce((acc, curr) => acc + curr.totalSubjects, 0) : 0;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Hero Card */}
      <div className="relative rounded-[20px] bg-[#282521] text-[#FAF7F2] p-8 sm:p-10 border border-[#3B3630] shadow-sm overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1A17] text-[#8AAE92] border border-[#3B3630] text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#D8A657]" />
              <span>Academic Dashboard</span>
            </div>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-normal tracking-tight text-[#FAF7F2]">
              Welcome back, {user?.studentName ? user.studentName.split(' ')[0] : 'Student'}
            </h1>
            <p className="text-[#BDB6AC] text-xs sm:text-sm leading-relaxed">
              {user?.university || 'University Member'} • {user?.branch || 'Academic Member'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="dash-quick-pdf-btn"
              onClick={() => navigate('upload-pdf')}
              className="px-5 py-2.5 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileUp className="w-4 h-4" />
              Upload PDF Result
            </button>
            <button
              id="dash-quick-marks-btn"
              onClick={() => navigate('analyze-marks')}
              className="px-5 py-2.5 rounded-xl bg-[#1C1A17] hover:bg-[#221F1C] text-[#FAF7F2] font-medium text-xs border border-[#3B3630] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#7C9DC5]" />
              Calculate Marks
            </button>
          </div>
        </div>
      </div>

      {/* Top Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Cumulative CGPA Card */}
        <div className="bg-white dark:bg-[#282521] p-6 rounded-[20px] border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">Average CGPA</p>
            <p className="font-serif-title text-3xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] mt-1">{avgCgpa}</p>
            <p className="text-xs text-[#8AAE92] font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              10-Point Scale
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        {/* Latest CGPA */}
        <div className="bg-white dark:bg-[#282521] p-6 rounded-[20px] border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">Latest Result</p>
            <p className="font-serif-title text-3xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] mt-1">
              {latestAnalysis ? `${latestAnalysis.cgpa}` : 'N/A'}
            </p>
            <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC] font-medium mt-1">
              {latestAnalysis ? `${latestAnalysis.semester}` : 'No uploads yet'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#7C9DC5]/15 text-[#7C9DC5] flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
        </div>

        {/* Total Analyzed */}
        <div className="bg-white dark:bg-[#282521] p-6 rounded-[20px] border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">Total Analyzed</p>
            <p className="font-serif-title text-3xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] mt-1">{history ? history.length : 0}</p>
            <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC] font-medium mt-1">
              {totalSubjectsAnalyzed} Total Subjects
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#D7A98C]/15 text-[#D7A98C] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        {/* Pass Rate */}
        <div className="bg-white dark:bg-[#282521] p-6 rounded-[20px] border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">Pass Rate</p>
            <p className="font-serif-title text-3xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] mt-1">
              {totalSubjectsAnalyzed > 0 ? `${Math.round((totalPassed / totalSubjectsAnalyzed) * 100)}%` : '100%'}
            </p>
            <p className="text-xs text-[#8AAE92] font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {totalPassed} Subjects Passed
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Latest Upload Widget & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Latest Upload Detail Card */}
        <div className="lg:col-span-7 bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC] dark:border-[#3B3630]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Latest Analysis Record</h3>
                <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">Most recent transcript processing summary</p>
              </div>
            </div>

            {latestAnalysis && (
              <button
                id="dash-view-latest-btn"
                onClick={() => {
                  handleSelectResultItem(latestAnalysis);
                  navigate('results');
                }}
                className="text-xs font-medium text-[#8AAE92] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View Details
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {latestAnalysis ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630]">
                <div>
                  <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC] font-medium">Semester</p>
                  <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] mt-0.5">{latestAnalysis.semester}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC] font-medium">CGPA</p>
                  <p className="text-lg font-bold text-[#8AAE92] mt-0.5">{latestAnalysis.cgpa}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC] font-medium">Percentage</p>
                  <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] mt-0.5">{latestAnalysis.percentage}%</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC] font-medium">Status</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold mt-1 ${
                    latestAnalysis.status === 'Pass' 
                      ? 'bg-[#8AAE92]/20 text-[#5C7E63] dark:text-[#A3C8AB]'
                      : 'bg-[#D98C8C]/20 text-[#C87575]'
                  }`}>
                    {latestAnalysis.status}
                  </span>
                </div>
              </div>

              {/* Subject Badges preview */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-3">Extracted Subjects ({latestAnalysis.totalSubjects})</p>
                <div className="flex flex-wrap gap-2">
                  {latestAnalysis.subjects.slice(0, 6).map((subj) => (
                    <div key={subj.id} className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] text-xs flex items-center gap-2">
                      <span className="font-medium text-[#2D2A26] dark:text-[#FAF7F2] truncate max-w-[150px]">{subj.subjectName}</span>
                      <span className="px-1.5 py-0.5 rounded-md bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] font-bold text-[11px]">{subj.grade}</span>
                    </div>
                  ))}
                  {latestAnalysis.subjects.length > 6 && (
                    <div className="px-3 py-1.5 rounded-xl bg-[#EAE4DC]/50 dark:bg-[#3B3630] text-[#6E685F] dark:text-[#BDB6AC] text-xs font-medium">
                      +{latestAnalysis.subjects.length - 6} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 border border-dashed border-[#EAE4DC] dark:border-[#3B3630] rounded-[16px] space-y-3">
              <Clock className="w-8 h-8 text-[#9E978E] mx-auto" />
              <p className="text-[#2D2A26] dark:text-[#FAF7F2] font-medium text-sm">No Analysis Performed Yet</p>
              <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC] max-w-sm mx-auto">
                Upload a semester result PDF or input your subject marks to generate your first academic report.
              </p>
              <button
                id="dash-empty-start-btn"
                onClick={() => navigate('upload-pdf')}
                className="mt-2 px-4 py-2 rounded-xl bg-[#8AAE92] text-white font-medium text-xs hover:bg-[#789C7E] transition-colors cursor-pointer"
              >
                Upload First Result PDF
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions & Shortcut Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
            <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Analysis Workflows</h3>

            <div 
              onClick={() => navigate('upload-pdf')}
              className="p-4 rounded-xl border border-[#8AAE92]/40 bg-[#8AAE92]/10 dark:bg-[#8AAE92]/15 hover:border-[#8AAE92] transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#8AAE92] text-white flex items-center justify-center">
                  <FileUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] group-hover:text-[#8AAE92] transition-colors">Upload Result PDF ⭐</p>
                  <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC]">OCR extraction of marks & grades</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8AAE92] group-hover:translate-x-1 transition-transform" />
            </div>

            <div 
              onClick={() => navigate('analyze-marks')}
              className="p-4 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630] hover:border-[#7C9DC5] transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#7C9DC5]/15 text-[#7C9DC5] flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] group-hover:text-[#7C9DC5] transition-colors">Calculate using Marks</p>
                  <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC]">Subject marks obtained & credit weights</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9E978E] group-hover:translate-x-1 transition-transform" />
            </div>

            <div 
              onClick={() => navigate('analyze-grades')}
              className="p-4 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630] hover:border-[#D7A98C] transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D7A98C]/15 text-[#D7A98C] flex items-center justify-center">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] group-hover:text-[#D7A98C] transition-colors">Calculate using Letter Grades</p>
                  <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC]">Select letter grades (S, A, B, C, D, E, F)</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9E978E] group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        </div>

      </div>

      {/* History List */}
      <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-title text-2xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Recent Analyses</h3>
            <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">History of analyzed terms & transcripts</p>
          </div>
          <button
            id="dash-view-all-history-btn"
            onClick={() => navigate('history')}
            className="text-xs font-medium text-[#8AAE92] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All ({history ? history.length : 0})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {history && history.length > 0 ? (
          <div className="divide-y divide-[#EAE4DC]/60 dark:divide-[#3B3630]">
            {history.slice(0, 5).map((item) => (
              <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF7F2] dark:hover:bg-[#221F1C] px-3 rounded-xl transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center font-bold text-xs">
                    {item.cgpa}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2]">{item.semester} • {item.academicYear}</h4>
                    <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC]">
                      {item.fileName ? `File: ${item.fileName}` : `Method: ${item.method}`} • {item.uploadDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#2D2A26] dark:text-[#FAF7F2]">{item.percentage}%</p>
                    <p className="text-[10px] text-[#6E685F] dark:text-[#BDB6AC]">{item.totalSubjects} Subjects</p>
                  </div>

                  <button
                    onClick={() => {
                      handleSelectResultItem(item);
                      navigate('results');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] hover:border-[#8AAE92] text-xs font-medium text-[#2D2A26] dark:text-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[#6E685F] dark:text-[#BDB6AC] text-xs">
            No completed analysis history available.
          </div>
        )}
      </div>

    </div>
  );
};
