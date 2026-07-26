import React from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  Calculator
} from 'lucide-react';

export const SettingsView = ({
  settings,
  onUpdateSettings,
  darkMode,
  setDarkMode,
}) => {
  if (!settings) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#EAE4DC] dark:border-[#3B3630]">
        <div className="w-10 h-10 rounded-xl bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif-title text-3xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
            Application Settings
          </h1>
          <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs">Configure preferences, theme, and default grading formulas.</p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
          <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] flex items-center gap-2">
            {darkMode ? <Moon className="w-5 h-5 text-amber-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
            Appearance & Theme
          </h3>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630]">
            <div>
              <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2]">Dark Mode</p>
              <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC]">Enable dark theme for eye comfort during late-night study sessions</p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                darkMode ? 'bg-[#8AAE92]' : 'bg-[#EAE4DC]'
              }`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                darkMode ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Default Grading Formula */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
          <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#8AAE92]" />
            Default Grading System Formula
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onUpdateSettings({ ...settings, defaultGradingSystem: '10-point-standard' })}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                settings.defaultGradingSystem === '10-point-standard'
                  ? 'border-[#8AAE92] bg-[#8AAE92]/10 text-[#5C7E63] dark:text-[#A3C8AB] font-semibold'
                  : 'border-[#EAE4DC] dark:border-[#3B3630] text-[#2D2A26] dark:text-[#FAF7F2]'
              }`}
            >
              <p className="text-xs font-semibold">Standard 10-Point</p>
              <p className="text-[11px] text-[#6E685F] font-normal mt-1">Weighted CGPA calculation out of 10.0</p>
            </button>

            <button
              onClick={() => onUpdateSettings({ ...settings, defaultGradingSystem: 'cgpax9.5' })}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                settings.defaultGradingSystem === 'cgpax9.5'
                  ? 'border-[#8AAE92] bg-[#8AAE92]/10 text-[#5C7E63] dark:text-[#A3C8AB] font-semibold'
                  : 'border-[#EAE4DC] dark:border-[#3B3630] text-[#2D2A26] dark:text-[#FAF7F2]'
              }`}
            >
              <p className="text-xs font-semibold">Percentage (CGPA x 9.5)</p>
              <p className="text-[11px] text-[#6E685F] font-normal mt-1">Standard AICTE / CBSE percentage conversion</p>
            </button>

            <button
              onClick={() => onUpdateSettings({ ...settings, defaultGradingSystem: 'cgpax10' })}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                settings.defaultGradingSystem === 'cgpax10'
                  ? 'border-[#8AAE92] bg-[#8AAE92]/10 text-[#5C7E63] dark:text-[#A3C8AB] font-semibold'
                  : 'border-[#EAE4DC] dark:border-[#3B3630] text-[#2D2A26] dark:text-[#FAF7F2]'
              }`}
            >
              <p className="text-xs font-semibold">Percentage (CGPA x 10)</p>
              <p className="text-[11px] text-[#6E685F] font-normal mt-1">Direct 100-point scale multiplier</p>
            </button>
          </div>
        </div>

        {/* Notifications & Language */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 sm:p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-4">
          <h3 className="font-serif-title text-xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#8AAE92]" />
            Notifications & Regional Settings
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630]">
              <span className="text-xs font-medium text-[#2D2A26] dark:text-[#FAF7F2]">Email Analysis Reports</span>
              <input
                type="checkbox"
                checked={settings.notificationPreferences?.emailNotifications ?? true}
                onChange={(e) => onUpdateSettings({
                  ...settings,
                  notificationPreferences: { ...settings.notificationPreferences, emailNotifications: e.target.checked }
                })}
                className="w-4 h-4 rounded border-[#EAE4DC] text-[#8AAE92] focus:ring-[#8AAE92]"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630]">
              <span className="text-xs font-medium text-[#2D2A26] dark:text-[#FAF7F2]">Academic Backlog & Grade Alerts</span>
              <input
                type="checkbox"
                checked={settings.notificationPreferences?.academicAlerts ?? true}
                onChange={(e) => onUpdateSettings({
                  ...settings,
                  notificationPreferences: { ...settings.notificationPreferences, academicAlerts: e.target.checked }
                })}
                className="w-4 h-4 rounded border-[#EAE4DC] text-[#8AAE92] focus:ring-[#8AAE92]"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630]">
              <span className="text-xs font-medium text-[#2D2A26] dark:text-[#FAF7F2]">System Language</span>
              <select
                value={settings.language || 'English (US)'}
                onChange={(e) => onUpdateSettings({ ...settings, language: e.target.value })}
                className="px-3 py-1.5 bg-white dark:bg-[#282521] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-xs font-medium"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
        </div>

        {/* About & Privacy */}
        <div className="bg-white dark:bg-[#282521] rounded-[20px] p-6 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-3">
          <h3 className="font-serif-title text-lg font-normal text-[#2D2A26] dark:text-[#FAF7F2] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#7C9DC5]" />
            About GradeInsight & Privacy
          </h3>
          <p className="text-xs text-[#6E685F] dark:text-[#BDB6AC] leading-relaxed">
            GradeInsight v2.4.0 • Built with Node.js, Express, and React. Server-side validation ensures transcript data privacy and precise credit calculations.
          </p>
        </div>

      </div>

    </div>
  );
};
