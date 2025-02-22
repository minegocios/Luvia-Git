import React from 'react';
import { MessageSquare, MoreVertical } from 'lucide-react';
import { Contact } from '@/types';
import { ActionsMenu } from '@/components/common/ActionsMenu';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onEdit,
  onDelete,
  selectedTags,
  onTagSelect
}) => {
  const [selectedContact, setSelectedContact] = React.useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [contactToDelete, setContactToDelete] = React.useState<string | null>(null);

  const allTags = Array.from(
    new Set(contacts.flatMap(contact => contact.tags.map(tag => tag.name)))
  );

  const handleDeleteClick = (id: string) => {
    setContactToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (contactToDelete) {
      onDelete(contactToDelete);
      setIsDeleteModalOpen(false);
      setContactToDelete(null);
    }
  };

  const toggleTag = (tag: string) => {
    onTagSelect(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <>
      {/* Tags Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Contato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Último Contato
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {contact.company || '-'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {contact.position || '-'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {contact.tags.map(tag => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ 
                          backgroundColor: `${tag.color}33`,
                          color: tag.color
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(contact.lastContact).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      className="text-gray-600 hover:text-blue-500"
                      title="Iniciar conversa"
                      onClick={() => {/* TODO: Implement chat */}}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setSelectedContact(contact.id)}
                        className="text-gray-600 hover:text-blue-500"
                        title="Mais opções"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      <ActionsMenu
                        isOpen={selectedContact === contact.id}
                        onClose={() => setSelectedContact(null)}
                        onEdit={() => {
                          setSelectedContact(null);
                          onEdit(contact.id);
                        }}
                        onDelete={() => {
                          setSelectedContact(null);
                          handleDeleteClick(contact.id);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setContactToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Excluir contato"
        message="Tem certeza que deseja excluir este contato? Esta ação não pode ser desfeita."
      />
    </>
  );
};

export default ContactList;