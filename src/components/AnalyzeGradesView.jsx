import React, { useState } from 'react';
import { 
  BarChart3, 
  Plus, 
  Trash2, 
  AlertCircle, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const AnalyzeGradesView = ({ onSuccess, gradingFormula }) => {
  const [semester, setSemester] = useState('Semester 1');
  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [studentName, setStudentName] = useState('');

  const [subjects, setSubjects] = useState([
    { id: '1', subjectName: 'Data Structures & Algorithms', grade: 'S', credits: 4 },
    { id: '2', subjectName: 'Database Management Systems', grade: 'A', credits: 4 },
    { id: '3', subjectName: 'Discrete Mathematics', grade: 'B', credits: 3 },
    { id: '4', subjectName: 'Computer Networks', grade: 'A', credits: 3 },
  ]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddSubject = () => {
    const newSub = {
      id: `${Date.now()}-${Math.random()}`,
      subjectName: '',
      grade: 'A',
      credits: 3,
    };
    setSubjects([...subjects, newSub]);
    setError(null);
  };

  const handleRemoveSubject = (id) => {
    if (subjects.length <= 1) {
      setError('At least one subject is required.');
      return;
    }
    setSubjects(subjects.filter((s) => s.id !== id));
    setError(null);
  };

  const handleSubjectChange = (id, field, value) => {
    setSubjects(
      subjects.map((s) => {
        if (s.id === id) {
          return { ...s, [field]: value };
        }
        return s;
      })
    );
    setError(null);
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError(null);

    for (let i = 0; i < subjects.length; i++) {
      if (!subjects[i].subjectName || subjects[i].subjectName.trim() === '') {
        setError(`Subject name is required for Row ${i + 1}.`);
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch('/api/calculate-grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects,
          semester,
          academicYear,
          gradingFormula,
          studentName,
        }),
      });

      const responseText = await response.text();
      let data = {};
      try {
        data = JSON.parse(responseText);
      } catch {
        if (!response.ok) {
          throw new Error(`Server returned error (${response.status}: ${response.statusText}).`);
        }
        throw new Error('Received an unexpected response format from the server.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Grade calculation failed.');
      }

      onSuccess(data);
    } catch (err) {
      setError(err.message || 'Error communicating with server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB]">
          <BarChart3 className="w-5 h-5" />
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
          Calculate Performance Using Letter Grades
        </h1>
        <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs sm:text-sm max-w-xl mx-auto">
          Select letter grades (S, A, B, C, D, E, F) and course credits. The backend maps grade points and computes SGPA.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-[#D98C8C]/15 border border-[#D98C8C]/30 text-[#C87575] text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-[#C87575]" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleCalculate} className="space-y-6">
        
        {/* Metadata Inputs */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
            >
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
              <option value="Semester 6">Semester 6</option>
              <option value="Semester 7">Semester 7</option>
              <option value="Semester 8">Semester 8</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
              Academic Year
            </label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="2025-2026"
              className="w-full px-3.5 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
              Student Name (Optional)
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Madhurima"
              className="w-full px-3.5 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
            />
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC] dark:border-[#3B3630]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8AAE92]" />
              <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Subject & Grade Entry</h3>
            </div>

            <button
              type="button"
              id="add-grades-subject-btn"
              onClick={handleAddSubject}
              className="px-3.5 py-1.5 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] hover:bg-[#8AAE92]/25 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Subject
            </button>
          </div>

          <div className="space-y-3">
            {subjects.map((sub, idx) => (
              <div 
                key={sub.id} 
                className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] transition-all"
              >
                <div className="col-span-12 sm:col-span-6">
                  <label className="block text-[10px] font-semibold text-[#6E685F] mb-1 sm:hidden">Subject Name</label>
                  <input
                    type="text"
                    required
                    value={sub.subjectName}
                    onChange={(e) => handleSubjectChange(sub.id, 'subjectName', e.target.value)}
                    placeholder={`Subject ${idx + 1} Name`}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#282521] border border-[#EAE4DC] dark:border-[#3B3630] rounded-lg text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-[10px] font-semibold text-[#6E685F] mb-1 sm:hidden">Grade</label>
                  <select
                    value={sub.grade}
                    onChange={(e) => handleSubjectChange(sub.id, 'grade', e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#282521] border border-[#EAE4DC] dark:border-[#3B3630] rounded-lg text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
                  >
                    <option value="S">Grade S (10 Pts)</option>
                    <option value="A">Grade A (9 Pts)</option>
                    <option value="B">Grade B (8 Pts)</option>
                    <option value="C">Grade C (7 Pts)</option>
                    <option value="D">Grade D (6 Pts)</option>
                    <option value="E">Grade E (5 Pts)</option>
                    <option value="F">Grade F (0 Pts)</option>
                  </select>
                </div>

                <div className="col-span-5 sm:col-span-2">
                  <label className="block text-[10px] font-semibold text-[#6E685F] mb-1 sm:hidden">Credits</label>
                  <select
                    value={sub.credits}
                    onChange={(e) => handleSubjectChange(sub.id, 'credits', Number(e.target.value))}
                    className="w-full px-2 py-1.5 bg-white dark:bg-[#282521] border border-[#EAE4DC] dark:border-[#3B3630] rounded-lg text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
                  >
                    <option value={1}>1 Credit</option>
                    <option value={2}>2 Credits</option>
                    <option value={3}>3 Credits</option>
                    <option value={4}>4 Credits</option>
                    <option value={5}>5 Credits</option>
                  </select>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(sub.id)}
                    className="p-1.5 text-[#D98C8C] hover:bg-[#D98C8C]/15 rounded-lg transition-colors cursor-pointer"
                    title="Remove Subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#EAE4DC] dark:border-[#3B3630]">
            <span className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">
              Total Subjects: <strong className="text-[#2D2A26] dark:text-[#FAF7F2]">{subjects.length}</strong>
            </span>

            <button
              type="submit"
              disabled={loading}
              id="submit-calculate-grades-btn"
              className="px-6 py-2.5 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Analyze Grades</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};
