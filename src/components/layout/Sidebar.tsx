import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Eye,
  UserX,
  Clock,
  TrendingDown,
  Lightbulb,
  Map,
  Settings,
  ChevronLeft,
  ChevronRight,
  Users,
  Filter,
  Bot,
  DollarSign,
  LineChart,
  Search,
  Building2,
  AlertOctagon,
  Shield,
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Centro de Comando', icon: LayoutDashboard },
  { path: '/revenue-observer', label: 'Observador de Receita', icon: Eye },
  { path: '/leads-em-risco', label: 'Leads em Risco', icon: UserX },
  { path: '/sla', label: 'SLA', icon: Clock },
  { path: '/oportunidades-perdidas', label: 'Oportunidades Perdidas', icon: TrendingDown },
  { path: '/funil', label: 'Vazamento do Funil', icon: Filter },
  { path: '/equipe', label: 'Performance da Equipe', icon: Users },
  { path: '/benchmark', label: 'Benchmark Interno', icon: Building2 },
  { path: '/forecast', label: 'Previsão de Receita', icon: LineChart },
  { path: '/war-room', label: 'Centro de Crise', icon: AlertOctagon },
  { path: '/recomendacoes-ia', label: 'Recomendações IA', icon: Lightbulb },
  { path: '/detective', label: 'Detetive IA', icon: Search },
  { path: '/automacoes', label: 'Regras de Automação', icon: Bot },
  { path: '/roadmap-ia', label: 'Roadmap IA', icon: Map },
  { path: '/roi', label: 'Retorno (ROI)', icon: DollarSign },
  { path: '/configuracoes', label: 'Configurações', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen flex flex-col border-r border-surface-800/50 bg-surface-950/90 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-6 gap-3 border-b border-surface-800/50">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
          <Shield size={22} fill="currentColor" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-display font-bold text-xl leading-tight text-surface-50">RevGuard</span>
              <span className="bg-primary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">AI</span>
            </div>
            <span className="text-[9px] font-bold text-surface-400 uppercase tracking-widest mt-0.5">Revenue Intelligence</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'text-surface-50 bg-primary-500/15'
                    : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/50'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-primary-400 shadow-lg shadow-primary-400/50" />
                )}
                
                <item.icon
                  size={18}
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? 'text-primary-400' : 'text-surface-500 group-hover:text-surface-300'
                  }`}
                />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-surface-800 text-surface-200 text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl border border-surface-700/50 z-50">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Collapse button */}
      <div className="border-t border-surface-800/50 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-xl text-surface-500 hover:text-surface-300 hover:bg-surface-800/50 transition-all duration-200 text-xs"
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /> <span>Recolher</span></>}
        </button>
      </div>

      {/* User / Company */}
      {!collapsed && (
        <div className="border-t border-surface-800/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-xs font-bold">
              OI
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-surface-200 truncate">Empresa Demo</p>
              <p className="text-[10px] text-surface-500">Plano Enterprise</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
