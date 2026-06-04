import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Search, Bell, ChevronRight, Sun, Moon, FileText } from 'lucide-react';
import Sidebar from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import ExecutiveBriefingModal from '../ui/ExecutiveBriefingModal';

const pageTitles: Record<string, { title: string; breadcrumb: string[] }> = {
  '/': { title: 'Centro de Comando', breadcrumb: ['Centro de Comando'] },
  '/revenue-observer': { title: 'Observador de Receita', breadcrumb: ['Observador de Receita'] },
  '/leads-em-risco': { title: 'Leads em Risco', breadcrumb: ['Análise', 'Leads em Risco'] },
  '/sla': { title: 'SLA', breadcrumb: ['Análise', 'SLA'] },
  '/oportunidades-perdidas': { title: 'Oportunidades Perdidas', breadcrumb: ['Análise', 'Oportunidades Perdidas'] },
  '/recomendacoes-ia': { title: 'Recomendações IA', breadcrumb: ['IA', 'Recomendações'] },
  '/roadmap-ia': { title: 'Roadmap IA', breadcrumb: ['IA', 'Roadmap'] },
  '/automacoes': { title: 'Regras de Automação', breadcrumb: ['IA', 'Automações'] },
  '/equipe': { title: 'Performance da Equipe', breadcrumb: ['Análise', 'Equipe'] },
  '/funil': { title: 'Vazamento do Funil', breadcrumb: ['Análise', 'Vazamento do Funil'] },
  '/benchmark': { title: 'Benchmark Interno', breadcrumb: ['Análise', 'Benchmark Interno'] },
  '/forecast': { title: 'Previsão de Receita', breadcrumb: ['Análise', 'Previsão de Receita'] },
  '/war-room': { title: 'Centro de Crise', breadcrumb: ['Centro de Crise'] },
  '/detective': { title: 'Detetive IA', breadcrumb: ['IA', 'Detetive IA'] },
  '/roi': { title: 'Retorno (ROI)', breadcrumb: ['Retorno (ROI)'] },
  '/configuracoes': { title: 'Configurações', breadcrumb: ['Configurações'] },
};

export default function AppLayout() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || { title: 'Página', breadcrumb: ['Página'] };
  const [sidebarWidth] = useState(260); // synced with sidebar default
  const { theme, toggleTheme } = useTheme();
  const [showBriefing, setShowBriefing] = useState(false);

  return (
    <div className="min-h-screen bg-surface-950">
      <Sidebar />
      
      {/* Main content */}
      <div className="transition-all duration-300" style={{ marginLeft: sidebarWidth }}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-14 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
          <div className="flex items-center justify-between h-full px-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-surface-500">Operations Intelligence AI</span>
              {pageInfo.breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-surface-600" />
                  <span className={i === pageInfo.breadcrumb.length - 1 ? 'text-surface-200 font-medium' : 'text-surface-500'}>
                    {crumb}
                  </span>
                </span>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-48 pl-9 pr-3 py-1.5 rounded-lg bg-surface-800/50 border border-surface-700/50 text-xs text-surface-300 placeholder-surface-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 transition-colors">
                <Bell size={16} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger-500 border border-surface-950" />
              </button>

              {/* Gerar Briefing */}
              <button 
                onClick={() => setShowBriefing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-800 text-surface-200 text-xs font-semibold hover:bg-surface-700 transition-colors border border-surface-700/50 shadow-sm"
              >
                <FileText size={14} />
                Gerar Briefing
              </button>

              {/* Demo badge */}
              <span className="px-2.5 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/20 text-[10px] font-bold uppercase tracking-wider text-primary-400">
                Demo
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 gradient-mesh min-h-[calc(100vh-3.5rem)] relative z-10">
          <Outlet />
        </main>
      </div>

      {showBriefing && (
        <ExecutiveBriefingModal onClose={() => setShowBriefing(false)} />
      )}
    </div>
  );
}
