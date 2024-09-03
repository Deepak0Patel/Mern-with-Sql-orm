import axios from "axios";
import { Contact } from "../types";

const API_URL = "http://localhost:4000/";

export const fetchContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(API_URL);
  console.log("response", response);
  return response.data;
};

export const addContact = async (contact: Contact): Promise<Contact> => {
  const response = await axios.post(API_URL, contact);
  console.log("response", response);
  return response.data;
};

export const updateContact = async (contact: Contact): Promise<Contact> => {
  const response = await axios.put(`${API_URL}/,${contact.id}`, contact);
  console.log("response", response);
  return response.data;
};

export const deleteContact = async (id: string): Promise<void> => {
  const response = await axios.delete(`${API_URL}/,${id}`);
  console.log("response", response);
  return response.data;
};
