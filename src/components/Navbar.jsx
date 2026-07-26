import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Calculator, 
  FileUp, 
  History, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  FileText
} from 'lucide-react';

export const Navbar = ({
  activeTab,
  setActiveTab,
  user,
  darkMode,
  setDarkMode,
  onLogout,
}) => {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EAE4DC] dark:border-[#3B3630] bg-[#FAF7F2]/90 dark:bg-[#1C1A17]/90 backdrop-blur-md transition-colors duration-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <button 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-9 h-9 rounded-xl bg-[#8AAE92] dark:bg-[#93B89B] flex items-center justify-center text-white shadow-sm group-hover:bg-[#789C7E] transition-colors duration-200">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-serif-title text-2xl font-normal text-[#2D2A26] dark:text-[#FAF7F2] tracking-tight group-hover:text-[#8AAE92] transition-colors">
                GradeInsight
              </span>
              <span className="hidden sm:inline-block ml-2 text-10px font-medium tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] border border-[#8AAE92]/30">
                Academic AI
              </span>
            </div>
          </button>

          {/* Center Navigation */}
          {user && user.isLoggedIn !== false && (
            <nav className="hidden md:flex items-center gap-1 bg-[#EAE4DC]/40 dark:bg-[#282521] p-1 rounded-2xl border border-[#EAE4DC] dark:border-[#3B3630]">
              <button
                id="nav-dashboard-btn"
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-white dark:bg-[#1C1A17] text-[#2D2A26] dark:text-white shadow-xs border border-[#EAE4DC] dark:border-[#3B3630]'
                    : 'text-[#6E685F] dark:text-[#BDB6AC] hover:text-[#2D2A26] dark:hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#8AAE92]" />
                Dashboard
              </button>

              <button
                id="nav-marks-btn"
                onClick={() => setActiveTab('analyze-marks')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'analyze-marks'
                    ? 'bg-white dark:bg-[#1C1A17] text-[#2D2A26] dark:text-white shadow-xs border border-[#EAE4DC] dark:border-[#3B3630]'
                    : 'text-[#6E685F] dark:text-[#BDB6AC] hover:text-[#2D2A26] dark:hover:text-white'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-[#7C9DC5]" />
                Marks
              </button>

              <button
                id="nav-pdf-btn"
                onClick={() => setActiveTab('upload-pdf')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'upload-pdf' || activeTab === 'analyze-pdf'
                    ? 'bg-white dark:bg-[#1C1A17] text-[#2D2A26] dark:text-white shadow-xs border border-[#8AAE92]/40'
                    : 'text-[#6E685F] dark:text-[#BDB6AC] hover:text-[#2D2A26] dark:hover:text-white'
                }`}
              >
                <FileUp className="w-3.5 h-3.5 text-[#D7A98C]" />
                PDF Extraction
              </button>

              <button
                id="nav-history-btn"
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-white dark:bg-[#1C1A17] text-[#2D2A26] dark:text-white shadow-xs border border-[#EAE4DC] dark:border-[#3B3630]'
                    : 'text-[#6E685F] dark:text-[#BDB6AC] hover:text-[#2D2A26] dark:hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5 text-[#7C9DC5]" />
                History
              </button>
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-[#6E685F] dark:text-[#BDB6AC] hover:bg-[#EAE4DC]/50 dark:hover:bg-[#282521] transition-colors cursor-pointer border border-transparent hover:border-[#EAE4DC] dark:hover:border-[#3B3630]"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#D8A657]" /> : <Moon className="w-4 h-4 text-[#6E685F]" />}
            </button>

            {user && user.isLoggedIn !== false ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2.5 pr-3 rounded-full bg-white dark:bg-[#282521] border border-[#EAE4DC] dark:border-[#3B3630] hover:border-[#8AAE92] transition-all cursor-pointer shadow-xs"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.studentName}
                      className="w-6 h-6 rounded-full object-cover border border-[#EAE4DC]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#8AAE92]/20 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center font-bold text-[10px] border border-[#8AAE92]/40">
                      {user.studentName ? user.studentName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="text-xs font-medium text-[#2D2A26] dark:text-[#FAF7F2] hidden sm:inline-block max-w-[120px] truncate">
                    {user.studentName ? user.studentName.split(' ')[0] : 'User'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#282521] rounded-[20px] shadow-lg border border-[#EAE4DC] dark:border-[#3B3630] py-2 z-50 animate-in fade-in duration-200"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-[#EAE4DC]/60 dark:border-[#3B3630]">
                      <p className="text-xs font-semibold text-[#2D2A26] dark:text-[#FAF7F2] truncate">{user.studentName}</p>
                      <p className="text-[11px] text-[#6E685F] dark:text-[#BDB6AC] truncate">{user.email}</p>
                    </div>

                    <button
                      id="dropdown-profile-btn"
                      onClick={() => { setActiveTab('profile'); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#2D2A26] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#221F1C] transition-colors text-left"
                    >
                      <User className="w-3.5 h-3.5 text-[#8AAE92]" />
                      Student Profile
                    </button>

                    <button
                      id="dropdown-settings-btn"
                      onClick={() => { setActiveTab('settings'); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#2D2A26] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#221F1C] transition-colors text-left"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#7C9DC5]" />
                      Settings
                    </button>

                    <button
                      id="dropdown-report-btn"
                      onClick={() => { setActiveTab('history'); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#2D2A26] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#221F1C] transition-colors text-left"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#D7A98C]" />
                      My Reports
                    </button>

                    <div className="my-1 border-t border-[#EAE4DC]/60 dark:border-[#3B3630]" />

                    <button
                      id="dropdown-logout-btn"
                      onClick={() => { onLogout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#D98C8C] dark:text-[#E09999] hover:bg-[#D98C8C]/10 transition-colors text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => setActiveTab('auth')}
                  className="px-3.5 py-1.5 text-xs font-medium text-[#6E685F] dark:text-[#BDB6AC] hover:text-[#2D2A26] dark:hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  id="nav-getstarted-btn"
                  onClick={() => setActiveTab('auth')}
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#8AAE92] hover:bg-[#789C7E] rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
