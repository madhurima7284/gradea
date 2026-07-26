import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  FileCheck, 
  Calculator, 
  BarChart3, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';

export const LandingHero = ({ 
  setActiveTab, 
  onGetStarted, 
  onSelectMethod 
}) => {
  const handleStart = () => {
    if (onGetStarted) {
      onGetStarted();
    } else if (setActiveTab) {
      setActiveTab('upload-pdf');
    }
  };

  const handleSelect = (method, fallbackTab) => {
    if (onSelectMethod) {
      onSelectMethod(method);
    } else if (setActiveTab) {
      setActiveTab(fallbackTab);
    }
  };

  return (
    <div className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8AAE92]/15 dark:bg-[#8AAE92]/20 border border-[#8AAE92]/30 text-[#5C7E63] dark:text-[#A3C8AB] text-xs font-medium tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8AAE92]" />
              <span>Academic Performance & Result Engine</span>
            </div>

            {/* Title */}
            <h1 className="font-serif-title text-5xl sm:text-6xl md:text-7xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] tracking-tight leading-[1.08]">
              GradeInsight
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#6E685F] dark:text-[#BDB6AC] font-normal leading-relaxed max-w-2xl">
              Analyze your academic performance instantly using marks, letter grades, or semester result PDFs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-getstarted-btn"
                onClick={handleStart}
                className="px-6 py-3 rounded-2xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-sm shadow-sm transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                Upload Result PDF
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-learnmore-btn"
                onClick={() => {
                  const el = document.getElementById('features-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-2xl bg-white dark:bg-[#282521] hover:bg-[#FDFBF8] dark:hover:bg-[#221F1C] text-[#2D2A26] dark:text-[#FAF7F2] font-medium text-sm border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs transition-all cursor-pointer"
              >
                Explore Workflows
              </button>
            </div>

            {/* Metrics pills */}
            <div className="pt-6 border-t border-[#EAE4DC] dark:border-[#3B3630] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="font-serif-title text-2xl text-[#2D2A26] dark:text-[#FAF7F2]">100%</p>
                <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">Accurate Weighted CGPA</p>
              </div>
              <div>
                <p className="font-serif-title text-2xl text-[#2D2A26] dark:text-[#FAF7F2]">&lt; 3 Secs</p>
                <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">PDF Extraction</p>
              </div>
              <div>
                <p className="font-serif-title text-2xl text-[#2D2A26] dark:text-[#FAF7F2]">Smart</p>
                <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">Growth Advice</p>
              </div>
            </div>

          </div>

          {/* Right Column Illustration & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-[20px] overflow-hidden border border-[#EAE4DC] dark:border-[#3B3630] shadow-sm bg-white dark:bg-[#282521] p-2">
              <img
                src="/src/assets/images/grade_insight_hero_1784888327546.jpg"
                alt="GradeInsight Academic Performance Analytics"
                className="w-full h-auto rounded-[16px] object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Floating Badge 1 */}
              <div className="absolute top-5 -left-3 sm:-left-5 bg-white/95 dark:bg-[#282521]/95 backdrop-blur-md p-3 rounded-[16px] border border-[#EAE4DC] dark:border-[#3B3630] shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#6E685F] dark:text-[#BDB6AC] font-medium uppercase tracking-wider">Target CGPA</p>
                  <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2]">9.42 / 10.0</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-3 right-3 sm:right-5 bg-white/95 dark:bg-[#282521]/95 backdrop-blur-md p-3 rounded-[16px] border border-[#EAE4DC] dark:border-[#3B3630] shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#7C9DC5]/15 text-[#7C9DC5] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-[#6E685F] dark:text-[#BDB6AC] font-medium uppercase tracking-wider">Academic Honors</p>
                  <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2]">First Class Distinction</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Cards Section */}
        <div id="features-section" className="mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
              Three Flexible Analysis Workflows
            </h2>
            <p className="text-[#6E685F] dark:text-[#BDB6AC] text-sm">
              Select your preferred input format. Our weighted grade engine handles credit calculations and transcript generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Marks */}
            <div 
              onClick={() => handleSelect('marks', 'analyze-marks')}
              className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] hover:border-[#8AAE92] shadow-xs hover:shadow-sm transition-all cursor-pointer group space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-[#2D2A26] dark:text-[#FAF7F2] group-hover:text-[#8AAE92] transition-colors">
                1. Subject Marks
              </h3>
              <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs leading-relaxed">
                Enter numerical marks obtained and total marks per subject with credit weights for percentage & grade mapping.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#8AAE92]">
                Calculate via Marks
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Letter Grades */}
            <div 
              onClick={() => handleSelect('grades', 'analyze-grades')}
              className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] hover:border-[#7C9DC5] shadow-xs hover:shadow-sm transition-all cursor-pointer group space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7C9DC5]/15 text-[#7C9DC5] flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-[#2D2A26] dark:text-[#FAF7F2] group-hover:text-[#7C9DC5] transition-colors">
                2. Letter Grades
              </h3>
              <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs leading-relaxed">
                Select university letter grades (S, A, B, C, D, E, F) with course credits to calculate weighted 10-point SGPA.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#7C9DC5]">
                Calculate via Grades
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: PDF Upload */}
            <div 
              onClick={() => handleSelect('pdf', 'upload-pdf')}
              className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border-2 border-[#8AAE92] shadow-xs hover:shadow-sm transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#8AAE92] text-white text-[10px] font-medium tracking-wide">
                Recommended ⭐
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#8AAE92] text-white flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-[#2D2A26] dark:text-[#FAF7F2] group-hover:text-[#8AAE92] transition-colors">
                3. Result PDF Extraction
              </h3>
              <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs leading-relaxed">
                Upload your semester result sheet or transcript PDF. Extracts subjects, marks, and grades automatically.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#8AAE92]">
                Upload Semester PDF
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>

        {/* Security & Reliability Banner */}
        <div className="mt-16 rounded-[20px] bg-[#282521] text-[#FAF7F2] p-8 md:p-10 border border-[#3B3630] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#1C1A17] text-[#8AAE92] border border-[#3B3630]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-[#FAF7F2] text-sm">Server Calculation</h4>
                <p className="text-[#BDB6AC] text-xs mt-1">100% backend verified formula validation and weighted credits.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#1C1A17] text-[#7C9DC5] border border-[#3B3630]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-[#FAF7F2] text-sm">Editable OCR Data</h4>
                <p className="text-[#BDB6AC] text-xs mt-1">Review and fine-tune extracted PDF subjects before final computation.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#1C1A17] text-[#D7A98C] border border-[#3B3630]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-[#FAF7F2] text-sm">Printable Reports</h4>
                <p className="text-[#BDB6AC] text-xs mt-1">Export high-resolution academic transcripts and growth recommendations.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
