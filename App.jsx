import React, { useState, useRef } from 'react';
import { 
  Users, MapPin, PhoneCall, TrendingUp, Camera, Calendar, Plus, 
  Search, Filter, CheckCircle, Clock, Award, 
  Navigation, DollarSign, UserPlus, Eye, FileText, Check, X, RefreshCw, Briefcase, Tag,
  Lock, Unlock, Download, ShieldCheck, Trash2, Edit3, LogOut, Key
} from 'lucide-react';

// Product Lines & Business Verticals
const BUSINESS_VERTICALS = [
  'USR POWER LUBE',
  'TURBO OIL',
  'NUTRI TRIBE',
  'TAX AND LEGAL',
  'PUNCHKUTEER',
  'CUSTOMIZED PACKAGING',
  'DIGITAL MARKETING'
];

// Initial Staff Data with USR Employee IDs
const INITIAL_EMPLOYEES = [
  { id: 'USR-EMP-101', name: 'Rohan Sharma', territory: 'Patna Division', target: 800000, achieved: 640000, visitsToday: 6, status: 'Active', primaryVertical: 'USR POWER LUBE' },
  { id: 'USR-EMP-102', name: 'Amit Kumar', territory: 'Gaya & South Bihar', target: 650000, achieved: 580000, visitsToday: 5, status: 'Active', primaryVertical: 'TURBO OIL' },
  { id: 'USR-EMP-103', name: 'Priya Singh', territory: 'Muzaffarpur Cluster', target: 900000, achieved: 870000, visitsToday: 7, status: 'Active', primaryVertical: 'TAX AND LEGAL' },
  { id: 'USR-EMP-104', name: 'Vikram Verma', territory: 'Bhagalpur Region', target: 500000, achieved: 320000, visitsToday: 3, status: 'Active', primaryVertical: 'DIGITAL MARKETING' }
];

// Initial Leads
const INITIAL_LEADS = [
  { id: 'LD-101', clientName: 'Bihar Auto Spares & Lubricants', contactPerson: 'Suresh Prasad', phone: '9835012345', address: 'Baksoti Road, Gaya', status: 'Hot', stage: 'Negotiation', estimatedValue: 180000, assignedToId: 'USR-EMP-102', assignedToName: 'Amit Kumar', vertical: 'USR POWER LUBE', lastFollowup: '2026-11-01', nextFollowup: '2026-11-03' },
  { id: 'LD-102', clientName: 'Maheshwari Logistics & Fleet Services', contactPerson: 'Mahesh Gupta', phone: '9431098765', address: 'Exhibition Road, Patna', status: 'Warm', stage: 'Proposal Sent', estimatedValue: 350000, assignedToId: 'USR-EMP-101', assignedToName: 'Rohan Sharma', vertical: 'TURBO OIL', lastFollowup: '2026-10-31', nextFollowup: '2026-11-04' },
  { id: 'LD-103', clientName: 'NutriCare Organic Foods', contactPerson: 'Ramanathan S.', phone: '9771122334', address: 'Kanti Industrial Area, Muzaffarpur', status: 'Hot', stage: 'Contract Signed', estimatedValue: 450000, assignedToId: 'USR-EMP-103', assignedToName: 'Priya Singh', vertical: 'NUTRI TRIBE', lastFollowup: '2026-11-02', nextFollowup: '2026-11-06' },
  { id: 'LD-104', clientName: 'Punchkuteer Resort & Eco Stay', contactPerson: 'Deepak Roy', phone: '9934455667', address: 'NH-2 Dobhi, Gaya', status: 'Hot', stage: 'Closed Won', estimatedValue: 520000, assignedToId: 'USR-EMP-102', assignedToName: 'Amit Kumar', vertical: 'PUNCHKUTEER', lastFollowup: '2026-11-02', nextFollowup: '2026-11-10' },
  { id: 'LD-105', clientName: 'Zenith Legal & Corporate Advisors', contactPerson: 'Sunil Malhotra', phone: '9811223344', address: 'Boreing Road, Patna', status: 'Warm', stage: 'Contacted', estimatedValue: 220000, assignedToId: 'USR-EMP-103', assignedToName: 'Priya Singh', vertical: 'TAX AND LEGAL', lastFollowup: '2026-11-01', nextFollowup: '2026-11-05' }
];

