import React, { useState } from 'react';
import { VerifyTotalMarksModal } from './VerifyTotalMarksModal';
import { 
  Check, 
  Plus, 
  Trash2, 
  AlertCircle, 
  ArrowRight, 
  Edit3, 
  BookOpen,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const EditableDataView = ({
  initialResult,
  onConfirmAnalysis,
  gradingFormula,
}) => {
  const [subjects, setSubjects] = useState(initialResult.subjects || []);
  const [semester, setSemester] = useState(initialResult.semester || 'Semester 1');
  const [academicYear, setAcademicYear] = useState(initialResult.academicYear || '2025-2026');
  const [studentName, setStudentName] = useState(initialResult.studentName || '');
  const [university, setUniversity] = useState(initialResult.university || '');
  const [branch, setBranch] = useState(initialResult.branch || '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Identify subjects needing total marks verification
  const suspectSubjects = subjects.filter(
    (s) => s.needsTotalMarksVerification === true || (s.marks !== undefined && s.hasExplicitTotalMarks !== true && (s.status === 'Fail' || s.grade === 'F'))
  );

  const [isModalOpen, setIsModalOpen] = useState(suspectSubjects.length > 0);

  const handleSubjectChange = (id, field, value) => {
    setSubjects(
      subjects.map((sub) => {
        if (sub.id === id) {
          const updated = { ...sub, [field]: value };
          if (field === 'totalMarks' && value && Number(value) > 0) {
            updated.hasExplicitTotalMarks = true;
            updated.needsTotalMarksVerification = false;
          }
          return updated;
        }
        return sub;
      })
    );
    setError(null);
  };

  const handleModalConfirm = (verifiedMap) => {
    setIsModalOpen(false);
    const updatedSubjects = subjects.map((sub) => {
      if (verifiedMap[sub.id] !== undefined) {
        return {
          ...sub,
          totalMarks: verifiedMap[sub.id],
          hasExplicitTotalMarks: true,
          needsTotalMarksVerification: false,
          ocrConfidence: 'high',
        };
      }
      return sub;
    });

    setSubjects(updatedSubjects);
    // Trigger recalculation immediately with verified values
    recalculateWithSubjects(updatedSubjects);
  };

  const handleAddRow = () => {
    const newSub = {
      id: `extracted-${Date.now()}-${Math.random()}`,
      subjectName: '',
      marks: 80,
      totalMarks: 100,
      hasExplicitTotalMarks: true,
      needsTotalMarksVerification: false,
      grade: 'A',
      credits: 3,
      status: 'Pass',
    };
    setSubjects([...subjects, newSub]);
    setError(null);
  };

  const handleRemoveRow = (id) => {
    if (subjects.length <= 1) {
      setError('At least one subject is required.');
      return;
    }
    setSubjects(subjects.filter((s) => s.id !== id));
    setError(null);
  };

  const recalculateWithSubjects = async (currentSubjects) => {
    setError(null);

    for (let i = 0; i < currentSubjects.length; i++) {
      if (!currentSubjects[i].subjectName || currentSubjects[i].subjectName.trim() === '') {
        setError(`Subject name is required for Row ${i + 1}.`);
        return;
      }
      if (currentSubjects[i].marks !== undefined && currentSubjects[i].totalMarks) {
        if (Number(currentSubjects[i].totalMarks) <= Number(currentSubjects[i].marks)) {
          setError(`Total Marks must be greater than Marks Obtained for "${currentSubjects[i].subjectName}".`);
          return;
        }
      }
    }

    setLoading(true);

    try {
      const response = await fetch('/api/recalculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects: currentSubjects,
          semester,
          academicYear,
          studentName,
          university,
          branch,
          fileName: initialResult.fileName,
          method: initialResult.method,
          gradingFormula,
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
        throw new Error(data.error || 'Recalculation failed.');
      }

      onConfirmAnalysis(data);
    } catch (err) {
      setError(err.message || 'Error processing recalculation.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculateAndAnalyze = () => {
    recalculateWithSubjects(subjects);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Verify Total Marks Modal */}
      <VerifyTotalMarksModal
        isOpen={isModalOpen}
        suspectSubjects={suspectSubjects}
        onConfirm={handleModalConfirm}
        onCancel={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#8AAE92]" />
          <span>Extracted Document Table</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
          Review & Correct Extracted Data
        </h1>
        <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs sm:text-sm max-w-xl mx-auto">
          Verify the extracted subjects, marks, total marks, grades, and credits below. You can correct any details before generating the final report.
        </p>
      </div>

      {suspectSubjects.length > 0 && (
        <div className="p-4 rounded-xl bg-[#D7A98C]/15 border border-[#D7A98C]/30 text-[#B87A54] dark:text-[#E8BD9E] text-xs sm:text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#D7A98C]" />
            <span>We detected {suspectSubjects.length} subject(s) that may require total marks verification.</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-[#D7A98C] text-white text-xs font-semibold hover:bg-[#C29273] transition-colors cursor-pointer shrink-0"
          >
            Verify Maximum Marks
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-[#D98C8C]/15 border border-[#D98C8C]/30 text-[#C87575] text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-[#C87575]" />
          <span>{error}</span>
        </div>
      )}

      {/* Metadata Card */}
      <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
            Student Name
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student Name"
            className="w-full px-3.5 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
            Semester
          </label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="e.g. Semester 4"
            className="w-full px-3.5 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
          />
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
      </div>

      {/* Editable Table Card */}
      <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC] dark:border-[#3B3630]">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-[#8AAE92]" />
            <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">Subject Data Table</h3>
          </div>

          <button
            type="button"
            onClick={handleAddRow}
            className="px-3.5 py-1.5 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] hover:bg-[#8AAE92]/25 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Row
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#EAE4DC] dark:border-[#3B3630] text-[10px] uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC]">
                <th className="py-2.5 px-3">Subject Name</th>
                <th className="py-2.5 px-3 w-24">Marks</th>
                <th className="py-2.5 px-3 w-28">Total Marks</th>
                <th className="py-2.5 px-3 w-20">Grade</th>
                <th className="py-2.5 px-3 w-20">Credits</th>
                <th className="py-2.5 px-3 w-28">Status</th>
                <th className="py-2.5 px-3 w-16 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4DC]/60 dark:divide-[#3B3630]">
              {subjects.map((sub) => {
                const isSuspect = sub.needsTotalMarksVerification || (sub.marks !== undefined && sub.hasExplicitTotalMarks !== true && (sub.status === 'Fail' || sub.grade === 'F'));
                return (
                  <tr 
                    key={sub.id} 
                    className={`transition-colors ${
                      isSuspect 
                        ? 'bg-[#D7A98C]/10 dark:bg-[#D7A98C]/5 hover:bg-[#D7A98C]/15' 
                        : 'hover:bg-[#FAF7F2] dark:hover:bg-[#221F1C]'
                    }`}
                  >
                    <td className="py-2 px-3">
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={sub.subjectName}
                          onChange={(e) => handleSubjectChange(sub.id, 'subjectName', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-lg text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
                        />
                        {isSuspect && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#B87A54] dark:text-[#E8BD9E]">
                            <HelpCircle className="w-3 h-3 text-[#D7A98C]" />
                            Verify Max Marks
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-2 px-3">
                      <input
                        type="number"
                        value={sub.marks !== undefined ? sub.marks : ''}
                        onChange={(e) => handleSubjectChange(sub.id, 'marks', e.target.value === '' ? undefined : Number(e.target.value))}
                        placeholder="e.g. 29"
                        className="w-full px-3 py-1.5 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-lg text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
                      />
                    </td>

                    <td className="py-2 px-3">
                      <input
                        type="number"
                        value={sub.totalMarks !== undefined ? sub.totalMarks : ''}
                        onChange={(e) => handleSubjectChange(sub.id, 'totalMarks', e.target.value === '' ? undefined : Number(e.target.value))}
                        placeholder="e.g. 30"
                        className={`w-full px-3 py-1.5 bg-[#FAF7F2] dark:bg-[#1C1A17] border rounded-lg text-xs font-medium focus:outline-none focus:ring-1 ${
                          isSuspect
                            ? 'border-[#D7A98C] focus:ring-[#D7A98C]'
                            : 'border-[#EAE4DC] dark:border-[#3B3630] focus:ring-[#8AAE92]'
                        }`}
                      />
                    </td>

                    <td className="py-2 px-3">
                      <select
                        value={sub.grade}
                        onChange={(e) => handleSubjectChange(sub.id, 'grade', e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-lg text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
                      >
                        <option value="S">S</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                      </select>
                    </td>

                    <td className="py-2 px-3">
                      <select
                        value={sub.credits}
                        onChange={(e) => handleSubjectChange(sub.id, 'credits', Number(e.target.value))}
                        className="w-full px-2 py-1.5 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-lg text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92]"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </td>

                    <td className="py-2 px-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        sub.grade !== 'F' && sub.status === 'Pass'
                          ? 'bg-[#8AAE92]/20 text-[#5C7E63] dark:text-[#A3C8AB]'
                          : 'bg-[#D98C8C]/20 text-[#C87575]'
                      }`}>
                        {sub.grade === 'F' ? 'Fail' : sub.status}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(sub.id)}
                        className="p-1.5 text-[#D98C8C] hover:bg-[#D98C8C]/15 rounded-lg transition-colors cursor-pointer"
                        title="Delete row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-[#EAE4DC] dark:border-[#3B3630]">
          <span className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">
            Total Extracted Subjects: <strong className="text-[#2D2A26] dark:text-[#FAF7F2]">{subjects.length}</strong>
          </span>

          <button
            type="button"
            id="confirm-analyze-btn"
            disabled={loading}
            onClick={handleRecalculateAndAnalyze}
            className="px-6 py-2.5 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Confirm & Analyze</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
