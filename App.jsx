import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, MapPin, PhoneCall, TrendingUp, Camera, Calendar, Plus, 
  Search, Filter, CheckCircle, Clock, Award, 
  Navigation, DollarSign, UserPlus, Eye, FileText, Check, X, RefreshCw, Briefcase, Tag,
  Lock, Unlock, Download, ShieldCheck, Trash2, Edit3, LogOut, Key, User, CheckSquare, ArrowRight, CalendarDays, Bus, ShieldAlert, MessageSquare, FileSpreadsheet, Printer
} from 'lucide-react';

const INITIAL_EMPLOYEES = [
  { id: 'USR-EMP-101', pass: '1011', name: 'Rohan Sharma', designation: 'Senior Sales Executive', phone: '9820012345', joiningDate: '2025-04-10', totalLeaves: 30, usedLeaves: 4, territory: 'Mumbai Metropolitan Region', target: 800000, achieved: 640000, primaryVertical: 'USR POWER LUBE', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-102', pass: '1022', name: 'Amit Kumar', designation: 'Area Sales Manager', phone: '9821123456', joiningDate: '2025-06-15', totalLeaves: 30, usedLeaves: 2, territory: 'Pune & PCMC Cluster', target: 650000, achieved: 580000, primaryVertical: 'TURBO OIL', failedAttempts: 0, isBlocked: false }
];

const INITIAL_ATTENDANCE = [
  { id: 'ATT-1', empId: 'USR-EMP-101', empName: 'Rohan Sharma', date: '2026-11-02', checkInTime: '09:15 AM', status: 'Present', location: 'Mumbai HQ Hub' }
];

const INITIAL_LEAVES = [
  { id: 'LEV-1', empId: 'USR-EMP-101', empName: 'Rohan Sharma', leaveType: 'Casual Leave (CL)', fromDate: '2026-11-10', toDate: '2026-11-11', reason: 'Family Function in Mumbai', status: 'Approved' }
];

const INITIAL_DAILY_TRAVEL = [
  { id: 'DTRV-1', empId: 'USR-EMP-101', empName: 'Rohan Sharma', date: '2026-11-01', mode: 'Company Two-Wheeler', km: 45, amount: 350, route: 'Andheri to Thane Dealer Route', purpose: 'Primary dealer network expansion & stock inspection', remarks: 'Visited 4 major retail points successfully.', weekCycle: 'Nov 01 - Nov 07, 2026', status: 'Submitted Weekly' }
];

const INITIAL_TRAVEL_CLAIMS = [
  { id: 'TRV-101', empId: 'USR-EMP-101', empName: 'Rohan Sharma', weekRange: 'Nov 01 - Nov 07, 2026', totalKm: 100, totalAmount: 800, purpose: 'Mumbai & Thane Dealer Route Visits', status: 'Approved' }
];

const INITIAL_LEADS = [
  { 
    id: 'LD-101', 
    clientName: 'Sahyadri Auto Spares & Lubricants', 
    clientType: 'Super Distributor / Super Stockist', 
    contactPerson: 'Suresh Patil', 
    phone: '9820012345', 
    place: 'Vashi Turbhe Road, Navi Mumbai', 
    status: 'Hot', 
    stage: 'Negotiation', 
    estimatedValue: 180000, 
    investmentAmount: 1500000, 
    assignedToId: 'USR-EMP-102', 
    assignedToName: 'Amit Kumar', 
    vertical: 'USR POWER LUBE', 
    nextFollowup: '2026-11-05', 
    remark: 'High interest in bulk synthetic engine oil dealership setup.' 
  }
];

const INITIAL_DCR = [
  { 
    id: 'DCR-501', 
    empId: 'USR-EMP-102', 
    empName: 'Amit Kumar', 
    vertical: 'TURBO OIL', 
    clientName: 'Pune Logistics & Fleet Services', 
    clientType: 'C&FA / Fleet Institutional', 
    place: 'Hinjewadi', 
    phone: '9821123456', 
    visitTime: '10:30 AM', 
    callType: 'Field Visit', 
    outcome: 'Order Confirmed', 
    notes: 'Finalized annual supply contract for heavy-duty commercial fleet.', 
    investmentAmount: 300000, 
    nextDate: '2026-11-10', 
    lat: '18.5204 N', 
    lng: '73.8567 E', 
    address: 'Hinjewadi Phase 1, Pune', 
    photoVerified: true, 
    photoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80', 
    timestampTag: '02/11/2026, 10:30:15 am',
    remark: 'Client agreed to advance payment terms & signed initial paperwork.' 
  }
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
    sisterConcernName: 'Patil Enterprises',
    sisterTurnover: '50 Lakhs',
    adminStaffCount: '2',
    salesStaffCount: '4',
    techStaffCount: '1',
    gstn: '27AAAAA0000A1Z5',
    transportCompany: 'VRL Logistics Ltd, Mumbai',
    railwayStation: 'Vashi Railway Station',
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

const getInitialAuth = (key) => {
  try {
    const authTime = localStorage.getItem('usr_auth_time');
    const role = localStorage.getItem('usr_auth_role');
    if (!role || !authTime) return key === 'role' ? null : '';

    const hoursElapsed = (Date.now() - Number(authTime)) / (1000 * 60 * 60);
    if (hoursElapsed > 12) {
      localStorage.removeItem('usr_auth_role');
      localStorage.removeItem('usr_logged_emp_id');
      localStorage.removeItem('usr_auth_time');
      return key === 'role' ? null : '';
    }
    return key === 'role' ? role : (localStorage.getItem('usr_logged_emp_id') || '');
  } catch (e) {
    return key === 'role' ? null : '';
  }
};

export default function App() {
  const [authRole, setAuthRole] = useState(() => getInitialAuth('role')); 
  const [loggedEmpId, setLoggedEmpId] = useState(() => getInitialAuth('empId'));
  
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

  useEffect(() => {
    if (authRole) {
      localStorage.setItem('usr_auth_role', authRole);
      localStorage.setItem('usr_logged_emp_id', loggedEmpId);
      if (!localStorage.getItem('usr_auth_time')) {
        localStorage.setItem('usr_auth_time', Date.now().toString());
      }
    } else {
      localStorage.removeItem('usr_auth_role');
      localStorage.removeItem('usr_logged_emp_id');
      localStorage.removeItem('usr_auth_time');
    }
  }, [authRole, loggedEmpId]);

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDcrModalOpen, setIsDcrModalOpen] = useState(false);
  const [isDailyTravelModalOpen, setIsDailyTravelModalOpen] = useState(false);
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [viewAgreementDetail, setViewAgreementDetail] = useState(null);

  const [editingEmpModal, setEditingEmpModal] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [editProfileModal, setEditProfileModal] = useState(null);

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
    officeSpaceSqFt: '500',
    godownSpaceSqFt: '1000',
    showroomAddress: '',
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
    clientName: '', 
    clientType: 'Distributor', 
    contactPerson: '', 
    phone: '', 
    place: '',
    status: 'Hot', 
    stage: 'Contacted', 
    investmentAmount: '', 
    assignedToId: 'USR-EMP-101', 
    vertical: 'USR POWER LUBE', 
    nextFollowup: new Date().toISOString().split('T')[0], 
    remark: ''
  });

  const [newDcr, setNewDcr] = useState({
    empId: 'USR-EMP-101', 
    clientName: '', 
    clientType: 'Dealer', 
    place: '', 
    phone: '', 
    vertical: 'USR POWER LUBE', 
    callType: 'Field Visit',
    outcome: 'Order Confirmed', 
    notes: '', 
    investmentAmount: '', 
    nextDate: new Date().toISOString().split('T')[0],
    lat: '19.0760 N', 
    lng: '72.8777 E', 
    address: 'Andheri West, Mumbai',
    photoVerified: false, 
    photoUrl: null, 
    timestampTag: '',
    remark: ''
  });

  const [newDailyTravel, setNewDailyTravel] = useState({
    date: new Date().toISOString().split('T')[0],
    mode: 'Company Two-Wheeler',
    km: '',
    amount: '',
    route: '',
    purpose: '',
    remarks: '',
    weekCycle: 'Nov 01 - Nov 07, 2026'
  });

  const [newEmp, setNewEmp] = useState({
    id: '', pass: '', name: '', designation: 'Sales Executive', phone: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 30, territory: 'Mumbai Suburban Division', target: '500000', primaryVertical: 'USR POWER LUBE'
  });

  const [newLeave, setNewLeave] = useState({
    leaveType: 'Earned Leave (EL) / Privilege Leave (PL)',
    fromDate: '', 
    toDate: '', 
    reason: ''
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
      setLoginError('Account is BLOCKED due to failed attempts! Contact Admin.');
      return;
    }
    if (foundEmp.pass === loginPassInput.trim()) {
      setEmployees(employees.map(emp => emp.id === foundEmp.id ? { ...emp, failedAttempts: 0 } : emp));
      setAuthRole('employee');
      setLoggedEmpId(foundEmp.id);
      localStorage.setItem('usr_auth_time', Date.now().toString());
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
      localStorage.setItem('usr_auth_time', Date.now().toString());
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
    localStorage.removeItem('usr_auth_role');
    localStorage.removeItem('usr_logged_emp_id');
    localStorage.removeItem('usr_auth_time');
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

  const handleSaveEmployeeProfile = (e) => {
    e.preventDefault();
    if (!editProfileModal) return;
    setEmployees(employees.map(emp => emp.id === editProfileModal.id ? { ...editProfileModal } : emp));
    alert(`Employee profile for ${editProfileModal.name} updated successfully!`);
    setEditProfileModal(null);
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
    setNewLeave({ leaveType: 'Earned Leave (EL) / Privilege Leave (PL)', fromDate: '', toDate: '', reason: '' });
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
      totalLeaves: Number(newEmp.totalLeaves) || 30,
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
    setNewEmp({ id: '', pass: '', name: '', designation: 'Sales Executive', phone: '', joiningDate: new Date().toISOString().split('T')[0], totalLeaves: 30, territory: 'Mumbai Suburban Division', target: '500000', primaryVertical: 'USR POWER LUBE' });
    alert(`Employee (${createdEmp.name} - ID: ${createdEmp.id}) Created Successfully!`);
  };

  const captureRealGpsPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCapturingGpsPhoto(true);
    const currentDateTime = new Date().toLocaleString();

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
              address: `GPS Verified Location (Lat: ${lat}, Lng: ${lng})`, 
              photoVerified: true, 
              photoUrl: reader.result,
              timestampTag: currentDateTime 
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
              address: 'Mumbai HQ Hub (Default Fallback)', 
              photoVerified: true, 
              photoUrl: reader.result,
              timestampTag: currentDateTime 
            }));
            setCapturingGpsPhoto(false);
          };
          reader.readAsDataURL(file);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setCapturingGpsPhoto(false);
      alert('Geolocation is not supported by your device browser.');
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
    setNewLead({ clientName: '', clientType: 'Distributor', contactPerson: '', phone: '', place: '', status: 'Hot', stage: 'Contacted', investmentAmount: '', assignedToId: 'USR-EMP-101', vertical: 'USR POWER LUBE', nextFollowup: new Date().toISOString().split('T')[0], remark: '' });
    alert('Lead Added Successfully!');
  };

  const handleAddDcr = (e) => {
    e.preventDefault();
    if (!newDcr.photoVerified || !newDcr.photoUrl) {
      alert('Mandatory Error: Live Mobile Camera GPS Photo Audit is required before submitting DCR!');
      return;
    }
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
    setNewDcr({ empId: 'USR-EMP-101', clientName: '', clientType: 'Dealer', place: '', phone: '', vertical: 'USR POWER LUBE', callType: 'Field Visit', outcome: 'Order Confirmed', notes: '', investmentAmount: '', nextDate: new Date().toISOString().split('T')[0], lat: '19.0760 N', lng: '72.8777 E', address: 'Andheri West, Mumbai', photoVerified: false, photoUrl: null, timestampTag: '', remark: '' });
    alert('DCR Submitted Successfully with Live GPS & Timestamp Audit!');
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
    setNewDailyTravel({ date: new Date().toISOString().split('T')[0], mode: 'Company Two-Wheeler', km: '', amount: '', route: '', purpose: '', remarks: '', weekCycle: 'Nov 01 - Nov 07, 2026' });
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
    const routesCombined = empDailyLogs.map(l => `${l.route} (${l.purpose})`).join(' | ');
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
              <span className="truncate">Role: <strong className="text-white uppercase">{authRole}</strong></span>
              <span className="bg-indigo-600/30 text-indigo-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold">{authRole === 'admin' ? 'MASTER' : currentEmp.id}</span>
            </div>
          </div>

          <nav className="p-3 space-y-1 text-xs">
            {authRole === 'admin' ? (
              <>
                <button onClick={() => setActiveTab('admin-manage')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'admin-manage' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Control Panel</span>
                </button>
                <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>Sales & Analytics</span>
                </button>
                <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'leads' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <Users className="w-4 h-4" />
                  <span>Distributor Leads</span>
                </button>
                <button onClick={() => setActiveTab('dcr')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'dcr' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <MapPin className="w-4 h-4" />
                  <span>DCR Visit Audits</span>
                </button>
                <button onClick={() => setActiveTab('agreements')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'agreements' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <FileText className="w-4 h-4" />
                  <span>Partnership Agreements</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>Employee Dashboard</span>
                </button>
                <button onClick={() => setActiveTab('attendance')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <CheckSquare className="w-4 h-4" />
                  <span>Attendance & Leaves</span>
                </button>
                <button onClick={() => setActiveTab('travel')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'travel' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <Navigation className="w-4 h-4" />
                  <span>Daily Travel & Claims</span>
                </button>
                <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'leads' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <Users className="w-4 h-4" />
                  <span>Distributor Leads</span>
                </button>
                <button onClick={() => setActiveTab('dcr')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'dcr' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <MapPin className="w-4 h-4" />
                  <span>DCR Visit Log</span>
                </button>
                <button onClick={() => setActiveTab('agreements')} className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium transition ${activeTab === 'agreements' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <FileText className="w-4 h-4" />
                  <span>Partnership Agreement</span>
                </button>
              </>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          {authRole === 'employee' && (
            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700/60 text-xs">
              <p className="font-bold text-white truncate">{currentEmp.name}</p>
              <p className="text-[10px] text-indigo-300 truncate">{currentEmp.designation}</p>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">{currentEmp.territory}</p>
            </div>
          )}
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold transition flex items-center justify-center space-x-2 shadow">
            <LogOut className="w-4 h-4" />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 mb-6 border-b border-slate-200 gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {activeTab === 'admin-manage' && 'Admin Control & Employee Management'}
              {activeTab === 'dashboard' && (authRole === 'admin' ? 'Company Sales Performance & Analytics' : `Welcome Back, ${currentEmp.name}`)}
              {activeTab === 'attendance' && 'Attendance Tracker & Leave Management'}
              {activeTab === 'travel' && 'Daily Field Travel & Weekly Travelling Claims'}
              {activeTab === 'leads' && 'Distributor & Dealer Pipeline Leads'}
              {activeTab === 'dcr' && 'Daily Call Report (DCR) & GPS Audits'}
              {activeTab === 'agreements' && 'Official Distributor Partnership Agreements'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">USR Power Industries Private Limited • Maharashtra Operations</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-white border px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm text-slate-600 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </span>
          </div>
        </header>

        {activeTab === 'admin-manage' && authRole === 'admin' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-slate-800 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Registered Employees & Sales Executives ({employees.length})</span>
                </h3>
                <button onClick={() => setIsAddEmpModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add New Employee</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b">
                    <tr>
                      <th className="p-3 font-semibold">Emp ID & Name</th>
                      <th className="p-3 font-semibold">Designation / Vertical</th>
                      <th className="p-3 font-semibold">Territory</th>
                      <th className="p-3 font-semibold">Target vs Achieved</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50">
                        <td className="p-3 font-medium">
                          <div className="text-slate-900 font-bold">{emp.name}</div>
                          <div className="text-[10px] text-indigo-600 font-mono font-semibold">{emp.id}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-800">{emp.designation}</div>
                          <div className="text-[10px] text-slate-500">{emp.primaryVertical}</div>
                        </td>
                        <td className="p-3 text-slate-600">{emp.territory}</td>
                        <td className="p-3">
                          <div className="font-bold">₹{emp.achieved.toLocaleString('en-IN')} / ₹{emp.target.toLocaleString('en-IN')}</div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${Math.min(100, (emp.achieved / emp.target) * 100)}%` }}></div>
                          </div>
                        </td>
                        <td className="p-3">
                          {emp.isBlocked ? (
                            <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-[10px] flex items-center space-x-1 w-max">
                              <ShieldAlert className="w-3 h-3" />
                              <span>BLOCKED</span>
                            </span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">Active</span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button onClick={() => { setEditingEmpModal(emp); setNewPasswordInput(emp.pass); }} className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition" title="Reset Password / Unblock">
                            <Key className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => { setEditProfileModal(emp); }} className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition" title="Edit Profile">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteEmployee(emp.id)} className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition" title="Delete Employee">
                            <Trash2 className="w-3.5 h-3.5" />
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

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Sales Target</p>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">₹{totalSalesTarget.toLocaleString('en-IN')}</h3>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Achieved Revenue</p>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">₹{totalSalesAchieved.toLocaleString('en-IN')}</h3>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Users className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Active Pipeline Leads</p>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{visibleLeads.length} Leads</h3>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Signed Agreements</p>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{visibleAgreements.filter(a => a.status === 'Approved & Signed').length}</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border">
                <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>Recent Field DCR Call Reports</span>
                </h3>
                <div className="space-y-3">
                  {visibleDcrs.slice(0, 3).map(dcr => (
                    <div key={dcr.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3 text-xs">
                      <img src={dcr.photoUrl || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80"} alt="Visit" className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 truncate">{dcr.clientName}</h4>
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">{dcr.outcome}</span>
                        </div>
                        <p className="text-slate-500 text-[11px] truncate mt-0.5">{dcr.place} • <span className="font-semibold text-indigo-600">{dcr.vertical}</span></p>
                        <p className="text-slate-400 text-[10px] mt-1 font-mono">GPS: {dcr.lat}, {dcr.lng} ({dcr.timestampTag})</p>
                      </div>
                    </div>
                  ))}
                  {visibleDcrs.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No DCR visit reports found.</p>}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border">
                <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>High Priority Distributor Leads</span>
                </h3>
                <div className="space-y-3">
                  {visibleLeads.slice(0, 3).map(lead => (
                    <div key={lead.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                      <div>
                        <h4 className="font-bold text-slate-900">{lead.clientName}</h4>
                        <p className="text-slate-500 text-[11px]">{lead.place} • Contact: {lead.contactPerson} ({lead.phone})</p>
                        <p className="text-[10px] text-indigo-600 font-semibold mt-1">Est. Investment: ₹{(lead.investmentAmount || 1500000).toLocaleString('en-IN')}</p>
                      </div>
                      <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg text-[10px] font-bold">{lead.status}</span>
                    </div>
                  ))}
                  {visibleLeads.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No active leads found.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && authRole === 'employee' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Daily Attendance & Check-In</h3>
                <p className="text-xs text-slate-500 mt-0.5">Mark your daily presence in your assigned territory ({currentEmp.territory}).</p>
              </div>
              <button onClick={markTodayAttendance} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow">
                <CheckSquare className="w-4 h-4" />
                <span>Mark Today's Attendance</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-slate-800">Leave Applications & Balances</h3>
                <button onClick={() => setIsLeaveModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Apply for Leave</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b">
                    <tr>
                      <th className="p-3 font-semibold">Leave Type</th>
                      <th className="p-3 font-semibold">Duration</th>
                      <th className="p-3 font-semibold">Reason</th>
                      <th className="p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleLeaves.map(leave => (
                      <tr key={leave.id} className="hover:bg-slate-50">
                        <td className="p-3 font-medium text-slate-900">{leave.leaveType}</td>
                        <td className="p-3 text-slate-600">{leave.fromDate} to {leave.toDate}</td>
                        <td className="p-3 text-slate-600">{leave.reason}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {visibleLeaves.length === 0 && (
                      <tr><td colSpan="4" className="text-center py-6 text-slate-400">No leave applications found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'travel' && authRole === 'employee' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Daily Field Travel Mileage Log</h3>
                <p className="text-xs text-slate-500 mt-0.5">Record daily travel distance and route for weekly reimbursement claims.</p>
              </div>
              <button onClick={() => setIsDailyTravelModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow">
                <Plus className="w-4 h-4" />
                <span>Add Daily Travel Log</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-slate-800">Weekly Travel Logs (Nov 01 - Nov 07, 2026)</h3>
                <button onClick={() => submitWeeklyTravelClaim('Nov 01 - Nov 07, 2026')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow">
                  <Printer className="w-3.5 h-3.5" />
                  <span>Submit Weekly Claim</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b">
                    <tr>
                      <th className="p-3 font-semibold">Date & Mode</th>
                      <th className="p-3 font-semibold">Route & Purpose</th>
                      <th className="p-3 font-semibold">Distance (KM)</th>
                      <th className="p-3 font-semibold">Amount (₹)</th>
                      <th className="p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleDailyTravel.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{log.date}</div>
                          <div className="text-[10px] text-slate-500">{log.mode}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium text-slate-800">{log.route}</div>
                          <div className="text-[10px] text-slate-500">{log.purpose}</div>
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-700">{log.km} KM</td>
                        <td className="p-3 font-mono font-bold text-indigo-600">₹{log.amount}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">{log.status}</span>
                        </td>
                      </tr>
                    ))}
                    {visibleDailyTravel.length === 0 && (
                      <tr><td colSpan="5" className="text-center py-6 text-slate-400">No travel logs found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Distributor & Super Stockist Leads Pipeline</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage new dealer inquiries, investment commitment values, and follow-ups.</p>
              </div>
              <button onClick={() => setIsLeadModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow">
                <Plus className="w-4 h-4" />
                <span>Add New Lead</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b">
                    <tr>
                      <th className="p-3 font-semibold">Client Name & Contact</th>
                      <th className="p-3 font-semibold">Type & Vertical</th>
                      <th className="p-3 font-semibold">Place / Territory</th>
                      <th className="p-3 font-semibold">Est. Investment</th>
                      <th className="p-3 font-semibold">Stage & Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{lead.clientName}</div>
                          <div className="text-[10px] text-slate-500">Contact: {lead.contactPerson} ({lead.phone})</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-800">{lead.clientType}</div>
                          <div className="text-[10px] text-indigo-600 font-semibold">{lead.vertical}</div>
                        </td>
                        <td className="p-3 text-slate-600">{lead.place}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">₹{(lead.investmentAmount || 1500000).toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">{lead.status} • {lead.stage}</span>
                        </td>
                      </tr>
                    ))}
                    {visibleLeads.length === 0 && (
                      <tr><td colSpan="5" className="text-center py-6 text-slate-400">No leads found in pipeline.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dcr' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Daily Call Report (DCR) & Live GPS Audits</h3>
                <p className="text-xs text-slate-500 mt-0.5">Mandatory field visit logging with real-time mobile camera capture and GPS coordinates.</p>
              </div>
              <button onClick={() => setIsDcrModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow">
                <Camera className="w-4 h-4" />
                <span>Submit DCR Visit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleDcrs.map(dcr => (
                <div key={dcr.id} className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-sm">{dcr.clientName}</h4>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">{dcr.outcome}</span>
                    </div>
                    <p className="text-xs text-slate-500">{dcr.place} • <span className="font-semibold text-indigo-600">{dcr.vertical}</span></p>
                    {dcr.photoUrl && (
                      <img src={dcr.photoUrl} alt="DCR Audit" className="w-full h-36 object-cover rounded-xl border mt-2" />
                    )}
                    <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border">{dcr.notes || dcr.remark}</p>
                  </div>
                  <div className="pt-2 border-t text-[10px] text-slate-400 font-mono flex justify-between items-center">
                    <span>GPS: {dcr.lat}, {dcr.lng}</span>
                    <span>{dcr.timestampTag}</span>
                  </div>
                </div>
              ))}
              {visibleDcrs.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl border text-slate-400 text-xs">No DCR visit reports submitted yet.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'agreements' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Distributor Partnership Agreement Forms</h3>
                <p className="text-xs text-slate-500 mt-0.5">Official agreement submissions with capital investments, infrastructure details & GSTN verification.</p>
              </div>
              <button onClick={() => setIsAgreementModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow">
                <FileText className="w-4 h-4" />
                <span>New Agreement Form</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b">
                    <tr>
                      <th className="p-3 font-semibold">Distributor & Constitution</th>
                      <th className="p-3 font-semibold">Territory</th>
                      <th className="p-3 font-semibold">Total Investment</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleAgreements.map(agr => (
                      <tr key={agr.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{agr.distributorName}</div>
                          <div className="text-[10px] text-slate-500">Proprietor: {agr.proprietorName} ({agr.phone})</div>
                        </td>
                        <td className="p-3 text-slate-600">{agr.territory}</td>
                        <td className="p-3 font-mono font-bold text-slate-900">₹{(agr.totalInvestment || 1500000).toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${agr.status === 'Approved & Signed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {agr.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={() => setViewAgreementDetail(agr)} className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-bold transition">View</button>
                          {authRole === 'admin' && agr.status !== 'Approved & Signed' && (
                            <button onClick={() => handleApproveAgreement(agr.id)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition">Approve</button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {visibleAgreements.length === 0 && (
                      <tr><td colSpan="5" className="text-center py-6 text-slate-400">No agreement forms found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Employee Modal */}
      {isAddEmpModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border">
            <div className="bg-indigo-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-sm">Add New Sales Executive / Employee</h3>
              <button onClick={() => setIsAddEmpModalOpen(false)} className="text-indigo-200 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Employee ID</label>
                  <input required type="text" value={newEmp.id} onChange={e => setNewEmp({ ...newEmp, id: e.target.value })} placeholder="e.g. USR-EMP-103" className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono uppercase" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Password</label>
                  <input required type="text" value={newEmp.pass} onChange={e => setNewEmp({ ...newEmp, pass: e.target.value })} placeholder="Default PIN" className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input required type="text" value={newEmp.name} onChange={e => setNewEmp({ ...newEmp, name: e.target.value })} placeholder="Executive Name" className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input required type="text" value={newEmp.phone} onChange={e => setNewEmp({ ...newEmp, phone: e.target.value })} placeholder="9820012345" className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Designation</label>
                  <input type="text" value={newEmp.designation} onChange={e => setNewEmp({ ...newEmp, designation: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Primary Vertical</label>
                  <select value={newEmp.primaryVertical} onChange={e => setNewEmp({ ...newEmp, primaryVertical: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl">
                    <option value="USR POWER LUBE">USR POWER LUBE</option>
                    <option value="TURBO OIL">TURBO OIL</option>
                    <option value="PUNCHKUTEER">PUNCHKUTEER</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assigned Territory</label>
                  <input type="text" value={newEmp.territory} onChange={e => setNewEmp({ ...newEmp, territory: e.target.value })} placeholder="e.g. Pune Cluster" className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sales Target (₹)</label>
                  <input type="number" value={newEmp.target} onChange={e => setNewEmp({ ...newEmp, target: e.target.value })} placeholder="500000" className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={() => setIsAddEmpModalOpen(false)} className="px-4 py-2 border rounded-xl font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow">Create Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DCR Submission Modal */}
      {isDcrModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border max-h-[90vh] overflow-y-auto">
            <div className="bg-indigo-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-sm">Submit DCR Visit with Live GPS & Photo Audit</h3>
              <button onClick={() => setIsDcrModalOpen(false)} className="text-indigo-200 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddDcr} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Client / Dealer Name</label>
                  <input required type="text" value={newDcr.clientName} onChange={e => setNewDcr({ ...newDcr, clientName: e.target.value })} placeholder="Dealer Shop Name" className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Place / City</label>
                  <input required type="text" value={newDcr.place} onChange={e => setNewDcr({ ...newDcr, place: e.target.value })} placeholder="Location / Area" className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Phone</label>
                  <input type="text" value={newDcr.phone} onChange={e => setNewDcr({ ...newDcr, phone: e.target.value })} placeholder="9820012345" className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Outcome</label>
                  <select value={newDcr.outcome} onChange={e => setNewDcr({ ...newDcr, outcome: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl">
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Payment Collected">Payment Collected</option>
                    <option value="Follow-up Required">Follow-up Required</option>
                    <option value="Closed / No Interest">Closed / No Interest</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Visit Notes / Remarks</label>
                <textarea rows="2" value={newDcr.notes} onChange={e => setNewDcr({ ...newDcr, notes: e.target.value })} placeholder="Enter discussion details..." className="w-full p-2.5 bg-slate-50 border rounded-xl"></textarea>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border space-y-3">
                <label className="font-bold text-slate-800 block">Mandatory Live Mobile Camera GPS Audit</label>
                <div className="flex items-center space-x-3">
                  <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={captureRealGpsPhoto} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current.click()} className="bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2 shadow">
                    <Camera className="w-4 h-4" />
                    <span>{capturingGpsPhoto ? 'Fetching GPS & Capturing...' : 'Capture Live Photo'}</span>
                  </button>
                  {newDcr.photoVerified && <span className="text-emerald-600 font-bold flex items-center space-x-1"><Check className="w-4 h-4" /><span>GPS Verified</span></span>}
                </div>
                {newDcr.photoUrl && <img src={newDcr.photoUrl} alt="Audit Preview" className="w-full h-28 object-cover rounded-xl border" />}
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={() => setIsDcrModalOpen(false)} className="px-4 py-2 border rounded-xl font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow">Submit DCR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border">
            <div className="bg-indigo-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-sm">Add New Distributor / Dealer Lead</h3>
              <button onClick={() => setIsLeadModalOpen(false)} className="text-indigo-200 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Business Firm Name</label>
                  <input required type="text" value={newLead.clientName} onChange={e => setNewLead({ ...newLead, clientName: e.target.value })} placeholder="Distributor Firm Name" className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Person</label>
                  <input required type="text" value={newLead.contactPerson} onChange={e => setNewLead({ ...newLead, contactPerson: e.target.value })} placeholder="Proprietor Name" className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input required type="text" value={newLead.phone} onChange={e => setNewLead({ ...newLead, phone: e.target.value })} placeholder="9820012345" className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Place / Address</label>
                  <input required type="text" value={newLead.place} onChange={e => setNewLead({ ...newLead, place: e.target.value })} placeholder="City / Area" className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Est. Investment (₹)</label>
                  <input type="number" value={newLead.investmentAmount} onChange={e => setNewLead({ ...newLead, investmentAmount: e.target.value })} placeholder="1500000" className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Lead Status</label>
                  <select value={newLead.status} onChange={e => setNewLead({ ...newLead, status: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl">
                    <option value="Hot">Hot</option>
                    <option value="Warm">Warm</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={() => setIsLeadModalOpen(false)} className="px-4 py-2 border rounded-xl font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Password Modal */}
      {editingEmpModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border">
            <div className="bg-indigo-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-sm">Reset Password & Unblock</h3>
              <button onClick={() => setEditingEmpModal(null)} className="text-indigo-200 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveEmployeeCredentials} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Employee: {editingEmpModal.name}</label>
                <input required type="text" value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} placeholder="New Password PIN" className="w-full p-3 bg-slate-50 border rounded-xl font-mono" autoFocus />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setEditingEmpModal(null)} className="px-4 py-2 border rounded-xl font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
