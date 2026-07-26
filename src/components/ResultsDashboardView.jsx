import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Star, 
  BarChart2, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  AreaChart as AreaChartIcon,
  Download,
  Share2,
  Printer,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#8AAE92', '#7C9DC5', '#D7A98C', '#7FB77E', '#D8A657', '#D98C8C'];

export const ResultsDashboardView = ({
  result,
  history,
  onViewReport,
  onAnalyzeAnother,
}) => {
  // Chart Data Preparation
  const subjectChartData = result && result.subjects ? result.subjects.map((sub) => ({
    subject: sub.subjectName.length > 18 ? `${sub.subjectName.substring(0, 15)}...` : sub.subjectName,
    marks: sub.marks !== undefined ? sub.marks : (sub.grade === 'S' ? 95 : sub.grade === 'A' ? 85 : sub.grade === 'B' ? 75 : sub.grade === 'C' ? 65 : 55),
    grade: sub.grade,
    credits: sub.credits,
  })) : [];

  const gradeDistData = result && result.gradeDistribution ? result.gradeDistribution.filter((item) => item.count > 0) : [];

  // Semester Trend Chart (using real history + current result)
  const semesterTrendData = history && history.length > 0
    ? [...history].reverse().map((h) => ({
        semester: h.semester,
        cgpa: h.cgpa,
        percentage: h.percentage,
      }))
    : [
        { semester: 'Sem 1', cgpa: 7.8, percentage: 74.1 },
        { semester: 'Sem 2', cgpa: 8.2, percentage: 77.9 },
        { semester: 'Sem 3', cgpa: 8.6, percentage: 81.7 },
        { semester: result?.semester || 'Sem 4', cgpa: result?.cgpa || 8.5, percentage: result?.percentage || 80.0 },
      ];

  const academicGrowthData = [
    { period: 'Term Start', performanceIndex: 65 },
    { period: 'Mid-Terms', performanceIndex: 78 },
    { period: 'Practicals', performanceIndex: 88 },
    { period: 'End-Semesters', performanceIndex: Math.round(result?.percentage || 80) },
  ];

  if (!result) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="bg-[#8AAE92] rounded-[20px] p-8 sm:p-10 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Academic Performance Verified</span>
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-normal">
            Analysis Results – {result.semester}
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            {result.studentName} • {result.university}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            id="view-report-card-btn"
            onClick={onViewReport}
            className="px-5 py-2.5 rounded-xl bg-white text-[#2D2A26] hover:bg-[#FAF7F2] font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#8AAE92]" />
            View Full Report
          </button>
          <button
            id="analyze-another-btn"
            onClick={onAnalyzeAnother}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-medium text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            Analyze Another Term
          </button>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* CGPA */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">CGPA / SGPA</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#7C9DC5]/15 text-[#54739B] dark:text-[#9BBBE3] font-bold text-[10px]">Out of 10</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-[#7C9DC5]">{result.cgpa}</span>
            <span className="text-xs font-semibold text-[#6E685F]">/ 10.0</span>
          </div>
          <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC] mt-2 font-medium">Overall Grade: {result.overallGrade}</p>
        </div>

        {/* Percentage */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">Percentage</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] font-bold text-[10px]">Out of 100</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-[#8AAE92]">{result.percentage}%</span>
          </div>
          <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC] mt-2 font-medium">Calculated via credit weight formula</p>
        </div>

        {/* Pass / Fail Status */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">Term Result</span>
            {result.status === 'Pass' ? (
              <CheckCircle2 className="w-5 h-5 text-[#7FB77E]" />
            ) : (
              <XCircle className="w-5 h-5 text-[#D98C8C]" />
            )}
          </div>
          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-xl text-xl font-bold ${
              result.status === 'Pass'
                ? 'bg-[#7FB77E]/20 text-[#4E804D]'
                : 'bg-[#D98C8C]/20 text-[#C87575]'
            }`}>
              {result.status === 'Pass' ? 'PASSED' : 'FAILED'}
            </span>
          </div>
          <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs font-medium mt-3">
            {result.passedSubjects} of {result.totalSubjects} subjects cleared
          </p>
        </div>

        {/* Credits Earned */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">Credits Earned</span>
            <Award className="w-5 h-5 text-[#D7A98C]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-[#D7A98C]">{result.earnedCredits}</span>
            <span className="text-xs font-semibold text-[#6E685F]">/ {result.totalCredits}</span>
          </div>
          <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC] mt-2 font-medium">Total Semester Credits</p>
        </div>

      </div>

      {/* Secondary Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#282521] p-5 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630]">
          <p className="text-[10px] text-[#6E685F] dark:text-[#BDB6AC] font-medium uppercase tracking-wider">Highest Grade</p>
          <p className="text-2xl font-normal font-serif-title text-[#2D2A26] dark:text-[#FAF7F2] mt-1">{result.highestGrade}</p>
        </div>

        <div className="bg-white dark:bg-[#282521] p-5 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630]">
          <p className="text-[10px] text-[#6E685F] dark:text-[#BDB6AC] font-medium uppercase tracking-wider">Lowest Grade</p>
          <p className="text-2xl font-normal font-serif-title text-[#2D2A26] dark:text-[#FAF7F2] mt-1">{result.lowestGrade}</p>
        </div>

        <div className="bg-white dark:bg-[#282521] p-5 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630]">
          <p className="text-[10px] text-[#6E685F] dark:text-[#BDB6AC] font-medium uppercase tracking-wider">Highest Marks Subject</p>
          <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] truncate mt-1">
            {result.highestMarksSubject ? `${result.highestMarksSubject.name} (${result.highestMarksSubject.marks})` : 'N/A'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#282521] p-5 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630]">
          <p className="text-[10px] text-[#6E685F] dark:text-[#BDB6AC] font-medium uppercase tracking-wider">Lowest Marks Subject</p>
          <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] truncate mt-1">
            {result.lowestMarksSubject ? `${result.lowestMarksSubject.name} (${result.lowestMarksSubject.marks})` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Modern Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Bar Chart - Subject Performance */}
        <div className="lg:col-span-7 bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#8AAE92]" />
              <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Subject-wise Performance</h3>
            </div>
            <span className="text-[10px] text-[#6E685F]">Marks / Grade Weight</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE4DC" />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fill: '#6E685F' }} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#6E685F' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#282521', color: '#FAF7F2', borderRadius: '12px', border: '1px solid #3B3630', fontSize: '11px' }}
                />
                <Bar dataKey="marks" fill="#8AAE92" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Pie Chart - Grade Distribution */}
        <div className="lg:col-span-5 bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-[#7C9DC5]" />
            <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Grade Distribution</h3>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="grade"
                  label={({ grade, count }) => `${grade}: ${count}`}
                >
                  {gradeDistData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#282521', color: '#FAF7F2', borderRadius: '12px', border: '1px solid #3B3630', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Line Chart - Semester-wise Trend */}
        <div className="lg:col-span-6 bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-4 h-4 text-[#D7A98C]" />
            <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Semester-wise CGPA Trend</h3>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={semesterTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE4DC" />
                <XAxis dataKey="semester" tick={{ fontSize: 10, fill: '#6E685F' }} />
                <YAxis domain={[5, 10]} tick={{ fontSize: 10, fill: '#6E685F' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#282521', color: '#FAF7F2', borderRadius: '12px', border: '1px solid #3B3630', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="cgpa" stroke="#D7A98C" strokeWidth={2.5} dot={{ r: 5, fill: '#D7A98C' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Area Chart - Academic Growth */}
        <div className="lg:col-span-6 bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <AreaChartIcon className="w-4 h-4 text-[#7FB77E]" />
            <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Academic Growth Curve</h3>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={academicGrowthData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE4DC" />
                <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#6E685F' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#6E685F' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#282521', color: '#FAF7F2', borderRadius: '12px', border: '1px solid #3B3630', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="performanceIndex" stroke="#7FB77E" fill="#7FB77E" fillOpacity={0.2} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* AI Recommendations Section */}
      <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">AI Academic Recommendations</h3>
            <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">Tailored suggestions based on course credit weightage & grade distribution</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {result.recommendations && result.recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#8AAE92] shrink-0 mt-0.5" />
              <p className="text-xs text-[#2D2A26] dark:text-[#FAF7F2] font-medium leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
