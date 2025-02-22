import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { contactsService } from '@/services/contacts';
import { Contact } from '@/types';
import ContactList from './ContactList';
import ContactModal from './ContactModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const data = await contactsService.getAll();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Falha ao carregar contatos. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewContact = () => {
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contactId: string) => {
    setSelectedContact(contactId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
    fetchContacts(); // Recarrega a lista após fechar o modal
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await contactsService.delete(id);
      await fetchContacts();
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError('Falha ao excluir contato. Por favor, tente novamente.');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => contact.tags.some(t => t.name === tag));

    return matchesSearch && matchesTags;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Contatos</h1>
          <p className="text-gray-600">Gerencie seus contatos e relacionamentos</p>
        </div>
        <button
          onClick={handleNewContact}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Contato
        </button>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar contatos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" />
      </div>

      {/* Contact List */}
      <ContactList
        contacts={filteredContacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
        selectedTags={selectedTags}
        onTagSelect={setSelectedTags}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        contactId={selectedContact}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Contacts;