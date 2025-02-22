import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  ThumbsUp 
} from 'lucide-react';
import { 
  BarChart,
  DonutChart,
  LineChart,
  Card,
  Title,
  Grid
} from '@tremor/react';
import MetricCard from './MetricCard';
import type { 
  Metric, 
  QueueData, 
  AgentPerformance, 
  TicketStatus, 
  ChannelDistribution 
} from '../../types';

// Mock data
const metrics: Metric[] = [
  { 
    title: 'Total de Atendimentos', 
    value: 1234, 
    change: 12, 
    icon: <MessageSquare className="w-6 h-6 text-blue-500" />
  },
  { 
    title: 'Clientes Ativos', 
    value: 856, 
    change: 8, 
    icon: <Users className="w-6 h-6 text-green-500" />
  },
  { 
    title: 'Tempo Médio', 
    value: 15, 
    change: -5, 
    icon: <Clock className="w-6 h-6 text-orange-500" />
  },
  { 
    title: 'Satisfação', 
    value: 98, 
    change: 2, 
    icon: <ThumbsUp className="w-6 h-6 text-purple-500" />
  },
];

const queueData: QueueData[] = [
  { name: 'Suporte', value: 45 },
  { name: 'Vendas', value: 30 },
  { name: 'Financeiro', value: 15 },
  { name: 'Outros', value: 10 },
];

const agentPerformance: AgentPerformance[] = [
  { name: 'João Silva', resolvedTickets: 45, averageResponseTime: 5, satisfaction: 98 },
  { name: 'Maria Santos', resolvedTickets: 38, averageResponseTime: 7, satisfaction: 95 },
  { name: 'Pedro Lima', resolvedTickets: 42, averageResponseTime: 6, satisfaction: 97 },
];

const ticketStatus: TicketStatus[] = [
  { status: 'Em Andamento', count: 45 },
  { status: 'Aguardando', count: 30 },
  { status: 'Resolvido', count: 80 },
  { status: 'Fechado', count: 120 },
];

const channelDistribution: ChannelDistribution[] = [
  { channel: 'WhatsApp', count: 450 },
  { channel: 'Telegram', count: 200 },
  { channel: 'Instagram', count: 180 },
  { channel: 'Facebook', count: 150 },
];

const timelineData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  'Em Andamento': Math.floor(Math.random() * 50),
  'Resolvidos': Math.floor(Math.random() * 80),
}));

const Dashboard = () => {
  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Metrics Cards */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6 mb-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </Grid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Queue Distribution */}
        <Card>
          <Title>Distribuição por Fila</Title>
          <DonutChart
            data={queueData}
            category="value"
            index="name"
            valueFormatter={(number) => `${number}%`}
            className="mt-6"
          />
        </Card>

        {/* Agent Performance */}
        <Card>
          <Title>Performance por Atendente</Title>
          <BarChart
            data={agentPerformance}
            index="name"
            categories={["resolvedTickets"]}
            className="mt-6"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Ticket Status */}
        <Card>
          <Title>Status dos Atendimentos</Title>
          <DonutChart
            data={ticketStatus}
            category="count"
            index="status"
            className="mt-6"
          />
        </Card>

        {/* Channel Distribution */}
        <Card>
          <Title>Distribuição por Canal</Title>
          <BarChart
            data={channelDistribution}
            index="channel"
            categories={["count"]}
            className="mt-6"
          />
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <Title>Evolução dos Atendimentos</Title>
        <LineChart
          data={timelineData}
          index="hour"
          categories={["Em Andamento", "Resolvidos"]}
          className="mt-6"
        />
      </Card>
    </div>
  );
};

export default Dashboard;