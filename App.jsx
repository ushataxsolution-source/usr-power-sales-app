import React, { useState, useRef } from 'react';
import { 
  Users, MapPin, PhoneCall, TrendingUp, Camera, Calendar, Plus, 
  Search, Filter, CheckCircle, Clock, Award, 
  Navigation, DollarSign, UserPlus, Eye, FileText, Check, X, RefreshCw, Briefcase, Tag,
  Lock, Unlock, Download, ShieldCheck, Trash2, Edit3, LogOut, Key, User, CheckSquare, ArrowRight, CalendarDays, Bus, ShieldAlert
} from 'lucide-react';

const BUSINESS_VERTICALS = [
  'USR POWER LUBE',
  'TURBO OIL',
  'NUTRI TRIBE',
  'TAX AND LEGAL',
  'PUNCHKUTEER',
  'CUSTOMIZED PACKAGING',
  'DIGITAL MARKETING'
];

const CLIENT_TYPES = [
  'Distributor',
  'Dealer',
  'Retailer',
  'Fleet Owner',
  'Corporate / Direct'
];

const INITIAL_EMPLOYEES = [
  { id: 'USR-EMP-101', pass: '1011', name: 'Rohan Sharma', joiningDate: '2025-04-10', totalLeaves: 18, usedLeaves: 4, territory: 'Mumbai Metropolitan Region', target: 800000, achieved: 640000, primaryVertical: 'USR POWER LUBE', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-102', pass: '1022', name: 'Amit Kumar', joiningDate: '2025-06-15', totalLeaves: 18, usedLeaves: 2, territory: 'Pune & PCMC Cluster', target: 650000, achieved: 580000, primaryVertical: 'TURBO OIL', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-103', pass: '1033', name: 'Priya Singh', joiningDate: '2025-09-01', totalLeaves: 18, usedLeaves: 5, territory: 'Thane & Kalyan Belt', target: 900000, achieved: 870000, primaryVertical: 'TAX AND LEGAL', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-104', pass: '1044', name: 'Vikram Verma', joiningDate: '2026-01-10', totalLeaves: 18, usedLeaves: 1, territory: 'Nagpur Industrial Region', target: 500000, achieved: 320000, primaryVertical: 'DIGITAL MARKETING', failedAttempts: 0, isBlocked: false }
];

export default function App() {
  const [authRole, setAuthRole] = useState(null); 
  const [loggedEmpId, setLoggedEmpId] = useState('');
  const [loginType, setLoginType] = useState('employee');
  const [loginIdInput, setLoginIdInput] = useState('');
  const [loginPassInput, setLoginPassInput] = useState('');
  
  // CAPTCHA State
  const [captchaCode, setCaptchaCode] = useState('4829');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  // Edit Password Modal State for Admin
  const [editingEmpModal, setEditingEmpModal] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  const currentEmp = employees.find(e => e.id === loggedEmpId) || employees[0];

  const refreshCaptcha = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(randomNum);
    setCaptchaInput('');
  };

  const handleEmployeeLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (captchaInput.trim() !== captchaCode) {
      setLoginError('Invalid CAPTCHA code! Please re-enter.');
      refreshCaptcha();
      return;
    }

    const foundEmp = employees.find(emp => emp.id === loginIdInput.trim());
    if (!foundEmp) {
      setLoginError('Employee ID not found!');
      refreshCaptcha();
      return;
    }

    if (foundEmp.isBlocked) {
      setLoginError('Account is BLOCKED due to 6 failed password attempts! Contact Admin to regenerate password.');
      return;
    }

    if (foundEmp.pass === loginPassInput.trim()) {
      setEmployees(employees.map(emp => emp.id === foundEmp.id ? { ...emp, failedAttempts: 0 } : emp));
      setAuthRole('employee');
      setLoggedEmpId(foundEmp.id);
      setLoginIdInput('');
      setLoginPassInput('');
      setCaptchaInput('');
      setActiveTab('dashboard');
    } else {
      const updatedAttempts = (foundEmp.failedAttempts || 0) + 1;
      const isNowBlocked = updatedAttempts >= 6;

      setEmployees(employees.map(emp => emp.id === foundEmp.id ? { 
        ...emp, 
        failedAttempts: updatedAttempts, 
        isBlocked: isNowBlocked 
      } : emp));

      if (isNowBlocked) {
        setLoginError('Account BLOCKED! You exceeded 6 incorrect password attempts. Contact Admin.');
      } else {
        setLoginError(`Incorrect Password! Attempt ${updatedAttempts} of 6. Account will lock after 6 failures.`);
      }
      refreshCaptcha();
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (captchaInput.trim() !== captchaCode) {
      setLoginError('Invalid CAPTCHA code! Please re-enter.');
      refreshCaptcha();
      return;
    }

    if (loginPassInput === '70212@Usrpowermhadmin') {
      setAuthRole('admin');
      setLoginPassInput('');
      setCaptchaInput('');
      setActiveTab('admin-manage');
    } else {
      setLoginError('Invalid Admin Password!');
      refreshCaptcha();
    }
  };

  const handleSaveEmployeeCredentials = (e) => {
    e.preventDefault();
    if (!editingEmpModal) return;

    setEmployees(employees.map(emp => emp.id === editingEmpModal.id ? {
      ...emp,
      pass: newPasswordInput,
      isBlocked: false,
      failedAttempts: 0
    } : emp));

    alert(`Password updated & Account unblocked successfully for ${editingEmpModal.name} (${editingEmpModal.id})!`);
    setEditingEmpModal(null);
    setNewPasswordInput('');
  };

  if (!authRole) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white text-center space-y-2">
            <h1 className="font-extrabold text-base tracking-wide">USR POWER INDUSTRIES</h1>
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">SECURE LOGIN PORTAL</p>
          </div>

          <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
            <button 
              onClick={() => { setLoginType('employee'); setLoginError(''); refreshCaptcha(); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${loginType === 'employee' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Employee Portal
            </button>
            <button 
              onClick={() => { setLoginType('admin'); setLoginError(''); refreshCaptcha(); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${loginType === 'admin' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Admin Master Login
            </button>
          </div>

          <div className="p-6">
            {loginType === 'employee' ? (
              <form onSubmit={handleEmployeeLogin} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Employee ID</label>
                  <input required type="text" value={loginIdInput} onChange={e => setLoginIdInput(e.target.value)} placeholder="e.g. USR-EMP-101" className="w-full p-3 bg-slate-50 border rounded-xl font-mono uppercase" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Password</label>
                  <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Enter password..." className="w-full p-3 bg-slate-50 border rounded-xl" />
                </div>

                {/* CAPTCHA */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Security CAPTCHA Verification</label>
                  <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 text-amber-400 font-mono font-extrabold tracking-widest px-4 py-3 rounded-xl select-none text-base flex-1 text-center">
                      {captchaCode}
                    </div>
                    <button type="button" onClick={refreshCaptcha} className="p-3 bg-slate-100 border rounded-xl"><RefreshCw className="w-4 h-4" /></button>
                  </div>
                  <input required type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder="Enter CAPTCHA..." className="w-full mt-2 p-3 bg-slate-50 border rounded-xl font-mono" />
                </div>

                {loginError && <p className="text-red-600 font-semibold text-[11px] bg-red-50 p-2.5 rounded-lg">{loginError}</p>}
                
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">Login to Employee Portal</button>
              </form>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Admin Password</label>
                  <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Enter admin password..." className="w-full p-3 bg-slate-50 border rounded-xl" />
                </div>

                {/* CAPTCHA */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Security CAPTCHA Verification</label>
                  <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 text-amber-400 font-mono font-extrabold tracking-widest px-4 py-3 rounded-xl select-none text-base flex-1 text-center">
                      {captchaCode}
                    </div>
                    <button type="button" onClick={refreshCaptcha} className="p-3 bg-slate-100 border rounded-xl"><RefreshCw className="w-4 h-4" /></button>
                  </div>
                  <input required type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder="Enter CAPTCHA..." className="w-full mt-2 p-3 bg-slate-50 border rounded-xl font-mono" />
                </div>

                {loginError && <p className="text-red-600 font-semibold text-[11px] bg-red-50 p-2.5 rounded-lg">{loginError}</p>}

                <button type="submit" className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold">Unlock Admin Control Center</button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      <main className="flex-1 p-6 space-y-6">
        <h2 className="text-xl font-bold">Admin Control Panel</h2>
        
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden p-4">
          <h4 className="font-bold text-sm mb-4">Employee List & Password Regeneration</h4>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="p-3">Employee Name & ID</th>
                <th className="p-3">Password</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td className="p-3 font-bold">{emp.name} [{emp.id}]</td>
                  <td className="p-3 font-mono text-amber-700">{emp.pass}</td>
                  <td className="p-3">
                    {emp.isBlocked ? (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-bold">BLOCKED</span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">Active</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => { setEditingEmpModal(emp); setNewPasswordInput(emp.pass); }}
                      className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Edit / Regenerate Password</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* EDIT PASSWORD MODAL */}
      {editingEmpModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm">Edit & Regenerate Password</h3>
              <button onClick={() => setEditingEmpModal(null)}><X className="w-4 h-4" /></button>
            </div>
            
            <form onSubmit={handleSaveEmployeeCredentials} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">New Password / Regenerated Pin</label>
                <input required type="text" value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} className="w-full p-2.5 border rounded-xl font-mono" />
                <p className="text-[10px] text-slate-500 mt-1">Isse employee ka block status bhi reset ho jayega.</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setEditingEmpModal(null)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Update & Unblock</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
