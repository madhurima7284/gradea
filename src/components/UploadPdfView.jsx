import React, { useState, useRef } from 'react';
import { 
  FileUp, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Sparkles, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const UploadPdfView = ({ onPdfExtracted, gradingFormula }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setError('Invalid file type. Please upload an official Semester Result PDF document.');
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError('File size exceeds the 20 MB limit. Please select a smaller PDF file.');
      return;
    }

    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setIsProcessing(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) return;

    setIsProcessing(true);
    setUploadProgress(15);
    setError(null);

    try {
      // Simulate smooth upload progress bar
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + 15;
        });
      }, 300);

      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64String = reader.result;

        try {
          const response = await fetch('/api/analyze-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pdfBase64: base64String,
              fileName: file.name,
              mimeType: file.type,
              gradingFormula,
            }),
          });

          clearInterval(progressInterval);
          setUploadProgress(100);

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
            throw new Error(data.error || 'Failed to parse PDF document on server.');
          }

          setTimeout(() => {
            setIsProcessing(false);
            onPdfExtracted(data);
          }, 400);

        } catch (err) {
          clearInterval(progressInterval);
          setIsProcessing(false);
          setUploadProgress(0);
          setError(err.message || 'Extraction failed. Please ensure the PDF contains clear result tables.');
        }
      };

      reader.onerror = () => {
        clearInterval(progressInterval);
        setIsProcessing(false);
        setError('Failed to read local PDF file.');
      };

    } catch (err) {
      setIsProcessing(false);
      setError(err.message || 'Upload processing failed.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#8AAE92]" />
          <span>OCR & Smart Subject Extraction</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
          Upload Semester Result PDF
        </h1>
        <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs sm:text-sm max-w-xl mx-auto">
          Upload your official university transcript or result sheet. Our server extracts subjects, marks, grades, and credits into an editable preview.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-[#D98C8C]/15 border border-[#D98C8C]/30 text-[#C87575] text-xs sm:text-sm flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-[#C87575]" />
          <span>{error}</span>
        </div>
      )}

      {/* Large Drag & Drop Upload Card */}
      <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-10 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-6">
        
        {!file ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-[20px] p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 ${
              dragging
                ? 'border-[#8AAE92] bg-[#8AAE92]/10 scale-[1.01]'
                : 'border-[#EAE4DC] dark:border-[#3B3630] hover:border-[#8AAE92] bg-[#FAF7F2]/50 dark:bg-[#1C1A17]/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="w-14 h-14 rounded-2xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
              <Upload className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#2D2A26] dark:text-[#FAF7F2]">
                Drag and drop your Semester Result PDF here
              </p>
              <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC]">
                or <span className="text-[#8AAE92] font-semibold underline">browse files</span> from your computer
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-[#9E978E] pt-2">
              <span>Supported format: <strong>PDF</strong></span>
              <span>•</span>
              <span>Max size: <strong>20 MB</strong></span>
            </div>
          </div>
        ) : (
          /* Selected File Preview Card */
          <div className="p-5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D7A98C]/20 text-[#D7A98C] flex items-center justify-center font-bold text-xs uppercase">
                  PDF
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] truncate max-w-xs sm:max-w-md">
                    {file.name}
                  </h4>
                  <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC]">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for OCR Extraction
                  </p>
                </div>
              </div>

              {!isProcessing && (
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-2 text-[#9E978E] hover:text-[#D98C8C] hover:bg-[#D98C8C]/10 rounded-xl transition-colors cursor-pointer"
                  title="Remove File"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Progress bar */}
            {isProcessing && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#6E685F] dark:text-[#BDB6AC]">
                  <span>Extracting subjects & marks...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-[#EAE4DC] dark:bg-[#3B3630] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#8AAE92] h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action button */}
            {!isProcessing && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  id="process-pdf-btn"
                  onClick={handleUploadAndAnalyze}
                  className="px-6 py-2.5 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Process & Extract Subjects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Upload Illustration & Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4 border-t border-[#EAE4DC] dark:border-[#3B3630]">
          <div className="md:col-span-5">
            <img
              src="/src/assets/images/pdf_upload_illustration_1784888339409.jpg"
              alt="PDF OCR Analysis"
              className="w-full h-auto rounded-[16px] object-cover border border-[#EAE4DC] dark:border-[#3B3630]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="md:col-span-7 space-y-3">
            <h4 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">How PDF Analysis Works</h4>
            <ul className="space-y-2 text-xs text-[#6E685F] dark:text-[#BDB6AC]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8AAE92] shrink-0 mt-0.5" />
                <span>Extracts actual subjects present in the uploaded document.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8AAE92] shrink-0 mt-0.5" />
                <span>Detects marks, letter grades, credits, semester name, and student details.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8AAE92] shrink-0 mt-0.5" />
                <span>Presents an editable table so you can review and fix OCR details before final calculation.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
