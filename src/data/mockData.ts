// ─── Types ─────────────────────────────────────────
export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  unidade: string;
  origem: string;
  valor: number;
  status: 'novo' | 'em_contato' | 'sem_retorno' | 'abandonado' | 'convertido' | 'perdido';
  risco: 'alto' | 'medio' | 'baixo';
  ultimoContato: string;
  diasSemContato: number;
  interesse: string;
  motivoPerda?: string;
}

export interface SLARecord {
  id: string;
  cliente: string;
  tipo: 'primeiro_contato' | 'retorno' | 'proposta' | 'agendamento';
  unidade: string;
  tempoResposta: number; // minutes
  slaAlvo: number; // minutes
  estourado: boolean;
  data: string;
  atendente: string;
}

export interface Oportunidade {
  id: string;
  cliente: string;
  motivo: string;
  receita: number;
  data: string;
  unidade: string;
  recuperavel: boolean;
  status: 'perdida' | 'recuperavel' | 'em_recuperacao';
}

export interface Insight {
  id: string;
  emoji: string;
  titulo: string;
  descricao: string;
  impacto: number;
  categoria: 'receita' | 'operacao' | 'conversao' | 'atendimento';
  prioridade: 'critica' | 'alta' | 'media';
}

export interface Recomendacao {
  id: string;
  titulo: string;
  descricao: string;
  racional: string;
  impactoEstimado: number;
  esforco: 'baixo' | 'medio' | 'alto';
  categoria: 'recuperacao' | 'prevencao' | 'otimizacao';
  status: 'pendente' | 'aplicada' | 'ignorada';
}

export interface RoadmapItem {
  id: string;
  fase: number;
  faseNome: string;
  titulo: string;
  descricao: string;
  status: 'ativo' | 'em_breve' | 'futuro';
  integracoes?: string[];
}

export interface ChartDataPoint {
  data: string;
  valor: number;
  label?: string;
}

export interface UnidadeMetrica {
  nome: string;
  conversao: number;
  receita: number;
  slaCompliance: number;
  leadsAtivos: number;
}

// ─── KPI Data ──────────────────────────────────────
export const kpis = {
  receitaPotencial: 124500,
  receitaRecuperavel: 67200,
  receitaPerdida: 42800,
  receitaEmRisco: 28300,
  leadsEmRisco: 37,
  slaEstourado: 23,
  noShowPrevisto: 12,
  leadsSemFollowUp: 48,
  taxaConversao: 18.4,
  ticketMedio: 1850,
  tempoMedioResposta: 4.2, // hours
  leadsDoDia: 142,
  leadsAtendidos: 86,
  leadsPerdidos: 14,
  principalOrigem: 'WhatsApp (68%)',
};

