import React from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { Card, Title, BarChart, LineChart, DonutChart } from '@tremor/react';

const Reports: React.FC = () => {
  // Mock data for reports
  const channelMetrics = [
    { channel: 'WhatsApp', messages: 1234, responses: 1100, avgTime: 5 },
    { channel: 'Telegram', messages: 856, responses: 800, avgTime: 4 },
    { channel: 'Instagram', messages: 654, responses: 600, avgTime: 6 },
    { channel: 'Facebook', messages: 432, responses: 400, avgTime: 5 },
  ];

  const timeDistribution = [
    { hour: '00:00', count: 45 },
    { hour: '04:00', count: 20 },
    { hour: '08:00', count: 120 },
    { hour: '12:00', count: 150 },
    { hour: '16:00', count: 180 },
    { hour: '20:00', count: 90 },
  ];

  const satisfactionData = [
    { rating: 'Muito Satisfeito', percentage: 45 },
    { rating: 'Satisfeito', percentage: 30 },
    { rating: 'Neutro', percentage: 15 },
    { rating: 'Insatisfeito', percentage: 7 },
    { rating: 'Muito Insatisfeito', percentage: 3 },
  ];

  return (
    <div className="p-6 ml-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <p className="text-gray-600">Análise detalhada de métricas e desempenho</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Calendar className="w-5 h-5 mr-2" />
            Últimos 30 dias
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Download className="w-5 h-5 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Channel Performance */}
      <Card className="mb-6">
        <Title>Desempenho por Canal</Title>
        <BarChart
          data={channelMetrics}
          index="channel"
          categories={["messages", "responses"]}
          colors={["blue", "green"]}
          valueFormatter={(value) => value.toLocaleString()}
          yAxisWidth={48}
          className="mt-6"
        />
      </Card>

      {/* Time Distribution */}
      <Card className="mb-6">
        <Title>Distribuição de Atendimentos por Hora</Title>
        <LineChart
          data={timeDistribution}
          index="hour"
          categories={["count"]}
          colors={["blue"]}
          valueFormatter={(value) => value.toLocaleString()}
          yAxisWidth={48}
          className="mt-6"
        />
      </Card>

      {/* Customer Satisfaction */}
      <Card>
        <Title>Satisfação dos Clientes</Title>
        <DonutChart
          data={satisfactionData}
          category="percentage"
          index="rating"
          valueFormatter={(value) => `${value}%`}
          colors={["green", "emerald", "blue", "orange", "red"]}
          className="mt-6"
        />
      </Card>
    </div>
  );
};

export default Reports;