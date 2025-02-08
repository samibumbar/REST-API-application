import { Contact } from "../models/contactModel.js";

export const getAllContacts = async (filter, skip, limit) => {
  return await Contact.find(filter).skip(skip).limit(limit);
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const createContact = async (data) => {
  if (!data.owner) {
    throw new Error("Owner is required");
  }
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
