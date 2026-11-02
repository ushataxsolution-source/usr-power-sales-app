import React, { useState, useRef } from 'react';
import { 
  Users, MapPin, PhoneCall, TrendingUp, Camera, Calendar, Plus, 
  Search, Filter, CheckCircle, Clock, Award, 
  Navigation, DollarSign, UserPlus, Eye, FileText, Check, X, RefreshCw, Briefcase, Tag,
  Lock, Unlock, Download, ShieldCheck, Trash2, Edit3, LogOut, Key, User, CheckSquare, ArrowRight, CalendarDays
} from 'lucide-react';

// Business Verticals List
const BUSINESS_VERTICALS = [
  'USR POWER LUBE',
  'TURBO OIL',
  'NUTRI TRIBE',
  'TAX AND LEGAL',
  'PUNCHKUTEER',
  'CUSTOMIZED PACKAGING',
  'DIGITAL MARKETING'
];

// Initial Staff Data with Passwords, IDs & Assigned Verticals
const INITIAL_EMPLOYEES = [
  { id: 'USR-EMP-101', pass: '1011', name: 'Rohan Sharma', joiningDate: '2025-04-10', totalLeaves: 18, usedLeaves: 4, territory: 'Patna Division', target: 800000, achieved: 640000, primaryVertical: 'USR POWER LUBE' },
  { id: 'USR-EMP-102', pass: '1022', name: 'Amit Kumar', joiningDate: '2025-06-15', totalLeaves: 18, usedLeaves: 2, territory: 'Gaya & South Bihar', target: 650000, achieved: 580000, primaryVertical: 'TURBO OIL' },
  { id: 'USR-EMP-103', pass: '1033', name: 'Priya Singh', joiningDate: '2025-09-01', totalLeaves: 18, usedLeaves: 5, territory: 'Muzaffarpur Cluster', target: 900000, achieved: 870000, primaryVertical: 'TAX AND LEGAL' },
  { id: 'USR-EMP-104', pass: '1044', name: 'Vikram Verma', joiningDate: '2026-01-10', totalLeaves: 18, usedLeaves: 1, territory: 'Bhagalpur Region', target: 500000, achieved: 320000, primaryVertical: 'DIGITAL MARKETING' }
];

// Initial Attendance Records
const INITIAL_ATTENDANCE = [
  { id: 'ATT-1', empId: 'USR-EMP-101', empName: 'Rohan Sharma', date: '2026-11-02', checkInTime: '09:15 AM', status: 'Present', location: 'Patna Hub' },
  { id: 'ATT-2', empId: 'USR-EMP-102', empName: 'Amit Kumar', date: '2026-11-02', checkInTime: '09:30 AM', status: 'Present', location: 'Gaya Hub' }
];

// Initial Leave Requests
const INITIAL_LEAVES = [
  { id: 'LEV-1', empId: 'USR-EMP-101', empName: 'Rohan Sharma', fromDate: '2026-11-10', toDate: '2026-11-11', reason: 'Family Function', status: 'Approved' },
  { id: 'LEV-2', empId: 'USR-EMP-102', empName: 'Amit Kumar', fromDate: '2026-11-15', toDate: '2026-11-15', reason: 'Medical Checkup', status: 'Pending' }
];

// Initial Leads
const INITIAL_LEADS = [
  { id: 'LD-101', clientName: 'Bihar Auto Spares & Lubricants', contactPerson: 'Suresh Prasad', phone: '9835012345', address: 'Baksoti Road, Gaya', status: 'Hot', stage: 'Negotiation', estimatedValue: 180000, assignedToId: 'USR-EMP-102', assignedToName: 'Amit Kumar', vertical: 'USR POWER LUBE', lastFollowup: '2026-11-01', nextFollowup: '2026-11-03' },
  { id: 'LD-102', clientName: 'Maheshwari Logistics & Fleet Services', contactPerson: 'Mahesh Gupta', phone: '9431098765', address: 'Exhibition Road, Patna', status: 'Warm', stage: 'Proposal Sent', estimatedValue: 350000, assignedToId: 'USR-EMP-101', assignedToName: 'Rohan Sharma', vertical: 'TURBO OIL', lastFollowup: '2026-10-31', nextFollowup: '2026-11-04' }
];

