// app/components/ContactTable.tsx
import React, { useState } from 'react';
import { PencilIcon, TrashIcon, MailIcon, MessageSquareIcon } from 'lucide-react';

// Define the Contact type based on your model
type Contact = {
  id: string;
  name: string | null;
  email: string | null;
  message: string;
};

interface ContactTableProps {
  contacts: Contact[];
  onView?: (contact: Contact) => void;
  onEdit?: (contact: Contact) => void;
  onDelete?: (contact: Contact) => void;
  onSendEmail?: (contact: Contact) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onView,
  onEdit,
  onDelete,
  onSendEmail,
}) => {
  const [sortField, setSortField] = useState<'name' | 'email'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: 'name' | 'email') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (contact.name?.toLowerCase().includes(searchLower) || !contact.name) ||
      (contact.email?.toLowerCase().includes(searchLower) || !contact.email) ||
      contact.message.toLowerCase().includes(searchLower)
    );
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Search Input */}
      <div className="p-4 bg-gray-50 border-b">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Standard Table (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th 
                className="px-6 py-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {sortField === 'name' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center">
                  Email
                  {sortField === 'email' && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  {contact.name || <span className="text-gray-400">Unnamed</span>}
                </td>
                <td className="px-6 py-4">
                  {contact.email || <span className="text-gray-400">No email</span>}
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <div className="truncate">{contact.message}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView && onView(contact)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      title="View details"
                    >
                      <MessageSquareIcon size={16} />
                    </button>
                    {contact.email && (
                      <button
                        onClick={() => onSendEmail && onSendEmail(contact)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                        title="Send email"
                      >
                        <MailIcon size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => onEdit && onEdit(contact)}
                      className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                      title="Edit"
                    >
                      <PencilIcon size={16} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(contact)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {sortedContacts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No contacts found</div>
        ) : (
          sortedContacts.map((contact) => (
            <div key={contact.id} className="border-b p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-lg">
                    {contact.name || <span className="text-gray-400 italic">Unnamed</span>}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {contact.email || <span className="text-gray-400 italic">No email</span>}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => onDelete && onDelete(contact)}
                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-full"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-3 text-sm">
                <p className="line-clamp-3">{contact.message}</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => onView && onView(contact)}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full flex items-center"
                >
                  <MessageSquareIcon size={12} className="mr-1" />
                  View
                </button>
                {contact.email && (
                  <button
                    onClick={() => onSendEmail && onSendEmail(contact)}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded-full flex items-center"
                  >
                    <MailIcon size={12} className="mr-1" />
                    Email
                  </button>
                )}
                <button
                  onClick={() => onEdit && onEdit(contact)}
                  className="px-3 py-1 text-xs bg-yellow-600 text-white rounded-full flex items-center"
                >
                  <PencilIcon size={12} className="mr-1" />
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactTable;