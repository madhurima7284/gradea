import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { AuthView } from './components/AuthView';
import { DashboardView } from './components/DashboardView';
import { AnalyzeMarksView } from './components/AnalyzeMarksView';
import { AnalyzeGradesView } from './components/AnalyzeGradesView';
import { UploadPdfView } from './components/UploadPdfView';
import { EditableDataView } from './components/EditableDataView';
import { ResultsDashboardView } from './components/ResultsDashboardView';
import { ReportView } from './components/ReportView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  
  // User Session State
  const [user, setUser] = useState(null);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    darkMode: false,
    defaultGradingSystem: '10-point-standard',
    notificationPreferences: {
      emailNotifications: true,
      academicAlerts: true,
      weeklyDigest: false,
    },
    language: 'English (US)',
  });

  // History & Active Analysis Results
  const [history, setHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  // Sync Dark Mode with document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers for Analysis Workflows
  const handleAnalysisSuccess = (result) => {
    setCurrentResult(result);
    setHistory((prev) => [result, ...prev.filter((item) => item.id !== result.id)]);
    setActiveTab('results');
  };

  const handlePdfExtracted = (result) => {
    setCurrentResult(result);
    setActiveTab('editable-data');
  };

  const handleConfirmEditableData = (updatedResult) => {
    setCurrentResult(updatedResult);
    setHistory((prev) => [updatedResult, ...prev.filter((item) => item.id !== updatedResult.id)]);
    setActiveTab('results');
  };

  const handleDeleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectHistoryResult = (result) => {
    setCurrentResult(result);
    setActiveTab('results');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('auth');
  };

  return (
    <div className="min-h-screen font-sans-body bg-[#FAF7F2] dark:bg-[#1C1A17] bg-notebook-grid text-[#2D2A26] dark:text-[#FAF7F2] transition-colors duration-200 selection:bg-[#8AAE92]/30 selection:text-[#2D2A26] flex flex-col">
      
      {/* Top Fixed Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Render Views based on Active Tab */}

        {activeTab === 'landing' && (
          <LandingHero
            onGetStarted={() => setActiveTab(user ? 'dashboard' : 'auth')}
            onSelectMethod={(method) => {
              if (method === 'marks') setActiveTab('analyze-marks');
              if (method === 'grades') setActiveTab('analyze-grades');
              if (method === 'pdf') setActiveTab('upload-pdf');
            }}
          />
        )}

        {activeTab === 'auth' && (
          <AuthView
            onLoginSuccess={(userData) => {
              setUser(userData);
              setActiveTab('dashboard');
            }}
            onSkip={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            user={user}
            history={history}
            latestResult={currentResult || (history.length > 0 ? history[0] : null)}
            onNavigate={(tab) => setActiveTab(tab)}
            setActiveTab={setActiveTab}
            onSelectHistoryResult={handleSelectHistoryResult}
          />
        )}

        {activeTab === 'analyze-marks' && (
          <AnalyzeMarksView
            onSuccess={handleAnalysisSuccess}
            gradingFormula={settings.defaultGradingSystem}
          />
        )}

        {activeTab === 'analyze-grades' && (
          <AnalyzeGradesView
            onSuccess={handleAnalysisSuccess}
            gradingFormula={settings.defaultGradingSystem}
          />
        )}

        {activeTab === 'upload-pdf' && (
          <UploadPdfView
            onPdfExtracted={handlePdfExtracted}
            gradingFormula={settings.defaultGradingSystem}
          />
        )}

        {activeTab === 'editable-data' && currentResult && (
          <EditableDataView
            initialResult={currentResult}
            onConfirmAnalysis={handleConfirmEditableData}
            gradingFormula={settings.defaultGradingSystem}
          />
        )}

        {activeTab === 'results' && currentResult && (
          <ResultsDashboardView
            result={currentResult}
            history={history}
            onViewReport={() => setActiveTab('report')}
            onAnalyzeAnother={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'report' && currentResult && (
          <ReportView
            result={currentResult}
            user={user || {
              studentName: 'Guest Student',
              university: 'University Member',
              branch: 'General',
              regulation: 'R22',
              email: 'student@example.com',
              phone: '',
              avatar: '',
            }}
            onBack={() => setActiveTab('results')}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onSelectResult={handleSelectHistoryResult}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onAnalyzeNew={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'profile' && user && (
          <ProfileView
            user={user}
            onUpdateUser={(updated) => setUser(updated)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            onUpdateSettings={(newSet) => setSettings(newSet)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}

      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-6 text-center text-xs text-slate-500 space-y-1 no-print">
        <p className="font-medium">GradeInsight AI – Academic Performance & Result Analytics</p>
        <p>© {new Date().getFullYear()} GradeInsight EdTech platform. All rights reserved.</p>
      </footer>

    </div>
  );
}