// ─── Leads ─────────────────────────────────────────
export const leads: Lead[] = [
  { id: 'L001', nome: 'João Mendes', email: 'joao.mendes@email.com', telefone: '(11) 99234-5678', unidade: 'Centro', origem: 'WhatsApp', valor: 3200, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-28', diasSemContato: 6, interesse: 'Implante dentário' },
  { id: 'L002', nome: 'Ana Costa', email: 'ana.costa@email.com', telefone: '(11) 98765-4321', unidade: 'Norte', origem: 'Instagram', valor: 1850, status: 'abandonado', risco: 'alto', ultimoContato: '2026-05-25', diasSemContato: 9, interesse: 'Clareamento', motivoPerda: 'SLA estourado' },
  { id: 'L003', nome: 'Pedro Souza', email: 'pedro.souza@email.com', telefone: '(11) 97654-3210', unidade: 'Centro', origem: 'Site', valor: 4500, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-27', diasSemContato: 7, interesse: 'Protocolo completo' },
  { id: 'L004', nome: 'Maria Oliveira', email: 'maria.oliveira@email.com', telefone: '(11) 96543-2109', unidade: 'Sul', origem: 'Indicação', valor: 2100, status: 'em_contato', risco: 'medio', ultimoContato: '2026-06-01', diasSemContato: 2, interesse: 'Ortodontia' },
  { id: 'L005', nome: 'Carlos Lima', email: 'carlos.lima@email.com', telefone: '(11) 95432-1098', unidade: 'Norte', origem: 'Google Ads', valor: 1200, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-26', diasSemContato: 8, interesse: 'Avaliação geral' },
  { id: 'L006', nome: 'Fernanda Reis', email: 'fernanda.reis@email.com', telefone: '(11) 94321-0987', unidade: 'Centro', origem: 'WhatsApp', valor: 5800, status: 'em_contato', risco: 'baixo', ultimoContato: '2026-06-02', diasSemContato: 1, interesse: 'Lentes de contato dental' },
  { id: 'L007', nome: 'Rafael Santos', email: 'rafael.santos@email.com', telefone: '(11) 93210-9876', unidade: 'Norte', origem: 'Instagram', valor: 950, status: 'abandonado', risco: 'alto', ultimoContato: '2026-05-20', diasSemContato: 14, interesse: 'Limpeza + clareamento' },
  { id: 'L008', nome: 'Juliana Pereira', email: 'juliana.pereira@email.com', telefone: '(11) 92109-8765', unidade: 'Sul', origem: 'Site', valor: 3600, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-29', diasSemContato: 5, interesse: 'Facetas de porcelana' },
  { id: 'L009', nome: 'Bruno Almeida', email: 'bruno.almeida@email.com', telefone: '(11) 91098-7654', unidade: 'Centro', origem: 'Google Ads', valor: 2800, status: 'novo', risco: 'medio', ultimoContato: '2026-06-03', diasSemContato: 0, interesse: 'Prótese fixa' },
  { id: 'L010', nome: 'Camila Ferreira', email: 'camila.ferreira@email.com', telefone: '(11) 90987-6543', unidade: 'Norte', origem: 'WhatsApp', valor: 1500, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-24', diasSemContato: 10, interesse: 'Avaliação ortodôntica' },
  { id: 'L011', nome: 'Diego Nascimento', email: 'diego.nasc@email.com', telefone: '(11) 98876-5432', unidade: 'Sul', origem: 'Indicação', valor: 7200, status: 'em_contato', risco: 'baixo', ultimoContato: '2026-06-02', diasSemContato: 1, interesse: 'Reabilitação oral completa' },
  { id: 'L012', nome: 'Larissa Gomes', email: 'larissa.gomes@email.com', telefone: '(11) 97765-4321', unidade: 'Centro', origem: 'Instagram', valor: 2200, status: 'abandonado', risco: 'alto', ultimoContato: '2026-05-22', diasSemContato: 12, interesse: 'Gengivoplastia' },
  { id: 'L013', nome: 'Thiago Barbosa', email: 'thiago.barbosa@email.com', telefone: '(11) 96654-3210', unidade: 'Norte', origem: 'Site', valor: 1100, status: 'sem_retorno', risco: 'medio', ultimoContato: '2026-05-30', diasSemContato: 4, interesse: 'Extração + implante' },
  { id: 'L014', nome: 'Patrícia Duarte', email: 'patricia.duarte@email.com', telefone: '(11) 95543-2109', unidade: 'Centro', origem: 'Google Ads', valor: 4100, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-26', diasSemContato: 8, interesse: 'Protocolo sobre implante' },
  { id: 'L015', nome: 'Roberto Vieira', email: 'roberto.vieira@email.com', telefone: '(11) 94432-1098', unidade: 'Sul', origem: 'WhatsApp', valor: 1650, status: 'novo', risco: 'baixo', ultimoContato: '2026-06-03', diasSemContato: 0, interesse: 'Clareamento a laser' },
  { id: 'L016', nome: 'Aline Martins', email: 'aline.martins@email.com', telefone: '(11) 93321-0987', unidade: 'Norte', origem: 'Indicação', valor: 890, status: 'abandonado', risco: 'alto', ultimoContato: '2026-05-18', diasSemContato: 16, interesse: 'Restauração dentária' },
  { id: 'L017', nome: 'Gustavo Henrique', email: 'gustavo.h@email.com', telefone: '(11) 92210-9876', unidade: 'Centro', origem: 'Instagram', valor: 3400, status: 'em_contato', risco: 'medio', ultimoContato: '2026-06-01', diasSemContato: 2, interesse: 'Aparelho invisível' },
  { id: 'L018', nome: 'Beatriz Rocha', email: 'beatriz.rocha@email.com', telefone: '(11) 91109-8765', unidade: 'Sul', origem: 'Site', valor: 2600, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-27', diasSemContato: 7, interesse: 'Periodontia' },
  { id: 'L019', nome: 'Lucas Teixeira', email: 'lucas.teixeira@email.com', telefone: '(11) 90098-7654', unidade: 'Centro', origem: 'Google Ads', valor: 5200, status: 'convertido', risco: 'baixo', ultimoContato: '2026-06-03', diasSemContato: 0, interesse: 'Implante + coroa' },
  { id: 'L020', nome: 'Isabela Cunha', email: 'isabela.cunha@email.com', telefone: '(11) 99987-6543', unidade: 'Norte', origem: 'WhatsApp', valor: 1400, status: 'perdido', risco: 'alto', ultimoContato: '2026-05-15', diasSemContato: 19, interesse: 'Avaliação geral', motivoPerda: 'Sem retorno' },
  { id: 'L021', nome: 'Marcos Paulo', email: 'marcos.paulo@email.com', telefone: '(11) 98876-5431', unidade: 'Centro', origem: 'Indicação', valor: 6800, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-28', diasSemContato: 6, interesse: 'Reabilitação estética' },
  { id: 'L022', nome: 'Vanessa Lima', email: 'vanessa.lima@email.com', telefone: '(11) 97765-4320', unidade: 'Sul', origem: 'Instagram', valor: 1950, status: 'em_contato', risco: 'medio', ultimoContato: '2026-06-01', diasSemContato: 2, interesse: 'Clareamento + facetas' },
  { id: 'L023', nome: 'André Moreira', email: 'andre.moreira@email.com', telefone: '(11) 96654-3219', unidade: 'Norte', origem: 'Site', valor: 780, status: 'abandonado', risco: 'alto', ultimoContato: '2026-05-19', diasSemContato: 15, interesse: 'Consulta preventiva' },
  { id: 'L024', nome: 'Priscila Nunes', email: 'priscila.nunes@email.com', telefone: '(11) 95543-2108', unidade: 'Centro', origem: 'Google Ads', valor: 3900, status: 'sem_retorno', risco: 'alto', ultimoContato: '2026-05-25', diasSemContato: 9, interesse: 'Lentes de contato dental' },
  { id: 'L025', nome: 'Eduardo Ramos', email: 'eduardo.ramos@email.com', telefone: '(11) 94432-1097', unidade: 'Sul', origem: 'WhatsApp', valor: 2300, status: 'novo', risco: 'baixo', ultimoContato: '2026-06-03', diasSemContato: 0, interesse: 'Ortodontia estética' },
];

// ─── SLA Records ───────────────────────────────────
export const slaRecords: SLARecord[] = [
  { id: 'S001', cliente: 'João Mendes', tipo: 'primeiro_contato', unidade: 'Centro', tempoResposta: 180, slaAlvo: 60, estourado: true, data: '2026-05-28', atendente: 'Carla' },
  { id: 'S002', cliente: 'Ana Costa', tipo: 'retorno', unidade: 'Norte', tempoResposta: 320, slaAlvo: 120, estourado: true, data: '2026-05-25', atendente: 'Roberto' },
  { id: 'S003', cliente: 'Pedro Souza', tipo: 'proposta', unidade: 'Centro', tempoResposta: 45, slaAlvo: 60, estourado: false, data: '2026-05-27', atendente: 'Carla' },
  { id: 'S004', cliente: 'Maria Oliveira', tipo: 'primeiro_contato', unidade: 'Sul', tempoResposta: 30, slaAlvo: 60, estourado: false, data: '2026-06-01', atendente: 'Amanda' },
  { id: 'S005', cliente: 'Carlos Lima', tipo: 'retorno', unidade: 'Norte', tempoResposta: 480, slaAlvo: 120, estourado: true, data: '2026-05-26', atendente: 'Roberto' },
  { id: 'S006', cliente: 'Fernanda Reis', tipo: 'agendamento', unidade: 'Centro', tempoResposta: 15, slaAlvo: 30, estourado: false, data: '2026-06-02', atendente: 'Carla' },
  { id: 'S007', cliente: 'Rafael Santos', tipo: 'primeiro_contato', unidade: 'Norte', tempoResposta: 720, slaAlvo: 60, estourado: true, data: '2026-05-20', atendente: 'Roberto' },
  { id: 'S008', cliente: 'Juliana Pereira', tipo: 'retorno', unidade: 'Sul', tempoResposta: 200, slaAlvo: 120, estourado: true, data: '2026-05-29', atendente: 'Amanda' },
  { id: 'S009', cliente: 'Bruno Almeida', tipo: 'primeiro_contato', unidade: 'Centro', tempoResposta: 25, slaAlvo: 60, estourado: false, data: '2026-06-03', atendente: 'Carla' },
  { id: 'S010', cliente: 'Camila Ferreira', tipo: 'proposta', unidade: 'Norte', tempoResposta: 540, slaAlvo: 120, estourado: true, data: '2026-05-24', atendente: 'Roberto' },
  { id: 'S011', cliente: 'Larissa Gomes', tipo: 'primeiro_contato', unidade: 'Centro', tempoResposta: 360, slaAlvo: 60, estourado: true, data: '2026-05-22', atendente: 'Juliana' },
  { id: 'S012', cliente: 'Thiago Barbosa', tipo: 'retorno', unidade: 'Norte', tempoResposta: 90, slaAlvo: 120, estourado: false, data: '2026-05-30', atendente: 'Roberto' },
  { id: 'S013', cliente: 'Patrícia Duarte', tipo: 'proposta', unidade: 'Centro', tempoResposta: 240, slaAlvo: 120, estourado: true, data: '2026-05-26', atendente: 'Carla' },
  { id: 'S014', cliente: 'Aline Martins', tipo: 'primeiro_contato', unidade: 'Norte', tempoResposta: 960, slaAlvo: 60, estourado: true, data: '2026-05-18', atendente: 'Roberto' },
  { id: 'S015', cliente: 'Beatriz Rocha', tipo: 'retorno', unidade: 'Sul', tempoResposta: 280, slaAlvo: 120, estourado: true, data: '2026-05-27', atendente: 'Amanda' },
  { id: 'S016', cliente: 'Marcos Paulo', tipo: 'primeiro_contato', unidade: 'Centro', tempoResposta: 150, slaAlvo: 60, estourado: true, data: '2026-05-28', atendente: 'Juliana' },
  { id: 'S017', cliente: 'André Moreira', tipo: 'retorno', unidade: 'Norte', tempoResposta: 600, slaAlvo: 120, estourado: true, data: '2026-05-19', atendente: 'Roberto' },
  { id: 'S018', cliente: 'Priscila Nunes', tipo: 'proposta', unidade: 'Centro', tempoResposta: 420, slaAlvo: 120, estourado: true, data: '2026-05-25', atendente: 'Carla' },
  { id: 'S019', cliente: 'Gustavo Henrique', tipo: 'primeiro_contato', unidade: 'Centro', tempoResposta: 40, slaAlvo: 60, estourado: false, data: '2026-06-01', atendente: 'Juliana' },
  { id: 'S020', cliente: 'Vanessa Lima', tipo: 'retorno', unidade: 'Sul', tempoResposta: 55, slaAlvo: 120, estourado: false, data: '2026-06-01', atendente: 'Amanda' },
];

// ─── Oportunidades Perdidas ────────────────────────
export const oportunidades: Oportunidade[] = [
  { id: 'O001', cliente: 'João Mendes', motivo: 'Sem retorno', receita: 3200, data: '2026-05-28', unidade: 'Centro', recuperavel: true, status: 'recuperavel' },
  { id: 'O002', cliente: 'Ana Costa', motivo: 'SLA estourado', receita: 1850, data: '2026-05-25', unidade: 'Norte', recuperavel: true, status: 'recuperavel' },
  { id: 'O003', cliente: 'Pedro Souza', motivo: 'Follow-up ausente', receita: 4500, data: '2026-05-27', unidade: 'Centro', recuperavel: true, status: 'em_recuperacao' },
  { id: 'O004', cliente: 'Carlos Lima', motivo: 'Sem retorno', receita: 1200, data: '2026-05-26', unidade: 'Norte', recuperavel: false, status: 'perdida' },
  { id: 'O005', cliente: 'Rafael Santos', motivo: 'Abandono total', receita: 950, data: '2026-05-20', unidade: 'Norte', recuperavel: false, status: 'perdida' },
  { id: 'O006', cliente: 'Camila Ferreira', motivo: 'Sem retorno', receita: 1500, data: '2026-05-24', unidade: 'Norte', recuperavel: true, status: 'recuperavel' },
  { id: 'O007', cliente: 'Larissa Gomes', motivo: 'Abandono total', receita: 2200, data: '2026-05-22', unidade: 'Centro', recuperavel: false, status: 'perdida' },
  { id: 'O008', cliente: 'Juliana Pereira', motivo: 'Follow-up ausente', receita: 3600, data: '2026-05-29', unidade: 'Sul', recuperavel: true, status: 'recuperavel' },
  { id: 'O009', cliente: 'Patrícia Duarte', motivo: 'SLA estourado', receita: 4100, data: '2026-05-26', unidade: 'Centro', recuperavel: true, status: 'em_recuperacao' },
  { id: 'O010', cliente: 'Aline Martins', motivo: 'Abandono total', receita: 890, data: '2026-05-18', unidade: 'Norte', recuperavel: false, status: 'perdida' },
  { id: 'O011', cliente: 'Beatriz Rocha', motivo: 'Follow-up ausente', receita: 2600, data: '2026-05-27', unidade: 'Sul', recuperavel: true, status: 'recuperavel' },
  { id: 'O012', cliente: 'Marcos Paulo', motivo: 'Sem retorno', receita: 6800, data: '2026-05-28', unidade: 'Centro', recuperavel: true, status: 'recuperavel' },
  { id: 'O013', cliente: 'André Moreira', motivo: 'Abandono total', receita: 780, data: '2026-05-19', unidade: 'Norte', recuperavel: false, status: 'perdida' },
  { id: 'O014', cliente: 'Priscila Nunes', motivo: 'SLA estourado', receita: 3900, data: '2026-05-25', unidade: 'Centro', recuperavel: true, status: 'recuperavel' },
  { id: 'O015', cliente: 'Isabela Cunha', motivo: 'Sem retorno', receita: 1400, data: '2026-05-15', unidade: 'Norte', recuperavel: false, status: 'perdida' },
];

// ─── Insights da IA ────────────────────────────────
export const insights: Insight[] = [
  {
    id: 'I001',
    emoji: '📈',
    titulo: 'Leads de alto valor sem follow-up',
    descricao: '48% dos leads de alto valor ficaram sem follow-up nas últimas 72h. Leads acima de R$ 3.000 estão sendo negligenciados na fase de proposta.',
    impacto: 32400,
    categoria: 'receita',
    prioridade: 'critica',
  },
  {
    id: 'I002',
    emoji: '🏢',
    titulo: 'Diferença de conversão entre unidades',
    descricao: 'A unidade Centro converte 2,3x mais que a unidade Norte. O tempo médio de primeiro contato na Norte é 4x maior.',
    impacto: 18600,
    categoria: 'conversao',
    prioridade: 'alta',
  },
  {
    id: 'I003',
    emoji: '💰',
    titulo: 'Propostas não enviadas',
    descricao: '18 pacientes demonstraram interesse declarado mas nunca receberam uma proposta formal de tratamento.',
    impacto: 24800,
    categoria: 'receita',
    prioridade: 'critica',
  },
  {
    id: 'I004',
    emoji: '⏰',
    titulo: 'Horário de pico ignorado',
    descricao: '62% dos leads chegam entre 19h e 22h, mas o tempo de resposta nesse horário é 5x maior que no horário comercial.',
    impacto: 15200,
    categoria: 'atendimento',
    prioridade: 'alta',
  },
  {
    id: 'I005',
    emoji: '🔄',
    titulo: 'Padrão de no-show previsível',
    descricao: 'Pacientes que não recebem lembrete 24h antes têm 3,4x mais chance de no-show. 12 consultas estão em risco essa semana.',
    impacto: 8400,
    categoria: 'operacao',
    prioridade: 'media',
  },
  {
    id: 'I006',
    emoji: '📱',
    titulo: 'WhatsApp com melhor ROI',
    descricao: 'Leads originados do WhatsApp convertem 67% mais que os de Google Ads, mas recebem 40% menos investimento em follow-up.',
    impacto: 12300,
    categoria: 'conversao',
    prioridade: 'alta',
  },
];

// ─── Feed de Atividade da IA ───────────────────────
export const activityLogData = [
  { id: 'AL1', tempo: 'Há 2 min', icon: '⚡', titulo: 'Risco de no-show detectado', descricao: 'Paciente Pedro Souza tem 85% de chance de falta amanhã.', tipo: 'alerta' },
  { id: 'AL2', tempo: 'Há 15 min', icon: '🤖', titulo: 'Automação disparada', descricao: 'Campanha de reengajamento enviada via WhatsApp para 12 leads frios.', tipo: 'sucesso' },
  { id: 'AL3', tempo: 'Há 40 min', icon: '⚠️', titulo: 'SLA Estourado', descricao: 'Unidade Norte excedeu o tempo de resposta (120min) para 3 novos leads.', tipo: 'perigo' },
  { id: 'AL4', tempo: 'Há 1 hora', icon: '💰', titulo: 'Oportunidade Recuperada', descricao: 'Aline Martins respondeu à automação e agendou avaliação.', tipo: 'sucesso' },
  { id: 'AL5', tempo: 'Há 2 horas', icon: '🧠', titulo: 'Novo Insight Gerado', descricao: 'IA detectou padrão de conversão 40% maior nas quartas-feiras.', tipo: 'info' },
  { id: 'AL6', tempo: 'Há 3 horas', icon: '📊', titulo: 'Relatório Consolidado', descricao: 'Relatório matinal enviado para os diretores.', tipo: 'info' },
];

// ─── Recomendações da IA ───────────────────────────
export const recomendacoes: Recomendacao[] = [
  {
    id: 'R001',
    titulo: 'Recuperar 37 leads com interesse declarado',
    descricao: 'Enviar mensagem personalizada via WhatsApp para leads com interesse declarado e sem retorno há mais de 3 dias.',
    racional: 'Leads com interesse explícito têm 4,2x mais chance de conversão quando recontactados dentro de 7 dias.',
    impactoEstimado: 18200,
    esforco: 'baixo',
    categoria: 'recuperacao',
    status: 'pendente',
  },
  {
    id: 'R002',
    titulo: 'Implementar lembrete automático 24h',
    descricao: 'Configurar envio automático de lembrete 24h antes de cada consulta agendada.',
    racional: 'Baseado nos dados, isso pode reduzir no-shows em até 68%, economizando R$ 8.400/mês em slots desperdiçados.',
    impactoEstimado: 8400,
    esforco: 'baixo',
    categoria: 'prevencao',
    status: 'pendente',
  },
  {
    id: 'R003',
    titulo: 'Replicar processo da unidade Centro',
    descricao: 'Mapear e documentar o processo de atendimento da unidade Centro e replicar nas unidades Norte e Sul.',
    racional: 'A unidade Centro converte 2,3x mais. Se Norte atingir 80% da eficiência do Centro, a receita mensal pode crescer R$ 14.500.',
    impactoEstimado: 14500,
    esforco: 'medio',
    categoria: 'otimizacao',
    status: 'pendente',
  },
  {
    id: 'R004',
    titulo: 'Criar fila de prioridade por valor do lead',
    descricao: 'Ordenar a fila de atendimento pelo valor potencial do lead, garantindo que oportunidades acima de R$ 3.000 sejam atendidas primeiro.',
    racional: 'Atualmente os leads são atendidos por ordem de chegada, independente do valor. 68% dos leads de alto valor esperam mais que o SLA.',
    impactoEstimado: 22600,
    esforco: 'baixo',
    categoria: 'otimizacao',
    status: 'pendente',
  },
  {
    id: 'R005',
    titulo: 'Estender horário de atendimento WhatsApp',
    descricao: 'Garantir atendimento humano ou automação qualificada entre 19h-22h nos dias úteis.',
    racional: '62% dos leads chegam nesse horário mas a taxa de resposta cai 73%. Isso representa R$ 15.200/mês em receita potencial não capturada.',
    impactoEstimado: 15200,
    esforco: 'medio',
    categoria: 'otimizacao',
    status: 'pendente',
  },
  {
    id: 'R006',
    titulo: 'Reativar leads dormentes de maio',
    descricao: 'Campanha de reativação para 23 leads que ficaram inativos em maio mas tiveram alto nível de interesse.',
    racional: 'Leads dormentes de até 30 dias ainda convertem a 12% com estímulo adequado. ROI esperado: 5,8x sobre o custo da campanha.',
    impactoEstimado: 9800,
    esforco: 'baixo',
    categoria: 'recuperacao',
    status: 'pendente',
  },
];

// ─── Roadmap IA ────────────────────────────────────
export const roadmapItems: RoadmapItem[] = [
  { id: 'RM01', fase: 1, faseNome: 'Observador', titulo: 'Dashboard de Revenue Intelligence', descricao: 'Visualização em tempo real de receita potencial, perdida e recuperável.', status: 'ativo' },
  { id: 'RM02', fase: 1, faseNome: 'Observador', titulo: 'Detecção de leads em risco', descricao: 'Identificação automática de leads sem follow-up ou com SLA estourado.', status: 'ativo' },
  { id: 'RM03', fase: 1, faseNome: 'Observador', titulo: 'Insights operacionais', descricao: 'Análise comparativa entre unidades, canais e períodos.', status: 'ativo' },
  
  { id: 'RM04', fase: 2, faseNome: 'Recomendações', titulo: 'Score de propensão', descricao: 'IA que prediz a probabilidade de conversão de cada lead.', status: 'em_breve', integracoes: ['CRM'] },
  { id: 'RM05', fase: 2, faseNome: 'Recomendações', titulo: 'Previsão de no-show', descricao: 'Modelo preditivo de ausências baseado em padrões históricos.', status: 'em_breve', integracoes: ['Agenda'] },
  
  { id: 'RM06', fase: 3, faseNome: 'Automação', titulo: 'Follow-up automático', descricao: 'Envio de mensagens personalizadas baseado em gatilhos comportamentais.', status: 'futuro', integracoes: ['WhatsApp', 'CRM'] },
  { id: 'RM07', fase: 3, faseNome: 'Automação', titulo: 'Agendamento inteligente', descricao: 'Sugestão automática de horários ótimos baseada em dados de conversão.', status: 'futuro', integracoes: ['Agenda', 'WhatsApp'] },
  
  { id: 'RM08', fase: 4, faseNome: 'Atendimento Assistido', titulo: 'Priorização automática da fila', descricao: 'Reordenamento da fila de atendimento por valor e probabilidade de conversão.', status: 'futuro', integracoes: ['CRM', 'WhatsApp'] },
  { id: 'RM09', fase: 4, faseNome: 'Atendimento Assistido', titulo: 'Sugestão de respostas em tempo real', descricao: 'IA sugerindo respostas com base no histórico do cliente e contexto.', status: 'futuro', integracoes: ['WhatsApp', 'CRM'] },

  { id: 'RM10', fase: 5, faseNome: 'Predição', titulo: 'Previsão de churn', descricao: 'Detecção antecipada de clientes em risco de cancelamento.', status: 'futuro', integracoes: ['CRM', 'ERP'] },
  { id: 'RM11', fase: 5, faseNome: 'Predição', titulo: 'Forecasting de receita', descricao: 'Previsão de fechamento baseada em tendências micro-comportamentais.', status: 'futuro', integracoes: ['CRM', 'ERP'] },

  { id: 'RM12', fase: 6, faseNome: 'Copilot', titulo: 'Revenue autopilot', descricao: 'Sistema autônomo que gerencia todo o ciclo de recuperação de receita.', status: 'futuro', integracoes: ['CRM', 'WhatsApp', 'ERP', 'Agenda'] },
  { id: 'RM13', fase: 6, faseNome: 'Copilot', titulo: 'Negociação automatizada', descricao: 'IA que conduz negociações iniciais e agenda reuniões com decisores.', status: 'futuro', integracoes: ['WhatsApp', 'CRM', 'Agenda'] },
];

// ─── Chart Data ────────────────────────────────────
export const receitaTrend: ChartDataPoint[] = [
  { data: '27/05', valor: 8200 },
  { data: '28/05', valor: 12400 },
  { data: '29/05', valor: 9800 },
  { data: '30/05', valor: 15600 },
  { data: '31/05', valor: 11200 },
  { data: '01/06', valor: 18900 },
  { data: '02/06', valor: 21300 },
  { data: '03/06', valor: 16700 },
];

export const receitaMensal: ChartDataPoint[] = [
  { data: 'Jan', valor: 82000 },
  { data: 'Fev', valor: 78000 },
  { data: 'Mar', valor: 95000 },
  { data: 'Abr', valor: 88000 },
  { data: 'Mai', valor: 104000 },
  { data: 'Jun', valor: 124500 },
];

export const slaTrend: ChartDataPoint[] = [
  { data: '27/05', valor: 62 },
  { data: '28/05', valor: 58 },
  { data: '29/05', valor: 71 },
  { data: '30/05', valor: 65 },
  { data: '31/05', valor: 72 },
  { data: '01/06', valor: 78 },
  { data: '02/06', valor: 74 },
  { data: '03/06', valor: 69 },
];

export const motivosPerda: ChartDataPoint[] = [
  { data: 'Sem retorno', valor: 14100, label: 'Sem retorno' },
  { data: 'SLA estourado', valor: 9850, label: 'SLA estourado' },
  { data: 'Follow-up ausente', valor: 10700, label: 'Follow-up ausente' },
  { data: 'Abandono total', valor: 4820, label: 'Abandono total' },
];

// ─── Unidades ──────────────────────────────────────
export const unidades: UnidadeMetrica[] = [
  { nome: 'Centro', conversao: 28.5, receita: 52300, slaCompliance: 78, leadsAtivos: 42 },
  { nome: 'Norte', conversao: 12.4, receita: 31200, slaCompliance: 45, leadsAtivos: 35 },
  { nome: 'Sul', conversao: 22.1, receita: 41000, slaCompliance: 68, leadsAtivos: 28 },
];

// ─── "Se eu fosse você" ────────────────────────────
export const conselhosIA = [
  {
    id: 'C001',
    texto: 'Se eu fosse você, começaria recuperando os 37 leads de alto valor sem follow-up. O impacto potencial estimado é de R$ 32.400.',
    acao: 'Iniciar campanha de recuperação',
    prioridade: 'critica' as const,
  },
  {
    id: 'C002',
    texto: 'A unidade Norte está operando com metade da eficiência do Centro. Eu replicaria o processo de atendimento do Centro na Norte imediatamente. Potencial de ganho: R$ 14.500/mês.',
    acao: 'Mapear processo da unidade Centro',
    prioridade: 'alta' as const,
  },
  {
    id: 'C003',
    texto: 'Você está perdendo R$ 15.200/mês porque 62% dos leads chegam à noite e ninguém responde. Eu implementaria uma automação de triagem para horários fora do expediente.',
    acao: 'Configurar automação noturna',
    prioridade: 'alta' as const,
  },
];

// ─── Utility Functions ─────────────────────────────
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

// ─── Equipe Performance ──────────────────────────────
export interface MembroEquipe {
  id: string;
  nome: string;
  cargo: string;
  leadsAtendidos: number;
  tempoMedio: string;
  conversao: number;
  receitaGerada: number;
  status: 'excelente' | 'bom' | 'critico';
  tendencia: number[];
}

export const equipeData: MembroEquipe[] = [
  { id: '1', nome: 'Carlos Silva', cargo: 'Closer Sênior', leadsAtendidos: 145, tempoMedio: '4m 30s', conversao: 28.5, receitaGerada: 45000, status: 'excelente', tendencia: [12, 15, 14, 18, 22, 25, 39] },
  { id: '2', nome: 'Ana Souza', cargo: 'SDR', leadsAtendidos: 210, tempoMedio: '8m 15s', conversao: 19.2, receitaGerada: 32000, status: 'bom', tendencia: [20, 22, 19, 25, 30, 40, 54] },
  { id: '3', nome: 'Marcos Paulo', cargo: 'Closer Pleno', leadsAtendidos: 98, tempoMedio: '1h 45m', conversao: 8.5, receitaGerada: 12500, status: 'critico', tendencia: [15, 14, 12, 10, 8, 15, 24] },
  { id: '4', nome: 'Juliana Costa', cargo: 'SDR', leadsAtendidos: 180, tempoMedio: '12m 00s', conversao: 22.0, receitaGerada: 38000, status: 'excelente', tendencia: [18, 20, 22, 28, 35, 38, 19] },
];

// ─── Pipeline Leakage (Funil) ─────────────────────────
export interface FunilStage {
  etapa: string;
  quantidade: number;
  taxaQueda: number;
  valorPerdido: number;
}

export const funilData: FunilStage[] = [
  { etapa: '1. Lead Recebido', quantidade: 1000, taxaQueda: 0, valorPerdido: 0 },
  { etapa: '2. Contato Feito', quantidade: 850, taxaQueda: 15, valorPerdido: 22500 },
  { etapa: '3. Proposta Enviada', quantidade: 400, taxaQueda: 53, valorPerdido: 85000 },
  { etapa: '4. Negociação Ativa', quantidade: 280, taxaQueda: 30, valorPerdido: 35000 },
  { etapa: '5. Fechamento (Ganho)', quantidade: 180, taxaQueda: 35, valorPerdido: 45000 },
];

// ─── Regras de Automação ─────────────────────────────
export interface RegraAutomacao {
  id: string;
  nome: string;
  gatilho: string;
  condicao: string;
  acao: string;
  ativa: boolean;
  execucoes: number;
}

export const regrasData: RegraAutomacao[] = [
  { id: 'r1', nome: 'Resgate de Alto Valor', gatilho: 'Lead Novo', condicao: 'Sem Contato > 15 min E Valor > R$ 5.000', acao: 'Enviar WhatsApp (Template Urgência)', ativa: true, execucoes: 342 },
  { id: 'r2', nome: 'Follow-up de Proposta', gatilho: 'Proposta Enviada', condicao: 'Sem Resposta > 48h', acao: 'Notificar Closer no Slack E Enviar E-mail', ativa: true, execucoes: 850 },
  { id: 'r3', nome: 'Recuperação de Perdidos', gatilho: 'Lead Perdido', condicao: 'Motivo = "Preço" E Tempo > 90 dias', acao: 'Adicionar à Campanha de Desconto', ativa: false, execucoes: 120 },
  { id: 'r4', nome: 'Alerta de No-show', gatilho: 'Agendamento Feito', condicao: 'Falta 2 horas para Reunião', acao: 'Disparo de WhatsApp de Confirmação', ativa: true, execucoes: 1450 },
];

// ─── ROI (Value Realization) ──────────────────────────
export interface RoiMes {
  mes: string;
  receitaSalva: number;
  custoSoftware: number;
  horasPoupadas: number;
}

export const roiData: RoiMes[] = [
  { mes: 'Jan', receitaSalva: 12500, custoSoftware: 1500, horasPoupadas: 45 },
  { mes: 'Fev', receitaSalva: 18000, custoSoftware: 1500, horasPoupadas: 52 },
  { mes: 'Mar', receitaSalva: 24500, custoSoftware: 1500, horasPoupadas: 68 },
  { mes: 'Abr', receitaSalva: 32000, custoSoftware: 1500, horasPoupadas: 85 },
  { mes: 'Mai', receitaSalva: 45000, custoSoftware: 1500, horasPoupadas: 110 },
  { mes: 'Jun', receitaSalva: 42000, custoSoftware: 1500, horasPoupadas: 95 },
];

// ─── Phase 2: Enterprise B2B Features ────────────────

export interface RevenueForecast {
  data: string;
  realizado?: number;
  projetadoBase?: number;
  projetadoOtimista?: number;
  projetadoPessimista?: number;
}

// Histórico de 15 dias + Previsão de 30 dias
export const forecastData: RevenueForecast[] = Array.from({ length: 45 }).map((_, i) => {
  const dia = i + 1;
  const baseReal = 10000 + (Math.random() * 5000);
  
  if (i < 15) {
    // Passado
    return { data: `Dia ${dia}`, realizado: Math.round(baseReal) };
  } else {
    // Futuro
    const crescimentoBase = (i - 15) * 200;
    const projetadoBase = 12500 + crescimentoBase + (Math.random() * 2000);
    return {
      data: `Dia ${dia}`,
      projetadoBase: Math.round(projetadoBase),
      projetadoOtimista: Math.round(projetadoBase * 1.25),
      projetadoPessimista: Math.round(projetadoBase * 0.8),
    };
  }
});

export const forecastMetrics = {
  oportunidade: 380000,
  risco: 92000,
  metaProvavel: 288000
};

export interface IAAnomaly {
  id: string;
  ocorrencia: string;
  metricVariation: string;
  isNegative: boolean;
  motivoProvavel: string;
  impactoEstimado: number;
  data: string;
}

export const detectiveData: IAAnomaly[] = [
  { id: 'a1', ocorrencia: 'Taxa de Conversão caiu', metricVariation: '-18%', isNegative: true, motivoProvavel: 'Tempo médio de resposta aumentou 42% após as 14h', impactoEstimado: 27000, data: 'Hoje' },
  { id: 'a2', ocorrencia: 'Taxa de No-show subiu', metricVariation: '+24%', isNegative: true, motivoProvavel: 'Automação de Confirmação (Regra #4) está desativada', impactoEstimado: 12500, data: 'Ontem' },
  { id: 'a3', ocorrencia: 'Fechamentos dispararam', metricVariation: '+35%', isNegative: false, motivoProvavel: 'Campanha de "Reativação de Perdidos" teve forte aderência', impactoEstimado: 45000, data: 'Há 3 dias' },
];

export interface UnidadeBenchmark {
  id: string;
  nome: string;
  conversao: number;
  sla: number;
  receitaGerada: number;
  leadsProcessados: number;
}

export const benchmarkData: UnidadeBenchmark[] = [
  { id: 'u1', nome: 'Unidade Centro', conversao: 28, sla: 95, receitaGerada: 420000, leadsProcessados: 1500 },
  { id: 'u2', nome: 'Unidade Sul', conversao: 22, sla: 82, receitaGerada: 280000, leadsProcessados: 1250 },
  { id: 'u3', nome: 'Unidade Norte', conversao: 11, sla: 45, receitaGerada: 125000, leadsProcessados: 1100 },
  { id: 'u4', nome: 'Unidade Leste', conversao: 19, sla: 76, receitaGerada: 210000, leadsProcessados: 1050 },
];

// ─── War Room (Centro de Crise) ────────────────────────

export const warRoomData = {
  receitaEmRiscoHoje: 48200,
  causas: [
    { id: 'c1', descricao: 'Propostas não enviadas', quantidade: 12, prioridade: 'alta' },
    { id: 'c2', descricao: 'Leads sem follow-up > 24h', quantidade: 17, prioridade: 'alta' },
    { id: 'c3', descricao: 'Reuniões sem confirmação', quantidade: 8, prioridade: 'media' },
    { id: 'c4', descricao: 'SLA críticos estourados', quantidade: 4, prioridade: 'alta' },
  ],
  acoes: [
    { id: 'a1', acao: 'Disparar Propostas em Lote', impactoEstimado: 18000, risco: 'Alto' },
    { id: 'a2', acao: 'Executar Automação de Recuperação', impactoEstimado: 12000, risco: 'Alto' },
    { id: 'a3', acao: 'Alocar SDRs de backup para Follow-up', impactoEstimado: 9000, risco: 'Médio' },
    { id: 'a4', acao: 'Confirmar agendas via WhatsApp Call', impactoEstimado: 4500, risco: 'Médio' },
  ]
};
