import React, { useState, useRef } from 'react';
import { 
  User, 
  Building, 
  BookOpen, 
  Mail, 
  Phone, 
  ShieldCheck, 
  LogOut, 
  CheckCircle2, 
  Moon, 
  Sun,
  Camera
} from 'lucide-react';

export const ProfileView = ({
  user,
  onUpdateUser,
  darkMode,
  setDarkMode,
  onLogout,
}) => {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.studentName || '');
  const [university, setUniversity] = useState(user?.university || '');
  const [branch, setBranch] = useState(user?.branch || '');
  const [regulation, setRegulation] = useState(user?.regulation || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [savedMsg, setSavedMsg] = useState(false);

  const getInitials = (str) => {
    if (!str) return 'S';
    const parts = str.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onUpdateUser({
          ...user,
          avatar: reader.result,
        });
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      studentName: name,
      university,
      branch,
      regulation,
      email,
      phone,
    });
    setIsEditing(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">
          Student Profile
        </h1>
        <p className="text-[#6E685F] dark:text-[#BDB6AC] text-xs sm:text-sm">
          Manage your personal information and institutional credentials.
        </p>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-xl bg-[#8AAE92]/15 border border-[#8AAE92]/30 text-[#5C7E63] dark:text-[#A3C8AB] text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#8AAE92]" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-[#282521] rounded-[20px] p-8 border border-[#EAE4DC] dark:border-[#3B3630] shadow-xs space-y-8">
        
        {/* Avatar & Header Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#EAE4DC] dark:border-[#3B3630]">
          <div className="relative group">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.studentName}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#EAE4DC] dark:border-[#3B3630]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#8AAE92]/20 dark:bg-[#8AAE92]/30 text-[#5C7E63] dark:text-[#A3C8AB] flex items-center justify-center font-bold text-2xl border-2 border-[#8AAE92]/40">
                {getInitials(user.studentName)}
              </div>
            )}
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload photo"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#8AAE92] text-white shadow-xs hover:scale-105 transition-transform cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="font-serif-title text-2xl font-normal text-[#2D2A26] dark:text-[#FAF7F2]">{user.studentName}</h2>
            <p className="text-xs font-medium text-[#6E685F] dark:text-[#BDB6AC]">{user.university}</p>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#8AAE92]/15 text-[#5C7E63] dark:text-[#A3C8AB] text-[10px] font-semibold mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Student Account</span>
            </div>
          </div>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
                Student Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6E685F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled={!isEditing}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92] disabled:opacity-80"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
                University / Institution
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#6E685F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled={!isEditing}
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92] disabled:opacity-80"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
                Branch / Major
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-[#6E685F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled={!isEditing}
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92] disabled:opacity-80"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
                Academic Regulation
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={regulation}
                onChange={(e) => setRegulation(e.target.value)}
                className="w-full px-4 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92] disabled:opacity-80"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6E685F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled={!isEditing}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92] disabled:opacity-80"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#6E685F] dark:text-[#BDB6AC] mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#6E685F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled={!isEditing}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#EAE4DC] dark:border-[#3B3630] rounded-xl text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8AAE92] disabled:opacity-80"
                />
              </div>
            </div>

          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#EAE4DC] dark:border-[#3B3630]">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1A17] hover:bg-[#EAE4DC]/50 border border-[#EAE4DC] dark:border-[#3B3630] text-[#2D2A26] dark:text-[#FAF7F2] text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-[#6E685F]" />}
              <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </button>

            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3.5 py-1.5 rounded-xl border border-[#EAE4DC] text-[#6E685F] text-xs font-medium hover:bg-[#FAF7F2] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs cursor-pointer"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl bg-[#8AAE92] hover:bg-[#789C7E] text-white font-medium text-xs shadow-xs cursor-pointer"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Logout */}
        <div className="pt-4 border-t border-[#EAE4DC] dark:border-[#3B3630] flex justify-end">
          <button
            type="button"
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-[#D98C8C]/15 text-[#C87575] hover:bg-[#D98C8C]/25 font-medium text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Log Out Account
          </button>
        </div>

      </div>

    </div>
  );
};
