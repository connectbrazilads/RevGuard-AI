import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import RevenueObserver from './pages/RevenueObserver';
import LeadsEmRisco from './pages/LeadsEmRisco';
import SLA from './pages/SLA';
import OportunidadesPerdidas from './pages/OportunidadesPerdidas';
import RecomendacoesIA from './pages/RecomendacoesIA';
import RoadmapIA from './pages/RoadmapIA';
import Configuracoes from './pages/Configuracoes';
import PerformanceEquipe from './pages/PerformanceEquipe';
import PipelineLeakage from './pages/PipelineLeakage';
import RegrasAutomacao from './pages/RegrasAutomacao';
import RetornoROI from './pages/RetornoROI';
import RevenueForecast from './pages/RevenueForecast';
import IADetective from './pages/IADetective';
import BenchmarkInterno from './pages/BenchmarkInterno';
import WarRoom from './pages/WarRoom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/revenue-observer" element={<RevenueObserver />} />
          <Route path="/leads-em-risco" element={<LeadsEmRisco />} />
          <Route path="/sla" element={<SLA />} />
          <Route path="/oportunidades-perdidas" element={<OportunidadesPerdidas />} />
          <Route path="/recomendacoes-ia" element={<RecomendacoesIA />} />
          <Route path="/roadmap-ia" element={<RoadmapIA />} />
          <Route path="/equipe" element={<PerformanceEquipe />} />
          <Route path="/funil" element={<PipelineLeakage />} />
          <Route path="/automacoes" element={<RegrasAutomacao />} />
          <Route path="/forecast" element={<RevenueForecast />} />
          <Route path="/war-room" element={<WarRoom />} />
          <Route path="/detective" element={<IADetective />} />
          <Route path="/benchmark" element={<BenchmarkInterno />} />
          <Route path="/roi" element={<RetornoROI />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
