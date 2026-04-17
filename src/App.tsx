/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Users, 
  UserRound, 
  LayoutDashboard, 
  ClipboardList, 
  Settings, 
  PlusCircle, 
  Stethoscope, 
  GanttChartSquare, 
  Database,
  Bell,
  History,
  Search,
  MoreVertical,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  ChevronRight,
  Filter,
  Download,
  AlertCircle,
  FileText,
  CreditCard,
  Activity,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Pencil,
  Plus,
  Upload,
  UserPlus
} from 'lucide-react';
import { useState, useEffect, type ReactNode } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type View = 'login' | 'dashboard' | 'patient-360' | 'patient-listing' | 'patient-detail' | 'user-management' | 'pod-management' | 'add-clinic' | 'case-management' | 'rule-engine' | 'system-config';

interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  caseType: string;
  insurance: string;
  queue: string;
  disposition: string;
  assignedTo: string;
  provider: string;
  clinic: string;
  emr: string;
  urgency: 'High' | 'Medium' | 'Low';
  network: string;
  dueDate: string;
  lastTouch: string;
  status: 'Active' | 'Pending' | 'Archived';
}

// --- Mock Data ---
const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P-1001',
    name: 'Johnathan Smith',
    dob: '05/12/1985',
    gender: 'Male',
    caseType: 'Orthopedic',
    insurance: 'Blue Cross Blue Shield',
    queue: 'Initial Review',
    disposition: 'Pending',
    assignedTo: 'Sarah Connor',
    provider: 'Dr. Robert Wilson',
    clinic: 'Keystone Chiropractic',
    emr: 'Epic',
    urgency: 'High',
    network: 'In-Network',
    dueDate: '04/20/2026',
    lastTouch: '04/14/2026',
    status: 'Active'
  },
  {
    id: 'P-1002',
    name: 'Emily Davis',
    dob: '11/22/1992',
    gender: 'Female',
    caseType: 'Neurology',
    insurance: 'Aetna',
    queue: 'Clinical Review',
    disposition: 'Approved',
    assignedTo: 'Michael Scott',
    provider: 'Dr. Jane Foster',
    clinic: 'Greenwood Family Chiropractic',
    emr: 'AthenaHealth',
    urgency: 'Medium',
    network: 'In-Network',
    dueDate: '04/25/2026',
    lastTouch: '04/13/2026',
    status: 'Active'
  },
  {
    id: 'P-1003',
    name: 'Michael Brown',
    dob: '08/05/1978',
    gender: 'Male',
    caseType: 'Cardiology',
    insurance: 'UnitedHealthcare',
    queue: 'Billing',
    disposition: 'Denied',
    assignedTo: 'Jim Halpert',
    provider: 'Dr. Stephen Strange',
    clinic: 'Chicagoland Wellmed Center',
    emr: 'Cerner',
    urgency: 'Low',
    network: 'Out-of-Network',
    dueDate: '05/01/2026',
    lastTouch: '04/10/2026',
    status: 'Pending'
  }
];

const CLIENT_CATEGORIES = [
  { name: 'Single-location & Individual owner', value: 75, color: '#8bc53d' },
  { name: 'Multi-location', value: 18, color: '#f9b17a' },
  { name: 'Corporate', value: 7, color: '#7ab3f9' },
];

const EXPIRY_ALERTS = [
  { name: 'Health First Chiropractic, Inc.', date: '04/15/2026', days: 0, status: 'red' },
  { name: 'Greenwood Family Chiropractic, LLC', date: '05/08/2026', days: 23, status: 'yellow' },
];

// --- Components ---

type LogoProps = {
  className?: string;
  imageClassName?: string;
  alt?: string;
};

const Logo = ({
  className,
  imageClassName = "h-23 w-auto",
  alt = "MySage logo",
}: LogoProps) => (
  <div className={cn("flex items-center justify-center", className)}>
    <img
      src="/sage_healthy_rcm_logo.png"
      alt={alt}
      className={cn("object-contain select-none", imageClassName)}
      loading="eager"
      draggable={false}
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = "none";
      }}
    />
  </div>
);

