import React from 'react';
import { Plus, DollarSign, Calendar, User } from 'lucide-react';
import Card from './Card';
import type { Deal } from '@/types';

interface BoardProps {
  deals: Deal[];
  onNewDeal: () => void;
  onEditDeal: (deal: Deal) => void;
  onDragEnd: (dealId: string, newStage: Deal['stage']) => void;
}

const stages = [
  { id: 'prospect', name: 'Prospecção', color: 'bg-gray-500' },
  { id: 'qualified', name: 'Qualificado', color: 'bg-blue-500' },
  { id: 'proposal', name: 'Proposta', color: 'bg-yellow-500' },
  { id: 'negotiation', name: 'Negociação', color: 'bg-purple-500' },
  { id: 'closed', name: 'Fechado', color: 'bg-green-500' }
] as const;

const Board: React.FC<BoardProps> = ({
  deals,
  onNewDeal,
  onEditDeal,
  onDragEnd
}) => {
  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('dealId', dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: Deal['stage']) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('dealId');
    onDragEnd(dealId, targetStage);
  };

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const averageDays = Math.round(
    deals.reduce((sum, deal) => {
      const days = Math.round(
        (new Date(deal.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      return sum + days;
    }, 0) / deals.length
  );

  return (
    <div className="p-6 ml-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pipeline de Vendas</h1>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>Total: R$ {totalValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Média: {averageDays} dias</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{deals.length} Deals</span>
            </div>
          </div>
        </div>
        <button
          onClick={onNewDeal}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Deal
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {stages.map(stage => (
          <div
            key={stage.id}
            className="flex-1 min-w-[300px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className={`w-3 h-3 rounded-full ${stage.color} mr-2`} />
                <h3 className="font-semibold">{stage.name}</h3>
                <span className="ml-2 text-sm text-gray-500">
                  {deals.filter(deal => deal.stage === stage.id).length}
                </span>
              </div>

              <div className="space-y-3">
                {deals
                  .filter(deal => deal.stage === stage.id)
                  .map(deal => (
                    <Card
                      key={deal.id}
                      deal={deal}
                      onDragStart={(e) => handleDragStart(e, deal.id)}
                      onClick={() => onEditDeal(deal)}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;