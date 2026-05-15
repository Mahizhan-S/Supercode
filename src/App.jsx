import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Plus, Search, Edit3, Trash2, ExternalLink, Download, Upload, Flame, TrendingUp, CheckCircle, Clock, Star, Brain, RefreshCw, X, Code, Hash, BookOpen, Target, Calendar, Filter, ArrowUpDown, Zap, Award, BarChart3, Map as MapIcon } from 'lucide-react';
import Roadmap from './components/Roadmap';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SEED_PROBLEMS, SEED_TOPICS } from './data/seedProblems';

const TOPICS = SEED_TOPICS;
const DIFFICULTIES = ['Easy','Medium','Hard'];
const STATUSES = ['solved','attempted','todo','revisit'];
const DIFF_COLORS = { Easy:'emerald', Medium:'amber', Hard:'rose' };
const STATUS_LABELS = { solved:'Solved', attempted:'Attempted', todo:'To Do', revisit:'Revisit' };
const CHART_COLORS = ['#2fd9f4','#8aebff','#68f5b8','#4edea3','#d0bcff','#c4abff','#fbbf24','#ffb4ab','#46d89d','#571bc1','#22d3ee','#a2eeff'];
const EMPTY_FORM = { title:'', number:'', difficulty:'Easy', topic:TOPICS[0], status:'todo', notes:'', url:'', timeSpent:'', confidence:1 };

function problemKey(problem) {
  return problem?.number ? `n:${problem.number}` : `t:${(problem?.title || '').trim().toLowerCase()}`;
}

function normalizeProblem(problem) {
  return {
    ...problem,
    number: problem.number ?? null,
    notes: problem.notes ?? '',
    url: problem.url ?? '',
    timeSpent: problem.timeSpent ?? '',
    confidence: problem.confidence ?? 1,
    lastRevised: problem.lastRevised ?? null,
    revisionCount: problem.revisionCount ?? 0,
    dateAdded: problem.dateAdded ?? new Date().toISOString(),
    dateSolved: problem.dateSolved ?? null,
  };
}

function loadInitialProblems() {
  const merged = new Map(SEED_PROBLEMS.map(problem => [problemKey(problem), normalizeProblem(problem)]));

  try {
    const raw = localStorage.getItem('lc-tracker-v4');
    if (raw) {
      const stored = JSON.parse(raw);
      if (Array.isArray(stored)) {
        stored.forEach(problem => {
          if (problem?.title) merged.set(problemKey(problem), normalizeProblem(problem));
        });
      }
    }
  } catch {
    return [...merged.values()];
  }

  return [...merged.values()];
}

function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
function formatDate(d) { return new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }
function daysAgo(d) { return Math.floor((Date.now()-new Date(d).getTime())/864e5); }
function getGreeting() { const h=new Date().getHours(); return h<12?'Good morning':h<17?'Good afternoon':'Good evening'; }

function calculateStreaks(problems) {
  const solved = problems.filter(p=>p.dateSolved).map(p=>new Date(p.dateSolved).toDateString());
  const unique = [...new Set(solved)].sort((a,b)=>new Date(b)-new Date(a));
  if(!unique.length) return {current:0,longest:0};
  let current=0, longest=0, streak=1;
  const today = new Date(); today.setHours(0,0,0,0);
  const first = new Date(unique[0]); first.setHours(0,0,0,0);
  const diffDays = Math.round((today-first)/864e5);
  if(diffDays>1) current=0;
  else { current=1; for(let i=1;i<unique.length;i++){const a=new Date(unique[i-1]),b=new Date(unique[i]);a.setHours(0,0,0,0);b.setHours(0,0,0,0);if(Math.round((a-b)/864e5)===1)current++;else break;}}
  for(let i=1;i<unique.length;i++){const a=new Date(unique[i-1]),b=new Date(unique[i]);a.setHours(0,0,0,0);b.setHours(0,0,0,0);if(Math.round((a-b)/864e5)===1)streak++;else{longest=Math.max(longest,streak);streak=1;}}
  longest=Math.max(longest,streak,current);
  return {current,longest};
}

function getHeatmapData(problems) {
  const map={};
  problems.filter(p=>p.dateSolved).forEach(p=>{const k=new Date(p.dateSolved).toDateString();map[k]=(map[k]||0)+1;});
  const days=[];const today=new Date();
  for(let i=364;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);d.setHours(0,0,0,0);const k=d.toDateString();days.push({date:d,count:map[k]||0});}
  return days;
}

function getRevisionQueue(problems) {
  const now=Date.now();
  return problems.filter(p=>p.status==='solved'||p.status==='revisit').map(p=>{
    const lastRev=p.lastRevised?new Date(p.lastRevised).getTime():p.dateSolved?new Date(p.dateSolved).getTime():0;
    const daysSince=lastRev?Math.floor((now-lastRev)/864e5):999;
    const conf=p.confidence||3;
    const interval=[1,2,4,7,14][Math.min(conf-1,4)];
    const urgency=daysSince/interval;
    return {...p,daysSince,urgency,dueIn:interval-daysSince};
  }).filter(p=>p.urgency>=0.8).sort((a,b)=>b.urgency-a.urgency);
}

/* ─── Sub-components ─── */
function Toast({message,type='success',onClose}){
  const [leaving,setLeaving]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setLeaving(true),2500);const t2=setTimeout(onClose,2900);return()=>{clearTimeout(t);clearTimeout(t2);};},[onClose]);
  const bg=type==='success'?'border-[#68f5b8]/30 bg-[#68f5b8]/10':'border-[#ffb4ab]/30 bg-[#ffb4ab]/10';
  return(<div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl border ${bg} backdrop-blur-lg shadow-2xl ${leaving?'animate-toast-out':'animate-toast-in'}`}>
    <div className="flex items-center gap-3"><span className="text-sm font-medium text-[#e4e1eb]">{message}</span><button onClick={onClose} className="text-[#bbc9cd] hover:text-white"><X size={14}/></button></div></div>);
}

function StatsCard({icon:Icon,label,value,sub,color='cyan',delay=0}){
  const colors={
    emerald:'bg-[#68f5b8]/5 text-[#68f5b8] stat-glow-emerald',
    amber:'bg-[#fbbf24]/5 text-[#fbbf24] stat-glow-amber',
    rose:'bg-[#ffb4ab]/5 text-[#ffb4ab] stat-glow-rose',
    violet:'bg-[#d0bcff]/5 text-[#d0bcff] stat-glow-violet',
    cyan:'bg-[#2fd9f4]/5 text-[#2fd9f4] stat-glow-cyan'
  };
  const c=colors[color]||colors.cyan;
  return(<div className={`glass-card ${c} p-5 animate-slide-up`} style={{animationDelay:`${delay}ms`,animationFillMode:'backwards'}}>
    <div className="flex items-center justify-between mb-3"><span className="text-[#bbc9cd] text-[10px] font-medium uppercase tracking-[0.08em] font-['JetBrains_Mono']">{label}</span>{Icon&&<Icon size={18} className="opacity-50"/>}</div>
    <div className="text-3xl font-bold text-[#e4e1eb] mb-1">{value}</div>
    {sub&&<div className="text-xs text-[#859397]">{sub}</div>}
  </div>);
}

function ConfidenceStars({value=3,onChange,size=18}){
  return(<div className="flex gap-0.5">{[1,2,3,4,5].map(i=>(
    <button key={i} onClick={()=>onChange?.(i)} className={`transition-all duration-150 ${i<=value?'text-[#fbbf24] drop-shadow-[0_0_3px_rgba(251,191,36,0.4)]':'text-[#3c494c]'} ${onChange?'cursor-pointer hover:text-[#fbbf24]/80 hover:scale-110':'cursor-default'}`}><Star size={size} fill={i<=value?'currentColor':'none'}/></button>
  ))}</div>);
}

function HeatmapGrid({data}){
  const dayLabels=['','Mon','','Wed','','Fri',''];
  const max=Math.max(...data.map(d=>d.count),1);
  const getColor=(count)=>{if(!count)return'bg-[#1f1f26]';const r=count/max;if(r<=0.25)return'bg-[#68f5b8]/20';if(r<=0.5)return'bg-[#68f5b8]/40';if(r<=0.75)return'bg-[#68f5b8]/65';return'bg-[#68f5b8]/90';};
  const weeks=[];for(let i=0;i<data.length;i+=7)weeks.push(data.slice(i,i+7));
  // Build month labels aligned to actual week positions
  const monthLabels=[];let lastMonth=-1;
  weeks.forEach((week,wi)=>{const m=week[0]?.date?.getMonth();if(m!==undefined&&m!==lastMonth){monthLabels.push({index:wi,name:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m]});lastMonth=m;}});
  const totalW=weeks.length*16;
  return(
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-2 pb-2">
        <div className="relative h-4" style={{width:totalW}}>
          {monthLabels.map(ml => (
            <span
              key={ml.index}
              className="absolute text-[10px] text-[#859397] leading-none"
              style={{left:ml.index*16}}
            >
              {ml.name}
            </span>
          ))}
        </div>

        <div className="flex gap-[3px] items-start">
          <div className="flex flex-col gap-[3px] mr-1 shrink-0">
            {dayLabels.map((d,i) => (
              <div key={i} className="h-[13px] flex items-center">
                <span className="text-[10px] text-[#859397] w-6">{d}</span>
              </div>
            ))}
          </div>

          <div className="inline-flex gap-[3px]">
            {weeks.map((week,wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day,di) => (
                  <div key={di} className="tooltip-container">
                    <div className={`heatmap-cell w-[13px] h-[13px] ${getColor(day.count)}`} />
                    <div className="tooltip">
                      {day.count} problem{day.count!==1?'s':''} — {formatDate(day.date)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 ml-8">
          <span className="text-[10px] text-[#859397]">Less</span>
          {[0,1,2,3,4].map(l => (
            <div key={l} className={`w-[10px] h-[10px] rounded-sm ${['bg-[#1f1f26]','bg-[#68f5b8]/20','bg-[#68f5b8]/40','bg-[#68f5b8]/65','bg-[#68f5b8]/90'][l]}`} />
          ))}
          <span className="text-[10px] text-[#859397]">More</span>
        </div>
      </div>
    </div>
  );
}

function ProblemModal({form,setForm,onSubmit,onCancel,isEdit}){
  const handleChange=(field,val)=>setForm(prev=>({...prev,[field]:val}));
  const selClass="w-full h-10 rounded-lg border border-[#3c494c]/40 bg-[#0e0e14] px-3 text-sm text-[#e4e1eb] appearance-none cursor-pointer hover:border-[#3c494c]/60 transition-colors";
  return(<div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
    <div className="glass-card w-full max-w-lg animate-scale-in flex flex-col max-h-[90vh]" onClick={e=>e.stopPropagation()}>
      <div className="flex items-center justify-between p-6 pb-0 mb-4"><h2 className="text-lg font-bold gradient-text">{isEdit?'Edit Problem':'Add Problem'}</h2><button onClick={onCancel} className="text-[#bbc9cd] hover:text-white transition-colors rounded-lg p-1 hover:bg-[#2a2930]"><X size={20}/></button></div>
      <div className="space-y-4 overflow-y-auto px-6 pb-2 flex-1">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2"><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">Title *</label><Input value={form.title} onChange={e=>handleChange('title',e.target.value)} placeholder="Two Sum"/></div>
          <div><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">Number</label><Input type="number" value={form.number} onChange={e=>handleChange('number',e.target.value)} placeholder="1"/></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">Difficulty</label><select value={form.difficulty} onChange={e=>handleChange('difficulty',e.target.value)} className={selClass}>{DIFFICULTIES.map(d=><option key={d} value={d}>{d}</option>)}</select></div>
          <div><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">Topic</label><select value={form.topic} onChange={e=>handleChange('topic',e.target.value)} className={selClass}>{TOPICS.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
          <div><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">Status</label><select value={form.status} onChange={e=>handleChange('status',e.target.value)} className={selClass}>{STATUSES.map(s=><option key={s} value={s}>{STATUS_LABELS[s]}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">Time Spent (min)</label><Input type="number" value={form.timeSpent} onChange={e=>handleChange('timeSpent',e.target.value)} placeholder="30"/></div>
          <div><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">Confidence</label><div className="h-10 flex items-center"><ConfidenceStars value={form.confidence} onChange={v=>handleChange('confidence',v)}/></div></div>
        </div>
        <div><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">LeetCode URL</label><Input value={form.url} onChange={e=>handleChange('url',e.target.value)} placeholder="https://leetcode.com/problems/..."/></div>
        <div><label className="text-[10px] text-[#bbc9cd] mb-1.5 block font-medium uppercase tracking-wider font-['JetBrains_Mono']">Notes</label><Textarea value={form.notes} onChange={e=>handleChange('notes',e.target.value)} placeholder="Approach, key insights, time complexity..." className="min-h-[80px]"/></div>
      </div>
      <div className="flex justify-end gap-3 p-6 pt-4 border-t border-[#3c494c]/20">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit} disabled={!form.title.trim()}>{isEdit?'Save Changes':'Add Problem'}</Button>
      </div>
    </div>
  </div>);
}

/* ─── Custom Recharts Tooltip ─── */
function ChartTooltip({active,payload,label}){
  if(!active||!payload?.length)return null;
  return(<div className="glass-card px-3 py-2 text-xs"><p className="text-[#bbc9cd] mb-1">{label}</p>{payload.map((p,i)=><p key={i} style={{color:p.color}}>{p.name}: <span className="font-semibold">{p.value}</span></p>)}</div>);
}

/* ─── Main App ─── */
export default function App() {
  const [problems, setProblems] = useState(() => loadInitialProblems());
  const [activeTab, setActiveTab] = useState('problems');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({...EMPTY_FORM});
  const [search, setSearch] = useState('');
  const [filterDiff, setFilterDiff] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTopic, setFilterTopic] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { localStorage.setItem('lc-tracker-v4', JSON.stringify(problems)); }, [problems]);

  const showToast = useCallback((message, type='success') => setToast({message,type}), []);

  // ─── Handlers ───
  const openAdd = () => { setForm({...EMPTY_FORM}); setEditingId(null); setShowModal(true); };
  const openEdit = (p) => { setForm({title:p.title,number:p.number??'',difficulty:p.difficulty,topic:p.topic,status:p.status,notes:p.notes||'',url:p.url||'',timeSpent:p.timeSpent!=null?p.timeSpent:'',confidence:p.confidence??1}); setEditingId(p.id); setShowModal(true); };

  const handleSubmit = () => {
    if(!form.title.trim()) return;
    const now = new Date().toISOString();
    if(editingId){
      setProblems(prev=>prev.map(p=>p.id===editingId?{...p,...form,number:form.number?Number(form.number):null,timeSpent:form.timeSpent?Number(form.timeSpent):null,dateSolved:form.status==='solved'?(p.dateSolved||(p.status!=='solved'?now:p.dateSolved)):null}:p));
      showToast('Problem updated!');
    } else {
      const newP = {id:generateId(),...form,number:form.number?Number(form.number):null,timeSpent:form.timeSpent?Number(form.timeSpent):null,dateAdded:now,dateSolved:form.status==='solved'?now:null,lastRevised:null,revisionCount:0};
      setProblems(prev=>[newP,...prev]);
      showToast('Problem added!');
    }
    setShowModal(false); setEditingId(null); setForm({...EMPTY_FORM});
  };

  const handleDelete = (id) => { setProblems(prev=>prev.filter(p=>p.id!==id)); setDeleteConfirm(null); showToast('Problem deleted','error'); };

  const handleRevise = (id) => {
    setProblems(prev=>prev.map(p=>p.id===id?{...p,lastRevised:new Date().toISOString(),revisionCount:(p.revisionCount||0)+1}:p));
    showToast('Marked as revised!');
  };

  const handleExport = () => {
    const blob=new Blob([JSON.stringify(problems,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`leetcode-tracker-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);
    showToast(`Exported ${problems.length} problems!`);
  };

  const handleImport = () => {
    const input=document.createElement('input');input.type='file';input.accept='.json';
    input.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(Array.isArray(d)){setProblems(prev=>{const existingKeys=new Set(prev.map(p=>problemKey(p)));const newProblems=d.filter(p=>p?.title&&!existingKeys.has(problemKey(p))).map(p=>({...normalizeProblem(p),id:p.id||generateId()}));return[...newProblems,...prev];});showToast(`Imported ${d.length} problems!`);}else showToast('Invalid format','error');}catch{showToast('Parse error','error');}};r.readAsText(f);};
    input.click();
  };

  // ─── Computed ───
  const streaks = useMemo(() => calculateStreaks(problems), [problems]);
  const heatmapData = useMemo(() => getHeatmapData(problems), [problems]);
  const revisionQueue = useMemo(() => getRevisionQueue(problems), [problems]);

  const stats = useMemo(() => {
    const solved=problems.filter(p=>p.status==='solved');
    return {total:problems.length, solved:solved.length, easy:solved.filter(p=>p.difficulty==='Easy').length, medium:solved.filter(p=>p.difficulty==='Medium').length, hard:solved.filter(p=>p.difficulty==='Hard').length, attempted:problems.filter(p=>p.status==='attempted').length, todo:problems.filter(p=>p.status==='todo').length, avgTime:solved.length?Math.round(solved.reduce((s,p)=>s+(p.timeSpent||0),0)/solved.length):0};
  }, [problems]);

  const filteredProblems = useMemo(() => {
    let res = problems;
    if(search) { const q=search.toLowerCase(); res=res.filter(p=>p.title.toLowerCase().includes(q)||(p.number&&String(p.number).includes(q))||(p.topic&&p.topic.toLowerCase().includes(q))); }
    if(filterDiff!=='all') res=res.filter(p=>p.difficulty===filterDiff);
    if(filterStatus!=='all') res=res.filter(p=>p.status===filterStatus);
    if(filterTopic!=='all') res=res.filter(p=>p.topic===filterTopic);
    const sortFns = { newest:(a,b)=>new Date(b.dateAdded)-new Date(a.dateAdded), oldest:(a,b)=>new Date(a.dateAdded)-new Date(b.dateAdded), number:(a,b)=>(a.number||9999)-(b.number||9999), difficulty:(a,b)=>DIFFICULTIES.indexOf(a.difficulty)-DIFFICULTIES.indexOf(b.difficulty), title:(a,b)=>a.title.localeCompare(b.title) };
    return [...res].sort(sortFns[sortBy]||sortFns.newest);
  }, [problems,search,filterDiff,filterStatus,filterTopic,sortBy]);

  const topicData = useMemo(() => {
    const map={};problems.filter(p=>p.status==='solved').forEach(p=>{map[p.topic]=(map[p.topic]||0)+1;});
    return Object.entries(map).map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count).slice(0,10);
  }, [problems]);

  const timelineData = useMemo(() => {
    const solved=problems.filter(p=>p.dateSolved).sort((a,b)=>new Date(a.dateSolved)-new Date(b.dateSolved));
    if(!solved.length) return [];
    const map={};solved.forEach(p=>{const k=new Date(p.dateSolved).toLocaleDateString('en-US',{month:'short',year:'2-digit'});map[k]=(map[k]||0)+1;});
    let cum=0;return Object.entries(map).map(([month,count])=>({month,count,cumulative:cum+=count}));
  }, [problems]);

  const diffData = useMemo(() => DIFFICULTIES.map(d=>({name:d,value:problems.filter(p=>p.status==='solved'&&p.difficulty===d).length})).filter(d=>d.value>0), [problems]);
  const PIE_COLORS = ['#68f5b8','#fbbf24','#ffb4ab'];

  const usedTopics = useMemo(() => [...new Set(problems.map(p=>p.topic))].sort(), [problems]);

  const weeklyGoalCount = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const start = new Date(now);
    start.setDate(now.getDate() - ((day+6)%7));
    start.setHours(0,0,0,0);
    return problems.filter(p => p.dateSolved && new Date(p.dateSolved) >= start).length;
  }, [problems]);

  const SIDEBAR_TABS = [
    {id:'dashboard',label:'Dash',icon:'grid_view'},
    {id:'roadmap',label:'Road',icon:'map'},
    {id:'problems',label:'Prob',icon:'menu_book'},
    {id:'analytics',label:'Anly',icon:'monitoring'},
    {id:'revision',label:'Rev',icon:'psychology'},
  ];

  const renderTopbar = () => (
    <header className="topbar">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold tracking-tighter gradient-text-cyan">LeetCode Tracker</span>
        <div className="hidden md:flex items-center gap-1 bg-[#35343b]/30 px-2 py-1 rounded border border-[#3c494c]/20">
          <span className="material-symbols-outlined text-[16px] text-[#2fd9f4]">search</span>
          <span className="text-[12px] font-['JetBrains_Mono'] text-[#bbc9cd] tracking-wider">Search...</span>
          <span className="text-[9px] font-['JetBrains_Mono'] bg-[#1f1f26] px-1 rounded border border-[#3c494c]/40 ml-2 text-[#859397]">⌘K</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleImport}><Upload size={14} className="mr-1"/>Import</Button>
        <Button variant="ghost" size="sm" onClick={handleExport}><Download size={14} className="mr-1"/>Export</Button>
        <Button size="sm" onClick={openAdd}><Plus size={14} className="mr-1"/>Add</Button>
      </div>
    </header>
  );

  const renderSidebar = () => (
    <aside className="sidebar-nav">
      <div className="flex flex-col gap-2 w-full items-center">
        {SIDEBAR_TABS.map(tab => (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`sidebar-item ${activeTab===tab.id?'active':''}`}>
            <span className="material-symbols-outlined sidebar-icon" style={activeTab===tab.id?{fontVariationSettings:"'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"}:{}}>{tab.icon}</span>
            <span className="sidebar-label">{tab.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );

  const renderStatusbar = () => (
    <footer className="statusbar">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#68f5b8] animate-breathe"></span><span className="text-[#68f5b8]">{stats.solved} Solved</span></span>
        <span className="text-[#859397]">Streak: {streaks.current}🔥</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#859397]">{stats.total} Problems</span>
        <span className="text-[#859397]/60">© 2024 LeetCode Tracker</span>
      </div>
    </footer>
  );

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#571bc1]/10 via-[#2fd9f4]/5 to-[#68f5b8]/5 border border-[#2fd9f4]/10 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#2fd9f4]/10 to-transparent rounded-full blur-3xl"/>
        <h2 className="text-3xl font-bold mb-2">{getGreeting()} 👋</h2>
        <p className="text-[#bbc9cd] text-lg">You've solved <span className="text-[#2fd9f4] font-semibold">{stats.solved}</span> problems. {streaks.current>0?<>Current streak: <span className="text-[#fbbf24] font-semibold">{streaks.current} day{streaks.current>1?'s':''}</span> 🔥</>:'Start a streak today!'}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard icon={Target} label="Total" value={stats.total} color="violet" delay={0}/>
        <StatsCard icon={CheckCircle} label="Solved" value={stats.solved} color="emerald" delay={60}/>
        <StatsCard icon={Zap} label="Easy" value={stats.easy} sub={`${stats.solved?Math.round(stats.easy/stats.solved*100):0}%`} color="emerald" delay={120}/>
        <StatsCard icon={TrendingUp} label="Medium" value={stats.medium} sub={`${stats.solved?Math.round(stats.medium/stats.solved*100):0}%`} color="amber" delay={180}/>
        <StatsCard icon={Award} label="Hard" value={stats.hard} sub={`${stats.solved?Math.round(stats.hard/stats.solved*100):0}%`} color="rose" delay={240}/>
        <StatsCard icon={Flame} label="Streak" value={`${streaks.current}🔥`} sub={`Best: ${streaks.longest}`} color="cyan" delay={300}/>
      </div>

      {/* Weekly Goal */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Target size={16} className="text-[#2fd9f4]"/><span className="text-sm font-semibold">Weekly Goal</span></div>
            <span className="text-xs text-[#bbc9cd]">{weeklyGoalCount} / 7 problems</span>
          </div>
          <Progress value={Math.min(100, (weeklyGoalCount / 7) * 100)} color="violet"/>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar size={18} className="text-[#68f5b8]"/>Contribution Heatmap</CardTitle></CardHeader>
        <CardContent><HeatmapGrid data={heatmapData}/></CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp size={18} className="text-[#2fd9f4]"/>Progress Over Time</CardTitle></CardHeader>
          <CardContent>
            {timelineData.length?(<ResponsiveContainer width="100%" height={220}><AreaChart data={timelineData}><defs><linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2fd9f4" stopOpacity={0.3}/><stop offset="95%" stopColor="#2fd9f4" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#1f1f26"/><XAxis dataKey="month" tick={{fill:'#859397',fontSize:11}} axisLine={false} tickLine={false}/><YAxis tick={{fill:'#859397',fontSize:11}} axisLine={false} tickLine={false}/><Tooltip content={<ChartTooltip/>}/><Area type="monotone" dataKey="cumulative" stroke="#2fd9f4" fill="url(#grad1)" strokeWidth={2} name="Total Solved"/></AreaChart></ResponsiveContainer>):(<div className="text-center py-10 text-[#859397]">Solve problems to see your progress!</div>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Brain size={18} className="text-[#fbbf24]"/>Revision Queue</CardTitle></CardHeader>
          <CardContent>
            {revisionQueue.length?(
              <div className="space-y-3">{revisionQueue.slice(0,5).map(p=>(
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b22] border border-[#3c494c]/20">
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge variant={p.difficulty.toLowerCase()}>{p.difficulty}</Badge>
                    <div className="min-w-0"><p className="text-sm font-medium truncate">{p.number?`${p.number}. `:''}{ p.title}</p><p className="text-xs text-[#859397]">{p.daysSince}d since last review</p></div>
                  </div>
                  <Button variant="outline" size="sm" onClick={()=>handleRevise(p.id)}><RefreshCw size={12} className="mr-1"/>Revise</Button>
                </div>
              ))}{revisionQueue.length>5&&<p className="text-xs text-[#859397] text-center">+{revisionQueue.length-5} more due</p>}</div>
            ):(<div className="text-center py-10 text-[#859397]">No revisions due! 🎉</div>)}
          </CardContent>
        </Card>
      </div>

      {problems.length>0&&(
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock size={18} className="text-[#2fd9f4]"/>Recently Added</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">{problems.slice(0,5).map(p=>(
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b22/60] hover:bg-[#1f1f26] transition-colors border border-transparent hover:border-[#3c494c]/20 cursor-pointer" onClick={()=>{setActiveTab('problems');setSearch(p.title);}}>
                <div className="flex items-center gap-3"><Badge variant={p.difficulty.toLowerCase()}>{p.difficulty}</Badge><span className="text-sm font-medium">{p.number?`${p.number}. `:''}{p.title}</span><Badge variant={p.status}>{STATUS_LABELS[p.status]}</Badge></div>
                <span className="text-xs text-[#859397]">{p.dateAdded?formatDate(p.dateAdded):''}</span>
              </div>
            ))}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderProblems = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#859397]"/><Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by title, number, or topic..." className="pl-10"/></div>
        <select value={filterDiff} onChange={e=>setFilterDiff(e.target.value)} className="h-10 rounded-xl border border-[#3c494c]/40 bg-[#1f1f26] px-3 text-sm text-[#e4e1eb]"><option value="all">All Difficulties</option>{DIFFICULTIES.map(d=><option key={d} value={d}>{d}</option>)}</select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="h-10 rounded-xl border border-[#3c494c]/40 bg-[#1f1f26] px-3 text-sm text-[#e4e1eb]"><option value="all">All Statuses</option>{STATUSES.map(s=><option key={s} value={s}>{STATUS_LABELS[s]}</option>)}</select>
        <select value={filterTopic} onChange={e=>setFilterTopic(e.target.value)} className="h-10 rounded-xl border border-[#3c494c]/40 bg-[#1f1f26] px-3 text-sm text-[#e4e1eb]"><option value="all">All Topics</option>{usedTopics.map(t=><option key={t} value={t}>{t}</option>)}</select>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="h-10 rounded-xl border border-[#3c494c]/40 bg-[#1f1f26] px-3 text-sm text-[#e4e1eb]"><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="number">Number</option><option value="difficulty">Difficulty</option><option value="title">A-Z</option></select>
      </div>

      <div className="flex items-center justify-between"><div className="flex items-center gap-3"><p className="text-sm text-[#bbc9cd]">{filteredProblems.length} problem{filteredProblems.length!==1?'s':''}{(filterDiff!=='all'||filterStatus!=='all'||filterTopic!=='all'||search)?' (filtered)':''}</p>{(filterDiff!=='all'||filterStatus!=='all'||filterTopic!=='all'||search)&&<button onClick={()=>{setFilterDiff('all');setFilterStatus('all');setFilterTopic('all');setSearch('');}} className="text-xs text-[#2fd9f4] hover:text-[#2fd9f4] transition-colors">Clear filters</button>}</div><Button size="sm" onClick={openAdd}><Plus size={14} className="mr-1.5"/>Add Problem</Button></div>

      {filteredProblems.length?(
        <div className="space-y-3">{filteredProblems.map(p=>(
          <div key={p.id} className="glass-card p-4 hover:border-[#3c494c]/30 transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {p.number&&<span className="text-xs font-mono text-[#859397]">#{p.number}</span>}
                  <h3 className="font-semibold text-[#e4e1eb]">{p.title}</h3>
                  <Badge variant={p.difficulty.toLowerCase()}>{p.difficulty}</Badge>
                  <Badge variant={p.status}>{STATUS_LABELS[p.status]}</Badge>
                  <Badge variant="secondary">{p.topic}</Badge>
                </div>
                {p.notes&&<p className="text-sm text-[#bbc9cd] mb-2 line-clamp-2">{p.notes}</p>}
                <div className="flex items-center gap-4 text-xs text-[#859397]">
                  {p.dateAdded&&<span>Added {formatDate(p.dateAdded)}</span>}
                  {p.timeSpent>0&&<span>⏱ {p.timeSpent}min</span>}
                  {p.revisionCount>0&&<span>📖 Revised {p.revisionCount}x</span>}
                  <ConfidenceStars value={p.confidence||3} size={14}/>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-30 group-hover:opacity-100 transition-opacity duration-200">
                {p.url&&<a href={p.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-[#2a2930] text-[#859397] hover:text-[#2fd9f4] transition-colors" title="Open on LeetCode"><ExternalLink size={15}/></a>}
                <button onClick={()=>handleRevise(p.id)} className="p-2 rounded-lg hover:bg-[#68f5b8]/10 text-[#859397] hover:text-[#68f5b8] transition-colors" title="Mark revised"><RefreshCw size={15}/></button>
                <button onClick={()=>openEdit(p)} className="p-2 rounded-lg hover:bg-[#2a2930] text-[#859397] hover:text-white transition-colors" title="Edit"><Edit3 size={15}/></button>
                <button onClick={()=>setDeleteConfirm(p.id)} className="p-2 rounded-lg hover:bg-[#ffb4ab]/10 text-[#859397] hover:text-[#ffb4ab] transition-colors" title="Delete"><Trash2 size={15}/></button>
              </div>
            </div>
          </div>
        ))}</div>
      ):(<div className="text-center py-20"><div className="text-5xl mb-4">📝</div><h3 className="text-lg font-semibold mb-2">No problems found</h3><p className="text-[#bbc9cd] mb-6">{search||filterDiff!=='all'||filterStatus!=='all'?'Try adjusting your filters':'Add your first problem to get started!'}</p><Button onClick={openAdd}><Plus size={14} className="mr-1.5"/>Add Problem</Button></div>)}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-4 gap-4">
        <StatsCard icon={CheckCircle} label="Solved" value={stats.solved} sub={`of ${stats.total} total`} color="emerald"/>
        <StatsCard icon={Clock} label="Avg Time" value={`${stats.avgTime}m`} sub="per problem" color="cyan"/>
        <StatsCard icon={Flame} label="Current Streak" value={streaks.current} sub={`Best: ${streaks.longest} days`} color="amber"/>
        <StatsCard icon={Brain} label="Due for Review" value={revisionQueue.length} sub="problems" color="violet"/>
      </div>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Calendar size={18} className="text-[#68f5b8]"/>Activity Heatmap</CardTitle></CardHeader><CardContent><HeatmapGrid data={heatmapData}/></CardContent></Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Cumulative Progress</CardTitle></CardHeader>
          <CardContent>{timelineData.length?(<ResponsiveContainer width="100%" height={280}><AreaChart data={timelineData}><defs><linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2fd9f4" stopOpacity={0.35}/><stop offset="95%" stopColor="#2fd9f4" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#1f1f26"/><XAxis dataKey="month" tick={{fill:'#859397',fontSize:11}} axisLine={false} tickLine={false}/><YAxis tick={{fill:'#859397',fontSize:11}} axisLine={false} tickLine={false}/><Tooltip content={<ChartTooltip/>}/><Area type="monotone" dataKey="cumulative" stroke="#2fd9f4" fill="url(#grad2)" strokeWidth={2} name="Total Solved"/><Area type="monotone" dataKey="count" stroke="#06b6d4" fill="transparent" strokeWidth={2} name="Monthly"/></AreaChart></ResponsiveContainer>):(<div className="text-center py-10 text-[#859397]">No data yet</div>)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Difficulty Distribution</CardTitle></CardHeader>
          <CardContent>{diffData.length?(<ResponsiveContainer width="100%" height={280}><PieChart><Pie data={diffData} cx="50%" cy="50%" innerRadius={65} outerRadius={100} dataKey="value" nameKey="name" stroke="none" paddingAngle={4}>{diffData.map((e,i)=><Cell key={i} fill={PIE_COLORS[DIFFICULTIES.indexOf(e.name)]}/>)}</Pie><Tooltip content={<ChartTooltip/>}/><Legend wrapperStyle={{fontSize:12,color:'#94a3b8'}}/></PieChart></ResponsiveContainer>):(<div className="text-center py-10 text-[#859397]">Solve problems to see distribution</div>)}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Top Topics</CardTitle></CardHeader>
        <CardContent>{topicData.length?(<ResponsiveContainer width="100%" height={300}><BarChart data={topicData} layout="vertical" margin={{left:20}}><CartesianGrid strokeDasharray="3 3" stroke="#1f1f26" horizontal={false}/><XAxis type="number" tick={{fill:'#859397',fontSize:11}} axisLine={false} tickLine={false}/><YAxis type="category" dataKey="name" tick={{fill:'#859397',fontSize:11}} axisLine={false} tickLine={false} width={120}/><Tooltip content={<ChartTooltip/>}/><Bar dataKey="count" name="Solved" radius={[0,6,6,0]}>{topicData.map((e,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]}/>)}</Bar></BarChart></ResponsiveContainer>):(<div className="text-center py-10 text-[#859397]">No topic data yet</div>)}</CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Difficulty Progress</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-5">{DIFFICULTIES.map(d=>{const count=problems.filter(p=>p.status==='solved'&&p.difficulty===d).length;const total=problems.filter(p=>p.difficulty===d).length;const pct=total?Math.round(count/total*100):0;return(
            <div key={d}><div className="flex justify-between mb-2"><span className="text-sm font-medium">{d}</span><span className="text-xs text-[#bbc9cd]">{count}/{total} ({pct}%)</span></div><Progress value={pct} color={DIFF_COLORS[d]}/></div>
          );})}</div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRevision = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl bg-gradient-to-br from-[#571bc1]/10 via-indigo-600/5 to-transparent border border-[#2fd9f4]/10 p-6">
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><Brain size={22} className="text-[#2fd9f4]"/>Spaced Repetition</h2>
        <p className="text-[#bbc9cd]">Review problems at increasing intervals based on your confidence level. Lower confidence = more frequent reviews.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard icon={Target} label="Due Now" value={revisionQueue.filter(p=>p.dueIn<=0).length} color="rose"/>
        <StatsCard icon={Clock} label="Due Soon" value={revisionQueue.filter(p=>p.dueIn>0&&p.dueIn<=2).length} color="amber"/>
        <StatsCard icon={CheckCircle} label="Reviewed Today" value={problems.filter(p=>p.lastRevised&&daysAgo(p.lastRevised)===0).length} color="emerald"/>
      </div>

      {revisionQueue.length?(
        <div className="space-y-3">{revisionQueue.map(p=>(
          <div key={p.id} className="glass-card p-5 hover:border-[#3c494c]/30 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {p.number&&<span className="text-xs font-mono text-[#859397]">#{p.number}</span>}
                  <h3 className="font-semibold">{p.title}</h3>
                  <Badge variant={p.difficulty.toLowerCase()}>{p.difficulty}</Badge>
                  <Badge variant="secondary">{p.topic}</Badge>
                </div>
                {p.notes&&<p className="text-sm text-[#bbc9cd] mb-3 line-clamp-2">{p.notes}</p>}
                <div className="flex items-center gap-5 text-xs text-[#859397]">
                  <span>{p.daysSince}d since last review</span>
                  <span>Revised {p.revisionCount||0}x</span>
                  <ConfidenceStars value={p.confidence||3} size={12} onChange={v=>{setProblems(prev=>prev.map(pr=>pr.id===p.id?{...pr,confidence:v}:pr));}}/>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {p.url&&<a href={p.url} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm"><ExternalLink size={13} className="mr-1"/>Open</Button></a>}
                <Button variant="success" size="sm" onClick={()=>handleRevise(p.id)}><CheckCircle size={13} className="mr-1"/>Done</Button>
              </div>
            </div>
          </div>
        ))}</div>
      ):(<div className="text-center py-20"><div className="text-5xl mb-4">🎉</div><h3 className="text-lg font-semibold mb-2">All caught up!</h3><p className="text-[#bbc9cd]">No problems due for revision right now.</p></div>)}
    </div>
  );

  return (
    <div className="min-h-screen">
      {renderTopbar()}
      {renderSidebar()}
      <main className="main-content">
        {activeTab==='dashboard'&&renderDashboard()}
        {activeTab==='roadmap'&&<Roadmap problems={problems} onEdit={openEdit} onRevise={handleRevise} />}
        {activeTab==='problems'&&renderProblems()}
        {activeTab==='analytics'&&renderAnalytics()}
        {activeTab==='revision'&&renderRevision()}
      </main>
      {renderStatusbar()}
      {showModal&&<ProblemModal form={form} setForm={setForm} onSubmit={handleSubmit} onCancel={()=>{setShowModal(false);setEditingId(null);}} isEdit={!!editingId}/>}
      {deleteConfirm&&(<div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>setDeleteConfirm(null)}><div className="glass-card p-6 max-w-sm w-full animate-scale-in" onClick={e=>e.stopPropagation()}><h3 className="text-lg font-bold mb-2">Delete Problem?</h3><p className="text-[#bbc9cd] text-sm mb-6">This action cannot be undone.</p><div className="flex justify-end gap-3"><Button variant="outline" onClick={()=>setDeleteConfirm(null)}>Cancel</Button><Button variant="destructive" onClick={()=>handleDelete(deleteConfirm)}>Delete</Button></div></div></div>)}
      {toast&&<Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}