const Layout = ({ children, currentView, setView }: { children: ReactNode, currentView: View, setView: (v: View) => void }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'patient-360', label: 'Patient 360 View', icon: UserRound },
    { id: 'patient-listing', label: 'Patient Listing', icon: ClipboardList },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'pod-management', label: 'POD Management', icon: Database },
    { id: 'add-clinic', label: 'Add Clinic', icon: PlusCircle },
    { id: 'case-management', label: 'Case Management', icon: GanttChartSquare },
    { id: 'rule-engine', label: 'Rule Engine', icon: Settings },
    { id: 'system-config', label: 'System Configuration', icon: Settings },
  ];

  return (
    <div className="grid grid-cols-[220px_1fr] grid-rows-[60px_1fr] h-screen bg-bg-light overflow-hidden">
      {/* Sidebar */}
      <aside className="row-span-2 bg-white border-r border-border flex flex-col shrink-0">
        <div className="p-5 pb-8 flex items-center justify-center">
          <img
            src="/sage_healthy_rcm_logo.png"
            alt="MySage Logo"
            className="h-13 w-auto object-contain select-none"
            loading="eager"
            draggable={false}
          />
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setView(item.id as View)}
              className={cn(
                "nav-item",
                currentView === item.id && "nav-item-active"
              )}
            >
              <item.icon size={18} />
              <span className="text-[13px]">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={() => setView('login')}
            className="flex items-center gap-3 px-5 py-2 w-full text-text-muted hover:text-red-theme transition-colors"
          >
            <XCircle size={18} />
            <span className="text-[13px] font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="bg-white border-b border-border flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-5 text-text-muted">
          <span className="font-medium">
            {dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} | {dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-sage text-white px-4 py-1.5 rounded font-semibold text-[13px] hover:opacity-90 transition-opacity">
            History
          </button>
          <div className="text-lg text-text-muted cursor-pointer leading-none">&bull; &bull; &bull;</div>
        </div>
      </header>

      {/* View Container */}
      <div className="overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
};

// --- Pages ---

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Logo className="mb-5" iconSize="w-10 h-10" />
      
      <div className="w-[400px] bg-sage shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-10 relative">
        <div className="flex flex-col items-center">
          {/* <h2 className="text-xl font-extrabold text-white mb-8 tracking-widest uppercase">MySage</h2> */}
          <h2 className="text-2xl text-white mb-7 tracking-widest uppercase">
          <span className="font-extrabold ml-1">MySage</span>
          <span className="font-light">HUB</span>
        </h2>
          <div className="w-full space-y-5">
            <div>
              <label className="block text-white text-[11px] font-semibold mb-2 uppercase">Email Address</label>
              <input 
                type="email" 
                defaultValue="admin@mysage.com"
                className="w-full p-3 bg-[#f1f2f6] border-none rounded-md outline-none text-text-main"
              />
            </div>
            
            <div className="relative">
              <label className="block text-white text-[11px] font-semibold mb-2 uppercase">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                defaultValue="password123"
                className="w-full p-3 bg-[#f1f2f6] border-none rounded-md outline-none text-text-main"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="button"
              onClick={onLogin}
              className="block mx-auto mt-8 rounded-full bg-white px-8 py-2.5 text-sm font-extrabold uppercase tracking-wide text-sage shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-sage"
            >
              LOG IN
            </button>
          </div>
        </div>
      </div>

      <div className="w-[400px] mt-2">
        <div className="text-right font-bold text-sage text-[11px]">POWERED BY HUBONE SYSTEMS</div>
        <div className="text-center text-[#999] text-[10px] mt-10"></div>
        <div className="text-center text-[#999] text-[13px]">© 2014–2026 HubOne Systems Inc. – All Rights Reserved</div>
      </div>
    </div>
  );
};

