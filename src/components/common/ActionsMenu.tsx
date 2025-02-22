import React, { useRef, useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface ActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionsMenu: React.FC<ActionsMenuProps> = ({
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10"
    >
      <button
        onClick={onEdit}
        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
      >
        <Edit2 className="w-4 h-4 mr-2" />
        Editar
      </button>
      <button
        onClick={onDelete}
        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Excluir
      </button>
    </div>
  );
};