import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import type { Deal } from '@/types';

interface CardProps {
  deal: Deal;
  onDragStart: (e: React.DragEvent) => void;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ deal, onDragStart, onClick }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{deal.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{deal.company}</p>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src={deal.contact.avatar}
            alt={deal.contact.name}
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <DollarSign className="w-4 h-4 mr-1" />
          <span>R$ {deal.value.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{new Date(deal.dueDate).toLocaleDateString()}</span>
        </div>
      </div>

      {deal.contact.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {deal.contact.tags.map(tag => (
            <span
              key={tag.id}
              className="px-2 py-0.5 text-xs rounded-full"
              style={{ 
                backgroundColor: `${tag.color}33`,
                color: tag.color
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;