const Dashboard = ({ setView }: { setView: (v: View) => void }) => {
  const stats = [
    { label: 'Total Clients', value: '89', trend: '+12% from last month', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Active Clients', value: '41', trend: '46% of total', icon: CheckCircle2, color: 'text-sage', bg: 'bg-sage-light' },
    { label: 'Total Locations', value: '211', trend: '67 linked to active clients', icon: Database, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Total Agreements', value: '104', trend: 'Active contracts', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Total Services', value: '12', trend: 'Service categories', icon: Settings, color: 'text-pink-500', bg: 'bg-pink-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="kpi-card"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="kpi-num">{stat.value}</div>
                <div className="kpi-label">{stat.label}</div>
              </div>
              <div className="p-2 bg-[#f8fbf5] rounded">
                <stat.icon className="text-sage" size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Categories */}
        <div className="card-panel lg:col-span-2">
          <h3 className="panel-title">Client Categories</h3>
          <div className="h-[250px] flex items-center justify-between">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CLIENT_CATEGORIES}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CLIENT_CATEGORIES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3 pl-8">
              {CLIENT_CATEGORIES.map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-[12px] font-medium text-text-muted">{cat.name}</span>
                  </div>
                  <span className="text-[12px] font-bold">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contract Expiry Alerts */}
        <div className="card-panel">
          <h3 className="panel-title">Contract Expiry Alerts</h3>
          <div className="space-y-4">
            {EXPIRY_ALERTS.map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#fafafa] border border-border rounded">
                <div>
                  <div className="text-[13px] font-bold">{alert.name}</div>
                  <div className="text-[11px] text-text-muted">Expires: {alert.date}</div>
                </div>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase",
                  alert.status === 'red' ? "bg-[#ffeaea] text-[#d63031]" : "bg-[#fff9e6] text-[#e17055]"
                )}>
                  {alert.days} days
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Clients */}
      <div className="card-panel">
        <div className="flex items-center justify-between mb-6">
          <h3 className="panel-title mb-0 border-none pb-0">Recent Clients</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search clients..."
                className="pl-9 pr-4 py-1.5 bg-[#f1f2f6] border-none rounded text-[12px] outline-none w-64"
              />
            </div>
            <button 
              onClick={() => setView('patient-listing')}
              className="bg-sage text-white px-4 py-1.5 rounded font-semibold text-[12px] flex items-center gap-2"
            >
              View All
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>UniqueID</th>
                <th>Practice Name</th>
                <th>DBA</th>
                <th>Primary Contact</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PATIENTS.map((p, i) => (
                <tr key={i} className="hover:bg-[#f8fbf5] transition-colors group">
                  <td className="font-bold text-sage">{p.id}</td>
                  <td className="font-semibold">{p.clinic}</td>
                  <td className="text-text-muted">N/A</td>
                  <td>Regan Hyde, DC</td>
                  <td>2702161200</td>
                  <td>
                    <span className="pill-status">Active</span>
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-text-muted hover:text-sage"><Eye size={16} /></button>
                      <button className="text-text-muted hover:text-sage"><FileText size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PatientListing = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Patients</h2>
        <button className="bg-sage text-white px-6 py-2 rounded font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={18} />
          New Patient
        </button>
      </div>

      <div className="card-panel space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or provider..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#f1f2f6] border-none rounded text-sm outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded text-sm font-medium text-text-muted hover:bg-[#fafafa]">
            <Filter size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded text-sm font-medium text-text-muted hover:bg-[#fafafa]">
            <Download size={18} />
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Patient ID</th>
                <th>Case Type</th>
                <th>Insurance</th>
                <th>Queue</th>
                <th>Disposition</th>
                <th>Urgency</th>
                <th>Due Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PATIENTS.map((p, i) => (
                <tr key={i} className="hover:bg-[#f8fbf5] transition-colors group cursor-pointer" onClick={() => setView('patient-detail')}>
                  <td className="font-bold text-text-main">{p.name}</td>
                  <td className="text-text-muted font-mono">{p.id}</td>
                  <td>{p.caseType}</td>
                  <td>{p.insurance}</td>
                  <td>
                    <span className="pill-status bg-[#f1f1f1] text-text-muted">{p.queue}</span>
                  </td>
                  <td>
                    <span className={cn(
                      "pill-status",
                      p.disposition === 'Approved' ? "bg-[#e8f5d7] text-[#5d8e25]" : 
                      p.disposition === 'Denied' ? "bg-[#ffeaea] text-[#d63031]" : "bg-[#fff9e6] text-[#e17055]"
                    )}>
                      {p.disposition}
                    </span>
                  </td>
                  <td>
                    <span className={cn(
                      "flex items-center gap-1 text-[10px] font-bold uppercase",
                      p.urgency === 'High' ? "text-red-theme" : p.urgency === 'Medium' ? "text-yellow-theme" : "text-blue-500"
                    )}>
                      <AlertCircle size={10} />
                      {p.urgency}
                    </span>
                  </td>
                  <td className="text-text-muted">{p.dueDate}</td>
                  <td className="text-right">
                    <button className="p-2 text-text-muted hover:text-sage"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PatientDetail = () => {
  const sections = [
    {
      title: 'Patient Information',
      fields: [
        { label: 'Full Name', value: 'Johnathan Smith' },
        { label: 'Patient ID', value: 'P-1001' },
        { label: 'Date of Birth', value: '05/12/1985' },
        { label: 'Gender', value: 'Male' },
        { label: 'SSN (Last 4)', value: '4421' },
        { label: 'Phone Number', value: '(555) 123-4567' },
        { label: 'Email', value: 'j.smith@example.com' },
        { label: 'Address', value: '123 Health Way, Suite 100, Chicago, IL 60601' },
      ]
    },
    {
      title: 'Clinic Information',
      fields: [
        { label: 'Clinic Name', value: 'Keystone Chiropractic' },
        { label: 'Clinic ID', value: 'C-992' },
        { label: 'Location', value: 'Chicago Main' },
        { label: 'EMR System', value: 'Epic' },
        { label: 'Primary Contact', value: 'Regan Hyde' },
      ]
    },
    {
      title: 'Provider Information',
      fields: [
        { label: 'Attending Provider', value: 'Dr. Robert Wilson' },
        { label: 'NPI Number', value: '1234567890' },
        { label: 'Specialty', value: 'Orthopedic Surgery' },
        { label: 'Referral Source', value: 'N/A' },
      ]
    },
    {
      title: 'Insurance Details',
      fields: [
        { label: 'Primary Payer', value: 'Blue Cross Blue Shield' },
        { label: 'Member ID', value: 'BCBS992831' },
        { label: 'Group Number', value: 'GRP-1002' },
        { label: 'Plan Type', value: 'PPO' },
        { label: 'Effective Date', value: '01/01/2026' },
      ]
    },
    {
      title: 'EV Details',
      fields: [
        { label: 'EV Status', value: 'Verified' },
        { label: 'Verification Date', value: '04/10/2026' },
        { label: 'Verified By', value: 'System Auto' },
        { label: 'Reference Number', value: 'EV-9921' },
      ]
    },
    {
      title: 'PA Details',
      fields: [
        { label: 'PA Required', value: 'Yes' },
        { label: 'PA Status', value: 'In-Progress' },
        { label: 'Auth Number', value: 'N/A' },
        { label: 'Start Date', value: 'N/A' },
        { label: 'End Date', value: 'N/A' },
      ]
    },
    {
      title: 'PI Details',
      fields: [
        { label: 'PI Case', value: 'No' },
        { label: 'Attorney Name', value: 'N/A' },
        { label: 'Claim Number', value: 'N/A' },
      ]
    },
    {
      title: 'Workflow Status',
      fields: [
        { label: 'Current Queue', value: 'Initial Review' },
        { label: 'Assigned To', value: 'Sarah Connor' },
        { label: 'Priority', value: 'High' },
        { label: 'Next Action', value: 'Clinical Review' },
      ]
    },
    {
      title: 'Notes',
      fields: [
        { label: 'Clinical Notes', value: 'Patient reports persistent lower back pain after injury. Scheduled for initial assessment.' },
        { label: 'Internal Comments', value: 'Insurance verification pending final confirmation of deductible.' },
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Patient Detail</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border rounded text-sm font-medium text-text-muted hover:bg-[#fafafa]">Edit Patient</button>
          <button className="px-4 py-2 bg-sage text-white rounded text-sm font-bold hover:opacity-90">Save Changes</button>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="card-panel">
            <h3 className="panel-title">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.fields.map((field, fIdx) => (
                <div key={fIdx} className="detail-box">
                  <div className="detail-box-label">{field.label}</div>
                  <div className="detail-box-val">
                    {field.value || 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Patient360 = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Charges', 'Submissions', 'Collections', 'AR', 'EV / Benefits', 'Prior Authorization', 'Documents', 'Activity Timeline'];

  const summaryCards = [
    { label: 'Total Charges', value: '$12,450.00', icon: CreditCard, color: 'text-blue-500' },
    { label: 'Total Submitted', value: '$10,200.00', icon: Upload, color: 'text-purple-500' },
    { label: 'Total Collected', value: '$8,150.00', icon: CheckCircle2, color: 'text-sage' },
    { label: 'Open AR', value: '$4,300.00', icon: AlertCircle, color: 'text-orange-500' },
    { label: 'Active PA', value: '3', icon: ShieldCheck, color: 'text-indigo-500' },
    { label: 'EV Status', value: 'Verified', icon: Activity, color: 'text-green-500' },
    { label: 'Last Activity', value: '04/14/2026', icon: Clock, color: 'text-slate-500' },
    { label: 'Alerts', value: '2', icon: Bell, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-panel">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-sage flex items-center justify-center text-white font-bold text-xl" style={{ borderRadius: '50% 0 50% 50%' }}>
              JS
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-800">Johnathan Smith</h2>
                <span className="pill-status">Active</span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-text-muted font-medium">
                <span className="flex items-center gap-1"><UserRound size={14} /> ID: P-1001</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> DOB: 05/12/1985</span>
                <span className="flex items-center gap-1"><Activity size={14} /> Male</span>
                <span className="flex items-center gap-1"><Stethoscope size={14} /> Keystone Chiropractic</span>
                <span className="flex items-center gap-1"><ShieldCheck size={14} /> BCBS</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-border rounded text-[12px] font-bold text-text-muted hover:bg-[#fafafa]">
              <Pencil size={14} /> Edit Patient
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-border rounded text-[12px] font-bold text-text-muted hover:bg-[#fafafa]">
              <Plus size={14} /> Add Note
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-sage text-white rounded text-[12px] font-bold hover:opacity-90">
              <Upload size={14} /> Upload Document
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {summaryCards.map((card, i) => (
          <div key={i} className="kpi-card flex flex-col items-center text-center p-3">
            <card.icon className={card.color} size={18} />
            <span className="kpi-label !mt-1">{card.label}</span>
            <span className="text-[13px] font-bold text-text-main mt-1">{card.value}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-1 border-b border-border overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-3 text-[12px] font-bold whitespace-nowrap transition-all border-b-2",
                activeTab === tab 
                  ? "text-sage border-sage" 
                  : "text-text-muted border-transparent hover:text-text-main"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="card-panel min-h-[300px]">
          <h3 className="panel-title">{activeTab}</h3>
          <div className="flex flex-col items-center justify-center text-text-muted py-20 opacity-50">
            <Database size={40} className="mb-4" />
            <p className="text-[13px] font-medium">Detailed {activeTab} data will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const users = [
    { name: 'Sarah Connor', email: 's.connor@mysage.com', role: 'Admin', dept: 'Operations', status: 'Active', lastLogin: '04/14/2026 10:30' },
    { name: 'Michael Scott', email: 'm.scott@mysage.com', role: 'Manager', dept: 'Clinical', status: 'Active', lastLogin: '04/14/2026 09:15' },
    { name: 'Jim Halpert', email: 'j.halpert@mysage.com', role: 'Agent', dept: 'Billing', status: 'Inactive', lastLogin: '04/10/2026 16:45' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">User Management</h2>
        <button className="bg-sage text-white px-6 py-2 rounded font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <UserPlus size={18} />
          Create User
        </button>
      </div>

      <div className="card-panel space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#f1f2f6] border-none rounded text-sm outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded text-sm font-medium text-text-muted hover:bg-[#fafafa]">
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Login</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-[#f8fbf5] transition-colors">
                  <td className="font-bold text-text-main">{user.name}</td>
                  <td className="text-text-muted">{user.email}</td>
                  <td>
                    <span className="pill-status bg-[#f1f1f1] text-text-muted">{user.role}</span>
                  </td>
                  <td>{user.dept}</td>
                  <td>
                    <span className={cn(
                      "pill-status",
                      user.status === 'Active' ? "bg-[#e8f5d7] text-[#5d8e25]" : "bg-[#ffeaea] text-[#d63031]"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="text-text-muted">{user.lastLogin}</td>
                  <td className="text-right">
                    <button className="p-2 text-text-muted hover:text-sage"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PodManagement = () => {
  const pods = [
    { id: 'POD-A', name: 'Operations East', manager: 'Sarah Connor', agents: 12, performance: 94 },
    { id: 'POD-B', name: 'Operations West', manager: 'Michael Scott', agents: 8, performance: 88 },
    { id: 'POD-C', name: 'Billing North', manager: 'Jim Halpert', agents: 15, performance: 91 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">POD Management</h2>
        <button className="bg-sage text-white px-6 py-2 rounded font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Create POD
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pods.map((pod, i) => (
          <div key={i} className="card-panel">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-text-main">{pod.name}</h3>
                <span className="text-[11px] font-bold text-sage uppercase tracking-widest">{pod.id}</span>
              </div>
              <div className="p-2 bg-[#f8fbf5] rounded text-sage">
                <Database size={20} />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-[12px]">
                <span className="text-text-muted">Manager:</span>
                <span className="font-bold">{pod.manager}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-text-muted">Active Agents:</span>
                <span className="font-bold">{pod.agents}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold uppercase">
                  <span className="text-text-muted">Performance</span>
                  <span className="text-sage">{pod.performance}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#f1f1f1] rounded-full overflow-hidden">
                  <div className="h-full bg-sage" style={{ width: `${pod.performance}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex justify-between">
              <button className="text-[11px] font-bold text-text-muted hover:text-sage uppercase">View Agents</button>
              <button className="text-[11px] font-bold text-sage hover:underline uppercase">Manage POD</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('login');

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard setView={setView} />;
      case 'patient-360': return <Patient360 />;
      case 'patient-listing': return <PatientListing setView={setView} />;
      case 'patient-detail': return <PatientDetail />;
      case 'user-management': return <UserManagement />;
      case 'pod-management': return <PodManagement />;
      default: return <Dashboard setView={setView} />;
    }
  };

  if (view === 'login') {
    return <LoginPage onLogin={() => setView('dashboard')} />;
  }

  return (
    <Layout currentView={view} setView={setView}>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
