import React, { useEffect, useState } from "react";
import ContactFrom from "./ContactForm";
import { Contact } from "../types";
import { deleteContact, fetchContacts } from "../api/contactApi";
import ContactDetailsModal from "./ContactDetailsModal";

const ContactList: React.FC = () => {
    const [selectedContact, setSelectedContact] = useState<any | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        const laodContacts = async () => {
            try {
                const data = await fetchContacts();
                setContacts(data)
            } catch (error) {
                console.log(error)
            }
        }

        laodContacts()
    }, [])


    const handleDelete = async (id: any) => {

        try {
            await deleteContact(id);
            setContacts(contacts.filter((contact) => contact.id !== id))
        } catch (error) {
            console.log(error)
        }
    };

    const handleEdit = (contact: any) => {
        setSelectedContact(contact);
        setIsFormOpen(true);
    };

    const handleViewDetails = (contact: any) => {
        setSelectedContact(contact);
        setIsDetailsOpen(true);
    };

    return (
        <>
            <div>
                {contacts?.map((contact: any) => (
                    <li>
                        <span>
                            {contact.firstName} and {contact.lastName}
                        </span>
                        <button onClick={() => handleViewDetails(contact)}>view</button>
                        <button onClick={() => handleEdit(contact)}>edit</button>
                        <button onClick={() => handleDelete(contact.id)}>delete</button>
                    </li>
                ))}
            </div>

            {isFormOpen && (
                <div>
                    <ContactFrom
                        contact={selectedContact}
                        onClose={() => setIsFormOpen(false)}
                    />
                </div>
            )}

            {
                isDetailsOpen && (
                    <ContactDetailsModal contact={selectedContact}
                        onClose={() => setIsDetailsOpen(false)} />
                )
            }
        </>
    );
};

export default ContactList;
