import React, { useEffect, useState } from "react";
import { Contact } from "../types";
import { addContact, updateContact } from "../api/contactApi";

const ContactFrom: React.FC<{ contact?: any; onClose: () => void }> = ({
    contact,
    onClose,
}) => {
    const [formState, setFormState] = useState(
        contact || { firstName: "", lastName: "", status: "active" }
    );

    const [isEditing, setIsEditing] = useState<boolean>(!!contact);

    useEffect(() => {
        if (contact) {
            setFormState(contact);
        }
    }, [contact]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await updateContact(formState);
            } else {
                await addContact(formState);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label> status</label>

                    <select
                        name="status"
                        value={formState.status}
                        onChange={handleInputChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">inactive</option>
                    </select>
                </div>
                <button type="submit">
                    {isEditing ? "Update Contact" : "Add Contact"}
                </button>
            </form>
        </>
    );
};

export default ContactFrom;
