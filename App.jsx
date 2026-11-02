import React, { useState } from 'react';
import { 
  Users, MapPin, PhoneCall, TrendingUp, Camera, Calendar, Plus, 
  Search, Filter, CheckCircle, Clock, Award, 
  Navigation, DollarSign, UserPlus, Eye, FileText, Check, X, RefreshCw, Briefcase, Tag
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
  { id: 'DCR-501', empId: 'USR-EMP-102', empName: 'Amit Kumar', vertical: 'TURBO OIL', clientName: 'Punchkuteer Resort & Eco Stay', visitTime: '10:30 AM', callType: 'Field Visit', outcome: 'Order Confirmed', notes: 'Finalized annual supply contract for heavy lube and Turbo Oil. Payment terms agreed.', nextDate: '2026-11-10', lat: '24.5821 N', lng: '84.9754 E', address: 'NH-2 Dobhi, Gaya', photoVerified: true, photoUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80' },
  { id: 'DCR-502', empId: 'USR-EMP-101', empName: 'Rohan Sharma', vertical: 'DIGITAL MARKETING', clientName: 'Bihar Auto Spares', visitTime: '12:15 PM', callType: 'Phone Call', outcome: 'Follow Up Required', notes: 'Pitched customized packaging & digital promotional campaign bundle.', nextDate: '2026-11-04', lat: '25.6121 N', lng: '85.1412 E', address: 'Exhibition Road, Patna', photoVerified: false, photoUrl: null },
  { id: 'DCR-503', empId: 'USR-EMP-103', empName: 'Priya Singh', vertical: 'TAX AND LEGAL', clientName: 'Zenith Corporate Advisors', visitTime: '02:45 PM', callType: 'Field Visit', outcome: 'Demo Provided', notes: 'Demonstrated tax compliance audit package and legal advisory workflow.', nextDate: '2026-11-05', lat: '26.1209 N', lng: '85.3647 E', address: 'Boreing Road, Patna', photoVerified: true, photoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees] = useState(INITIAL_EMPLOYEES);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [dcrs, setDcrs] = useState(INITIAL_DCR);
  
  // Filters
  const [selectedEmpFilter, setSelectedEmpFilter] = useState('All');
  const [selectedVerticalFilter, setSelectedVerticalFilter] = useState('All');

  // Modal States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isDcrModalOpen, setIsDcrModalOpen] = useState(false);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);
  const [viewPhotoModal, setViewPhotoModal] = useState(null);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    clientName: '', contactPerson: '', phone: '', address: '',
    status: 'Hot', stage: 'Contacted', estimatedValue: '', assignedToId: 'USR-EMP-101', vertical: 'USR POWER LUBE', nextFollowup: ''
  });

  // New DCR Form State
  const [newDcr, setNewDcr] = useState({
    empId: 'USR-EMP-101', clientName: '', vertical: 'USR POWER LUBE', callType: 'Field Visit',
    outcome: 'Follow Up Required', notes: '', nextDate: '',
    lat: '25.5941 N', lng: '85.1376 E', address: 'Main Market, Patna',
    photoVerified: false, photoUrl: null
  });

  // GPS Simulation
  const [capturingGps, setCapturingGps] = useState(false);
  const [capturedLocation, setCapturedLocation] = useState(null);

  const simulateGPS = () => {
    setCapturingGps(true);
    setTimeout(() => {
      const mockLocations = [
        { lat: '25.5941 N', lng: '85.1376 E', address: 'Exhibition Road, Patna' },
        { lat: '24.7955 N', lng: '85.0002 E', address: 'Baksoti Road, Gaya' },
        { lat: '26.1209 N', lng: '85.3647 E', address: 'Kanti Hub, Muzaffarpur' },
        { lat: '25.3487 N', lng: '86.9746 E', address: 'Station Road, Bhagalpur' }
      ];
      const loc = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      setCapturedLocation(loc);
      setNewDcr(prev => ({
        ...prev,
        lat: loc.lat,
        lng: loc.lng,
        address: loc.address,
        photoVerified: true,
        photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=400&q=80'
      }));
      setCapturingGps(false);
    }, 1200);
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
    setCapturedLocation(null);
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
              <span className="text-slate-400">Field CRM & DCR Portal</span>
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
          </nav>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/60 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">
                USR
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-200">Admin Control</p>
                <p className="text-slate-400 text-[10px]">ID: USR-ADMIN-01</p>
              </div>
            </div>
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" title="Connected"></span>
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
                {activeTab.replace('-', ' ')}
              </h2>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">
                USR POWER IND.
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Field Force Tracker, DCR Logging, GPS Photo Verification & Product Vertical Dashboard
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

            {/* Quick Action Buttons */}
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
                    <CheckCircle className="w-3 h-3 mr-1" /> Camera & Location Tagged
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
                  <Navigation className="w-4 h-4 mr-2 text-indigo-600" /> Employee ID Directory
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

            {/* LEADS TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                      <th className="p-3">Client Name</th>
                      <th className="p-3">Business Vertical</th>
                      <th className="p-3">Assigned Emp ID</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Stage</th>
                      <th className="p-3">Est. Value</th>
                      <th className="p-3">Next Follow-Up</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads
                      .filter(l => (selectedEmpFilter === 'All' || l.assignedToId === selectedEmpFilter) && (selectedVerticalFilter === 'All' || l.vertical === selectedVerticalFilter))
                      .map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{lead.clientName}</span>
                            <span className="text-[10px] text-slate-400">{lead.contactPerson} ({lead.phone})</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px] border border-indigo-100">
                              {lead.vertical}
                            </span>
                          </td>
                          <td className="p-3 font-medium text-slate-800">
                            <span className="font-mono text-xs font-bold text-slate-700">{lead.assignedToId}</span>
                            <span className="text-[10px] text-slate-400 block">{lead.assignedToName}</span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              lead.status === 'Hot' ? 'bg-rose-100 text-rose-700' :
                              lead.status === 'Warm' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                              {lead.stage}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">
                            ₹{(lead.estimatedValue).toLocaleString('en-IN')}
                          </td>
                          <td className="p-3">
                            <span className="flex items-center text-slate-600 text-[11px]">
                              <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                              {lead.nextFollowup}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button 
                              onClick={() => {
                                setNewDcr(prev => ({ 
                                  ...prev, 
                                  clientName: lead.clientName, 
                                  empId: lead.assignedToId,
                                  vertical: lead.vertical 
                                }));
                                setIsDcrModalOpen(true);
                              }}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded text-[10px] font-semibold"
                            >
                              Log Call
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

        {/* TAB 3: DAILY CALL REPORT (DCR) */}
        {activeTab === 'dcr' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">All Field Activity & Customer DCR Logs</h3>
              <button 
                onClick={() => setIsDcrModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Log New DCR</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dcrs
                .filter(d => (selectedEmpFilter === 'All' || d.empId === selectedEmpFilter) && (selectedVerticalFilter === 'All' || d.vertical === selectedVerticalFilter))
                .map((dcr) => (
                  <div key={dcr.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {dcr.vertical}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{dcr.clientName}</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{dcr.visitTime}</span>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{dcr.notes}"
                    </p>

                    <div className="text-xs space-y-1 text-slate-500">
                      <div className="flex justify-between">
                        <span>Outcome:</span>
                        <span className="font-semibold text-slate-800">{dcr.outcome}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Staff ID:</span>
                        <span className="font-mono font-bold text-indigo-600">{dcr.empId} ({dcr.empName})</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Follow-up:</span>
                        <span className="font-semibold text-indigo-600">{dcr.nextDate || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Geo Tag Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center text-[10px] text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1" />
                        <span className="truncate max-w-[150px]">{dcr.address}</span>
                      </div>

                      {dcr.photoVerified ? (
                        <button 
                          onClick={() => setViewPhotoModal(dcr)}
                          className="flex items-center text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold hover:bg-emerald-200"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> GPS Verified
                        </button>
                      ) : (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">No Photo</span>
                      )}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GPS & PHOTO VERIFICATION */}
        {activeTab === 'gps' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-emerald-400" /> On-Site Geo Tagging & Field Proof
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Ensure authenticity of sales visits for USR Power Industries across all regional territories.
                </p>
              </div>

              <button 
                onClick={() => setIsGpsModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Simulate GPS Capture Visit</span>
              </button>
            </div>

            {/* VERIFIED GALLERY GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dcrs.filter(d => d.photoVerified).map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="relative h-48 bg-slate-100">
                    {item.photoUrl ? (
                      <img src={item.photoUrl} alt="Site Visit Proof" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No Image</div>
                    )}
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center font-semibold">
                      <MapPin className="w-3 h-3 text-rose-400 mr-1" />
                      {item.lat}, {item.lng}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.clientName}</h4>
                        <p className="text-[11px] text-indigo-600 font-mono font-bold">Emp ID: {item.empId}</p>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-100">
                        {item.vertical}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{item.notes}</p>
                    <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
                      <span>Address: {item.address}</span>
                      <span>Time: {item.visitTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BUSINESS VERTICALS DIRECTORY */}
        {activeTab === 'verticals' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BUSINESS_VERTICALS.map((vert) => {
                const countLeads = leads.filter(l => l.vertical === vert).length;
                const countDcrs = dcrs.filter(d => d.vertical === vert).length;
                return (
                  <div key={vert} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{vert}</h4>
                        <p className="text-[10px] text-slate-400">USR Power Industries Div.</p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-semibold text-slate-700">
                      <span>Active Pipeline Leads: <strong className="text-indigo-600">{countLeads}</strong></span>
                      <span>DCR Logs: <strong className="text-emerald-600">{countDcrs}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: STAFF PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Employee Performance Cards */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-indigo-600" /> Individual Sales Targets vs Achieved
                </h3>

                <div className="space-y-4">
                  {employees.map((emp) => {
                    const pct = Math.round((emp.achieved / emp.target) * 100);
                    return (
                      <div key={emp.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-mono text-xs font-bold text-indigo-600 block">{emp.id}</span>
                            <h4 className="font-bold text-xs text-slate-900">{emp.name}</h4>
                            <span className="text-[10px] text-slate-400">{emp.territory} • {emp.primaryVertical}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-xs text-slate-900">₹{(emp.achieved).toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-slate-400 block">Target: ₹{(emp.target).toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full ${pct >= 90 ? 'bg-emerald-500' : pct >= 50 ? 'bg-indigo-600' : 'bg-rose-500'}`}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                          <span>Fulfillment: {pct}%</span>
                          <span>Daily Visits Avg: {emp.visitsToday} / day</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Territory Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
                  Territory & Employee Revenue Breakdown
                </h3>

                <div className="space-y-3">
                  {employees.map((emp) => (
                    <div key={emp.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 font-mono font-bold text-xs">
                          {emp.id.replace('USR-EMP-', 'E')}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900">{emp.territory}</p>
                          <p className="text-[10px] text-slate-400">Assigned: {emp.name} ({emp.id})</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-xs text-emerald-600">₹{(emp.achieved).toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-slate-400">Achieved Sales</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: ADD NEW LEAD */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Create New Lead</h3>
                <p className="text-[10px] text-indigo-400">USR POWER INDUSTRIES PVT LTD</p>
              </div>
              <button onClick={() => setIsLeadModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Business Vertical / Division</label>
                <select 
                  value={newLead.vertical}
                  onChange={e => setNewLead({...newLead, vertical: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2 outline-none font-semibold text-indigo-900"
                >
                  {BUSINESS_VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company / Client Name</label>
                <input 
                  type="text" required
                  value={newLead.clientName}
                  onChange={e => setNewLead({...newLead, clientName: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Bihar Auto Spares"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Person</label>
                  <input 
                    type="text" required
                    value={newLead.contactPerson}
                    onChange={e => setNewLead({...newLead, contactPerson: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Owner / Manager"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input 
                    type="tel" required
                    value={newLead.phone}
                    onChange={e => setNewLead({...newLead, phone: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="98350XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Address / Territory</label>
                <input 
                  type="text" required
                  value={newLead.address}
                  onChange={e => setNewLead({...newLead, address: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Full Address"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assign Employee ID</label>
                  <select 
                    value={newLead.assignedToId}
                    onChange={e => setNewLead({...newLead, assignedToId: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 outline-none"
                  >
                    {employees.map(e => <option key={e.id} value={e.id}>[{e.id}] {e.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Est. Deal Value (₹)</label>
                  <input 
                    type="number" required
                    value={newLead.estimatedValue}
                    onChange={e => setNewLead({...newLead, estimatedValue: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 outline-none"
                    placeholder="100000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status Priority</label>
                  <select 
                    value={newLead.status}
                    onChange={e => setNewLead({...newLead, status: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 outline-none"
                  >
                    <option value="Hot">Hot</option>
                    <option value="Warm">Warm</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Next Follow-Up Date</label>
                  <input 
                    type="date" required
                    value={newLead.nextFollowup}
                    onChange={e => setNewLead({...newLead, nextFollowup: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsLeadModalOpen(false)} className="px-4 py-2 text-slate-500 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: LOG NEW DCR / VISIT */}
      {isDcrModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Log Daily Call Report (DCR)</h3>
                <p className="text-[10px] text-emerald-400">USR POWER INDUSTRIES PVT LTD</p>
              </div>
              <button onClick={() => setIsDcrModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDcr} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Employee ID</label>
                  <select 
                    value={newDcr.empId}
                    onChange={e => setNewDcr({...newDcr, empId: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 outline-none font-mono font-bold"
                  >
                    {employees.map(e => <option key={e.id} value={e.id}>[{e.id}] {e.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Business Vertical</label>
                  <select 
                    value={newDcr.vertical}
                    onChange={e => setNewDcr({...newDcr, vertical: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 outline-none font-semibold text-indigo-900"
                  >
                    {BUSINESS_VERTICALS.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Client / Party Name</label>
                <input 
                  type="text" required
                  value={newDcr.clientName}
                  onChange={e => setNewDcr({...newDcr, clientName: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2 outline-none"
                  placeholder="e.g. Punchkuteer Resort"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Visit Discussion Notes</label>
                <textarea 
                  rows="2" required
                  value={newDcr.notes}
                  onChange={e => setNewDcr({...newDcr, notes: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-2 outline-none"
                  placeholder="Enter call outcome, product discussion details..."
                />
              </div>

              {/* GPS Capture Component */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1" /> GPS Verification
                  </span>
                  <button 
                    type="button" 
                    onClick={simulateGPS}
                    className="bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded font-semibold flex items-center"
                  >
                    {capturingGps ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <Camera className="w-3 h-3 mr-1" />}
                    {capturingGps ? 'Fetching GPS...' : 'Capture Location'}
                  </button>
                </div>

                {newDcr.photoVerified ? (
                  <div className="text-[10px] text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 flex justify-between items-center">
                    <span>GPS Captured: {newDcr.lat}, {newDcr.lng}</span>
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400">Click capture to simulate live GPS location & photo proof.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Call Outcome</label>
                  <select 
                    value={newDcr.outcome}
                    onChange={e => setNewDcr({...newDcr, outcome: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 outline-none"
                  >
                    <option value="Follow Up Required">Follow Up Required</option>
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Demo Provided">Demo Provided</option>
                    <option value="Not Interested">Not Interested</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Next Follow-Up</label>
                  <input 
                    type="date"
                    value={newDcr.nextDate}
                    onChange={e => setNewDcr({...newDcr, nextDate: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-2 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsDcrModalOpen(false)} className="px-4 py-2 text-slate-500 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700">Submit DCR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW PHOTO & GPS PROOF */}
      {viewPhotoModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="p-3 bg-slate-900 text-white flex justify-between items-center">
              <span className="font-bold text-xs">GPS Verification Proof</span>
              <button onClick={() => setViewPhotoModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="h-56 bg-slate-100 rounded-xl overflow-hidden">
                <img src={viewPhotoModal.photoUrl} alt="Location Proof" className="w-full h-full object-cover" />
              </div>

              <div className="text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-slate-900">{viewPhotoModal.clientName}</p>
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">{viewPhotoModal.vertical}</span>
                </div>
                <p className="text-slate-500 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1" />
                  {viewPhotoModal.lat}, {viewPhotoModal.lng}
                </p>
                <p className="text-slate-400 text-[11px]">{viewPhotoModal.address}</p>
                <p className="text-indigo-600 font-mono font-bold text-[11px] pt-1">Visited by: Emp ID [{viewPhotoModal.empId}] ({viewPhotoModal.visitTime})</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: STANDALONE GPS CAPTURE SIMULATOR */}
      {isGpsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-5 space-y-4 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-slate-900 text-base">Live Field Location Scanner</h3>
            <p className="text-xs text-slate-500">
              Simulate capturing GPS coordinates and camera photo stamp for USR Power Industries field staff.
            </p>

            {capturedLocation ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs text-left space-y-1">
                <p className="font-bold">✓ Coordinates Verified</p>
                <p>Latitude: {capturedLocation.lat}</p>
                <p>Longitude: {capturedLocation.lng}</p>
                <p className="text-[10px] text-slate-500">Location: {capturedLocation.address}</p>
              </div>
            ) : (
              <button 
                onClick={simulateGPS}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
              >
                {capturingGps ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4 text-emerald-400" />}
                <span>{capturingGps ? 'Locating Satellites...' : 'Capture GPS Coordinates'}</span>
              </button>
            )}

            <button 
              onClick={() => { setIsGpsModalOpen(false); setCapturedLocation(null); }}
              className="text-xs text-slate-400 font-medium hover:underline block mx-auto"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
