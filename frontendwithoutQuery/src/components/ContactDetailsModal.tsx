import React from 'react'
import { Contact } from '../types';


interface ContactDetailsModalProps {
    contact?: Contact;
    onClose: () => void
}

const ContactDetailsModal: React.FC<ContactDetailsModalProps> = ({ contact, onClose }) => {
    if (!contact) return null;
    return (
        <div>

            <p>first name: {contact.firstName}</p>
            <p>first name: {contact.lastName}</p>
            <p>first name: {contact.status}</p>
            <button onClick={onClose}> close </button>

        </div>
    )
}

export default ContactDetailsModal;