import Contact from "../models/contacts.js";

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const createContact = async (data) => {
  return await Contact.create(data);
};

export const updateContact = async (id, data) => {
  return await Contact.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

export const updateContactFavorite = async (id, favorite) => {
  return await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true, runValidators: true }
  );
};
