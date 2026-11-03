import React, { useState, useRef, useEffect } from 'react';
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

const INITIAL_EMPLOYEES = [
  { id: 'USR-EMP-101', pass: '1011', name: 'Rohan Sharma', designation: 'Senior Sales Executive', phone: '9820012345', joiningDate: '2025-04-10', totalLeaves: 18, usedLeaves: 4, territory: 'Mumbai Metropolitan Region', target: 800000, achieved: 640000, primaryVertical: 'USR POWER LUBE', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-102', pass: '1022', name: 'Amit Kumar', designation: 'Area Sales Manager', phone: '9821123456', joiningDate: '2025-06-15', totalLeaves: 18, usedLeaves: 2, territory: 'Pune & PCMC Cluster', target: 650000, achieved: 580000, primaryVertical: 'TURBO OIL', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-103', pass: '1033', name: 'Priya Singh', designation: 'Legal & Tax Consultant', phone: '9822234567', joiningDate: '2025-09-01', totalLeaves: 18, usedLeaves: 5, territory: 'Thane & Kalyan Belt', target: 900000, achieved: 870000, primaryVertical: 'TAX AND LEGAL', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-104', pass: '1044', name: 'Vikram Verma', designation: 'Digital Marketing Lead', phone: '9823345678', joiningDate: '2026-01-10', totalLeaves: 18, usedLeaves: 1, territory: 'Nagpur Industrial Region', target: 500000, achieved: 320000, primaryVertical: 'DIGITAL MARKETING', failedAttempts: 0, isBlocked: false }
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
  { id: 'LD-101', clientName: 'Sahyadri Auto Spares & Lubricants', clientType: 'Distributor', contactPerson: 'Suresh Patil', phone: '9820012345', place: 'Vashi Turbhe Road, Navi Mumbai', status: 'Hot', stage: 'Negotiation', estimatedValue: 180000, investmentAmount: 250000, assignedToId: 'USR-EMP-102', assignedToName: 'Amit Kumar', vertical: 'USR POWER LUBE', lastFollowup: '2026-11-01', nextFollowup: '2026-11-05', remark: 'High interest in bulk lubricant dealership.' }
];

const INITIAL_DCR = [
  { id: 'DCR-501', empId: 'USR-EMP-102', empName: 'Amit Kumar', vertical: 'TURBO OIL', clientName: 'Pune Logistics & Fleet Services', clientType: 'Corporate / Direct', place: 'Hinjewadi', phone: '9821123456', visitTime: '10:30 AM', callType: 'Field Visit', outcome: 'Order Confirmed', notes: 'Finalized annual supply contract.', investmentAmount: 300000, nextDate: '2026-11-10', lat: '18.5204 N', lng: '73.8567 E', address: 'Hinjewadi Phase 1, Pune', photoVerified: true, photoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80', remark: 'Client agreed to advance payment terms.' }
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
  const [authRole, setAuthRole] = useState(null); 
  const [loggedEmpId, setLoggedEmpId] = useState('');
  
  const [loginType, setLoginType] = useState('employee');
  const [loginIdInput, setLoginIdInput] = useState('');
  const [loginPassInput, setLoginPassInput] = useState('');
  
  const [captchaCode, setCaptchaCode] = useState('4829');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');

  const [employees, setEmployees] = useState(() => loadSavedData('usr_employees', INITIAL_EMPLOYEES));
  const [attendanceList, setAttendanceList] = useState(() => loadSavedData('usr_attendance', INITIAL_ATTENDANCE));
  const [leaveList, setLeaveList] = useState(() => loadSavedData('usr_leaves', INITIAL_LEAVES));
  const [dailyTravelList, setDailyTravelList] = useState(() => loadSavedData('usr_daily_travel', INITIAL_DAILY_TRAVEL));
  const [travelClaims, setTravelClaims] = useState(() => loadSavedData('usr_travel_claims', INITIAL_TRAVEL_CLAIMS));
  const [leads, setLeads] = useState(() => loadSavedData('usr_leads', INITIAL_LEADS));
  const [dcrs, setDcrs] = useState(() => loadSavedData('usr_dcrs', INITIAL_DCR));
  const [agreements, setAgreements] = useState(() => loadSavedData('usr_agreements', INITIAL_AGREEMENTS));

  useEffect(() => { localStorage.setItem('usr_employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('usr_attendance', JSON.stringify(attendanceList)); }, [attendanceList]);
  useEffect(() => { localStorage.setItem('usr_leaves', JSON.stringify(leaveList)); }, [leaveList]);
  useEffect(() => { localStorage.setItem('usr_daily_travel', JSON.stringify(dailyTravelList)); }, [dailyTravelList]);
  useEffect(() => { localStorage.setItem('usr_travel_claims', JSON.stringify(travelClaims)); }, [travelClaims]);
  useEffect(() => { localStorage.setItem('usr_leads', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('usr_dcrs', JSON.stringify(dcrs)); }, [dcrs]);
  useEffect(() => { localStorage.setItem('usr_agreements', JSON.stringify(agreements)); }, [agreements]);

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDcrModalOpen, setIsDcrModalOpen] = useState(false);
  const [isDailyTravelModalOpen, setIsDailyTravelModalOpen] = useState(false);
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [viewAgreementDetail, setViewAgreementDetail] = useState(null);

  const [editingEmpModal, setEditingEmpModal] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  // Detailed Agreement Form State matching PDF
  const [newAgreement, setNewAgreement] = useState({
    distributorName: '',
    constitution: 'Proprietorship',
    proprietorName: '',
    proprietorAddress: '',
    phone: '',
    immovableProperties: '',
    sisterConcernName: '',
    sisterAddress: '',
    sisterBusiness: '',
    sisterTurnover: '',
    adminStaffCount: '2',
    salesStaffCount: '4',
    techStaffCount: '1',
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

  const calculatedTotalInvestment = 
    (Number(newAgreement.investmentAutomotive) || 0) +
    (Number(newAgreement.investmentFourStroke) || 0) +
    (Number(newAgreement.investmentPassenger) || 0) +
    (Number(newAgreement.investmentHeavyDuty) || 0) +
    (Number(newAgreement.investmentLcvHcv) || 0);

  const [newLead, setNewLead] = useState({
    clientName: '', clientType: 'Dealer', contactPerson: '', phone: '', place: '',
    status: 'Hot', stage: 'Contacted', investmentAmount: '', assignedToId: 'USR-EMP-101', vertical: 'USR POWER LUBE', nextFollowup: '', remark: ''
  });

  const [newDcr, setNewDcr] = useState({
    empId: 'USR-EMP-101', clientName: '', clientType: 'Dealer', place: '', phone: '', vertical: 'USR POWER LUBE', callType: 'Field Visit',
    outcome: 'Follow Up Required', notes: '', investmentAmount: '', nextDate: '',
    lat: '19.0760 N', lng: '72.8777 E', address: 'Andheri West, Mumbai',
    photoVerified: false, photoUrl: null, remark: ''
  });

  const [newDailyTravel, setNewDailyTravel] = useState({
    date: new Date().toISOString().split('T')[0],
    mode: 'Bike / Fuel',
    km: '',
    amount: '',
    route: '',
    weekCycle: 'Nov 01 - Nov 07, 2026'
  });

  const [newEmp, setNewEmp] = useState({
    id: '', pass: '', name: '', designation: 'Sales Executive', phone: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 18, territory: 'Mumbai Suburban Division', target: '500000', primaryVertical: 'USR POWER LUBE'
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
    const foundEmp = employees.find(emp => emp.id.trim().toUpperCase() === loginIdInput.trim().toUpperCase());
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
      setEmployees(employees.map(emp => emp.id === foundEmp.id ? { ...emp, failedAttempts: updatedAttempts, isBlocked: isNowBlocked } : emp));
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

  const handleDeleteEmployee = (empId) => {
    if (window.confirm(`Are you sure you want to delete employee ID: ${empId}?`)) {
      setEmployees(employees.filter(e => e.id !== empId));
      alert('Employee deleted successfully.');
    }
  };

  const handleSaveEmployeeCredentials = (e) => {
    e.preventDefault();
    if (!editingEmpModal) return;
    setEmployees(employees.map(emp => emp.id === editingEmpModal.id ? { ...emp, pass: newPasswordInput, isBlocked: false, failedAttempts: 0 } : emp));
    alert(`Password updated & account unblocked for ${editingEmpModal.name}!`);
    setEditingEmpModal(null);
    setNewPasswordInput('');
  };

  const handleAgreementSubmit = (e) => {
    e.preventDefault();
    const createdAgreement = {
      id: `AGR-2026-${Math.floor(Math.random() * 900 + 100)}`,
      ...newAgreement,
      totalInvestment: calculatedTotalInvestment,
      submittedBy: `${currentEmp.name} [${currentEmp.id}]`,
      submittedEmpId: currentEmp.id,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification'
    };
    setAgreements([createdAgreement, ...agreements]);
    setIsAgreementModalOpen(false);
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
    const empIdFormatted = (newEmp.id || `USR-EMP-${Math.floor(Math.random() * 900 + 100)}`).trim().toUpperCase();
    const createdEmp = {
      id: empIdFormatted,
      pass: newEmp.pass.trim() || '1234',
      name: newEmp.name.trim(),
      designation: newEmp.designation || 'Sales Executive',
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
    setEmployees(prev => [...prev, createdEmp]);
    setIsAddEmpModalOpen(false);
    setNewEmp({ id: '', pass: '', name: '', designation: 'Sales Executive', phone: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 18, territory: 'Mumbai Suburban Division', target: '500000', primaryVertical: 'USR POWER LUBE' });
    alert(`Employee (${createdEmp.name} - ID: ${createdEmp.id}) Created Successfully!`);
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
            setNewDcr(prev => ({ ...prev, lat: lat, lng: lng, address: 'Live Location (Lat: ' + lat + ')', photoVerified: true, photoUrl: reader.result }));
            setCapturingGpsPhoto(false);
          };
          reader.readAsDataURL(file);
        },
        () => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setNewDcr(prev => ({ ...prev, lat: '19.0760 N', lng: '72.8777 E', address: 'Mumbai HQ Hub', photoVerified: true, photoUrl: reader.result }));
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
      investmentAmount: Number(newLead.investmentAmount) || 0
    };
    setLeads([createdLead, ...leads]);
    setIsLeadModalOpen(false);
    setNewLead({ clientName: '', clientType: 'Dealer', contactPerson: '', phone: '', place: '', status: 'Hot', stage: 'Contacted', investmentAmount: '', assignedToId: 'USR-EMP-101', vertical: 'USR POWER LUBE', nextFollowup: '', remark: '' });
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
    setNewDcr({ empId: 'USR-EMP-101', clientName: '', clientType: 'Dealer', place: '', phone: '', vertical: 'USR POWER LUBE', callType: 'Field Visit', outcome: 'Follow Up Required', notes: '', investmentAmount: '', nextDate: '', lat: '19.0760 N', lng: '72.8777 E', address: 'Andheri West, Mumbai', photoVerified: false, photoUrl: null, remark: '' });
    alert('DCR Submitted Successfully!');
  };

  const handleAddDailyTravel = (e) => {
    e.preventDefault();
    const createdLog = {
      id: `DTRV-${Date.now()}`,
      empId: currentEmp.id,
      empName: currentEmp.name,
      ...newDailyTravel,
      km: Number(newDailyTravel.km) || 0,
      amount: Number(newDailyTravel.amount) || 0,
      status: 'Pending Submit'
    };
    setDailyTravelList([createdLog, ...dailyTravelList]);
    setIsDailyTravelModalOpen(false);
    setNewDailyTravel({ date: new Date().toISOString().split('T')[0], mode: 'Bike / Fuel', km: '', amount: '', route: '', weekCycle: 'Nov 01 - Nov 07, 2026' });
    alert('Daily Travel Log Saved Successfully!');
  };

  const submitWeeklyTravelClaim = (weekCycleName) => {
    const empDailyLogs = dailyTravelList.filter(d => d.empId === currentEmp.id && d.weekCycle === weekCycleName && d.status === 'Pending Submit');
    if (empDailyLogs.length === 0) {
      alert('No pending daily travel logs found for this week!');
      return;
    }
    const totalKmSum = empDailyLogs.reduce((acc, curr) => acc + curr.km, 0);
    const totalAmtSum = empDailyLogs.reduce((acc, curr) => acc + curr.amount, 0);
    const routesCombined = empDailyLogs.map(l => l.route).join(' | ');
    const newClaim = {
      id: `TRV-${Date.now()}`,
      empId: currentEmp.id,
      empName: currentEmp.name,
      weekRange: weekCycleName,
      totalKm: totalKmSum,
      totalAmount: totalAmtSum,
      purpose: routesCombined,
      status: 'Pending'
    };
    setTravelClaims([newClaim, ...travelClaims]);
    setDailyTravelList(dailyTravelList.map(d => (d.empId === currentEmp.id && d.weekCycle === weekCycleName) ? { ...d, status: 'Submitted Weekly' } : d));
    alert(`Weekly Travelling Claim submitted successfully! Amount: ₹${totalAmtSum}`);
  };

  const visibleLeads = authRole === 'admin' ? leads : leads.filter(l => l.assignedToId === currentEmp.id || l.vertical === currentEmp.primaryVertical);
  const visibleDcrs = authRole === 'admin' ? dcrs : dcrs.filter(d => d.empId === currentEmp.id || d.vertical === currentEmp.primaryVertical);
  const visibleAgreements = authRole === 'admin' ? agreements : agreements.filter(a => a.submittedEmpId === currentEmp.id);
  const visibleAttendance = authRole === 'admin' ? attendanceList : attendanceList.filter(a => a.empId === currentEmp.id);
  const visibleLeaves = authRole === 'admin' ? leaveList : leaveList.filter(l => l.empId === currentEmp.id);
  const visibleDailyTravel = authRole === 'admin' ? dailyTravelList : dailyTravelList.filter(d => d.empId === currentEmp.id);
  const visibleTravelClaims = authRole === 'admin' ? travelClaims : travelClaims.filter(t => t.empId === currentEmp.id);

  const totalSalesTarget = authRole === 'admin' ? employees.reduce((acc, curr) => acc + curr.target, 0) : currentEmp.target;
  const totalSalesAchieved = authRole === 'admin' ? employees.reduce((acc, curr) => acc + curr.achieved, 0) : currentEmp.achieved;
  const totalLeadsValue = visibleLeads.reduce((acc, curr) => acc + (curr.investmentAmount || curr.estimatedValue), 0);

  if (!authRole) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-extrabold text-base tracking-wide">USR POWER INDUSTRIES</h1>
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">OFFICIAL SALES PORTAL • MAHARASHTRA</p>
          </div>

          <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
            <button onClick={() => { setLoginType('employee'); setLoginError(''); refreshCaptcha(); }} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${loginType === 'employee' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>
              <User className="w-4 h-4" />
              <span>Employee Portal</span>
            </button>
            <button onClick={() => { setLoginType('admin'); setLoginError(''); refreshCaptcha(); }} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${loginType === 'admin' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>
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
                    <div className="bg-slate-900 text-amber-400 font-mono font-extrabold tracking-widest px-4 py-3 rounded-xl select-none text-base shadow-inner border border-slate-700 flex-1 text-center">{captchaCode}</div>
                    <button type="button" onClick={refreshCaptcha} className="p-3 bg-slate-100 hover:bg-slate-200 border rounded-xl text-slate-600 transition"><RefreshCw className="w-4 h-4" /></button>
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
                    <div className="bg-slate-900 text-amber-400 font-mono font-extrabold tracking-widest px-4 py-3 rounded-xl select-none text-base shadow-inner border border-slate-700 flex-1 text-center">{captchaCode}</div>
                    <button type="button" onClick={refreshCaptcha} className="p-3 bg-slate-100 hover:bg-slate-200 border rounded-xl text-slate-600 transition"><RefreshCw className="w-4 h-4" /></button>
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col justify-between shadow-xl no-print">
        <div>
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl text-white shadow-lg"><Briefcase className="w-6 h-6" /></div>
              <div>
                <h1 className="font-extrabold text-sm tracking-wide text-white leading-tight">USR POWER INDUSTRIES</h1>
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">OFFICIAL SALES PORTAL • MAHARASHTRA</p>
              </div>
            </div>
            <div className="mt-2 bg-slate-800/80 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-300 flex items-center justify-between border border-slate-700/50">
              <div className="overflow-hidden">
                <span className="text-slate-400 block truncate">{authRole === 'admin' ? '👑 Admin Master Mode' : `👤 ${currentEmp.name}`}</span>
                {authRole !== 'admin' && (<span className="text-[10px] text-indigo-300 block font-semibold">{currentEmp.designation} • Joined: {currentEmp.joiningDate}</span>)}
              </div>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${authRole === 'admin' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: TrendingUp },
              { id: 'agreements', label: 'Partnership Agreements (PDF)', icon: FileText, badge: visibleAgreements.length },
              { id: 'attendance', label: 'Attendance & Punch-In', icon: CheckSquare, badge: visibleAttendance.length },
              { id: 'leaves', label: 'Leave Management', icon: CalendarDays, badge: visibleLeaves.length },
              { id: 'travel', label: 'Travelling Claims', icon: Bus, badge: visibleTravelClaims.length },
              { id: 'leads', label: 'Lead Management', icon: Users, badge: visibleLeads.length },
              { id: 'dcr', label: 'Daily Call Reports (DCR)', icon: FileText, badge: visibleDcrs.length },
              { id: 'gps', label: 'GPS Photo Verification', icon: Camera }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
                  <div className="flex items-center space-x-3"><Icon className="w-5 h-5" /><span className="text-xs">{item.label}</span></div>
                  {item.badge !== undefined && (<span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white text-indigo-800' : 'bg-slate-800 text-slate-300'}`}>{item.badge}</span>)}
                </button>
              );
            })}

            {authRole === 'admin' && (
              <button onClick={() => setActiveTab('admin-manage')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-xs mt-3 transition-all ${activeTab === 'admin-manage' ? 'bg-amber-600 text-white' : 'bg-amber-950/40 text-amber-300 border border-amber-800/50 hover:bg-amber-900/50'}`}>
                <ShieldCheck className="w-5 h-5" />
                <span>Admin Control Center</span>
              </button>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button onClick={handleLogout} className="w-full bg-slate-800 hover:bg-slate-700 text-red-400 p-2.5 rounded-xl flex items-center justify-center text-xs border border-slate-700/60 transition font-semibold">
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout Securely</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab === 'admin-manage' ? 'Admin Master Control Panel' : activeTab.replace('-', ' ')}</h2>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">{authRole === 'admin' ? 'ADMIN VIEW' : `${currentEmp.name} (${currentEmp.designation})`}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">USR POWER INDUSTRIES PRIVATE LIMITED • MAHARASHTRA OPERATIONS</p>
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
                  <p className="text-xs font-medium text-slate-500">Sales Achievement</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">₹{(totalSalesAchieved).toLocaleString('en-IN')}</h3>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> {Math.round((totalSalesAchieved/totalSalesTarget)*100)}% of Target (₹{(totalSalesTarget).toLocaleString('en-IN')})</span>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Leads Pipeline</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{visibleLeads.length} Leads</h3>
                  <span className="text-[11px] text-indigo-600 font-medium mt-1 block">Value: ₹{(totalLeadsValue).toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Users className="w-6 h-6" /></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Field DCR Reports</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{visibleDcrs.length} Visits</h3>
                  <span className="text-[11px] text-amber-600 font-medium mt-1 block">GPS Verified Audits</span>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><MapPin className="w-6 h-6" /></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Partnership Agreements</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{visibleAgreements.length} Forms</h3>
                  <button onClick={() => setActiveTab('agreements')} className="text-[11px] text-indigo-600 font-bold hover:underline mt-1 block">View Agreements &rarr;</button>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText className="w-6 h-6" /></div>
              </div>
            </div>

            {authRole === 'employee' && (
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-800 pb-4 gap-2">
                  <div>
                    <span className="bg-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">{currentEmp.designation}</span>
                    <h3 className="text-xl font-extrabold mt-1 text-white">{currentEmp.name} ({currentEmp.id})</h3>
                    <p className="text-xs text-indigo-300">Territory: {currentEmp.territory} • Joined: {currentEmp.joiningDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={markTodayAttendance} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow flex items-center space-x-1.5 transition">
                      <CheckSquare className="w-4 h-4" />
                      <span>Mark Today's Attendance</span>
                    </button>
                    <button onClick={() => setIsLeaveModalOpen(true)} className="bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-700/50 px-4 py-2.5 rounded-xl text-xs font-bold shadow">+ Apply Leave</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'agreements' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Official Partnership Agreement Forms</h3>
                <p className="text-xs text-slate-500 mt-1">Review, print or export distributor agreements.</p>
              </div>
              <button onClick={() => setIsAgreementModalOpen(true)} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">+ Fill New Agreement</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Agreement ID</th>
                    <th className="p-3">Distributor Name</th>
                    <th className="p-3">Proprietor</th>
                    <th className="p-3">Territory</th>
                    <th className="p-3">Total Investment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleAgreements.map(agr => (
                    <tr key={agr.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-indigo-600">{agr.id}</td>
                      <td className="p-3 font-bold">{agr.distributorName}</td>
                      <td className="p-3">{agr.proprietorName} (+91 {agr.phone})</td>
                      <td className="p-3">{agr.territory}</td>
                      <td className="p-3 font-bold text-emerald-700">₹{(agr.totalInvestment).toLocaleString('en-IN')}</td>
                      <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">{agr.status}</span></td>
                      <td className="p-3 flex items-center space-x-2">
                        <button onClick={() => setViewAgreementDetail(agr)} className="bg-slate-800 text-white px-3 py-1.5 rounded font-semibold flex items-center space-x-1"><Eye className="w-3.5 h-3.5" /><span>View PDF</span></button>
                        {authRole === 'admin' && agr.status !== 'Approved & Signed' && (<button onClick={() => handleApproveAgreement(agr.id)} className="bg-emerald-600 text-white px-3 py-1.5 rounded font-semibold">Approve</button>)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'admin-manage' && authRole === 'admin' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
              <h3 className="font-bold text-amber-900 text-sm flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-amber-700" /> Admin Master Control Center</h3>
              <p className="text-xs text-amber-800">Manage employee accounts, delete obsolete accounts, reset passwords, and approve agreements.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-800">Employee Master Accounts & Security Status</h3>
              <button onClick={() => setIsAddEmpModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow">+ Create Employee ID & Designation</button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Employee ID</th>
                    <th className="p-3">Name & Designation</th>
                    <th className="p-3">Password</th>
                    <th className="p-3">Joining Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {employees.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-indigo-600">{emp.id}</td>
                      <td className="p-3 font-bold">{emp.name} <span className="text-[10px] text-slate-500 block font-normal">{emp.designation}</span></td>
                      <td className="p-3 font-mono font-bold text-slate-700">{emp.pass}</td>
                      <td className="p-3 font-mono">{emp.joiningDate}</td>
                      <td className="p-3">{emp.isBlocked ? (<span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-[10px]">BLOCKED</span>) : (<span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Active</span>)}</td>
                      <td className="p-3 flex items-center space-x-2">
                        <button onClick={() => setEditingEmpModal(emp)} className="bg-amber-600 text-white px-3 py-1.5 rounded font-semibold flex items-center space-x-1"><Key className="w-3 h-3" /><span>Reset</span></button>
                        <button onClick={() => handleDeleteEmployee(emp.id)} className="bg-red-600 text-white px-3 py-1.5 rounded font-semibold flex items-center space-x-1"><Trash2 className="w-3 h-3" /><span>Delete</span></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leaves' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Leave Management</h3>
                <p className="text-xs text-slate-500 mt-1">Apply or track leave status.</p>
              </div>
              <button onClick={() => setIsLeaveModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">+ Apply Leave</button>
            </div>
            <div className="bg-white rounded-2xl border overflow-hidden">
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
                  {visibleLeaves.map(l => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{l.empName}</td>
                      <td className="p-3 font-mono">{l.fromDate} to {l.toDate}</td>
                      <td className="p-3">{l.reason}</td>
                      <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">{l.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Attendance Logs</h3>
                <p className="text-xs text-slate-500 mt-1">Daily check-in records.</p>
              </div>
              <button onClick={markTodayAttendance} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">Mark Today's Attendance</button>
            </div>
            <div className="bg-white rounded-2xl border overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Employee Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Check-In Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleAttendance.map(att => (
                    <tr key={att.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{att.empName}</td>
                      <td className="p-3 font-mono">{att.date}</td>
                      <td className="p-3 font-mono text-emerald-700 font-bold">{att.checkInTime}</td>
                      <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">{att.status}</span></td>
                      <td className="p-3">{att.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Lead Management Pipeline</h3>
                <p className="text-xs text-slate-500 mt-1">Track dealer and distributor leads.</p>
              </div>
              <button onClick={() => setIsLeadModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">+ Add New Lead</button>
            </div>
            <div className="bg-white rounded-2xl border overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Contact Person & Phone</th>
                    <th className="p-3">Stage</th>
                    <th className="p-3">Investment (₹)</th>
                    <th className="p-3">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{lead.clientName} <span className="text-[10px] text-slate-500 block font-normal">{lead.place}</span></td>
                      <td className="p-3">{lead.contactPerson} (+91 {lead.phone})</td>
                      <td className="p-3"><span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">{lead.stage}</span></td>
                      <td className="p-3 font-bold text-emerald-700">₹{(lead.investmentAmount || lead.estimatedValue).toLocaleString('en-IN')}</td>
                      <td className="p-3">{lead.assignedToName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'dcr' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Daily Call Reports (DCR) & GPS Audits</h3>
                <p className="text-xs text-slate-500 mt-1">Field visit logs with photo geotags.</p>
              </div>
              <button onClick={() => setIsDcrModalOpen(true)} className="bg-amber-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">+ Submit DCR Visit</button>
            </div>
            <div className="bg-white rounded-2xl border overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Employee</th>
                    <th className="p-3">Client Name & Place</th>
                    <th className="p-3">Outcome</th>
                    <th className="p-3">GPS Location</th>
                    <th className="p-3">Audit Photo</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleDcrs.map(dcr => (
                    <tr key={dcr.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{dcr.empName}</td>
                      <td className="p-3 font-bold">{dcr.clientName} <span className="text-[10px] text-slate-500 block font-normal">{dcr.place}</span></td>
                      <td className="p-3"><span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">{dcr.outcome}</span></td>
                      <td className="p-3 font-mono text-[11px]">{dcr.lat}, {dcr.lng}</td>
                      <td className="p-3">{dcr.photoUrl ? (<a href={dcr.photoUrl} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline">View Photo</a>) : 'No Photo'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gps' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center"><Camera className="w-5 h-5 mr-2 text-indigo-600" /> Live GPS Camera Audit & Geotagging</h3>
              <p className="text-xs text-slate-500">Capture direct camera snapshots with embedded latitude/longitude coordinates for verification.</p>
              <button onClick={() => setIsDcrModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">Open GPS Camera DCR Form</button>
            </div>
          </div>
        )}

        {activeTab === 'travel' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Travelling & Fuel Allowance Claims</h3>
                <p className="text-xs text-slate-500 mt-1">Submit and track weekly travel expense logs.</p>
              </div>
              <button onClick={() => setIsDailyTravelModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">+ Add Daily Travel Log</button>
            </div>
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="p-4 border-b font-bold text-xs">Pending Daily Logs Ready for Weekly Claim</div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Date</th>
                    <th className="p-3">Route / Purpose</th>
                    <th className="p-3">Distance (KM)</th>
                    <th className="p-3">Amount (₹)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleDailyTravel.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono">{log.date}</td>
                      <td className="p-3 font-bold">{log.route}</td>
                      <td className="p-3 font-mono">{log.km} KM</td>
                      <td className="p-3 font-mono font-bold text-emerald-700">₹{log.amount}</td>
                      <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">{log.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-slate-50 border-t flex justify-end">
                <button onClick={() => submitWeeklyTravelClaim('Nov 01 - Nov 07, 2026')} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow">Submit Weekly Claim (Nov 01 - Nov 07)</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: COMPLETE AGREEMENT FORM MATCHING PDF */}
      {isAgreementModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Official Distributor/Dealer Partnership Agreement Form</h3>
              <button onClick={() => setIsAgreementModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAgreementSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">1. Distributor / Firm Name *</label>
                  <input required type="text" value={newAgreement.distributorName} onChange={e => setNewAgreement({...newAgreement, distributorName: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="e.g. Sahyadri Auto Spares" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">4. Constitution Type *</label>
                  <select value={newAgreement.constitution} onChange={e => setNewAgreement({...newAgreement, constitution: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white font-medium">
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Private Limited Co">Private Limited Co</option>
                    <option value="Public Limited Co">Public Limited Co</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Proprietor / Director Name *</label>
                  <input required type="text" value={newAgreement.proprietorName} onChange={e => setNewAgreement({...newAgreement, proprietorName: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Phone / Mobile No *</label>
                  <input required type="text" value={newAgreement.phone} onChange={e => setNewAgreement({...newAgreement, phone: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="9820012345" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">21. GSTN Number *</label>
                  <input required type="text" value={newAgreement.gstn} onChange={e => setNewAgreement({...newAgreement, gstn: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono uppercase" placeholder="27AAAAA..." />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">2. Permanent Complete Business Address *</label>
                <input required type="text" value={newAgreement.proprietorAddress} onChange={e => setNewAgreement({...newAgreement, proprietorAddress: e.target.value})} className="w-full p-2.5 border rounded-xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">3. Details of Immovable Properties (Owned)</label>
                  <input type="text" value={newAgreement.immovableProperties} onChange={e => setNewAgreement({...newAgreement, immovableProperties: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Commercial Shop / Godown" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">6. Sister Concern / Allied Concern Details</label>
                  <input type="text" value={newAgreement.sisterConcernName} onChange={e => setNewAgreement({...newAgreement, sisterConcernName: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Name & Annual Turnover (Lakhs)" />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border space-y-2">
                <p className="font-bold text-slate-800">27. Initial Investment Breakdown for Stock (₹)</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] block mb-1">Automotive Engine Oil</label>
                    <input type="number" value={newAgreement.investmentAutomotive} onChange={e => setNewAgreement({...newAgreement, investmentAutomotive: e.target.value})} className="w-full p-2 border rounded-lg bg-white" />
                  </div>
                  <div>
                    <label className="text-[11px] block mb-1">4-Stroke Engine Oils</label>
                    <input type="number" value={newAgreement.investmentFourStroke} onChange={e => setNewAgreement({...newAgreement, investmentFourStroke: e.target.value})} className="w-full p-2 border rounded-lg bg-white" />
                  </div>
                  <div>
                    <label className="text-[11px] block mb-1">Passenger Car Oils</label>
                    <input type="number" value={newAgreement.investmentPassenger} onChange={e => setNewAgreement({...newAgreement, investmentPassenger: e.target.value})} className="w-full p-2 border rounded-lg bg-white" />
                  </div>
                  <div>
                    <label className="text-[11px] block mb-1">Heavy Duty Oils</label>
                    <input type="number" value={newAgreement.investmentHeavyDuty} onChange={e => setNewAgreement({...newAgreement, investmentHeavyDuty: e.target.value})} className="w-full p-2 border rounded-lg bg-white" />
                  </div>
                  <div>
                    <label className="text-[11px] block mb-1">LCV - HCV Oils</label>
                    <input type="number" value={newAgreement.investmentLcvHcv} onChange={e => setNewAgreement({...newAgreement, investmentLcvHcv: e.target.value})} className="w-full p-2 border rounded-lg bg-white" />
                  </div>
                </div>
                <div className="pt-2 border-t flex justify-between items-center text-xs font-bold text-indigo-900">
                  <span>Calculated Total Minimum Investment:</span>
                  <span className="text-sm font-extrabold text-emerald-700">₹{calculatedTotalInvestment.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">26. Allotted Territory (State / Region / Districts) *</label>
                  <input required type="text" value={newAgreement.territory} onChange={e => setNewAgreement({...newAgreement, territory: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="e.g. Navi Mumbai & Thane Region" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">22. Transport Company Name</label>
                  <input type="text" value={newAgreement.transportCompany} onChange={e => setNewAgreement({...newAgreement, transportCompany: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="e.g. VRL Logistics Ltd" />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsAgreementModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow">Submit Agreement Form</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EMPLOYEE */}
      {isAddEmpModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Create Employee ID & Designation</h3>
              <button onClick={() => setIsAddEmpModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Employee Name *</label>
                <input required type="text" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="e.g. Rahul Verma" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Designation *</label>
                  <input required type="text" value={newEmp.designation} onChange={e => setNewEmp({...newEmp, designation: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Area Sales Manager" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Joining Date *</label>
                  <input required type="date" value={newEmp.joiningDate} onChange={e => setNewEmp({...newEmp, joiningDate: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Employee ID *</label>
                  <input required type="text" value={newEmp.id} onChange={e => setNewEmp({...newEmp, id: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono uppercase" placeholder="USR-EMP-105" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Password *</label>
                  <input required type="text" value={newEmp.pass} onChange={e => setNewEmp({...newEmp, pass: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" placeholder="1055" />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Assigned Territory *</label>
                <input required type="text" value={newEmp.territory} onChange={e => setNewEmp({...newEmp, territory: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Pune & PCMC" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsAddEmpModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow">Save Employee ID</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET PASSWORD */}
      {editingEmpModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Reset Password & Unblock: {editingEmpModal.name}</h3>
              <button onClick={() => setEditingEmpModal(null)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveEmployeeCredentials} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">New Password *</label>
                <input required type="text" value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} className="w-full p-2.5 border rounded-xl font-mono" placeholder="Enter new password..." autoFocus />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setEditingEmpModal(null)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW AGREEMENT PDF MODAL */}
      {viewAgreementDetail && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 w-full max-w-3xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto print:p-0 print:shadow-none">
            <div className="flex justify-between items-center border-b pb-4 no-print">
              <h3 className="font-bold text-slate-900 text-base">Official Partnership Agreement ({viewAgreementDetail.id})</h3>
              <div className="flex items-center space-x-2">
                <button onClick={() => window.print()} className="bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1"><Printer className="w-3.5 h-3.5" /><span>Print PDF</span></button>
                <button onClick={() => setViewAgreementDetail(null)} className="p-1 rounded-full hover:bg-slate-100"><X className="w-5 h-5 text-slate-500" /></button>
              </div>
            </div>
            <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
              <div className="text-center space-y-1 border-b pb-4">
                <h1 className="font-extrabold text-base tracking-wide text-slate-900">USR POWER INDUSTRIES PRIVATE LIMITED</h1>
                <p className="text-[10px] uppercase font-semibold text-indigo-700">Authorised Distributor & C&FA Partnership Agreement</p>
                <p className="text-[10px] text-slate-500 font-mono">Agreement Ref: {viewAgreementDetail.id} | Date: {viewAgreementDetail.date}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
                <div>
                  <strong className="text-slate-900 block mb-1">Distributor / Firm Details:</strong>
                  <p className="font-bold text-base text-indigo-900">{viewAgreementDetail.distributorName}</p>
                  <p>Constitution: {viewAgreementDetail.constitution}</p>
                  <p>Proprietor: {viewAgreementDetail.proprietorName} (+91 {viewAgreementDetail.phone})</p>
                  <p>Address: {viewAgreementDetail.proprietorAddress}</p>
                </div>
                <div>
                  <strong className="text-slate-900 block mb-1">Business Credentials:</strong>
                  <p className="font-mono">GSTN: {viewAgreementDetail.gstn}</p>
                  <p>Allotted Territory: {viewAgreementDetail.territory}</p>
                  <p>Transport Partner: {viewAgreementDetail.transportCompany}</p>
                  <p className="font-bold text-emerald-700 mt-1">Total Investment Deposit: ₹{(viewAgreementDetail.totalInvestment).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD LEAD */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add New Sales Lead</h3>
              <button onClick={() => setIsLeadModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddLead} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Client / Firm Name *</label>
                <input required type="text" value={newLead.clientName} onChange={e => setNewLead({...newLead, clientName: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="e.g. Sai Motors" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Contact Person *</label>
                  <input required type="text" value={newLead.contactPerson} onChange={e => setNewLead({...newLead, contactPerson: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Phone Number *</label>
                  <input required type="text" value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Place / City *</label>
                  <input required type="text" value={newLead.place} onChange={e => setNewLead({...newLead, place: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Estimated Investment (₹) *</label>
                  <input required type="number" value={newLead.investmentAmount} onChange={e => setNewLead({...newLead, investmentAmount: e.target.value})} className="w-full p-2.5 border rounded-xl font-bold text-emerald-700" />
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsLeadModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT DCR */}
      {isDcrModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Submit DCR Visit & GPS Audit Photo</h3>
              <button onClick={() => setIsDcrModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddDcr} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Client Name *</label>
                  <input required type="text" value={newDcr.clientName} onChange={e => setNewDcr({...newDcr, clientName: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Place / Area *</label>
                  <input required type="text" value={newDcr.place} onChange={e => setNewDcr({...newDcr, place: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Visit Outcome *</label>
                  <select value={newDcr.outcome} onChange={e => setNewDcr({...newDcr, outcome: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white">
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Follow Up Required">Follow Up Required</option>
                    <option value="Catalog Shared">Catalog Shared</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Order / Potential Value (₹)</label>
                  <input type="number" value={newDcr.investmentAmount} onChange={e => setNewDcr({...newDcr, investmentAmount: e.target.value})} className="w-full p-2.5 border rounded-xl font-bold text-emerald-700" />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Capture Live GPS Photo Audit *</label>
                <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={captureRealGpsPhoto} className="w-full p-2 border rounded-xl bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700" />
                {capturingGpsPhoto && <p className="text-[11px] text-indigo-600 mt-1 font-semibold">Capturing Live GPS Coordinates & Photo...</p>}
                {newDcr.photoVerified && <p className="text-[11px] text-emerald-600 mt-1 font-semibold">✓ GPS Tagged: {newDcr.lat}, {newDcr.lng}</p>}
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsDcrModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-xl font-bold shadow">Submit DCR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: APPLY LEAVE */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Apply Leave Application</h3>
              <button onClick={() => setIsLeaveModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleApplyLeave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">From Date *</label>
                  <input required type="date" value={newLeave.fromDate} onChange={e => setNewLeave({...newLeave, fromDate: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">To Date *</label>
                  <input required type="date" value={newLeave.toDate} onChange={e => setNewLeave({...newLeave, toDate: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Reason for Leave *</label>
                <textarea required rows="3" value={newLeave.reason} onChange={e => setNewLeave({...newLeave, reason: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="Enter reason..." />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsLeaveModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow">Submit Leave</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DAILY TRAVEL */}
      {isDailyTravelModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add Daily Travel & Fuel Log</h3>
              <button onClick={() => setIsDailyTravelModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddDailyTravel} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Date *</label>
                <input required type="date" value={newDailyTravel.date} onChange={e => setNewDailyTravel({...newDailyTravel, date: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Route Covered *</label>
                <input required type="text" value={newDailyTravel.route} onChange={e => setNewDailyTravel({...newDailyTravel, route: e.target.value})} className="w-full p-2.5 border rounded-xl" placeholder="e.g. Andheri to Thane Dealer Visit" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Distance (KM) *</label>
                  <input required type="number" value={newDailyTravel.km} onChange={e => setNewDailyTravel({...newDailyTravel, km: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" placeholder="45" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Claim Amount (₹) *</label>
                  <input required type="number" value={newDailyTravel.amount} onChange={e => setNewDailyTravel({...newDailyTravel, amount: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono font-bold text-emerald-700" placeholder="350" />
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsDailyTravelModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow">Save Travel Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
