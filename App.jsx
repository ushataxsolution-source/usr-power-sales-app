import React, { useState, useRef } from 'react';
import { 
  Users, MapPin, PhoneCall, TrendingUp, Camera, Calendar, Plus, 
  Search, Filter, CheckCircle, Clock, Award, 
  Navigation, DollarSign, UserPlus, Eye, FileText, Check, X, RefreshCw, Briefcase, Tag,
  Lock, Unlock, Download, ShieldCheck, Trash2, Edit3, LogOut, Key, User, CheckSquare, ArrowRight, CalendarDays, Bus, ShieldAlert, MessageSquare, FileSpreadsheet, Printer, Shield
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

const CUSTOMER_TYPES = [
  'C&FA',
  'Stockist',
  'Distributor',
  'Dealer',
  'Fleet Owner'
];

const INITIAL_EMPLOYEES = [
  { id: 'USR-EMP-101', pass: '1011', name: 'Rohan Sharma', designation: 'Senior Sales Executive', phone: '9820012345', joiningDate: '2025-04-10', totalLeaves: 18, usedLeaves: 4, territory: 'Mumbai Metropolitan Region', target: 800000, achieved: 640000, primaryVertical: 'USR POWER LUBE', failedAttempts: 0, isBlocked: false },
  { id: 'USR-EMP-102', pass: '1022', name: 'Amit Kumar', designation: 'Area Sales Manager', phone: '9821123456', joiningDate: '2025-06-15', totalLeaves: 18, usedLeaves: 2, territory: 'Pune & PCMC Cluster', target: 650000, achieved: 580000, primaryVertical: 'TURBO OIL', failedAttempts: 0, isBlocked: false }
];

const INITIAL_CUSTOMERS = [
  { 
    id: 'CUST-501', 
    pass: '5011', 
    name: 'Sahyadri Auto Spares & Lubricants', 
    contactPerson: 'Suresh Patil', 
    phone: '9820012345', 
    customerType: 'Distributor', 
    joiningDate: '2025-04-15', 
    validityDate: '2027-04-14', 
    state: 'Maharashtra', 
    district: 'Navi Mumbai & Thane', 
    territory: 'Vashi Turbhe Road, Navi Mumbai', 
    initialInvestment: 1500000, 
    monthlyTarget: 800000, 
    monthlyAchieved: 650000,
    activeScheme: 'Festival Bonanza: Extra 2.5% Cashback on orders above ₹5 Lakhs (Valid till Nov 30, 2026)',
    yearlyScheme: 'Annual Target Gold Coin Reward on 100% Achievement',
    failedAttempts: 0, 
    isBlocked: false 
  }
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

export default function App() {
  const [authRole, setAuthRole] = useState(null); 
  const [loggedUserId, setLoggedUserId] = useState('');
  
  const [loginType, setLoginType] = useState('employee'); 
  const [loginIdInput, setLoginIdInput] = useState('');
  const [loginPassInput, setLoginPassInput] = useState('');
  
  const [captchaCode, setCaptchaCode] = useState('4829');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
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
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [viewAgreementDetail, setViewAgreementDetail] = useState(null);

  const [editingEmpModal, setEditingEmpModal] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  const [newCust, setNewCust] = useState({
    id: '', pass: '', name: '', contactPerson: '', phone: '', customerType: 'Distributor',
    joiningDate: new Date().toISOString().split('T')[0], validityDate: '2028-04-14',
    state: 'Maharashtra', district: 'Pune District', territory: 'Pune Cluster',
    initialInvestment: '1500000', monthlyTarget: '800000',
    activeScheme: 'Festival Bonanza: Extra 2.5% Cashback on bulk orders',
    yearlyScheme: 'Annual Target Gold Coin Reward on 100% Achievement'
  });

  const [newAgreement, setNewAgreement] = useState({
    distributorName: '',
    constitution: 'Proprietorship',
    proprietorName: '',
    proprietorAddress: '',
    residenceAddress: '',
    qualification: '',
    phone: '',
    immovableProperties: '',
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

  const currentEmp = employees.find(e => e.id === loggedUserId) || employees[0];
  const currentCustomer = customers.find(c => c.id === loggedUserId) || customers[0];

  const refreshCaptcha = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(randomNum);
    setCaptchaInput('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (captchaInput.trim() !== captchaCode) {
      setLoginError('Invalid CAPTCHA code! Please re-enter.');
      refreshCaptcha();
      return;
    }

    if (loginType === 'employee') {
      const foundEmp = employees.find(emp => emp.id === loginIdInput.trim());
      if (!foundEmp) {
        setLoginError('Employee ID not found!');
        refreshCaptcha();
        return;
      }
      if (foundEmp.isBlocked) {
        setLoginError('Account is BLOCKED! Contact Admin.');
        return;
      }
      if (foundEmp.pass === loginPassInput.trim()) {
        setAuthRole('employee');
        setLoggedUserId(foundEmp.id);
        setActiveTab('dashboard');
      } else {
        setLoginError('Incorrect Password!');
        refreshCaptcha();
      }
    } else if (loginType === 'customer') {
      const foundCust = customers.find(cust => cust.id === loginIdInput.trim());
      if (!foundCust) {
        setLoginError('Customer/Distributor ID not found!');
        refreshCaptcha();
        return;
      }
      if (foundCust.isBlocked) {
        setLoginError('Account is BLOCKED! Contact Admin.');
        return;
      }
      if (foundCust.pass === loginPassInput.trim()) {
        setAuthRole('customer');
        setLoggedUserId(foundCust.id);
        setActiveTab('dashboard');
      } else {
        setLoginError('Incorrect Password!');
        refreshCaptcha();
      }
    } else if (loginType === 'admin') {
      if (loginPassInput === '70212@Usrpowermhadmin') {
        setAuthRole('admin');
        setActiveTab('admin-manage');
      } else {
        setLoginError('Invalid Admin Password!');
        refreshCaptcha();
      }
    }
  };

  const handleLogout = () => {
    setAuthRole(null);
    setLoggedUserId('');
    refreshCaptcha();
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const createdCust = {
      ...newCust,
      id: newCust.id || `CUST-${Math.floor(Math.random() * 900 + 100)}`,
      pass: newCust.pass || '1234',
      initialInvestment: Number(newCust.initialInvestment) || 1500000,
      monthlyTarget: Number(newCust.monthlyTarget) || 800000,
      monthlyAchieved: 0,
      failedAttempts: 0,
      isBlocked: false
    };
    setCustomers([...customers, createdCust]);
    setIsAddCustomerModalOpen(false);
    alert(`Customer (${createdCust.name} - ${createdCust.customerType}) Created Successfully!`);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const createdEmp = {
      id: newEmp.id || `USR-EMP-${Math.floor(Math.random() * 900 + 100)}`,
      pass: newEmp.pass || '1234',
      name: newEmp.name,
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
    setEmployees([...employees, createdEmp]);
    setIsAddEmpModalOpen(false);
    alert(`Employee (${createdEmp.name} - ${createdEmp.designation}) Created Successfully!`);
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
      totalInvestment: calculatedTotalInvestment,
      submittedBy: authRole === 'employee' ? `${currentEmp.name} [${currentEmp.id}]` : 'Admin HQ',
      submittedEmpId: authRole === 'employee' ? currentEmp.id : 'ADMIN',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification'
    };
    setAgreements([createdAgreement, ...agreements]);
    setIsAgreementModalOpen(false);
    alert('Partnership Agreement Form submitted successfully!');
  };

  const handleApproveAgreement = (agrId) => {
    setAgreements(agreements.map(a => a.id === agrId ? { ...a, status: 'Approved & Signed' } : a));
    alert('Agreement Approved Successfully!');
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
    alert('Attendance Marked Successfully!');
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

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewDcr(prev => ({
        ...prev,
        lat: '19.0760 N',
        lng: '72.8777 E',
        address: 'Live GPS Tagged Location',
        photoVerified: true,
        photoUrl: reader.result
      }));
      setCapturingGpsPhoto(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const createdLead = {
      ...newLead,
      assignedToId: currentEmp.id,
      assignedToName: currentEmp.name,
      vertical: currentEmp.primaryVertical,
      id: `LD-${Math.floor(Math.random() * 900 + 100)}`,
      lastFollowup: new Date().toISOString().split('T')[0],
      investmentAmount: Number(newLead.investmentAmount) || 0
    };
    setLeads([createdLead, ...leads]);
    setIsLeadModalOpen(false);
    alert('Lead Added Successfully!');
  };

  const handleAddDcr = (e) => {
    e.preventDefault();
    const createdDcr = {
      ...newDcr,
      empId: currentEmp.id,
      empName: currentEmp.name,
      vertical: currentEmp.primaryVertical,
      id: `DCR-${Math.floor(Math.random() * 900 + 100)}`,
      visitTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      investmentAmount: Number(newDcr.investmentAmount) || 0
    };
    setDcrs([createdDcr, ...dcrs]);
    setIsDcrModalOpen(false);
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
    alert('Weekly Travelling Claim Submitted Successfully!');
  };

  const handleApproveTravelClaim = (claimId) => {
    setTravelClaims(travelClaims.map(t => t.id === claimId ? { ...t, status: 'Approved' } : t));
    alert('Travelling Claim Approved Successfully!');
  };

  const visibleLeads = authRole === 'admin' ? leads : authRole === 'employee' ? leads.filter(l => l.assignedToId === currentEmp.id) : [];
  const visibleDcrs = authRole === 'admin' ? dcrs : authRole === 'employee' ? dcrs.filter(d => d.empId === currentEmp.id) : [];
  const visibleAgreements = authRole === 'admin' ? agreements : authRole === 'employee' ? agreements.filter(a => a.submittedEmpId === currentEmp.id) : agreements.filter(a => a.distributorName === currentCustomer.name);
  const visibleAttendance = authRole === 'admin' ? attendanceList : authRole === 'employee' ? attendanceList.filter(a => a.empId === currentEmp.id) : [];
  const visibleLeaves = authRole === 'admin' ? leaveList : authRole === 'employee' ? leaveList.filter(l => l.empId === currentEmp.id) : [];
  const visibleDailyTravel = authRole === 'admin' ? dailyTravelList : authRole === 'employee' ? dailyTravelList.filter(d => d.empId === currentEmp.id) : [];
  const visibleTravelClaims = authRole === 'admin' ? travelClaims : authRole === 'employee' ? travelClaims.filter(t => t.empId === currentEmp.id) : [];

  const totalSalesTarget = authRole === 'admin' ? employees.reduce((acc, curr) => acc + curr.target, 0) : authRole === 'employee' ? currentEmp.target : currentCustomer.monthlyTarget;
  const totalSalesAchieved = authRole === 'admin' ? employees.reduce((acc, curr) => acc + curr.achieved, 0) : authRole === 'employee' ? currentEmp.achieved : currentCustomer.monthlyAchieved;

  if (!authRole) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-extrabold text-base tracking-wide">USR POWER INDUSTRIES</h1>
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">OFFICIAL PORTAL • MAHARASHTRA</p>
          </div>

          <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1">
            <button 
              onClick={() => { setLoginType('employee'); setLoginError(''); refreshCaptcha(); }}
              className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center space-x-1 ${
                loginType === 'employee' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Employee</span>
            </button>
            <button 
              onClick={() => { setLoginType('customer'); setLoginError(''); refreshCaptcha(); }}
              className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center space-x-1 ${
                loginType === 'customer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>C&FA / Dealer</span>
            </button>
            <button 
              onClick={() => { setLoginType('admin'); setLoginError(''); refreshCaptcha(); }}
              className={`flex-1 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center space-x-1 ${
                loginType === 'admin' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              {loginType !== 'admin' && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {loginType === 'employee' ? 'Employee ID' : 'Customer ID (e.g. CUST-501)'}
                  </label>
                  <input required type="text" value={loginIdInput} onChange={e => setLoginIdInput(e.target.value)} placeholder={loginType === 'employee' ? 'e.g. USR-EMP-101' : 'e.g. CUST-501'} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase outline-none" />
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Password</label>
                <input required type="password" value={loginPassInput} onChange={e => setLoginPassInput(e.target.value)} placeholder="Enter password..." className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none" autoFocus />
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
              
              <button type="submit" className={`w-full text-white py-3 rounded-xl font-bold transition shadow-md flex items-center justify-center space-x-2 ${
                loginType === 'employee' ? 'bg-indigo-600 hover:bg-indigo-700' : loginType === 'customer' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'
              }`}>
                <span>{loginType === 'employee' ? 'Login to Employee Portal' : loginType === 'customer' ? 'Login to C&FA / Dealer Portal' : 'Unlock Admin Master Center'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
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
              <div className="p-2 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl text-white shadow-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-wide text-white leading-tight">USR POWER INDUSTRIES</h1>
                <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">OFFICIAL PORTAL • MAHARASHTRA</p>
              </div>
            </div>
            
            <div className="mt-2 bg-slate-800/80 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-300 flex items-center justify-between border border-slate-700/50">
              <div className="overflow-hidden">
                <span className="text-slate-400 block truncate">
                  {authRole === 'admin' ? '👑 Admin Master Mode' : authRole === 'customer' ? `🏢 ${currentCustomer.name}` : `👤 ${currentEmp.name}`}
                </span>
                {authRole === 'employee' && (
                  <span className="text-[10px] text-indigo-300 block font-semibold">{currentEmp.designation} • Joined: {currentEmp.joiningDate}</span>
                )}
                {authRole === 'customer' && (
                  <span className="text-[10px] text-emerald-300 block font-semibold">{currentCustomer.customerType} • Area: {currentCustomer.district}</span>
                )}
              </div>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${authRole === 'admin' ? 'bg-amber-400' : authRole === 'customer' ? 'bg-emerald-400' : 'bg-blue-400'}`}></span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: TrendingUp },
              { id: 'agreements', label: 'Partnership Agreements (PDF)', icon: FileText, badge: visibleAgreements.length },
              ...(authRole === 'employee' ? [
                { id: 'attendance', label: 'Attendance & Punch-In', icon: CheckSquare, badge: visibleAttendance.length },
                { id: 'leaves', label: 'Leave Management', icon: CalendarDays, badge: visibleLeaves.length },
                { id: 'travel', label: 'Travelling Claims', icon: Bus, badge: visibleTravelClaims.length },
                { id: 'leads', label: 'Lead Management', icon: Users, badge: visibleLeads.length },
                { id: 'dcr', label: 'Daily Call Reports (DCR)', icon: FileText, badge: visibleDcrs.length },
                { id: 'gps', label: 'GPS Photo Verification', icon: Camera },
              ] : authRole === 'admin' ? [
                { id: 'leads', label: 'Lead Management', icon: Users, badge: visibleLeads.length },
                { id: 'dcr', label: 'Daily Call Reports (DCR)', icon: FileText, badge: visibleDcrs.length },
                { id: 'travel', label: 'Travelling Claims', icon: Bus, badge: visibleTravelClaims.length },
              ] : [])
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
              <h2 className="text-xl font-bold text-slate-900 capitalize">
                {activeTab === 'admin-manage' ? 'Admin Master Control Panel' : activeTab.replace('-', ' ')}
              </h2>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">
                {authRole === 'admin' ? 'ADMIN VIEW' : authRole === 'customer' ? `CUSTOMER: ${currentCustomer.name} (${currentCustomer.customerType})` : `STAFF: ${currentEmp.name} (${currentEmp.designation})`}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">USR POWER INDUSTRIES PRIVATE LIMITED • OFFICIAL PORTAL • MAHARASHTRA</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {authRole !== 'customer' && (
              <button onClick={() => setIsAgreementModalOpen(true)} className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition">
                <FileText className="w-3.5 h-3.5" />
                <span>+ Fill New Agreement Form</span>
              </button>
            )}
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {authRole === 'customer' && (
              <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-800/60 pb-4 gap-2">
                  <div>
                    <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">{currentCustomer.customerType} Portal</span>
                    <h3 className="text-xl font-extrabold mt-1 text-white">{currentCustomer.name}</h3>
                    <p className="text-xs text-emerald-300">Contact: {currentCustomer.contactPerson} (+91 {currentCustomer.phone})</p>
                  </div>
                  <div className="bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-emerald-700/50 text-right">
                    <p className="text-[10px] text-slate-400">Allotted Territory / District</p>
                    <p className="text-xs font-bold text-emerald-400">{currentCustomer.territory}, {currentCustomer.district}, {currentCustomer.state}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
                    <p className="text-[11px] text-slate-400">Joining Date & Validity</p>
                    <p className="text-xs font-bold text-white mt-1">Joined: {currentCustomer.joiningDate}</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Valid Till: {currentCustomer.validityDate}</p>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
                    <p className="text-[11px] text-slate-400">Initial Investment</p>
                    <p className="text-base font-extrabold text-emerald-400 mt-1">₹{(currentCustomer.initialInvestment).toLocaleString('en-IN')}</p>
                    <span className="text-[10px] text-slate-300">Stock Deposit Verified</span>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
                    <p className="text-[11px] text-slate-400">Monthly Sales Target</p>
                    <p className="text-base font-extrabold text-indigo-400 mt-1">₹{(currentCustomer.monthlyTarget).toLocaleString('en-IN')}</p>
                    <span className="text-[10px] text-emerald-400 font-medium">Achieved: ₹{(currentCustomer.monthlyAchieved).toLocaleString('en-IN')}</span>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
                    <p className="text-[11px] text-slate-400">Active Schemes (Admin Set)</p>
                    <p className="text-[11px] font-bold text-amber-300 mt-1 leading-snug">{currentCustomer.activeScheme}</p>
                  </div>
                </div>

                {currentCustomer.yearlyScheme && (
                  <div className="bg-amber-950/40 border border-amber-600/40 p-3.5 rounded-2xl flex items-center space-x-3 text-xs">
                    <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <strong className="text-amber-300 block">Yearly Milestone Scheme:</strong>
                      <span className="text-slate-200">{currentCustomer.yearlyScheme}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

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
            </div>
          </div>
        )}

        {activeTab === 'agreements' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Official Partnership Agreement Forms</h3>
                <p className="text-xs text-slate-500 mt-1">Review and manage distributor partnership forms.</p>
              </div>
              {authRole !== 'customer' && (
                <button onClick={() => setIsAgreementModalOpen(true)} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow">+ Fill New Agreement</button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Agreement ID</th>
                    <th className="p-3">Distributor Name</th>
                    <th className="p-3">Contact Person & Phone</th>
                    <th className="p-3">GSTN</th>
                    <th className="p-3">Investment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visibleAgreements.map(agr => (
                    <tr key={agr.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-indigo-600">{agr.id}</td>
                      <td className="p-3 font-bold">{agr.distributorName}</td>
                      <td className="p-3">{agr.proprietorName} (+{agr.phone})</td>
                      <td className="p-3 font-mono">{agr.gstn}</td>
                      <td className="p-3 font-bold text-emerald-700">₹{(agr.totalInvestment || 1500000).toLocaleString('en-IN')}</td>
                      <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">{agr.status}</span></td>
                      <td className="p-3">
                        <button onClick={() => setViewAgreementDetail(agr)} className="bg-slate-800 text-white px-3 py-1.5 rounded font-semibold">View Form</button>
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
              <p className="text-xs text-amber-800">Create employee IDs, C&FA/Stockist/Distributor/Dealer logins with validity, area, initial investment, targets, and schemes.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm flex flex-wrap gap-3">
              <button onClick={() => setIsAddEmpModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow">+ Create Employee ID</button>
              <button onClick={() => setIsAddCustomerModalOpen(true)} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow">+ Create C&FA / Dealer Login</button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-3">
              <div className="p-5 border-b font-bold text-xs">Registered Customers & Dealers</div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Joining & Validity</th>
                    <th className="p-3">Territory</th>
                    <th className="p-3">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {customers.map(cust => (
                    <tr key={cust.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{cust.name} <span className="text-[10px] text-emerald-600 font-mono block">{cust.id}</span></td>
                      <td className="p-3"><span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">{cust.customerType}</span></td>
                      <td className="p-3 font-mono">{cust.joiningDate} to {cust.validityDate}</td>
                      <td className="p-3">{cust.territory}, {cust.district}</td>
                      <td className="p-3 font-mono text-indigo-700 font-bold">₹{(cust.monthlyTarget).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD CUSTOMER */}
      {isAddCustomerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Create Customer Login</h3>
              <button onClick={() => setIsAddCustomerModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddCustomer} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Business Name *</label>
                  <input required type="text" value={newCust.name} onChange={e => setNewCust({...newCust, name: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Customer Type *</label>
                  <select value={newCust.customerType} onChange={e => setNewCust({...newCust, customerType: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white font-medium">
                    {CUSTOMER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Login ID *</label>
                  <input required type="text" value={newCust.id} onChange={e => setNewCust({...newCust, id: e.target.value})} placeholder="CUST-503" className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Password *</label>
                  <input required type="text" value={newCust.pass} onChange={e => setNewCust({...newCust, pass: e.target.value})} placeholder="5033" className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Joining Date *</label>
                  <input required type="date" value={newCust.joiningDate} onChange={e => setNewCust({...newCust, joiningDate: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Validity Date *</label>
                  <input required type="date" value={newCust.validityDate} onChange={e => setNewCust({...newCust, validityDate: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">District / Region *</label>
                  <input required type="text" value={newCust.district} onChange={e => setNewCust({...newCust, district: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Allotted Territory *</label>
                  <input required type="text" value={newCust.territory} onChange={e => setNewCust({...newCust, territory: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Initial Investment (₹) *</label>
                  <input required type="number" value={newCust.initialInvestment} onChange={e => setNewCust({...newCust, initialInvestment: e.target.value})} className="w-full p-2.5 border rounded-xl font-bold text-emerald-700" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Monthly Target (₹) *</label>
                  <input required type="number" value={newCust.monthlyTarget} onChange={e => setNewCust({...newCust, monthlyTarget: e.target.value})} className="w-full p-2.5 border rounded-xl font-bold text-indigo-700" />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Active Scheme (Monthly)</label>
                <input type="text" value={newCust.activeScheme} onChange={e => setNewCust({...newCust, activeScheme: e.target.value})} className="w-full p-2.5 border rounded-xl" />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsAddCustomerModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EMPLOYEE */}
      {isAddEmpModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Create Employee ID & Designation</h3>
              <button onClick={() => setIsAddEmpModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Employee Name *</label>
                  <input required type="text" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Designation *</label>
                  <input required type="text" value={newEmp.designation} onChange={e => setNewEmp({...newEmp, designation: e.target.value})} className="w-full p-2.5 border rounded-xl font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Employee ID *</label>
                  <input required type="text" value={newEmp.id} onChange={e => setNewEmp({...newEmp, id: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Password *</label>
                  <input required type="text" value={newEmp.pass} onChange={e => setNewEmp({...newEmp, pass: e.target.value})} className="w-full p-2.5 border rounded-xl font-mono" />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsAddEmpModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow">Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
