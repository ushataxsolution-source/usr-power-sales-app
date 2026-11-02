import React, { useState, useRef } from 'react';
import { 
  Users, MapPin, PhoneCall, TrendingUp, Camera, Calendar, Plus, 
  Search, Filter, CheckCircle, Clock, Award, 
  Navigation, DollarSign, UserPlus, Eye, FileText, Check, X, RefreshCw, Briefcase, Tag,
  Lock, Unlock, Download, ShieldCheck, Trash2, Edit3, LogOut, Key, User, CheckSquare, ArrowRight, CalendarDays, Bus, ShieldAlert, MessageSquare, FileSpreadsheet, Printer
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
  { id: 'USR-EMP-101', pass: '1011', name: 'Rohan Sharma', phone: '9820012345', joiningDate: '2025-04-10', totalLeaves: 18, usedLeaves: 4, territory: 'Mumbai Metropolitan Region', target: 800000, achieved: 640000, primaryVertical: 'USR POWER LUBE', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-102', pass: '1022', name: 'Amit Kumar', phone: '9821123456', joiningDate: '2025-06-15', totalLeaves: 18, usedLeaves: 2, territory: 'Pune & PCMC Cluster', target: 650000, achieved: 580000, primaryVertical: 'TURBO OIL', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-103', pass: '1033', name: 'Priya Singh', phone: '9822234567', joiningDate: '2025-09-01', totalLeaves: 18, usedLeaves: 5, territory: 'Thane & Kalyan Belt', target: 900000, achieved: 870000, primaryVertical: 'TAX AND LEGAL', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-104', pass: '1044', name: 'Vikram Verma', phone: '9823345678', joiningDate: '2026-01-10', totalLeaves: 18, usedLeaves: 1, territory: 'Nagpur Industrial Region', target: 500000, achieved: 320000, primaryVertical: 'DIGITAL MARKETING', failedAttempts: 0, isBlocked: false }
];

const INITIAL_ATTENDANCE = [
  { id: 'ATT-1', empId: 'USR-EMP-101', empName: 'Rohan Sharma', date: '2026-11-02', checkInTime: '09:15 AM', status: 'Present', location: 'Mumbai HQ Hub' }
];

const INITIAL_LEAVES = [
  { id: 'LEV-1', empId: 'USR-EMP-101', empName: 'Rohan Sharma', fromDate: '2026-11-10', toDate: '2026-11-11', reason: 'Family Function in Mumbai', status: 'Approved' }
];

const INITIAL_DAILY_TRAVEL = [
  { id: 'DTRV-1', empId: 'USR-EMP-101', empName: 'Rohan Sharma', date: '2026-11-01', mode: 'Bike / Fuel', km: 45, amount: 350, route: 'Andheri to Thane Dealer Route', weekCycle: 'Nov 01 - Nov 07, 2026', status: 'Submitted Weekly' }
];

const INITIAL_TRAVEL_CLAIMS = [
  { id: 'TRV-101', empId: 'USR-EMP-101', empName: 'Rohan Sharma', weekRange: 'Nov 01 - Nov 07, 2026', totalKm: 100, totalAmount: 800, purpose: 'Mumbai & Thane Dealer Route Visits', status: 'Approved' }
];

const INITIAL_LEADS = [
  { id: 'LD-101', clientName: 'Sahyadri Auto Spares & Lubricants', clientType: 'Distributor', contactPerson: 'Suresh Patil', phone: '9820012345', place: 'Vashi Turbhe Road, Navi Mumbai', status: 'Hot', stage: 'Negotiation', estimatedValue: 180000, investmentAmount: 250000, assignedToId: 'USR-EMP-102', assignedToName: 'Amit Kumar', vertical: 'USR POWER LUBE', lastFollowup: '2026-11-01', nextFollowup: '2026-11-05' }
];

const INITIAL_DCR = [
  { id: 'DCR-501', empId: 'USR-EMP-102', empName: 'Amit Kumar', vertical: 'TURBO OIL', clientName: 'Pune Logistics & Fleet Services', clientType: 'Corporate / Direct', place: 'Hinjewadi', visitTime: '10:30 AM', callType: 'Field Visit', outcome: 'Order Confirmed', notes: 'Finalized annual supply contract.', investmentAmount: 300000, nextDate: '2026-11-10', lat: '18.5204 N', lng: '73.8567 E', address: 'Hinjewadi Phase 1, Pune', photoVerified: true, photoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80' }
];

const INITIAL_AGREEMENTS = [
  {
    id: 'AGR-2026-01',
    distributorName: 'Sahyadri Auto Spares & Lubricants',
    constitution: 'Proprietorship',
    proprietorName: 'Suresh Patil',
    phone: '9820012345',
    address: 'Vashi Turbhe Road, Navi Mumbai, Maharashtra - 400703',
    immovableProperties: 'Commercial Shop No 12, Vashi Market',
    gstn: '27AAAAA0000A1Z5',
    transportCompany: 'VRL Logistics Ltd, Mumbai',
    railwayStation: 'Vashi Railway Station',
    verticalInterested: 'Automotive Engine Oil',
    territory: 'Navi Mumbai & Thane Region',
    investmentAutomotive: 1000000,
    investmentFourStroke: 200000,
    investmentPassenger: 150000,
    investmentHeavyDuty: 100000,
    investmentLcvHcv: 50000,
    totalInvestment: 1500000,
    submittedBy: 'Amit Kumar [USR-EMP-102]',
    submittedEmpId: 'USR-EMP-102',
    date: '2026-11-02',
    status: 'Approved & Signed'
  }
];

export default function App() {
  const [authRole, setAuthRole] = useState(null); 
  const [loggedEmpId, setLoggedEmpId] = useState('');
  
  const [loginType, setLoginType] = useState('employee');
  const [loginIdInput, setLoginIdInput] = useState('');
  const [loginPassInput, setLoginPassInput] = useState('');
  
  const [captchaCode, setCaptchaCode] = useState('4829');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [attendanceList, setAttendanceList] = useState(INITIAL_ATTENDANCE);
  const [leaveList, setLeaveList] = useState(INITIAL_LEAVES);
  const [dailyTravelList, setDailyTravelList] = useState(INITIAL_DAILY_TRAVEL);
  const [travelClaims, setTravelClaims] = useState(INITIAL_TRAVEL_CLAIMS);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [dcrs, setDcrs] = useState(INITIAL_DCR);
  const [agreements, setAgreements] = useState(INITIAL_AGREEMENTS);

  const [selectedEmpFilter, setSelectedEmpFilter] = useState('All');

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDcrModalOpen, setIsDcrModalOpen] = useState(false);
  const [isDailyTravelModalOpen, setIsDailyTravelModalOpen] = useState(false);
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [viewAgreementDetail, setViewAgreementDetail] = useState(null);

  const [editingEmpModal, setEditingEmpModal] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  // Agreement Form State
  const [newAgreement, setNewAgreement] = useState({
    distributorName: '',
    constitution: 'Proprietorship',
    proprietorName: '',
    proprietorAddress: '',
    residenceAddress: '',
    qualification: '',
    phone: '',
    immovableProperties: '',
    sisterConcernName: '',
    sisterAddress: '',
    sisterBusiness: '',
    sisterTurnover: '',
    adminStaffCount: '2',
    salesStaffCount: '4',
    techStaffCount: '1',
    isRelatedToEmployee: 'No',
    relationDetails: '',
    gstn: '',
    transportCompany: '',
    railwayStation: '',
    verticalInterested: 'Automotive Engine Oil',
    territory: '',
    investmentAutomotive: '1000000',
    investmentFourStroke: '200000',
    investmentPassenger: '150000',
    investmentHeavyDuty: '100000',
    investmentLcvHcv: '50000'
  });

  const [gstFetching, setGstFetching] = useState(false);
  const [gstFetchedStatus, setGstFetchedStatus] = useState(false);

  // Reliable GST Details Auto-Fetch Handler
  const handleGstnBlur = () => {
    const gstVal = newAgreement.gstn.trim();
    if (gstVal.length >= 10) {
      setGstFetching(true);
      setTimeout(() => {
        setNewAgreement(prev => ({
          ...prev,
          distributorName: prev.distributorName || 'Shree Ganesh Auto & Lubricants Corp',
          proprietorName: prev.proprietorName || 'Rajesh Sharma',
          proprietorAddress: prev.proprietorAddress || 'Industrial Area Phase 2, Near Highway, Maharashtra',
          transportCompany: prev.transportCompany || 'VRL Logistics Ltd',
          railwayStation: prev.railwayStation || 'Central Railway Goods Terminal'
        }));
        setGstFetching(false);
        setGstFetchedStatus(true);
      }, 600);
    }
  };

  const calculatedTotalInvestment = 
    (Number(newAgreement.investmentAutomotive) || 0) +
    (Number(newAgreement.investmentFourStroke) || 0) +
    (Number(newAgreement.investmentPassenger) || 0) +
    (Number(newAgreement.investmentHeavyDuty) || 0) +
    (Number(newAgreement.investmentLcvHcv) || 0);

  const [newLead, setNewLead] = useState({
    clientName: '', clientType: 'Dealer', contactPerson: '', phone: '', place: '',
    status: 'Hot', stage: 'Contacted', estimatedValue: '', investmentAmount: '', assignedToId: 'USR-EMP-101', vertical: 'USR POWER LUBE', nextFollowup: ''
  });

  const [newDcr, setNewDcr] = useState({
    empId: 'USR-EMP-101', clientName: '', clientType: 'Dealer', place: '', vertical: 'USR POWER LUBE', callType: 'Field Visit',
    outcome: 'Follow Up Required', notes: '', investmentAmount: '', nextDate: '',
    lat: '19.0760 N', lng: '72.8777 E', address: 'Andheri West, Mumbai',
    photoVerified: false, photoUrl: null
  });

  const [newEmp, setNewEmp] = useState({
    id: '', pass: '', name: '', phone: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 18, territory: 'Mumbai Suburban Division', target: '500000', primaryVertical: 'USR POWER LUBE'
  });

  const [newLeave, setNewLeave] = useState({
    fromDate: '', toDate: '', reason: ''
  });

  const [capturingGpsPhoto, setCapturingGpsPhoto] = useState(false);
  const fileInputRef = useRef(null);

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
      setLoginError('Account is BLOCKED due to failed password attempts! Contact Admin.');
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
        setLoginError('Account BLOCKED! You exceeded 6 incorrect password attempts.');
      } else {
        setLoginError(`Incorrect Password! Attempt ${updatedAttempts} of 6.`);
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

  const handleLogout = () => {
    setAuthRole(null);
    setLoggedEmpId('');
    refreshCaptcha();
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

    const message = `Hello ${editingEmpModal.name},\n\nYour USR Power Portal password has been reset by Admin.\n\n🆔 Employee ID: ${editingEmpModal.id}\n🔑 New Password: ${newPasswordInput}\n\n- USR Power Industries Maharashtra`;
    const whatsappUrl = `https://wa.me/91${editingEmpModal.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    alert(`Password updated & account unblocked for ${editingEmpModal.name}! WhatsApp window opened.`);
    setEditingEmpModal(null);
    setNewPasswordInput('');
  };

  const handleAgreementSubmit = (e) => {
    e.preventDefault();
    const createdAgreement = {
      id: `AGR-2026-${Math.floor(Math.random() * 900 + 100)}`,
      distributorName: newAgreement.distributorName,
      constitution: newAgreement.constitution,
      proprietorName: newAgreement.proprietorName,
      phone: newAgreement.phone,
      address: newAgreement.proprietorAddress,
      immovableProperties: newAgreement.immovableProperties,
      gstn: newAgreement.gstn,
      transportCompany: newAgreement.transportCompany,
      railwayStation: newAgreement.railwayStation,
      verticalInterested: newAgreement.verticalInterested,
      territory: newAgreement.territory,
      investmentAutomotive: Number(newAgreement.investmentAutomotive) || 0,
      investmentFourStroke: Number(newAgreement.investmentFourStroke) || 0,
      investmentPassenger: Number(newAgreement.investmentPassenger) || 0,
      investmentHeavyDuty: Number(newAgreement.investmentHeavyDuty) || 0,
      investmentLcvHcv: Number(newAgreement.investmentLcvHcv) || 0,
      totalInvestment: calculatedTotalInvestment,
      submittedBy: `${currentEmp.name} [${currentEmp.id}]`,
      submittedEmpId: currentEmp.id,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification'
    };

    setAgreements([createdAgreement, ...agreements]);
    setIsAgreementModalOpen(false);
    setGstFetchedStatus(false);
    alert('Official Partnership Agreement Form submitted successfully! Total Investment: ₹' + calculatedTotalInvestment.toLocaleString('en-IN'));
  };

  const handleApproveAgreement = (agrId) => {
    setAgreements(agreements.map(a => a.id === agrId ? { ...a, status: 'Approved & Signed' } : a));
    alert('Partnership Agreement Approved Successfully!');
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

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const createdEmp = {
      id: newEmp.id || `USR-EMP-${Math.floor(Math.random() * 900 + 100)}`,
      pass: newEmp.pass || '1234',
      name: newEmp.name,
      phone: newEmp.phone || '9820012345',
      joiningDate: newEmp.joiningDate,
      totalLeaves: Number(newEmp.totalLeaves) || 18,
      usedLeaves: 0,
      territory: newEmp.territory,
      target: Number(newEmp.target) || 500000,
      achieved: 0,
      primaryVertical: newEmp.primaryVertical,
      failedAttempts: 0,
      isBlocked: false
    };
    setEmployees([...employees, createdEmp]);
    setIsAddEmpModalOpen(false);
    alert(`Employee ID (${createdEmp.id}) Created Successfully with Vertical: ${createdEmp.primaryVertical}!`);
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
              address: 'Live Location (Lat: ' + lat + ')',
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
              lat: '19.0760 N',
              lng: '72.8777 E',
              address: 'Mumbai HQ Hub',
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
      alert('Geolocation not supported.');
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
      estimatedValue: Number(newLead.estimatedValue) || 0,
      investmentAmount: Number(newLead.investmentAmount) || 0
    };
    setLeads([createdLead, ...leads]);
    setIsLeadModalOpen(false);
    alert('Lead Added Successfully!');
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
      visitTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      investmentAmount: Number(newDcr.investmentAmount) || 0
    };
    setDcrs([createdDcr, ...dcrs]);
    setIsDcrModalOpen(false);
    alert('DCR Submitted Successfully!');
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
    ? leads.filter(l => (selectedEmpFilter === 'All' || l.assignedToId === selectedEmpFilter))
    : leads.filter(l => l.assignedToId === currentEmp.id || l.vertical === currentEmp.primaryVertical);

  const visibleDcrs = authRole === 'admin'
    ? dcrs.filter(d => (selectedEmpFilter === 'All' || d.empId === selectedEmpFilter))
    : dcrs.filter(d => d.empId === currentEmp.id || d.vertical === currentEmp.primaryVertical);

  // STRICT PRIVACY: Agreement forms visible ONLY to Admin Master Panel or the specific Employee who filled it
  const visibleAgreements = authRole === 'admin'
    ? agreements
    : agreements.filter(a => a.submittedEmpId === currentEmp.id);

  const visibleAttendance = authRole === 'admin' ? attendanceList : attendanceList.filter(a => a.empId === currentEmp.id);
  const visibleLeaves = authRole === 'admin' ? leaveList : leaveList.filter(l => l.empId === currentEmp.id);

  const totalSalesTarget = authRole === 'admin' ? employees.reduce((acc, curr) => acc + curr.target, 0) : currentEmp.target;
  const totalSalesAchieved = authRole === 'admin' ? employees.reduce((acc, curr) => acc + curr.achieved, 0) : currentEmp.achieved;
  const totalLeadsValue = visibleLeads.reduce((acc, curr) => acc + (curr.investmentAmount || curr.estimatedValue), 0);

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
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">OFFICIAL SALS PORTAL • MAHARASTRA</p>
          </div>

          <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
            <button 
              onClick={() => { setLoginType('employee'); setLoginError(''); refreshCaptcha(); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                loginType === 'employee' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Employee Portal</span>
            </button>
            <button 
              onClick={() => { setLoginType('admin'); setLoginError(''); refreshCaptcha(); }}
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
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Employee ID</label>
                  <input required type="text" value={loginIdInput} onChange={e => setLoginIdInput(e.target.value)} placeholder="e.g. USR-EMP-101" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Password</label>
                  <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Enter password..." className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none" />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Security CAPTCHA Verification</label>
                  <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 text-amber-400 font-mono font-extrabold tracking-widest px-4 py-3 rounded-xl select-none text-base shadow-inner border border-slate-700 flex-1 text-center">
                      {captchaCode}
                    </div>
                    <button type="button" onClick={refreshCaptcha} className="p-3 bg-slate-100 hover:bg-slate-200 border rounded-xl text-slate-600 transition">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <input required type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder="Enter CAPTCHA code above..." className="w-full mt-2 p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono outline-none" />
                </div>

                {loginError && <p className="text-red-600 font-semibold text-[11px] bg-red-50 p-2.5 rounded-lg border border-red-200">{loginError}</p>}
                
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition shadow-md flex items-center justify-center space-x-2">
                  <span>Login to Employee Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Admin Security Password / PIN</label>
                  <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Enter admin password..." className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none" autoFocus />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Security CAPTCHA Verification</label>
                  <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 text-amber-400 font-mono font-extrabold tracking-widest px-4 py-3 rounded-xl select-none text-base shadow-inner border border-slate-700 flex-1 text-center">
                      {captchaCode}
                    </div>
                    <button type="button" onClick={refreshCaptcha} className="p-3 bg-slate-100 hover:bg-slate-200 border rounded-xl text-slate-600 transition">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <input required type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder="Enter CAPTCHA code above..." className="w-full mt-2 p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono outline-none" />
                </div>

                {loginError && <p className="text-red-600 font-semibold text-[11px] bg-red-50 p-2.5 rounded-lg border border-red-200">{loginError}</p>}

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
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col justify-between shadow-xl no-print">
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
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">OFFICIAL SALS PORTAL • MAHARASTRA</p>
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
              { id: 'agreements', label: 'Partnership Agreements (PDF)', icon: FileText, badge: visibleAgreements.length },
              { id: 'attendance', label: 'Attendance & Punch-In', icon: CheckSquare, badge: visibleAttendance.length },
              { id: 'leaves', label: 'Leave Management', icon: CalendarDays, badge: visibleLeaves.length },
              { id: 'leads', label: 'Lead Management', icon: Users, badge: visibleLeads.length },
              { id: 'dcr', label: 'Daily Call Reports (DCR)', icon: FileText, badge: visibleDcrs.length },
              { id: 'gps', label: 'GPS Photo Verification', icon: Camera },
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
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900 capitalize">
                {activeTab === 'admin-manage' ? 'Admin Master Control Panel' : activeTab.replace('-', ' ')}
              </h2>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">
                {authRole === 'admin' ? 'ADMIN VIEW' : `STAFF: ${currentEmp.name}`}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">USR POWER INDUSTRIES PRIVATE LIMITED • OFFICIAL SALS PORTAL • MAHARASTRA</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setIsAgreementModalOpen(true)} className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition">
              <FileText className="w-3.5 h-3.5" />
              <span>+ Fill New Agreement Form</span>
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Partnership Agreements</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{visibleAgreements.length} Forms</h3>
                  <button onClick={() => setActiveTab('agreements')} className="text-[11px] text-indigo-600 font-bold hover:underline mt-1 block">View Agreements &rarr;</button>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><FileText className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Sales Achievement</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">₹{(totalSalesAchieved).toLocaleString('en-IN')}</h3>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" /> {Math.round((totalSalesAchieved/totalSalesTarget)*100)}% Target
                  </span>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Leads</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{visibleLeads.length} Leads</h3>
                  <span className="text-[11px] text-indigo-600 font-medium mt-1 inline-block">Pipeline: ₹{(totalLeadsValue).toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Users className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Leave Balance</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {authRole === 'admin' ? `${leaveList.length} Requests` : `${currentEmp.totalLeaves - currentEmp.usedLeaves} Days`}
                  </h3>
                  <button onClick={() => setActiveTab('leaves')} className="text-[11px] text-indigo-600 font-bold hover:underline mt-1 block">View Leaves &rarr;</button>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><CalendarDays className="w-6 h-6" /></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-emerald-600" /> Recent Official Partnership Agreement Forms (Private View)
                </h3>
                <button onClick={() => setActiveTab('agreements')} className="text-xs font-bold text-indigo-600 hover:underline">View All &rarr;</button>
              </div>
              <div className="space-y-3">
                {visibleAgreements.slice(0, 3).map((agr) => (
                  <div key={agr.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{agr.distributorName}</span>
                      <span className="ml-2 text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">{agr.constitution}</span>
                      <p className="text-slate-600 mt-1">Proprietor/Partner: <strong>{agr.proprietorName}</strong> ({agr.phone}) | GSTN: {agr.gstn}</p>
                      <p className="text-[10px] text-slate-400 mt-1">Territory: {agr.territory} • Investment: ₹{(agr.totalInvestment).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${agr.status === 'Approved & Signed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {agr.status}
                      </span>
                      <button onClick={() => setViewAgreementDetail(agr)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                        View Form
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: AGREEMENTS */}
        {activeTab === 'agreements' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Official Partnership Agreement Forms (Distributor / Dealer)</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {authRole === 'admin' ? 'Review all distributor partnership forms submitted across Maharashtra.' : 'Forms submitted by you are securely listed here (Confidential & Private).'}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsAgreementModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow flex items-center space-x-1.5">
                  <Plus className="w-4 h-4" />
                  <span>+ Fill New Agreement Form</span>
                </button>
                {authRole === 'admin' && (
                  <button onClick={() => exportToCSV(agreements, 'USR_Agreements')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow flex items-center space-x-1.5">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                      <th className="p-3">Agreement ID & Date</th>
                      <th className="p-3">Distributor Name & Constitution</th>
                      <th className="p-3">Contact Person & Phone</th>
                      <th className="p-3">GSTN No</th>
                      <th className="p-3">Investment (₹)</th>
                      <th className="p-3">Submitted By Staff</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {visibleAgreements.map(agr => (
                      <tr key={agr.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-indigo-600">{agr.id} <span className="text-[10px] text-slate-400 block font-normal">{agr.date}</span></td>
                        <td className="p-3 font-bold text-slate-900">{agr.distributorName} <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-semibold block mt-0.5">{agr.constitution}</span></td>
                        <td className="p-3 text-slate-700">{agr.proprietorName} <span className="font-mono text-slate-500 block">+{agr.phone}</span></td>
                        <td className="p-3 font-mono text-slate-600">{agr.gstn || 'N/A'}</td>
                        <td className="p-3 font-bold text-emerald-700">₹{(agr.totalInvestment || 1500000).toLocaleString('en-IN')}</td>
                        <td className="p-3 font-semibold text-slate-600">{agr.submittedBy}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${agr.status === 'Approved & Signed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {agr.status}
                          </span>
                        </td>
                        <td className="p-3 space-x-2">
                          <button onClick={() => setViewAgreementDetail(agr)} className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg font-semibold">
                            View Form
                          </button>
                          {authRole === 'admin' && agr.status === 'Pending Verification' && (
                            <button onClick={() => handleApproveAgreement(agr.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-semibold">
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* OTHER TABS */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm">Business Leads</h3>
              <button onClick={() => setIsLeadModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow">+ Add Lead</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Client Type</th>
                    <th className="p-3">Place</th>
                    <th className="p-3">Investment</th>
                    <th className="p-3">Assigned Staff</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleLeads.map(lead => (
                    <tr key={lead.id}>
                      <td className="p-3 font-bold">{lead.clientName}</td>
                      <td className="p-3">{lead.clientType}</td>
                      <td className="p-3">{lead.place}</td>
                      <td className="p-3 font-bold text-emerald-700">₹{(lead.investmentAmount || 0).toLocaleString('en-IN')}</td>
                      <td className="p-3">{lead.assignedToName}</td>
                      <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">{lead.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'dcr' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm">Daily Call Reports (DCR)</h3>
              <button onClick={() => setIsDcrModalOpen(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow">+ Submit DCR</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Staff</th>
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Place</th>
                    <th className="p-3">Investment</th>
                    <th className="p-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleDcrs.map(dcr => (
                    <tr key={dcr.id}>
                      <td className="p-3 font-bold">{dcr.empName}</td>
                      <td className="p-3">{dcr.clientName}</td>
                      <td className="p-3">{dcr.place || dcr.address}</td>
                      <td className="p-3 font-bold text-emerald-700">₹{(dcr.investmentAmount || 0).toLocaleString('en-IN')}</td>
                      <td className="p-3">{dcr.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Daily Field Attendance & Punch-In</h3>
              </div>
              {authRole !== 'admin' && (
                <button onClick={markTodayAttendance} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow">
                  Punch In Today
                </button>
              )}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Employee Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Check-In Time</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleAttendance.map(att => (
                    <tr key={att.id}>
                      <td className="p-3 font-bold">{att.empName}</td>
                      <td className="p-3">{att.date}</td>
                      <td className="p-3 text-emerald-700 font-bold">{att.checkInTime}</td>
                      <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">{att.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leaves' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Leave Management</h3>
              </div>
              {authRole !== 'admin' && (
                <button onClick={() => setIsLeaveModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">
                  + Apply Leave
                </button>
              )}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Employee</th>
                    <th className="p-3">From - To</th>
                    <th className="p-3">Reason</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleLeaves.map(lev => (
                    <tr key={lev.id}>
                      <td className="p-3 font-bold">{lev.empName}</td>
                      <td className="p-3">{lev.fromDate} to {lev.toDate}</td>
                      <td className="p-3">{lev.reason}</td>
                      <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">{lev.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gps' && (
          <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">GPS & Camera Photo Audits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleDcrs.filter(d => d.photoVerified).map(dcr => (
                <div key={dcr.id} className="border p-4 rounded-xl flex items-center space-x-3 bg-slate-50">
                  <img src={dcr.photoUrl} alt="proof" className="w-20 h-20 object-cover rounded-lg border" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900">{dcr.clientName}</p>
                    <p className="text-slate-500">{dcr.notes}</p>
                    <p className="text-[10px] font-mono text-indigo-600">{dcr.place || dcr.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN CONTROL CENTER */}
        {activeTab === 'admin-manage' && authRole === 'admin' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
              <h3 className="font-bold text-amber-900 text-sm flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-amber-700" /> Admin Master Control Center (HQ)</h3>
              <p className="text-xs text-amber-800">Create employee IDs with vertical assignments, edit passwords, and view all employee-submitted partnership agreements.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase">Employee Management & Vertical Allocation</h4>
              <button onClick={() => setIsAddEmpModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow">
                + Create New Employee ID & Assign Vertical
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-3">
              <div className="p-5 border-b border-slate-100 font-bold text-xs">Registered Employees & Assigned Verticals</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                      <th className="p-3">Employee Name & ID</th>
                      <th className="p-3">Primary Vertical</th>
                      <th className="p-3">WhatsApp Phone</th>
                      <th className="p-3">Current Password</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {employees.map(emp => (
                      <tr key={emp.id}>
                        <td className="p-3 font-bold">{emp.name} [{emp.id}]</td>
                        <td className="p-3"><span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded">{emp.primaryVertical || 'USR POWER LUBE'}</span></td>
                        <td className="p-3 font-mono">+91 {emp.phone}</td>
                        <td className="p-3 font-mono text-amber-700 font-bold">{emp.pass}</td>
                        <td className="p-3">
                          <button onClick={() => { setEditingEmpModal(emp); setNewPasswordInput(emp.pass); }} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Edit & Send WhatsApp</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL: COMPLETE OFFICIAL PARTNERSHIP AGREEMENT FORM */}
      {isAgreementModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-4xl shadow-2xl space-y-6 my-8 border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b pb-4 flex-shrink-0">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">USR POWER INDUSTRIES PRIVATE LIMITED</h3>
                <p className="text-xs text-indigo-700 font-bold uppercase tracking-wider mt-0.5">OFFICIAL DISTRIBUTOR / DEALER PARTNERSHIP AGREEMENT FORM</p>
              </div>
              <button onClick={() => setIsAgreementModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition"><X className="w-5 h-5 text-slate-500" /></button>
            </div>

            <form onSubmit={handleAgreementSubmit} className="space-y-6 text-xs overflow-y-auto pr-2 flex-1">
              
              {/* SECTION I: BASIC INFORMATION & GST AUTO-FETCH */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-2 text-indigo-900 flex items-center justify-between">
                  <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></span> I. Basic Information & GST Auto-Fetch</span>
                  {gstFetching && <span className="text-indigo-600 animate-pulse font-bold text-[11px]">Fetching GSTN Details...</span>}
                  {gstFetchedStatus && <span className="text-emerald-600 font-bold text-[11px]">✓ GST Details Auto-Filled!</span>}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">GSTN No * (Enter to Auto-Fetch)</label>
                    <input 
                      required 
                      type="text" 
                      value={newAgreement.gstn} 
                      onChange={e => setNewAgreement({...newAgreement, gstn: e.target.value})} 
                      onBlur={handleGstnBlur}
                      placeholder="e.g. 27AAAAA0000A1Z5" 
                      className="w-full p-3 border border-indigo-300 rounded-xl bg-white shadow-sm font-mono uppercase text-indigo-900 font-bold" 
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Name of Distributor *</label>
                    <input required type="text" value={newAgreement.distributorName} onChange={e => setNewAgreement({...newAgreement, distributorName: e.target.value})} placeholder="e.g. Sahyadri Auto" className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm" />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Constitution *</label>
                    <select value={newAgreement.constitution} onChange={e => setNewAgreement({...newAgreement, constitution: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm font-medium">
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Private Limited Co">Private Limited Co</option>
                      <option value="Public Limited Co">Public Limited Co</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Proprietor / Partner Name *</label>
                    <input required type="text" value={newAgreement.proprietorName} onChange={e => setNewAgreement({...newAgreement, proprietorName: e.target.value})} placeholder="Suresh Patil" className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm" />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Mobile No *</label>
                    <input required type="text" value={newAgreement.phone} onChange={e => setNewAgreement({...newAgreement, phone: e.target.value})} placeholder="9820012345" className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm font-mono" />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Qualification</label>
                    <input type="text" value={newAgreement.qualification} onChange={e => setNewAgreement({...newAgreement, qualification: e.target.value})} placeholder="Graduate / MBA" className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Permanent & Showroom Address *</label>
                    <textarea required rows="2" value={newAgreement.proprietorAddress} onChange={e => setNewAgreement({...newAgreement, proprietorAddress: e.target.value})} placeholder="Full address with town and PIN code..." className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm"></textarea>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Details of Immovable Properties (Owned)</label>
                    <textarea rows="2" value={newAgreement.immovableProperties} onChange={e => setNewAgreement({...newAgreement, immovableProperties: e.target.value})} placeholder="Details of godown/office properties..." className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm"></textarea>
                  </div>
                </div>
              </div>

              {/* SECTION VII, VIII, IX: INFRASTRUCTURE, GOODS, TERRITORY (UPDATED LABEL) */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-2 text-indigo-900 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></span> VII - IX. Infrastructure, Goods & Territory
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Transport Company Name *</label>
                    <input required type="text" value={newAgreement.transportCompany} onChange={e => setNewAgreement({...newAgreement, transportCompany: e.target.value})} placeholder="VRL Logistics / Bank Approved" className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm" />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nearest Railway Station / Agency *</label>
                    <input required type="text" value={newAgreement.railwayStation} onChange={e => setNewAgreement({...newAgreement, railwayStation: e.target.value})} placeholder="e.g. Vashi Railway Station" className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Interested for Product Line *</label>
                    <select value={newAgreement.verticalInterested} onChange={e => setNewAgreement({...newAgreement, verticalInterested: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm font-medium">
                      {BUSINESS_VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Territory (State / Region / Districts) *</label>
                    <input required type="text" value={newAgreement.territory} onChange={e => setNewAgreement({...newAgreement, territory: e.target.value})} placeholder="e.g. Pune & PCMC Cluster" className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm" />
                  </div>
                </div>
              </div>

              {/* SECTION X: INVESTMENT BREAKDOWN (AUTO-CALCULATED) */}
              <div className="space-y-4 bg-indigo-50/70 p-5 rounded-2xl border border-indigo-200">
                <h4 className="font-bold text-indigo-900 text-xs border-b border-indigo-200 pb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></span> X. Initial Investment Plan (Auto-Calculated)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Automotive Oil (₹)</label>
                    <input type="number" value={newAgreement.investmentAutomotive} onChange={e => setNewAgreement({...newAgreement, investmentAutomotive: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm font-bold text-slate-900" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">4-Stroke Oil (₹)</label>
                    <input type="number" value={newAgreement.investmentFourStroke} onChange={e => setNewAgreement({...newAgreement, investmentFourStroke: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm font-bold text-slate-900" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Passenger Car (₹)</label>
                    <input type="number" value={newAgreement.investmentPassenger} onChange={e => setNewAgreement({...newAgreement, investmentPassenger: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm font-bold text-slate-900" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Heavy Duty (₹)</label>
                    <input type="number" value={newAgreement.investmentHeavyDuty} onChange={e => setNewAgreement({...newAgreement, investmentHeavyDuty: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm font-bold text-slate-900" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">LCV-HCV Oils (₹)</label>
                    <input type="number" value={newAgreement.investmentLcvHcv} onChange={e => setNewAgreement({...newAgreement, investmentLcvHcv: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl bg-white shadow-sm font-bold text-slate-900" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-indigo-200 gap-2">
                  <span className="font-bold text-indigo-950 text-sm">Total Initial Minimum Investment for Stock:</span>
                  <div className="bg-white px-5 py-2.5 rounded-xl border border-indigo-300 shadow-inner text-emerald-700 font-extrabold text-base font-mono">
                    ₹ {calculatedTotalInvestment.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* DECLARATION */}
              <div className="text-[11px] text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p><strong>XIII. Declaration:</strong> I/we state that all information as mentioned in this Application Form is true & correct. I/we bind ourselves into a legal contract with the company as per the Indian Contract Act, 1872.</p>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsAgreementModalOpen(false)} className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Submit Official Agreement Form</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW & PRINT CLEAN AGREEMENT FORM */}
      {viewAgreementDetail && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl space-y-6 my-8 overflow-hidden">
            
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center no-print">
              <h3 className="font-bold text-xs uppercase tracking-widest">Official Agreement Preview & Print</h3>
              <div className="space-x-2">
                <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 inline-flex">
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Agreement Form</span>
                </button>
                <button onClick={() => setViewAgreementDetail(null)} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">Close</button>
              </div>
            </div>

            <div id="printable-agreement" className="p-8 space-y-6 text-slate-900 bg-white">
              <div className="text-center space-y-1 border-b-2 border-slate-900 pb-4">
                <h2 className="text-lg font-extrabold tracking-wide">USR POWER INDUSTRIES PRIVATE LIMITED</h2>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">OFFICIAL DISTRIBUTOR / DEALER PARTNERSHIP AGREEMENT FORM</p>
                <p className="text-[10px] text-slate-500">Agreement ID: <strong className="text-indigo-600 font-mono">{viewAgreementDetail.id}</strong> | Date: {viewAgreementDetail.date}</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="border border-slate-300 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold border-b pb-1 text-slate-900 uppercase text-[11px]">I. Basic Information</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p><strong>Distributor Name:</strong> {viewAgreementDetail.distributorName}</p>
                    <p><strong>Constitution:</strong> {viewAgreementDetail.constitution}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <p><strong>Proprietor/Partner:</strong> {viewAgreementDetail.proprietorName}</p>
                    <p><strong>Phone No:</strong> +91 {viewAgreementDetail.phone}</p>
                  </div>
                  <p><strong>Permanent Address:</strong> {viewAgreementDetail.address}</p>
                  <p><strong>Immovable Properties:</strong> {viewAgreementDetail.immovableProperties || 'N/A'}</p>
                </div>

                <div className="border border-slate-300 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold border-b pb-1 text-slate-900 uppercase text-[11px]">Infrastructure, Territory & Investment</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p><strong>GSTN No:</strong> {viewAgreementDetail.gstn}</p>
                    <p><strong>Transport Company:</strong> {viewAgreementDetail.transportCompany}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <p><strong>Nearest Railway Station:</strong> {viewAgreementDetail.railwayStation}</p>
                    <p><strong>Interested for Product Line:</strong> {viewAgreementDetail.verticalInterested}</p>
                  </div>
                  <p><strong>Allotted Territory:</strong> {viewAgreementDetail.territory}</p>
                  <div className="bg-slate-100 p-3 rounded-lg font-bold text-emerald-800 mt-2">
                    Total Initial Minimum Investment: ₹{(viewAgreementDetail.totalInvestment || 1500000).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="border border-slate-300 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold border-b pb-1 text-slate-900 uppercase text-[11px]">Declaration & Signatures</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed">
                    I/we, the undersigned, have gone through the terms & conditions for my/our appointment as distributor of the company. I/we fully understand the implications and bind ourselves into a legal contract as per the Indian Contract Act, 1872.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="border-t border-slate-400 pt-1 text-center">
                      <p className="font-bold">{viewAgreementDetail.proprietorName}</p>
                      <p className="text-[10px] text-slate-500">Distributor Signature with Date</p>
                    </div>
                    <div className="border-t border-slate-400 pt-1 text-center">
                      <p className="font-bold">For USR POWER INDUSTRIES</p>
                      <p className="text-[10px] text-slate-500">Authorized Manager Signature</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* EDIT PASSWORD MODAL */}
      {editingEmpModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" /> Reset Password & Send WhatsApp
              </h3>
              <button onClick={() => setEditingEmpModal(null)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveEmployeeCredentials} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">New Password / PIN</label>
                <input required type="text" value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} className="w-full p-2.5 border rounded-xl font-mono" autoFocus />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setEditingEmpModal(null)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Update & Open WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EMPLOYEE WITH VERTICAL ALLOCATION */}
      {isAddEmpModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Create Employee ID & Assign Vertical</h3>
              <button onClick={() => setIsAddEmpModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Employee Name</label>
                <input required type="text" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} placeholder="Santosh Shinde" className="w-full p-2 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Employee ID</label>
                  <input required type="text" value={newEmp.id} onChange={e => setNewEmp({...newEmp, id: e.target.value})} placeholder="USR-EMP-105" className="w-full p-2 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Password</label>
                  <input required type="text" value={newEmp.pass} onChange={e => setNewEmp({...newEmp, pass: e.target.value})} placeholder="1234" className="w-full p-2 border rounded-xl font-mono" />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Primary Vertical Assignment</label>
                <select value={newEmp.primaryVertical} onChange={e => setNewEmp({...newEmp, primaryVertical: e.target.value})} className="w-full p-2 border rounded-xl bg-white font-medium">
                  {BUSINESS_VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">WhatsApp Phone</label>
                <input required type="text" value={newEmp.phone} onChange={e => setNewEmp({...newEmp, phone: e.target.value})} placeholder="98200XXXXX" className="w-full p-2 border rounded-xl font-mono" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsAddEmpModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD LEAD */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add New Business Lead</h3>
              <button onClick={() => setIsLeadModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddLead} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Client Name</label>
                <input required type="text" value={newLead.clientName} onChange={e => setNewLead({...newLead, clientName: e.target.value})} placeholder="Sahyadri Auto Spares" className="w-full p-2 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Client Type</label>
                  <select value={newLead.clientType} onChange={e => setNewLead({...newLead, clientType: e.target.value})} className="w-full p-2 border rounded-xl bg-white">
                    {CLIENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Place / City</label>
                  <input required type="text" value={newLead.place} onChange={e => setNewLead({...newLead, place: e.target.value})} placeholder="Navi Mumbai" className="w-full p-2 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Investment Amount (₹)</label>
                <input required type="number" value={newLead.investmentAmount} onChange={e => setNewLead({...newLead, investmentAmount: e.target.value})} placeholder="250000" className="w-full p-2 border rounded-xl" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsLeadModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT DCR */}
      {isDcrModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Submit DCR (Field Report)</h3>
              <button onClick={() => setIsDcrModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddDcr} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Client Name</label>
                <input required type="text" value={newDcr.clientName} onChange={e => setNewDcr({...newDcr, clientName: e.target.value})} placeholder="Client Name" className="w-full p-2 border rounded-xl" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Notes / Outcome</label>
                <textarea rows="2" value={newDcr.notes} onChange={e => setNewDcr({...newDcr, notes: e.target.value})} placeholder="Meeting notes..." className="w-full p-2 border rounded-xl"></textarea>
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
                <button type="button" onClick={() => setIsDcrModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">Submit DCR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-agreement, #printable-agreement * {
            visibility: visible;
          }
          #printable-agreement {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
