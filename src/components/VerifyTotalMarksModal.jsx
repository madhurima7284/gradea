import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export const VerifyTotalMarksModal = ({
  isOpen,
  suspectSubjects,
  onConfirm,
  onCancel,
}) => {
  const [totalMarksMap, setTotalMarksMap] = useState({});
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);

  useEffect(() => {
    if (isOpen && suspectSubjects && suspectSubjects.length > 0) {
      const initialMap = {};
      suspectSubjects.forEach((sub) => {
        let defaultTotal = sub.totalMarks ? String(sub.totalMarks) : '';
        if (!defaultTotal && sub.marks !== undefined) {
          if (sub.marks <= 30) defaultTotal = '30';
          else if (sub.marks <= 50) defaultTotal = '50';
          else if (sub.marks <= 75) defaultTotal = '75';
          else defaultTotal = '100';
        }
        initialMap[sub.id] = defaultTotal;
      });
      setTotalMarksMap(initialMap);
      setErrors({});
      setGeneralError(null);
    }
  }, [isOpen, suspectSubjects]);

  if (!isOpen || !suspectSubjects || suspectSubjects.length === 0) return null;

  const handleInputChange = (id, value) => {
    setTotalMarksMap((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
    setGeneralError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const finalNumbersMap = {};

    suspectSubjects.forEach((sub) => {
      const valStr = totalMarksMap[sub.id]?.trim();
      if (!valStr || valStr === '') {
        newErrors[sub.id] = 'Total Marks cannot be empty.';
        return;
      }

      const numVal = Number(valStr);
      if (isNaN(numVal) || numVal <= 0) {
        newErrors[sub.id] = 'Total Marks must be a positive number.';
        return;
      }

      if (sub.marks !== undefined && numVal <= sub.marks) {
        newErrors[sub.id] = `Total Marks (${numVal}) must be greater than Marks Obtained (${sub.marks}).`;
        return;
      }

      finalNumbersMap[sub.id] = numVal;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGeneralError('Please fix the errors below before confirming.');
      return;
    }

    onConfirm(finalNumbersMap);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#282521] border border-[#EAE4DC] dark:border-[#3B3630] rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header Pill & Icon */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D7A98C]/20 text-[#D7A98C] text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-[#D7A98C]" />
            <span>Verify Maximum Marks</span>
          </div>

          <h3 className="font-serif-title text-2xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] leading-snug">
            Subject Result Verification
          </h3>

          <p className="text-xs sm:text-sm text-[#6E685F] dark:text-[#BDB6AC] leading-relaxed bg-[#FAF7F2] dark:bg-[#1C1A17] p-3.5 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630]">
            We detected a subject that may be a failed subject. Please enter the maximum marks for this subject so we can determine the correct result.
          </p>
        </div>

        {generalError && (
          <div className="p-3 rounded-xl bg-[#D98C8C]/15 border border-[#D98C8C]/30 text-[#C87575] text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {suspectSubjects.map((sub) => {
            const hasError = !!errors[sub.id];
            return (
              <div 
                key={sub.id} 
                className={`p-4 rounded-xl border transition-all ${
                  hasError 
                    ? 'border-[#D98C8C] bg-[#D98C8C]/5' 
                    : 'border-[#EAE4DC] dark:border-[#3B3630] bg-[#FAF7F2]/60 dark:bg-[#1C1A17]/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2]">
                      Subject: <span className="text-[#8AAE92] dark:text-[#A3C8AB]">{sub.subjectName}</span>
                    </p>
                    <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">
                      Marks Obtained: <strong className="text-[#2D2A26] dark:text-[#FAF7F2]">{sub.marks !== undefined ? sub.marks : 'N/A'}</strong>
                    </p>
                  </div>

                  <div className="w-full sm:w-36 space-y-1">
                    <label className="block text-[10px] font-semibold uppercase text-[#6E685F] dark:text-[#BDB6AC]">
                      Total Marks
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={totalMarksMap[sub.id] || ''}
                      onChange={(e) => handleInputChange(sub.id, e.target.value)}
                      placeholder="e.g. 30, 50, 100"
                      className={`w-full px-3 py-2 bg-white dark:bg-[#282521] border rounded-xl text-xs font-bold text-[#2D2A26] dark:text-[#FAF7F2] focus:outline-none focus:ring-2 ${
                        hasError 
                          ? 'border-[#D98C8C] focus:ring-[#D98C8C]' 
                          : 'border-[#EAE4DC] dark:border-[#3B3630] focus:ring-[#8AAE92]'
                      }`}
                    />
                  </div>
                </div>

                {hasError && (
                  <p className="text-[11px] font-medium text-[#C87575] mt-2.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors[sub.id]}</span>
                  </p>
                )}
              </div>
            );
          })}

          <div className="pt-3 flex items-center justify-end gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl border border-[#EAE4DC] dark:border-[#3B3630] text-[#6E685F] dark:text-[#BDB6AC] text-xs font-medium hover:bg-[#FAF7F2] dark:hover:bg-[#1C1A17] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Recalculate</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
