import React, { useState, useRef, useEffect } from 'react';

const INITIAL_EMPLOYEES = [
  { id: 'USR-EMP-101', pass: '1011', name: 'Rohan Sharma', designation: 'Senior Sales Executive', phone: '9820012345', joiningDate: '2025-04-10', totalLeaves: 30, usedLeaves: 4, territory: 'Mumbai Metropolitan Region', target: 800000, achieved: 640000, primaryVertical: 'USR POWER LUBE', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-102', pass: '1022', name: 'Amit Kumar', designation: 'Area Sales Manager', phone: '9821123456', joiningDate: '2025-06-15', totalLeaves: 30, usedLeaves: 2, territory: 'Pune & PCMC Cluster', target: 650000, achieved: 580000, primaryVertical: 'TURBO OIL', failedAttempts: 0, isBlocked: false }
];

const loadSavedData = (key, defaultData) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return defaultData;
    const parsed = JSON.parse(saved);
    if (key === 'usr_employees') {
      const existingIds = new Set(parsed.map(e => e.id));
      const newDefaults = defaultData.filter(e => !existingIds.has(e.id));
      return [...parsed, ...newDefaults];
    }
    return parsed;
  } catch (e) {
    return defaultData;
  }
};

export default function App() {
  const [authRole, setAuthRole] = useState(() => localStorage.getItem('usr_auth_role') || null); 
  const [loggedEmpId, setLoggedEmpId] = useState(() => localStorage.getItem('usr_logged_emp_id') || '');
  
  const [loginType, setLoginType] = useState('employee');
  const [loginIdInput, setLoginIdInput] = useState('');
  const [loginPassInput, setLoginPassInput] = useState('');
  
  const [captchaCode, setCaptchaCode] = useState('4829');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState(() => loadSavedData('usr_employees', INITIAL_EMPLOYEES));

  useEffect(() => { localStorage.setItem('usr_employees', JSON.stringify(employees)); }, [employees]);

  useEffect(() => {
    if (authRole) {
      localStorage.setItem('usr_auth_role', authRole);
      localStorage.setItem('usr_logged_emp_id', loggedEmpId);
    } else {
      localStorage.removeItem('usr_auth_role');
      localStorage.removeItem('usr_logged_emp_id');
    }
  }, [authRole, loggedEmpId]);

  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(null);
  const [editingEmpModal, setEditingEmpModal] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  const [newEmp, setNewEmp] = useState({
    id: '', pass: '', name: '', designation: 'Sales Executive', phone: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 30, territory: 'Mumbai Suburban Division', target: '500000', primaryVertical: 'USR POWER LUBE'
  });

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
    const foundEmp = employees.find(emp => emp.id.trim().toUpperCase() === loginIdInput.trim().toUpperCase());
    if (!foundEmp) {
      setLoginError('Employee ID not found!');
      refreshCaptcha();
      return;
    }
    if (foundEmp.isBlocked) {
      setLoginError('Account is BLOCKED due to failed attempts! Contact Admin.');
      return;
    }
    if (foundEmp.pass === loginPassInput.trim()) {
      setAuthRole('employee');
      setLoggedEmpId(foundEmp.id);
      setActiveTab('dashboard');
    } else {
      setLoginError('Incorrect Password!');
      refreshCaptcha();
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (captchaInput.trim() !== captchaCode) {
      setLoginError('Invalid CAPTCHA code!');
      refreshCaptcha();
      return;
    }
    if (loginPassInput === '70212@Usrpowermhadmin') {
      setAuthRole('admin');
      setActiveTab('admin-manage');
    } else {
      setLoginError('Invalid Admin Password!');
      refreshCaptcha();
    }
  };

  const handleLogout = () => {
    setAuthRole(null);
    setLoggedEmpId('');
    localStorage.removeItem('usr_auth_role');
    localStorage.removeItem('usr_logged_emp_id');
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const empIdFormatted = (newEmp.id || `USR-EMP-${Math.floor(Math.random() * 900 + 100)}`).trim().toUpperCase();
    const createdEmp = {
      ...newEmp,
      id: empIdFormatted,
      pass: newEmp.pass.trim() || '1234',
      target: Number(newEmp.target) || 500000,
      achieved: 0,
      failedAttempts: 0,
      isBlocked: false
    };
    setEmployees(prev => [...prev, createdEmp]);
    setIsAddEmpModalOpen(false);
    setNewEmp({ id: '', pass: '', name: '', designation: 'Sales Executive', phone: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 30, territory: 'Mumbai Suburban', target: '500000', primaryVertical: 'USR POWER LUBE' });
    alert(`Employee (${createdEmp.name}) Created Successfully!`);
  };

  const handleSaveEmployeeProfile = (e) => {
    e.preventDefault();
    if (!editProfileModal) return;
    setEmployees(employees.map(emp => emp.id === editProfileModal.id ? { ...editProfileModal } : emp));
    alert(`Profile updated successfully!`);
    setEditProfileModal(null);
  };

  if (!authRole) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white text-center space-y-2">
            <h1 className="font-extrabold text-sm tracking-wide">USR POWER INDUSTRIES</h1>
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">OFFICIAL SALES PORTAL</p>
          </div>

          <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
            <button onClick={() => { setLoginType('employee'); setLoginError(''); }} className={`flex-1 py-2 rounded-xl text-xs font-bold ${loginType === 'employee' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}>Employee Login</button>
            <button onClick={() => { setLoginType('admin'); setLoginError(''); }} className={`flex-1 py-2 rounded-xl text-xs font-bold ${loginType === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-600'}`}>Admin Login</button>
          </div>

          <div className="p-6">
            {loginType === 'employee' ? (
              <form onSubmit={handleEmployeeLogin} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Employee ID</label>
                  <input required type="text" value={loginIdInput} onChange={e => setLoginIdInput(e.target.value)} placeholder="e.g. USR-EMP-101" className="w-full p-3 bg-slate-50 border rounded-xl font-mono uppercase" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Password</label>
                  <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Password..." className="w-full p-3 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">CAPTCHA: <span className="font-mono bg-slate-900 text-amber-400 px-2 py-1 rounded">{captchaCode}</span></label>
                  <input required type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder="Enter CAPTCHA..." className="w-full p-3 bg-slate-50 border rounded-xl font-mono" />
                </div>
                {loginError && <p className="text-red-600 text-[11px] font-semibold">{loginError}</p>}
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">Login to Portal</button>
              </form>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Admin Password</label>
                  <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Admin password..." className="w-full p-3 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">CAPTCHA: <span className="font-mono bg-slate-900 text-amber-400 px-2 py-1 rounded">{captchaCode}</span></label>
                  <input required type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder="Enter CAPTCHA..." className="w-full p-3 bg-slate-50 border rounded-xl font-mono" />
                </div>
                {loginError && <p className="text-red-600 text-[11px] font-semibold">{loginError}</p>}
                <button type="submit" className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold">Unlock Admin Panel</button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="font-extrabold text-sm mb-4">USR POWER PORTAL</h2>
          <nav className="space-y-2 text-xs">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left p-2.5 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}>📊 Dashboard</button>
            {authRole === 'admin' && (
              <button onClick={() => setActiveTab('admin-manage')} className={`w-full text-left p-2.5 rounded-lg ${activeTab === 'admin-manage' ? 'bg-amber-600' : 'hover:bg-slate-800'}`}>🛡️ Admin Manage Employees</button>
            )}
          </nav>
        </div>
        <button onClick={handleLogout} className="bg-slate-800 text-red-400 p-2.5 rounded-lg text-xs font-bold mt-4">🚪 Logout</button>
      </aside>

      <main className="flex-1 p-4 md:p-8 space-y-6">
        <header className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">{activeTab === 'admin-manage' ? 'Admin Master Control' : 'Dashboard Overview'}</h2>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold">{authRole === 'admin' ? '👑 Admin' : `👤 ${currentEmp.name}`}</span>
        </header>

        {activeTab === 'admin-manage' && authRole === 'admin' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
              <h3 className="font-bold text-xs text-slate-800">Employee List ({employees.length})</h3>
              <button onClick={() => setIsAddEmpModalOpen(true)} className="bg-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold">+ Add Employee</button>
            </div>

            <div className="space-y-3">
              {employees.map(emp => (
                <div key={emp.id} className="bg-white p-4 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{emp.id}</span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{emp.name}</h4>
                    <p className="text-[11px] text-slate-500">{emp.designation} • Territory: {emp.territory}</p>
                    <p className="text-[11px] text-indigo-600 font-bold mt-0.5">Vertical: {emp.primaryVertical || 'USR POWER LUBE'}</p>
                  </div>
                  <button onClick={() => setEditProfileModal({ ...emp })} className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold">Edit Details</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
            <h3 className="font-bold text-sm">Welcome, {authRole === 'admin' ? 'Admin Master' : currentEmp.name}!</h3>
            <p className="text-xs text-slate-600">Aapka portal bilkul theek se kaam kar raha hai. Left sidebar se navigation manage karein.</p>
          </div>
        )}
      </main>

      {/* ADD EMPLOYEE MODAL */}
      {isAddEmpModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-3 text-xs">
            <div className="flex justify-between items-center border-b pb-2"><h3 className="font-bold">Add New Employee</h3><button onClick={() => setIsAddEmpModalOpen(false)}>✕</button></div>
            <form onSubmit={handleAddEmployee} className="space-y-2.5">
              <div><label className="font-semibold block mb-1">Name</label><input required type="text" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} className="w-full p-2 border rounded-xl" /></div>
              <div><label className="font-semibold block mb-1">Employee ID</label><input required type="text" value={newEmp.id} onChange={e => setNewEmp({...newEmp, id: e.target.value})} className="w-full p-2 border rounded-xl uppercase font-mono" placeholder="USR-EMP-105" /></div>
              <div><label className="font-semibold block mb-1">Password</label><input required type="text" value={newEmp.pass} onChange={e => setNewEmp({...newEmp, pass: e.target.value})} className="w-full p-2 border rounded-xl font-mono" /></div>
              <div>
                <label className="font-semibold block mb-1">Primary Vertical</label>
                <select value={newEmp.primaryVertical} onChange={e => setNewEmp({...newEmp, primaryVertical: e.target.value})} className="w-full p-2 border rounded-xl bg-white">
                  <option value="USR POWER LUBE">USR POWER LUBE</option>
                  <option value="TURBO OIL">TURBO OIL</option>
                  <option value="PUNCHKUTEER">PUNCHKUTEER</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2"><button type="button" onClick={() => setIsAddEmpModalOpen(false)} className="px-3 py-1.5 bg-slate-100 rounded-xl font-bold">Cancel</button><button type="submit" className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl font-bold">Save</button></div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {editProfileModal && (
        <div className="fixed inset-0 bg-slate-950/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-3 text-xs">
            <div className="flex justify-between items-center border-b pb-2"><h3 className="font-bold">Edit Employee: {editProfileModal.id}</h3><button onClick={() => setEditProfileModal(null)}>✕</button></div>
            <form onSubmit={handleSaveEmployeeProfile} className="space-y-2.5">
              <div><label className="font-semibold block mb-1">Name</label><input required type="text" value={editProfileModal.name} onChange={e => setEditProfileModal({...editProfileModal, name: e.target.value})} className="w-full p-2 border rounded-xl" /></div>
              <div><label className="font-semibold block mb-1">Territory</label><input required type="text" value={editProfileModal.territory} onChange={e => setEditProfileModal({...editProfileModal, territory: e.target.value})} className="w-full p-2 border rounded-xl" /></div>
              <div>
                <label className="font-semibold block mb-1">Primary Vertical</label>
                <select value={editProfileModal.primaryVertical || 'USR POWER LUBE'} onChange={e => setEditProfileModal({...editProfileModal, primaryVertical: e.target.value})} className="w-full p-2 border rounded-xl bg-white">
                  <option value="USR POWER LUBE">USR POWER LUBE</option>
                  <option value="TURBO OIL">TURBO OIL</option>
                  <option value="PUNCHKUTEER">PUNCHKUTEER</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2"><button type="button" onClick={() => setEditProfileModal(null)} className="px-3 py-1.5 bg-slate-100 rounded-xl font-bold">Cancel</button><button type="submit" className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl font-bold">Update</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