// Initial Daily Call Reports
const INITIAL_DCR = [
  { id: 'DCR-501', empId: 'USR-EMP-102', empName: 'Amit Kumar', vertical: 'TURBO OIL', clientName: 'Punchkuteer Resort & Eco Stay', visitTime: '10:30 AM', callType: 'Field Visit', outcome: 'Order Confirmed', notes: 'Finalized annual supply contract for heavy lube and Turbo Oil.', nextDate: '2026-11-10', lat: '24.5821 N', lng: '84.9754 E', address: 'NH-2 Dobhi, Gaya', photoVerified: true, photoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80' },
  { id: 'DCR-502', empId: 'USR-EMP-101', empName: 'Rohan Sharma', vertical: 'DIGITAL MARKETING', clientName: 'Bihar Auto Spares', visitTime: '12:15 PM', callType: 'Phone Call', outcome: 'Follow Up Required', notes: 'Pitched customized packaging & digital promotional campaign bundle.', nextDate: '2026-11-04', lat: '25.6121 N', lng: '85.1412 E', address: 'Exhibition Road, Patna', photoVerified: false, photoUrl: null }
];

export default function App() {
  const [authRole, setAuthRole] = useState(null); 
  const [loggedEmpId, setLoggedEmpId] = useState('');
  
  const [loginType, setLoginType] = useState('employee');
  const [loginIdInput, setLoginIdInput] = useState('');
  const [loginPassInput, setLoginPassInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [attendanceList, setAttendanceList] = useState(INITIAL_ATTENDANCE);
  const [leaveList, setLeaveList] = useState(INITIAL_LEAVES);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [dcrs, setDcrs] = useState(INITIAL_DCR);

  const [selectedEmpFilter, setSelectedEmpFilter] = useState('All');
  const [selectedVerticalFilter, setSelectedVerticalFilter] = useState('All');

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDcrModalOpen, setIsDcrModalOpen] = useState(false);
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [viewPhotoModal, setViewPhotoModal] = useState(null);

  const [newLead, setNewLead] = useState({
    clientName: '', contactPerson: '', phone: '', address: '',
    status: 'Hot', stage: 'Contacted', estimatedValue: '', assignedToId: 'USR-EMP-101', vertical: 'USR POWER LUBE', nextFollowup: ''
  });

  const [newDcr, setNewDcr] = useState({
    empId: 'USR-EMP-101', clientName: '', vertical: 'USR POWER LUBE', callType: 'Field Visit',
    outcome: 'Follow Up Required', notes: '', nextDate: '',
    lat: '25.5941 N', lng: '85.1376 E', address: 'Main Market, Patna',
    photoVerified: false, photoUrl: null
  });

  const [newEmp, setNewEmp] = useState({
    id: '', pass: '', name: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 18, territory: 'Patna Division', target: '', primaryVertical: 'USR POWER LUBE'
  });

  const [newLeave, setNewLeave] = useState({
    fromDate: '', toDate: '', reason: ''
  });

  const [capturingGpsPhoto, setCapturingGpsPhoto] = useState(false);
  const fileInputRef = useRef(null);

  const currentEmp = employees.find(e => e.id === loggedEmpId) || employees[0];

  // Filtering Business Verticals based on Role
  const accessibleVerticals = authRole === 'admin' 
    ? BUSINESS_VERTICALS 
    : BUSINESS_VERTICALS.filter(v => v === currentEmp.primaryVertical);

  const handleEmployeeLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const foundEmp = employees.find(emp => emp.id === loginIdInput.trim() && emp.pass === loginPassInput.trim());
    if (foundEmp) {
      setAuthRole('employee');
      setLoggedEmpId(foundEmp.id);
      setLoginIdInput('');
      setLoginPassInput('');
      setActiveTab('dashboard');
    } else {
      setLoginError('Invalid Employee ID or Password!');
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (loginPassInput === '70212@Usrpowermhadmin') {
      setAuthRole('admin');
      setLoginPassInput('');
      setActiveTab('admin-manage');
    } else {
      setLoginError('Invalid Admin Password!');
    }
  };

  const handleLogout = () => {
    setAuthRole(null);
    setLoggedEmpId('');
  };

  const markTodayAttendance = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const alreadyMarked = attendanceList.some(a => a.empId === currentEmp.id && a.date === todayStr);
    if (alreadyMarked) {
      alert('Attendance for today is already marked!');
      return;
    }
    const newAtt = {
      id: `ATT-${Date.now()}`,
      empId: currentEmp.id,
      empName: currentEmp.name,
      date: todayStr,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Present',
      location: currentEmp.territory
    };
    setAttendanceList([newAtt, ...attendanceList]);
    alert('Attendance Marked Successfully for Today!');
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    const createdLeave = {
      id: `LEV-${Date.now()}`,
      empId: currentEmp.id,
      empName: currentEmp.name,
      ...newLeave,
      status: 'Pending'
    };
    setLeaveList([createdLeave, ...leaveList]);
    setIsLeaveModalOpen(false);
    setNewLeave({ fromDate: '', toDate: '', reason: '' });
    alert('Leave Application Submitted Successfully!');
  };

  const captureRealGpsPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCapturingGpsPhoto(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4) + ' N';
          const lng = position.coords.longitude.toFixed(4) + ' E';
          const reader = new FileReader();
          reader.onloadend = () => {
            setNewDcr(prev => ({
              ...prev,
              lat: lat,
              lng: lng,
              address: 'Live Field Location (Lat: ' + lat + ')',
              photoVerified: true,
              photoUrl: reader.result
            }));
            setCapturingGpsPhoto(false);
          };
          reader.readAsDataURL(file);
        },
        () => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setNewDcr(prev => ({
              ...prev,
              lat: '25.5941 N',
              lng: '85.1376 E',
              address: 'Bihar Field Hub (GPS Manual)',
              photoVerified: true,
              photoUrl: reader.result
            }));
            setCapturingGpsPhoto(false);
          };
          reader.readAsDataURL(file);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setCapturingGpsPhoto(false);
      alert('Geolocation is not supported.');
    }
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const assignedId = authRole === 'admin' ? newLead.assignedToId : currentEmp.id;
    const empObj = employees.find(emp => emp.id === assignedId);
    const createdLead = {
      ...newLead,
      assignedToId: assignedId,
      assignedToName: empObj ? empObj.name : currentEmp.name,
      vertical: authRole === 'admin' ? newLead.vertical : currentEmp.primaryVertical,
      id: `LD-${Math.floor(Math.random() * 900 + 100)}`,
      lastFollowup: new Date().toISOString().split('T')[0],
      estimatedValue: Number(newLead.estimatedValue) || 0
    };
    setLeads([createdLead, ...leads]);
    setIsLeadModalOpen(false);
  };

  const handleAddDcr = (e) => {
    e.preventDefault();
    const targetId = authRole === 'admin' ? newDcr.empId : currentEmp.id;
    const empObj = employees.find(emp => emp.id === targetId);
    const createdDcr = {
      ...newDcr,
      empId: targetId,
      empName: empObj ? empObj.name : currentEmp.name,
      vertical: authRole === 'admin' ? newDcr.vertical : currentEmp.primaryVertical,
      id: `DCR-${Math.floor(Math.random() * 900 + 100)}`,
      visitTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDcrs([createdDcr, ...dcrs]);
    setIsDcrModalOpen(false);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const createdEmp = {
      id: newEmp.id || `USR-EMP-${Math.floor(Math.random() * 900 + 100)}`,
      pass: newEmp.pass || '1234',
      name: newEmp.name,
      joiningDate: newEmp.joiningDate,
      totalLeaves: Number(newEmp.totalLeaves) || 18,
      usedLeaves: 0,
      territory: newEmp.territory,
      target: Number(newEmp.target) || 500000,
      achieved: 0,
      primaryVertical: newEmp.primaryVertical
    };
    setEmployees([...employees, createdEmp]);
    setIsAddEmpModalOpen(false);
    setNewEmp({ id: '', pass: '', name: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 18, territory: 'Patna Division', target: '', primaryVertical: 'USR POWER LUBE' });
    alert(`Employee ID (${createdEmp.id}) Created & Assigned to ${createdEmp.primaryVertical}!`);
  };

  const exportToCSV = (data, filename) => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const visibleLeads = authRole === 'admin'
    ? leads.filter(l => (selectedEmpFilter === 'All' || l.assignedToId === selectedEmpFilter) && (selectedVerticalFilter === 'All' || l.vertical === selectedVerticalFilter))
    : leads.filter(l => l.assignedToId === currentEmp.id || l.vertical === currentEmp.primaryVertical);

  const visibleDcrs = authRole === 'admin'
    ? dcrs.filter(d => (selectedEmpFilter === 'All' || d.empId === selectedEmpFilter) && (selectedVerticalFilter === 'All' || d.vertical === selectedVerticalFilter))
    : dcrs.filter(d => d.empId === currentEmp.id || d.vertical === currentEmp.primaryVertical);

  const visibleAttendance = authRole === 'admin'
    ? attendanceList
    : attendanceList.filter(a => a.empId === currentEmp.id);

  const visibleLeaves = authRole === 'admin'
    ? leaveList
    : leaveList.filter(l => l.empId === currentEmp.id);

  const totalSalesTarget = authRole === 'admin' ? employees.reduce((acc, curr) => acc + curr.target, 0) : currentEmp.target;
  const totalSalesAchieved = authRole === 'admin' ? employees.reduce((acc, curr) => acc + curr.achieved, 0) : currentEmp.achieved;
  const totalLeadsValue = visibleLeads.reduce((acc, curr) => acc + curr.estimatedValue, 0);

  // LOGIN SCREEN
  if (!authRole) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-extrabold text-base tracking-wide">USR POWER INDUSTRIES</h1>
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">PRIVATE LIMITED • SALES & DCR PORTAL</p>
          </div>

          <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
            <button 
              onClick={() => { setLoginType('employee'); setLoginError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                loginType === 'employee' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Employee Portal</span>
            </button>
            <button 
              onClick={() => { setLoginType('admin'); setLoginError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                loginType === 'admin' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Master Login</span>
            </button>
          </div>

          <div className="p-6">
            {loginType === 'employee' ? (
              <form onSubmit={handleEmployeeLogin} className="space-y-4 text-xs">
                <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl text-indigo-900 text-[11px]">
                  <strong>Employee Instructions:</strong> Enter your assigned Employee ID and Password given by Admin.
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Employee ID</label>
                  <input required type="text" value={loginIdInput} onChange={e => setLoginIdInput(e.target.value)} placeholder="e.g. USR-EMP-101" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Password</label>
                  <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Enter password..." className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                {loginError && <p className="text-red-600 font-semibold text-[11px]">{loginError}</p>}
                
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition shadow-md flex items-center justify-center space-x-2">
                  <span>Login to Employee Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-[11px]">
                  <strong>Admin Restricted Area:</strong> Full control over staff credentials, vertical assignments, and leave tracking.
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Admin Security Password / PIN</label>
                  <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Enter admin password..." className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500" autoFocus />
                </div>
                {loginError && <p className="text-red-600 font-semibold text-[11px]">{loginError}</p>}

                <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold transition shadow-md flex items-center justify-center space-x-2">
                  <span>Unlock Admin Control Center</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      
      <aside className="w-full md:w-72 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col justify-between shadow-xl">
        <div>
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl text-white shadow-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-wide text-white leading-tight">
                  USR POWER INDUSTRIES
                </h1>
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">PRIVATE LIMITED</p>
              </div>
            </div>
            
            <div className="mt-2 bg-slate-800/80 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-300 flex items-center justify-between border border-slate-700/50">
              <span className="text-slate-400">
                {authRole === 'admin' ? '👑 Admin Master Mode' : `👤 Staff: ${currentEmp.name}`}
              </span>
              <span className={`w-2 h-2 rounded-full ${authRole === 'admin' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: TrendingUp },
              { id: 'attendance', label: 'Attendance & Punch-In', icon: CheckSquare, badge: visibleAttendance.length },
              { id: 'leaves', label: 'Leave Management', icon: CalendarDays, badge: visibleLeaves.length },
              { id: 'leads', label: 'Lead Management', icon: Users, badge: visibleLeads.length },
              { id: 'dcr', label: 'Daily Call Reports (DCR)', icon: FileText, badge: visibleDcrs.length },
              { id: 'gps', label: 'GPS Photo Verification', icon: Camera },
              { id: 'verticals', label: authRole === 'admin' ? 'Business Verticals' : 'Assigned Vertical', icon: Tag, badge: accessibleVerticals.length },
              { id: 'performance', label: 'Staff Performance', icon: Award },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white text-indigo-800' : 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {authRole === 'admin' && (
              <button
                onClick={() => setActiveTab('admin-manage')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-xs mt-3 transition-all ${
                  activeTab === 'admin-manage' ? 'bg-amber-600 text-white' : 'bg-amber-950/40 text-amber-300 border border-amber-800/50 hover:bg-amber-900/50'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Admin Control Center</span>
              </button>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full bg-slate-800 hover:bg-slate-700 text-red-400 p-2.5 rounded-xl flex items-center justify-center text-xs border border-slate-700/60 transition font-semibold"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout Securely</span>
          </button>
          <div className="text-[10px] text-center text-slate-500 pt-1">
            USR POWER INDUSTRIES PVT LTD © 2026
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900 capitalize">
                {activeTab === 'admin-manage' ? 'Admin Master Control Panel' : activeTab.replace('-', ' ')}
              </h2>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">
                {authRole === 'admin' ? 'ADMIN VIEW' : `ASSIGNED VERTICAL: ${currentEmp.primaryVertical}`}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {authRole === 'admin' ? 'Managing employee credentials, assigned verticals, and leave records.' : `Welcome ${currentEmp.name}. Joined: ${currentEmp.joiningDate} | Assigned Vertical: ${currentEmp.primaryVertical}`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {authRole === 'admin' && (
              <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 shadow-sm">
                <Filter className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                <select 
                  value={selectedEmpFilter} 
                  onChange={(e) => setSelectedEmpFilter(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="All">All Staff / Emp IDs</option>
                  {employees.map(e => <option key={e.id} value={e.id}>[{e.id}] {e.name}</option>)}
                </select>
              </div>
            )}

            <button onClick={() => setIsLeadModalOpen(true)} className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition">
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Lead</span>
            </button>

            <button onClick={() => setIsDcrModalOpen(true)} className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition">
              <Plus className="w-3.5 h-3.5" />
              <span>Log DCR</span>
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">{authRole === 'admin' ? 'Company Target' : 'Your Target'}</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">₹{(totalSalesAchieved).toLocaleString('en-IN')}</h3>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" /> {Math.round((totalSalesAchieved/totalSalesTarget)*100)}% Achieved
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Accessible Leads</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{visibleLeads.length} Leads</h3>
                  <span className="text-[11px] text-indigo-600 font-medium mt-1 inline-block">Pipeline: ₹{(totalLeadsValue).toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Users className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Leave Balance</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {authRole === 'admin' ? `${leaveList.length} Applications` : `${currentEmp.totalLeaves - currentEmp.usedLeaves} / ${currentEmp.totalLeaves} Left`}
                  </h3>
                  <button onClick={() => setActiveTab('leaves')} className="text-[11px] text-indigo-600 font-bold hover:underline mt-1 block">View Leaves &rarr;</button>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><CalendarDays className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Today's Attendance</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {attendanceList.some(a => a.empId === currentEmp.id && a.date === new Date().toISOString().split('T')[0]) ? 'Marked Present' : 'Not Marked'}
                  </h3>
                  <button onClick={() => setActiveTab('attendance')} className="text-[11px] text-indigo-600 font-bold hover:underline mt-1 block">Go to Attendance &rarr;</button>
                </div>
                <div className="p-3 bg-teal-50 text-teal-600 rounded-xl"><CheckSquare className="w-6 h-6" /></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center border-b border-slate-100 pb-3">
                <Clock className="w-4 h-4 mr-2 text-indigo-600" /> {authRole === 'admin' ? 'Recent DCR Logs' : `Your DCR Logs (${currentEmp.primaryVertical})`}
              </h3>
              <div className="space-y-3">
                {visibleDcrs.slice(0, 4).map((dcr) => (
                  <div key={dcr.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{dcr.clientName}</span>
                      <span className="ml-2 text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">{dcr.vertical}</span>
                      <p className="text-slate-600 mt-1">{dcr.notes}</p>
                      <p className="text-[10px] text-slate-400 mt-1">By: {dcr.empName} ({dcr.empId}) • {dcr.address}</p>
                    </div>
                    {dcr.photoVerified && (
                      <button onClick={() => setViewPhotoModal(dcr)} className="text-emerald-600 font-semibold hover:underline flex items-center">
                        <Camera className="w-3.5 h-3.5 mr-1" /> View Photo
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: VERTICALS (ONLY ASSIGNED VERTICAL SHOWN TO EMPLOYEE) */}
        {activeTab === 'verticals' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {authRole === 'admin' ? 'All Business Verticals (Company Overview)' : `Your Assigned Business Vertical`}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {authRole === 'admin' ? 'Showing all company product lines.' : `You are authorized to manage operation for ${currentEmp.primaryVertical} only.`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {accessibleVerticals.map(v => (
                <div key={v} className="p-4 border border-indigo-200 rounded-xl bg-indigo-50/40 space-y-2">
                  <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded uppercase">Active Vertical</span>
                  <h4 className="font-extrabold text-sm text-indigo-950">{v}</h4>
                  <p className="text-[11px] text-slate-600">USR POWER INDUSTRIES PRIVATE LIMITED</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Daily Field Attendance & Punch-In</h3>
                <p className="text-xs text-slate-500 mt-1">Mark your attendance for today to notify Admin of your field availability.</p>
              </div>
              {authRole !== 'admin' && (
                <button onClick={markTodayAttendance} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4" />
                  <span>Punch In Attendance Today</span>
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700">Attendance Records History</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                      <th className="p-3">Employee ID & Name</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Check-In Time</th>
                      <th className="p-3">Location / Territory</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleAttendance.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{att.empName} <span className="font-mono text-indigo-600 text-[10px] block">[{att.empId}]</span></td>
                        <td className="p-3 text-slate-600">{att.date}</td>
                        <td className="p-3 font-semibold text-emerald-700">{att.checkInTime}</td>
                        <td className="p-3 text-slate-500">{att.location}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">{att.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaves' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Leave Management & History</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {authRole === 'admin' ? 'View all employee leave applications.' : `Your Leaves: Used ${currentEmp.usedLeaves} | Remaining ${currentEmp.totalLeaves - currentEmp.usedLeaves} of ${currentEmp.totalLeaves}`}
                </p>
              </div>
              {authRole !== 'admin' && (
                <button onClick={() => setIsLeaveModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>+ Apply for Leave</span>
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700">Leave Applications</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                      <th className="p-3">Employee Name</th>
                      <th className="p-3">From Date</th>
                      <th className="p-3">To Date</th>
                      <th className="p-3">Reason</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {visibleLeaves.map(lev => (
                      <tr key={lev.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{lev.empName} <span className="font-mono text-indigo-600 text-[10px] block">[{lev.empId}]</span></td>
                        <td className="p-3 text-slate-600">{lev.fromDate}</td>
                        <td className="p-3 text-slate-600">{lev.toDate}</td>
                        <td className="p-3 text-slate-700">{lev.reason}</td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${lev.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{lev.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Business Leads ({authRole === 'admin' ? 'All Leads' : currentEmp.primaryVertical})</h3>
              <button onClick={() => setIsLeadModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-semibold">+ Add Lead</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Vertical</th>
                    <th className="p-3">Assigned Staff</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Est. Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{lead.clientName} <span className="text-[10px] text-slate-400 block">{lead.phone}</span></td>
                      <td className="p-3"><span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-semibold">{lead.vertical}</span></td>
                      <td className="p-3 font-semibold">{lead.assignedToName}</td>
                      <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold">{lead.status}</span></td>
                      <td className="p-3 font-bold">₹{(lead.estimatedValue).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'dcr' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Daily Call Reports (DCR)</h3>
              <button onClick={() => setIsDcrModalOpen(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold">+ Submit DCR</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Staff</th>
                    <th className="p-3">Client & Vertical</th>
                    <th className="p-3">Notes & Outcome</th>
                    <th className="p-3">GPS Location</th>
                    <th className="p-3">Photo</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleDcrs.map(dcr => (
                    <tr key={dcr.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{dcr.empName} <span className="font-mono text-indigo-600 text-[10px] block">[{dcr.empId}]</span></td>
                      <td className="p-3 font-bold">{dcr.clientName} <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded block mt-0.5">{dcr.vertical}</span></td>
                      <td className="p-3 text-slate-700">{dcr.notes} <span className="text-[10px] text-emerald-700 block font-semibold mt-1">Outcome: {dcr.outcome}</span></td>
                      <td className="p-3 font-mono text-[10px] text-slate-500">{dcr.address}</td>
                      <td className="p-3">{dcr.photoVerified ? <button onClick={() => setViewPhotoModal(dcr)} className="text-emerald-600 font-semibold hover:underline">View</button> : 'No Photo'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gps' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-3">GPS & Camera Photo Audits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleDcrs.filter(d => d.photoVerified).map(dcr => (
                  <div key={dcr.id} className="border p-4 rounded-xl flex items-center space-x-3 bg-slate-50">
                    <img src={dcr.photoUrl} alt="proof" className="w-20 h-20 object-cover rounded-lg border" />
                    <div className="text-xs space-y-1">
                      <p className="font-bold text-slate-900">{dcr.clientName} ({dcr.vertical})</p>
                      <p className="text-slate-500">{dcr.notes}</p>
                      <p className="text-[10px] font-mono text-indigo-600">{dcr.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Staff Targets Leaderboard</h3>
            <div className="space-y-3">
              {(authRole === 'admin' ? employees : [currentEmp]).map(emp => {
                const pct = Math.round((emp.achieved / emp.target) * 100);
                return (
                  <div key={emp.id} className="p-3 border rounded-xl bg-slate-50 space-y-2">
                    <div className="flex justify-between text-xs">
                      <div><strong className="text-slate-900">{emp.name}</strong> <span className="font-mono text-indigo-600">[{emp.id}]</span></div>
                      <div>₹{(emp.achieved).toLocaleString('en-IN')} / ₹{(emp.target).toLocaleString('en-IN')} ({pct}%)</div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ADMIN CONTROL CENTER */}
        {activeTab === 'admin-manage' && authRole === 'admin' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
              <h3 className="font-bold text-amber-900 text-sm flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-amber-700" /> Admin Master Control Center</h3>
              <p className="text-xs text-amber-800">Create employee IDs, passwords, select assigned verticals, joining dates, and review leave records.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase">Employee ID & Password Creator</h4>
                <p className="text-xs text-slate-500">Generate secure login IDs, passwords, and assign specific Business Vertical to staff.</p>
                <button onClick={() => setIsAddEmpModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold">
                  + Create New Employee & Assign Vertical
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase">Export Master Data (CSV)</h4>
                <div className="flex gap-2">
                  <button onClick={() => exportToCSV(dcrs, 'USR_DCR')} className="bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-semibold">Export DCRs</button>
                  <button onClick={() => exportToCSV(employees, 'USR_Employees')} className="bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-semibold">Export Staff List</button>
                </div>
              </div>
            </div>

            {/* REGISTERED EMPLOYEES TABLE FOR ADMIN */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-3">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Registered Employees, Assigned Verticals & Credentials</h4>
                  <p className="text-xs text-slate-500">Only Admin can view all active employee credentials.</p>
                </div>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                  Total Staff: {employees.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                      <th className="p-3">Employee Name & ID</th>
                      <th className="p-3">Password</th>
                      <th className="p-3">Assigned Vertical</th>
                      <th className="p-3">Joining Date</th>
                      <th className="p-3">Leaves (Used / Total)</th>
                      <th className="p-3">Territory</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{emp.name} <span className="font-mono text-indigo-600 text-[10px] block">[{emp.id}]</span></td>
                        <td className="p-3 font-mono font-bold text-amber-700 bg-amber-50/50 rounded">{emp.pass}</td>
                        <td className="p-3"><span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">{emp.primaryVertical}</span></td>
                        <td className="p-3 font-semibold text-slate-700">{emp.joiningDate}</td>
                        <td className="p-3"><span className="bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded font-bold text-[10px]">{emp.usedLeaves} / {emp.totalLeaves} Leaves</span></td>
                        <td className="p-3 text-slate-600">{emp.territory}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ADD EMPLOYEE MODAL (ADMIN) */}
      {isAddEmpModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Create Employee & Assign Vertical</h3>
              <button onClick={() => setIsAddEmpModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Employee Name</label>
                <input required type="text" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} placeholder="e.g. Mukesh Kumar" className="w-full p-2 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Employee ID</label>
                  <input required type="text" value={newEmp.id} onChange={e => setNewEmp({...newEmp, id: e.target.value})} placeholder="USR-EMP-105" className="w-full p-2 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Password</label>
                  <input required type="text" value={newEmp.pass} onChange={e => setNewEmp({...newEmp, pass: e.target.value})} placeholder="Secret Pass" className="w-full p-2 border rounded-xl font-mono" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-indigo-900 font-bold block mb-1">Assign Business Vertical (Staff Access)</label>
                <select value={newEmp.primaryVertical} onChange={e => setNewEmp({...newEmp, primaryVertical: e.target.value})} className="w-full p-2 border border-indigo-300 rounded-xl bg-indigo-50 font-bold text-indigo-900">
                  {BUSINESS_VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Joining Date</label>
                  <input required type="date" value={newEmp.joiningDate} onChange={e => setNewEmp({...newEmp, joiningDate: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Total Annual Leaves</label>
                  <input required type="number" value={newEmp.totalLeaves} onChange={e => setNewEmp({...newEmp, totalLeaves: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Monthly Target (₹)</label>
                  <input type="number" value={newEmp.target} onChange={e => setNewEmp({...newEmp, target: e.target.value})} placeholder="500000" className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Territory</label>
                  <input type="text" value={newEmp.territory} onChange={e => setNewEmp({...newEmp, territory: e.target.value})} placeholder="Gaya Division" className="w-full p-2 border rounded-xl" />
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsAddEmpModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold">Save Employee Credentials</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEAVE APPLICATION MODAL (EMPLOYEE) */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Apply for Leave</h3>
              <button onClick={() => setIsLeaveModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleApplyLeave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">From Date</label>
                  <input required type="date" value={newLeave.fromDate} onChange={e => setNewLeave({...newLeave, fromDate: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">To Date</label>
                  <input required type="date" value={newLeave.toDate} onChange={e => setNewLeave({...newLeave, toDate: e.target.value})} className="w-full p-2 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Reason for Leave</label>
                <textarea required rows="3" value={newLeave.reason} onChange={e => setNewLeave({...newLeave, reason: e.target.value})} placeholder="Enter reason..." className="w-full p-2 border rounded-xl"></textarea>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsLeaveModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEAD MODAL */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add New Lead</h3>
              <button onClick={() => setIsLeadModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddLead} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Client Name</label>
                <input required type="text" value={newLead.clientName} onChange={e => setNewLead({...newLead, clientName: e.target.value})} placeholder="Client name" className="w-full p-2 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone</label>
                  <input type="text" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} placeholder="98XXXXXXXX" className="w-full p-2 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Est. Value (₹)</label>
                  <input type="number" value={newLead.estimatedValue} onChange={e => setNewLead({...newLead, estimatedValue: e.target.value})} placeholder="50000" className="w-full p-2 border rounded-xl" />
                </div>
              </div>
              {authRole === 'admin' ? (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Vertical</label>
                  <select value={newLead.vertical} onChange={e => setNewLead({...newLead, vertical: e.target.value})} className="w-full p-2 border rounded-xl bg-white">
                    {BUSINESS_VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              ) : (
                <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] font-bold text-indigo-900">
                  Assigned Vertical: {currentEmp.primaryVertical}
                </div>
              )}
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsLeadModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DCR MODAL */}
      {isDcrModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Submit DCR</h3>
              <button onClick={() => setIsDcrModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddDcr} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Client Name</label>
                <input required type="text" value={newDcr.clientName} onChange={e => setNewDcr({...newDcr, clientName: e.target.value})} placeholder="Dealer / Client Name" className="w-full p-2 border rounded-xl" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Discussion Notes</label>
                <textarea rows="2" value={newDcr.notes} onChange={e => setNewDcr({...newDcr, notes: e.target.value})} placeholder="Notes..." className="w-full p-2 border rounded-xl"></textarea>
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Live GPS Photo Capture</span>
                  <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={captureRealGpsPhoto} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current.click()} disabled={capturingGpsPhoto} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">
                    {capturingGpsPhoto ? 'Getting GPS...' : 'Open Camera'}
                  </button>
                </div>
                {newDcr.photoVerified && <p className="text-[11px] text-emerald-600 font-bold">✓ Photo & GPS Tagged!</p>}
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsDcrModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold">Submit DCR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW PHOTO MODAL */}
      {viewPhotoModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-slate-900 text-xs">GPS Visit Photo</h3>
              <button onClick={() => setViewPhotoModal(null)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <img src={viewPhotoModal.photoUrl} alt="Visit Proof" className="w-full h-64 object-cover rounded-xl border" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-900">{viewPhotoModal.clientName}</p>
              <p className="text-slate-500 font-mono text-[10px]">{viewPhotoModal.address}</p>
            </div>
            <button onClick={() => setViewPhotoModal(null)} className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}
