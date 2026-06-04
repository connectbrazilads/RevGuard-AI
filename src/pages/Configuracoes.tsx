import { Building2, Bell, Palette, Plug, Shield, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const integrations = [
  { nome: 'WhatsApp Business', descricao: 'Monitorar conversas e follow-ups automaticamente', status: 'Em breve', icon: '💬' },
  { nome: 'CRM (Pipedrive, HubSpot)', descricao: 'Sincronizar leads, oportunidades e pipeline', status: 'Em breve', icon: '📊' },
  { nome: 'ERP (TOTVS, Omie)', descricao: 'Conectar dados financeiros e de faturamento', status: 'Em breve', icon: '🏢' },
  { nome: 'Google Agenda', descricao: 'Monitorar agendamentos e detectar no-shows', status: 'Em breve', icon: '📅' },
  { nome: 'Google Ads', descricao: 'Correlacionar investimento com conversão por canal', status: 'Futuro', icon: '📈' },
  { nome: 'Meta Ads', descricao: 'Analisar ROI de campanhas do Instagram/Facebook', status: 'Futuro', icon: '📱' },
];

export default function Configuracoes() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-50">Configurações</h1>
        <p className="text-sm text-surface-500 mt-1">Gerencie seu perfil, integrações e preferências</p>
      </div>

      {/* Demo badge */}
      <div className="rounded-2xl border border-primary-500/20 bg-primary-500/5 p-4 flex items-center gap-3">
        <span className="px-3 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-xs font-bold uppercase tracking-wider text-primary-400">
          Modo Demo
        </span>
        <p className="text-sm text-surface-400">
          Você está visualizando dados de demonstração. Nenhuma integração real está ativa.
        </p>
      </div>

      {/* Company Profile */}
      <section>
        <h2 className="font-display font-semibold text-surface-100 text-base mb-4 flex items-center gap-2">
          <Building2 size={18} className="text-primary-400" />
          Perfil da Empresa
        </h2>
        <div className="rounded-2xl border border-surface-700/50 bg-surface-900/50 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-surface-400 mb-1.5">Nome da empresa</label>
              <input type="text" value="Empresa Demo LTDA" disabled className="w-full px-3 py-2 rounded-lg bg-surface-800/50 border border-surface-700/50 text-sm text-surface-300 opacity-60 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-medium text-surface-400 mb-1.5">Segmento</label>
              <input type="text" value="Saúde — Clínica Odontológica" disabled className="w-full px-3 py-2 rounded-lg bg-surface-800/50 border border-surface-700/50 text-sm text-surface-300 opacity-60 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-medium text-surface-400 mb-1.5">Unidades</label>
              <input type="text" value="3 (Centro, Norte, Sul)" disabled className="w-full px-3 py-2 rounded-lg bg-surface-800/50 border border-surface-700/50 text-sm text-surface-300 opacity-60 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-medium text-surface-400 mb-1.5">Plano</label>
              <input type="text" value="Enterprise" disabled className="w-full px-3 py-2 rounded-lg bg-surface-800/50 border border-surface-700/50 text-sm text-surface-300 opacity-60 cursor-not-allowed" />
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section>
        <h2 className="font-display font-semibold text-surface-100 text-base mb-4 flex items-center gap-2">
          <Plug size={18} className="text-accent-400" />
          Integrações
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map(int => (
            <div key={int.nome} className="rounded-2xl border border-surface-700/50 bg-surface-900/50 p-4 flex items-start gap-3">
              <span className="text-2xl">{int.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-surface-200 text-sm">{int.nome}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    int.status === 'Em breve'
                      ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20'
                      : 'bg-surface-700/50 text-surface-500 border border-surface-600/30'
                  }`}>
                    {int.status}
                  </span>
                </div>
                <p className="text-xs text-surface-500 mt-1">{int.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h2 className="font-display font-semibold text-surface-100 text-base mb-4 flex items-center gap-2">
          <Bell size={18} className="text-warning-400" />
          Notificações
        </h2>
        <div className="rounded-2xl border border-surface-700/50 bg-surface-900/50 p-6 space-y-4">
          {[
            { label: 'Alertas de SLA estourado', desc: 'Receber notificação quando um SLA for violado', enabled: true },
            { label: 'Leads em risco', desc: 'Avisar quando leads ficarem sem contato por mais de 3 dias', enabled: true },
            { label: 'Relatório diário', desc: 'Resumo executivo enviado por e-mail às 8h', enabled: false },
            { label: 'Novas recomendações da IA', desc: 'Notificar quando a IA descobrir novos insights', enabled: true },
          ].map(notif => (
            <div key={notif.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-surface-200">{notif.label}</p>
                <p className="text-xs text-surface-500">{notif.desc}</p>
              </div>
              <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${notif.enabled ? 'bg-primary-500' : 'bg-surface-700'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${notif.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appearance */}
      <section>
        <h2 className="font-display font-semibold text-surface-100 text-base mb-4 flex items-center gap-2">
          <Palette size={18} className="text-primary-400" />
          Aparência
        </h2>
        <div className="rounded-2xl border border-surface-700/50 bg-surface-900/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-200">Tema escuro</p>
              <p className="text-xs text-surface-500">Alternar entre modo claro e escuro</p>
            </div>
            <button 
              onClick={toggleTheme}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none ${theme === 'dark' ? 'bg-primary-500' : 'bg-surface-700'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Security & Language */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h2 className="font-display font-semibold text-surface-100 text-base mb-4 flex items-center gap-2">
            <Shield size={18} className="text-success-400" />
            Segurança
          </h2>
          <div className="rounded-2xl border border-surface-700/50 bg-surface-900/50 p-6">
            <p className="text-sm text-surface-400">Autenticação e permissões estarão disponíveis na versão completa.</p>
          </div>
        </section>
        <section>
          <h2 className="font-display font-semibold text-surface-100 text-base mb-4 flex items-center gap-2">
            <Globe size={18} className="text-accent-400" />
            Idioma
          </h2>
          <div className="rounded-2xl border border-surface-700/50 bg-surface-900/50 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-300">Português (Brasil)</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-700/50 text-[10px] text-surface-500 font-bold uppercase tracking-wider">Padrão</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
