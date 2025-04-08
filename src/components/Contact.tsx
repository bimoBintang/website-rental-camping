// app/components/contacts.tsx
"use client";

import { useState } from 'react';
import ContactTable from '@/components/ContactDataTable';
import { XIcon } from 'lucide-react';

type Contact  = {
  id: string;
  name: string | null;
  email: string | null;
  message: string;
}

interface ContactTableProps {
    initialContacts: Contact [];
    onDeleteContact?: (id: string) => Promise<void>;
}

export default function Contacts({initialContacts, onDeleteContact }: ContactTableProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact  | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };
  
  const handleEdit = (contact: Contact) => {
    alert(`Editing contact: ${contact.name || 'Unnamed'}`);
    // In a real app, open edit form
  };
  
  const handleDelete = async (contact: Contact) => {
    if (confirm(`Are you sure you want to delete this contact${contact.name ? ` (${contact.name})` : ''}?`)) {
      // If server action is provided, use it
      if (onDeleteContact) {
        try {
          await onDeleteContact(contact.id);
          // Update local state after successful server action
          setContacts(contacts.filter(c => c.id !== contact.id));
        } catch (error) {
          console.error("Failed to delete contact:", error);
          alert("Failed to delete contact. Please try again.");
        }
      } else {
        // Just update local state if no server action
        setContacts(contacts.filter(c => c.id !== contact.id));
      }
    }
  };
  
  const handleSendEmail = (contact: Contact) => {
    alert(`Sending email to: ${contact.email}`);
    // In a real app, open email composer
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
      </div>
      
      <div className="mb-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <div className="flex items-center text-blue-700 mb-2">
            <span className="font-medium">Your contact list</span>
          </div>
          <p className="text-sm text-blue-600">
            You have {contacts.length} contacts in your database. 
            {contacts.filter(c => c.email).length} of them have email addresses.
          </p>
        </div>
      </div>
      
      <ContactTable
        contacts={contacts}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSendEmail={handleSendEmail}
      />
      
      {/* Modal for viewing contact details */}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Contact Details</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="p-2 bg-gray-50 rounded border">
                  {selectedContact.name || <span className="text-gray-400 italic">Not provided</span>}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="p-2 bg-gray-50 rounded border">
                  {selectedContact.email || <span className="text-gray-400 italic">Not provided</span>}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="p-2 bg-gray-50 rounded border max-h-40 overflow-y-auto">
                  {selectedContact.message}
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                {selectedContact.email && (
                  <button 
                    onClick={() => {
                      handleSendEmail(selectedContact);
                      setIsModalOpen(false);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Reply
                  </button>
                )}
                <button 
                  onClick={() => {
                    handleEdit(selectedContact);
                    setIsModalOpen(false);
                  }}
                  className="bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}