import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, X, ExternalLink, RefreshCw, Edit3 } from 'lucide-react';
import { ROADMAP_NODES, ROADMAP_EDGES } from '../data/roadmapData';

const SORT_PRECEDENCE = {
  tag: { 'NeetCode 75': 1, 'Must Do': 2, '': 3 },
  difficulty: { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
};

export default function Roadmap({ problems, onRevise, onEdit }) {
  const [activeTopic, setActiveTopic] = useState(null);

  const topicStats = useMemo(() => {
    const stats = {};
    ROADMAP_NODES.forEach(n => {
      stats[n.id] = { total: 0, solved: 0, problems: [] };
    });
    problems.forEach(p => {
      if (stats[p.topic]) {
        stats[p.topic].total += 1;
        if (p.status === 'solved') stats[p.topic].solved += 1;
        stats[p.topic].problems.push(p);
      }
    });

    Object.keys(stats).forEach(t => {
      stats[t].problems.sort((a, b) => {
        const tagA = SORT_PRECEDENCE.tag[a.tag || ''] || 3;
        const tagB = SORT_PRECEDENCE.tag[b.tag || ''] || 3;
        if (tagA !== tagB) return tagA - tagB;

        const diffA = SORT_PRECEDENCE.difficulty[a.difficulty] || 4;
        const diffB = SORT_PRECEDENCE.difficulty[b.difficulty] || 4;
        if (diffA !== diffB) return diffA - diffB;

        return (a.number || 9999) - (b.number || 9999);
      });
    });
    return stats;
  }, [problems]);

  return (
    <div className="relative w-full h-[900px] bg-[#0a0a10] rounded-2xl border border-slate-800/60 overflow-hidden shadow-2xl animate-fade-in p-4 mx-auto max-w-[1200px] mt-6">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {ROADMAP_EDGES.map((edge, i) => {
          const fromNode = ROADMAP_NODES.find(n => n.id === edge.from);
          const toNode = ROADMAP_NODES.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          
          const stats = topicStats[toNode.id];
          const fromStats = topicStats[fromNode.id];
          const isCompleted = stats && stats.solved === stats.total && stats.total > 0;
          const isUnlocked = fromStats && fromStats.solved > 0;

          const strokeColor = isCompleted ? '#10b981' : isUnlocked ? '#8b5cf6' : 'rgba(148, 163, 184, 0.15)';
          const strokeDash = isCompleted ? 'none' : '4,4';

          return (
            <line
              key={i}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={strokeColor}
              strokeWidth="2"
              strokeDasharray={strokeDash}
              className="transition-all duration-700 ease-in-out"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {ROADMAP_NODES.map(node => {
        const stats = topicStats[node.id];
        const hasData = stats && stats.total > 0;
        const isComplete = hasData && stats.solved === stats.total;
        
        return (
          <div key={node.id} 
               className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
               style={{ left: `${node.x}%`, top: `${node.y}%` }}
               onClick={() => setActiveTopic(node.id)}>
            <div className={`w-36 p-3 rounded-xl border backdrop-blur-xl transition-all duration-300 group-hover:scale-105 ${
              isComplete 
                ? 'bg-emerald-900/30 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:border-emerald-400 group-hover:bg-emerald-900/50' 
                : hasData && stats.solved > 0
                ? 'bg-violet-900/30 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:border-violet-400 group-hover:bg-violet-900/50'
                : 'bg-slate-800/80 border-slate-700 shadow-lg group-hover:border-slate-500 group-hover:bg-slate-800'
            }`}>
              <div className="text-xs font-bold text-center mb-1.5 text-slate-100 flex items-center justify-center gap-1">
                {isComplete && <CheckCircle size={12} className="text-emerald-400" />}
                {node.id}
              </div>
              <div className="flex justify-center items-center gap-1 text-[10px] font-medium text-slate-400">
                <span>{hasData ? stats.solved : 0} / {hasData ? stats.total : 0}</span>
              </div>
              <div className="mt-2 h-1.5 bg-slate-900/60 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-violet-600 to-indigo-500'}`} 
                  style={{ width: `${hasData ? (stats.solved / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Topic Details Modal */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setActiveTopic(null)}>
          <div className="glass-card w-full max-w-3xl flex flex-col h-[85vh] animate-slide-up shadow-2xl border-slate-700" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800/60">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  {activeTopic}
                  {topicStats[activeTopic]?.solved === topicStats[activeTopic]?.total && topicStats[activeTopic]?.total > 0 && <CheckCircle size={20} className="text-emerald-400" />}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Progress: {topicStats[activeTopic]?.solved || 0} / {topicStats[activeTopic]?.total || 0} solved
                </p>
              </div>
              <button onClick={() => setActiveTopic(null)} className="p-2 rounded-xl hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Problem List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {topicStats[activeTopic]?.problems.length > 0 ? (
                topicStats[activeTopic].problems.map((p, idx) => (
                  <div key={p.id} className="glass-card p-4 hover:border-slate-700/50 transition-all group flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {p.number && <span className="text-xs font-mono text-slate-500">#{p.number}</span>}
                        <h3 className="font-semibold text-slate-100">{p.title}</h3>
                        <Badge variant={p.difficulty.toLowerCase()}>{p.difficulty}</Badge>
                        <Badge variant={p.status}>{p.status === 'solved' ? 'Solved' : p.status === 'attempted' ? 'Attempted' : p.status === 'todo' ? 'To Do' : 'Revisit'}</Badge>
                        {p.tag && <Badge variant="outline" className="text-cyan-400 border-cyan-500/30 bg-cyan-500/10">{p.tag}</Badge>}
                      </div>
                      <div className="flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                        {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center text-slate-400 hover:text-cyan-400"><ExternalLink size={12} className="mr-1"/>Open</a>}
                        <button onClick={() => { onEdit(p); setActiveTopic(null); }} className="text-xs flex items-center text-slate-400 hover:text-white"><Edit3 size={12} className="mr-1"/>Edit</button>
                        <button onClick={() => onRevise(p.id)} className="text-xs flex items-center text-slate-400 hover:text-emerald-400"><RefreshCw size={12} className="mr-1"/>Revise</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                  <div className="text-4xl">📭</div>
                  <p>No problems added yet for {activeTopic}.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
