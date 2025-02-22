import React, { useState, useEffect } from 'react';
import Board from './Board';
import DealModal from './DealModal';
import { dealsService } from '@/services/deals';
import type { Deal } from '@/types';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';

const CRM: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | undefined>(undefined);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setIsLoading(true);
      const data = await dealsService.getAll();
      setDeals(data);
    } catch (err) {
      console.error('Error fetching deals:', err);
      setError('Falha ao carregar negociações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (dealId: string, newStage: Deal['stage']) => {
    try {
      await dealsService.updateStage(dealId, newStage);
      await fetchDeals();
    } catch (err) {
      console.error('Error updating deal stage:', err);
      setError('Falha ao atualizar estágio da negociação');
    }
  };

  const handleModalSuccess = () => {
    fetchDeals();
    setIsModalOpen(false);
    setSelectedDeal(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {error && (
        <div className="p-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <Board
        deals={deals}
        onNewDeal={() => {
          setSelectedDeal(undefined);
          setIsModalOpen(true);
        }}
        onEditDeal={(deal) => {
          setSelectedDeal(deal);
          setIsModalOpen(true);
        }}
        onDragEnd={handleDragEnd}
      />

      <DealModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDeal(undefined);
        }}
        onSuccess={handleModalSuccess}
        deal={selectedDeal}
      />
    </div>
  );
};

export default CRM;