// Initial Daily Call Reports
const INITIAL_DCR = [
  { id: 'DCR-501', empId: 'USR-EMP-102', empName: 'Amit Kumar', vertical: 'TURBO OIL', clientName: 'Punchkuteer Resort & Eco Stay', visitTime: '10:30 AM', callType: 'Field Visit', outcome: 'Order Confirmed', notes: 'Finalized annual supply contract for heavy lube and Turbo Oil.', nextDate: '2026-11-10', lat: '24.5821 N', lng: '84.9754 E', address: 'NH-2 Dobhi, Gaya', photoVerified: true, photoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80' },
  { id: 'DCR-502', empId: 'USR-EMP-101', empName: 'Rohan Sharma', vertical: 'DIGITAL MARKETING', clientName: 'Bihar Auto Spares', visitTime: '12:15 PM', callType: 'Phone Call', outcome: 'Follow Up Required', notes: 'Pitched customized packaging & digital promotional campaign bundle.', nextDate: '2026-11-04', lat: '25.6121 N', lng: '85.1412 E', address: 'Exhibition Road, Patna', photoVerified: false, photoUrl: null },
  { id: 'DCR-503', empId: 'USR-EMP-103', empName: 'Priya Singh', vertical: 'TAX AND LEGAL', clientName: 'Zenith Corporate Advisors', visitTime: '02:45 PM', callType: 'Field Visit', outcome: 'Demo Provided', notes: 'Demonstrated tax compliance audit package and legal advisory workflow.', nextDate: '2026-11-05', lat: '26.1209 N', lng: '85.3647 E', address: 'Boreing Road, Patna', photoVerified: true, photoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [dcrs, setDcrs] = useState(INITIAL_DCR);
  
  // Admin Mode & Security State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  // Filters
  const [selectedEmpFilter, setSelectedEmpFilter] = useState('All');
  const [selectedVerticalFilter, setSelectedVerticalFilter] = useState('All');

  // Modals
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDcrModalOpen, setIsDcrModalOpen] = useState(false);
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [viewPhotoModal, setViewPhotoModal] = useState(null);

  // New Lead State
  const [newLead, setNewLead] = useState({
    clientName: '', contactPerson: '', phone: '', address: '',
    status: 'Hot', stage: 'Contacted', estimatedValue: '', assignedToId: 'USR-EMP-101', vertical: 'USR POWER LUBE', nextFollowup: ''
  });

  // New DCR State
  const [newDcr, setNewDcr] = useState({
    empId: 'USR-EMP-101', clientName: '', vertical: 'USR POWER LUBE', callType: 'Field Visit',
    outcome: 'Follow Up Required', notes: '', nextDate: '',
    lat: '25.5941 N', lng: '85.1376 E', address: 'Main Market, Patna',
    photoVerified: false, photoUrl: null
  });

  // New Employee State (Admin)
  const [newEmp, setNewEmp] = useState({
    id: '', name: '', territory: 'Patna Division', target: '', primaryVertical: 'USR POWER LUBE'
  });

  // Real Camera & Live GPS State
  const [capturingGpsPhoto, setCapturingGpsPhoto] = useState(false);
  const fileInputRef = useRef(null);

  // Admin Login Handler with Updated Password
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput === '70212@Usrpowermhadmin') {
      setIsAdminLoggedIn(true);
      setIsAdminModalOpen(false);
      setAdminError('');
      setAdminPasswordInput('');
    } else {
      setAdminError('Invalid Admin Password!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    if (activeTab === 'admin-manage') {
      setActiveTab('dashboard');
    }
  };

  // REAL LIVE GPS & CAMERA CAPTURE FUNCTION
  const captureRealGpsPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCapturingGpsPhoto(true);

    // Fetch Real Device GPS Coordinates via Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4) + ' N';
          const lng = position.coords.longitude.toFixed(4) + ' E';
          
          // Create object URL for the captured photo
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
        (error) => {
          // Fallback if GPS permission denied or unavailable
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
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const empObj = employees.find(emp => emp.id === newLead.assignedToId);
    const createdLead = {
      ...newLead,
      id: `LD-${Math.floor(Math.random() * 900 + 100)}`,
      assignedToName: empObj ? empObj.name : 'Rohan Sharma',
      lastFollowup: new Date().toISOString().split('T')[0],
      estimatedValue: Number(newLead.estimatedValue) || 0
    };
    setLeads([createdLead, ...leads]);
    setIsLeadModalOpen(false);
    setNewLead({
      clientName: '', contactPerson: '', phone: '', address: '',
      status: 'Hot', stage: 'Contacted', estimatedValue: '', assignedToId: 'USR-EMP-101', vertical: 'USR POWER LUBE', nextFollowup: ''
    });
  };

  const handleAddDcr = (e) => {
    e.preventDefault();
    const empObj = employees.find(emp => emp.id === newDcr.empId);
    const createdDcr = {
      ...newDcr,
      id: `DCR-${Math.floor(Math.random() * 900 + 100)}`,
      empName: empObj ? empObj.name : 'Rohan Sharma',
      visitTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDcrs([createdDcr, ...dcrs]);
    setIsDcrModalOpen(false);
    setNewDcr({
      empId: 'USR-EMP-101', clientName: '', vertical: 'USR POWER LUBE', callType: 'Field Visit',
      outcome: 'Follow Up Required', notes: '', nextDate: '',
      lat: '25.5941 N', lng: '85.1376 E', address: 'Main Market, Patna',
      photoVerified: false, photoUrl: null
    });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const createdEmp = {
      id: newEmp.id || `USR-EMP-${Math.floor(Math.random() * 900 + 100)}`,
      name: newEmp.name,
      territory: newEmp.territory,
      target: Number(newEmp.target) || 500000,
      achieved: 0,
      visitsToday: 0,
      status: 'Active',
      primaryVertical: newEmp.primaryVertical
    };
    setEmployees([...employees, createdEmp]);
    setIsAddEmpModalOpen(false);
    setNewEmp({ id: '', name: '', territory: 'Patna Division', target: '', primaryVertical: 'USR POWER LUBE' });
  };

  // CSV Export Utility
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

  // Metrics Calculations
  const totalSalesTarget = employees.reduce((acc, curr) => acc + curr.target, 0);
  const totalSalesAchieved = employees.reduce((acc, curr) => acc + curr.achieved, 0);
  const totalLeadsValue = leads.reduce((acc, curr) => acc + curr.estimatedValue, 0);
  const gpsVerifiedVisitsCount = dcrs.filter(d => d.photoVerified).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col justify-between shadow-xl">
        <div>
          {/* Company Branding */}
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
            <div className="bg-slate-800/80 px-2.5 py-1 rounded text-[11px] text-slate-300 flex items-center justify-between border border-slate-700/50">
              <span className="text-slate-400">Sales & DCR Management</span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: TrendingUp },
              { id: 'leads', label: 'Lead Management', icon: Users, badge: leads.length },
              { id: 'dcr', label: 'Daily Call Reports (DCR)', icon: FileText, badge: dcrs.length },
              { id: 'gps', label: 'GPS Photo Verification', icon: Camera, badge: gpsVerifiedVisitsCount },
              { id: 'verticals', label: 'Business Verticals', icon: Tag, badge: BUSINESS_VERTICALS.length },
              { id: 'performance', label: 'Staff Performance', icon: Award },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-indigo-800' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Admin Dedicated Section */}
            {isAdminLoggedIn && (
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

        {/* ADMIN LOGIN / USER BAR */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {isAdminLoggedIn ? (
            <div className="bg-amber-950/60 border border-amber-800/60 p-3 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="font-bold text-amber-200">Admin Mode Active</p>
                  <p className="text-[10px] text-amber-400">Full Privileges Granted</p>
                </div>
              </div>
              <button 
                onClick={handleAdminLogout} 
                className="text-amber-300 hover:text-white p-1 rounded hover:bg-amber-900/50"
                title="Logout Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAdminModalOpen(true)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl flex items-center justify-between text-xs border border-slate-700/60 transition"
            >
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Admin Login</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">PIN Access</span>
            </button>
          )}

          <div className="text-[10px] text-center text-slate-500 pt-1">
            USR POWER INDUSTRIES PVT LTD © 2026
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        
        {/* HEADER BAR */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900 capitalize">
                {activeTab === 'admin-manage' ? 'Admin Master Control Panel' : activeTab.replace('-', ' ')}
              </h2>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">
                USR POWER IND.
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Sales Rep DCR Logs, Leads, Employee ID Target Allocation & Admin Verification Portal
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Employee Filter */}
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 shadow-sm">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <select 
                value={selectedEmpFilter} 
                onChange={(e) => setSelectedEmpFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option value="All">All Staff / Emp IDs</option>
                {employees.map(e => (
                  <option key={e.id} value={e.id}>[{e.id}] {e.name}</option>
                ))}
              </select>
            </div>

            {/* Vertical Filter */}
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 shadow-sm">
              <Tag className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <select 
                value={selectedVerticalFilter} 
                onChange={(e) => setSelectedVerticalFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option value="All">All Verticals</option>
                {BUSINESS_VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Quick Actions */}
            <button 
              onClick={() => setIsLeadModalOpen(true)}
              className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Lead</span>
            </button>

            <button 
              onClick={() => setIsDcrModalOpen(true)}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log DCR</span>
            </button>
          </div>
        </header>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* KPI STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Company Revenue Target</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    ₹{(totalSalesAchieved).toLocaleString('en-IN')}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" /> {Math.round((totalSalesAchieved/totalSalesTarget)*100)}% Overall Achieved
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Business Leads</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{leads.length} Active</h3>
                  <span className="text-[11px] text-indigo-600 font-medium mt-1 inline-block">
                    Pipeline: ₹{(totalLeadsValue).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Submitted DCR Reports</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{dcrs.length} Reports</h3>
                  <span className="text-[11px] text-amber-600 font-medium mt-1 inline-block">
                    {dcrs.filter(d => d.callType === 'Field Visit').length} On-Site Visits
                  </span>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <PhoneCall className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">GPS Photo Verified</p>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{gpsVerifiedVisitsCount} / {dcrs.length}</h3>
                  <span className="text-[11px] text-teal-600 font-medium flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" /> Camera Tagged
                  </span>
                </div>
                <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                  <Camera className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* BUSINESS VERTICALS OVERVIEW GRID */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center border-b border-slate-100 pb-3">
                <Tag className="w-4 h-4 mr-2 text-indigo-600" /> Active Business Verticals & Divisions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {BUSINESS_VERTICALS.map((vertical) => {
                  const verticalLeads = leads.filter(l => l.vertical === vertical);
                  const verticalDcrs = dcrs.filter(d => d.vertical === vertical);
                  return (
                    <div key={vertical} className="p-3 border border-slate-200 rounded-xl bg-slate-50/50 hover:border-indigo-300 transition">
                      <p className="font-bold text-xs text-indigo-900 truncate">{vertical}</p>
                      <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                        <span>Leads: <strong>{verticalLeads.length}</strong></span>
                        <span>DCRs: <strong>{verticalDcrs.length}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FIELD ACTIVITY & STAFF SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* DCR Activity Feed */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600" /> Recent Employee DCR Logs
                  </h3>
                  <button onClick={() => setActiveTab('dcr')} className="text-xs text-indigo-600 font-semibold hover:underline">
                    View All DCRs &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {dcrs
                    .filter(d => (selectedEmpFilter === 'All' || d.empId === selectedEmpFilter) && (selectedVerticalFilter === 'All' || d.vertical === selectedVerticalFilter))
                    .slice(0, 4)
                    .map((dcr) => (
                    <div key={dcr.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg mt-0.5 ${dcr.photoVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                          {dcr.photoVerified ? <Camera className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-xs text-slate-900">{dcr.clientName}</span>
                            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded border border-indigo-100">{dcr.vertical}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{dcr.notes}</p>
                          <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
                            <span>Emp ID: <strong className="text-slate-700">{dcr.empId}</strong> ({dcr.empName})</span>
                            <span>•</span>
                            <span className="flex items-center"><MapPin className="w-3 h-3 mr-0.5" /> {dcr.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-[10px] font-semibold text-slate-400">{dcr.visitTime}</span>
                        {dcr.photoVerified && (
                          <div className="mt-1">
                            <button 
                              onClick={() => setViewPhotoModal(dcr)} 
                              className="text-[11px] text-emerald-600 font-medium hover:underline flex items-center justify-end"
                            >
                              <Eye className="w-3 h-3 mr-1" /> View Photo
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Roster */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center border-b border-slate-100 pb-3">
                  <Navigation className="w-4 h-4 mr-2 text-indigo-600" /> Employee Directory
                </h3>

                <div className="space-y-3">
                  {employees.map((emp) => {
                    const pct = Math.round((emp.achieved / emp.target) * 100);
                    return (
                      <div key={emp.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50/60">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xs text-indigo-950">{emp.name}</span>
                            <span className="text-[10px] font-mono font-bold text-indigo-600 block">{emp.id}</span>
                            <p className="text-[10px] text-slate-400">{emp.territory}</p>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            {emp.status}
                          </span>
                        </div>

                        <div className="mt-2">
                          <div className="flex justify-between text-[10px] font-medium text-slate-500 mb-1">
                            <span>Target ({pct}%)</span>
                            <span>₹{(emp.achieved).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-indigo-600 h-1.5 rounded-full" 
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: LEAD MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="relative flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search leads, clients, emp ID..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <button 
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>New Lead</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                      <th className="p-3">Client Name</th>
                      <th className="p-3">Business Vertical</th>
                      <th className="p-3">Assigned Staff</th>
                      <th className="p-3">Status / Stage</th>
                      <th className="p-3">Est. Value</th>
                      <th className="p-3">Next Follow-up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80">
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{lead.clientName}</p>
                          <p className="text-[10px] text-slate-400">{lead.address} • {lead.phone}</p>
                        </td>
                        <td className="p-3">
                          <span className="bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded border border-indigo-100 text-[10px]">
                            {lead.vertical}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-slate-800">{lead.assignedToName}</span>
                          <span className="text-[10px] text-indigo-600 font-mono block">({lead.assignedToId})</span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            lead.status === 'Hot' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {lead.status}
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">{lead.stage}</span>
                        </td>
                        <td className="p-3 font-bold text-slate-900">
                          ₹{(lead.estimatedValue).toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-slate-600 font-medium">
                          {lead.nextFollowup}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DAILY CALL REPORTS (DCR) */}
        {activeTab === 'dcr' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-bold text-slate-900 text-sm">Employee Field Call Logs & DCR</h3>
              <button 
                onClick={() => setIsDcrModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Submit DCR Entry</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                      <th className="p-3">Emp ID & Name</th>
                      <th className="p-3">Vertical / Client</th>
                      <th className="p-3">Visit Notes & Outcome</th>
                      <th className="p-3">GPS Location</th>
                      <th className="p-3">Photo Tag</th>
                      <th className="p-3">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dcrs.map((dcr) => (
                      <tr key={dcr.id} className="hover:bg-slate-50/80">
                        <td className="p-3">
                          <span className="font-bold text-slate-900">{dcr.empName}</span>
                          <span className="text-[10px] font-mono text-indigo-600 block">{dcr.empId}</span>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-slate-800">{dcr.clientName}</p>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{dcr.vertical}</span>
                        </td>
                        <td className="p-3">
                          <p className="text-slate-700">{dcr.notes}</p>
                          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 inline-block">Outcome: {dcr.outcome}</span>
                        </td>
                        <td className="p-3 text-slate-500 font-mono text-[10px]">
                          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-slate-400" /> {dcr.address}</span>
                          <span>{dcr.lat}, {dcr.lng}</span>
                        </td>
                        <td className="p-3">
                          {dcr.photoVerified ? (
                            <button onClick={() => setViewPhotoModal(dcr)} className="text-emerald-600 hover:underline flex items-center space-x
