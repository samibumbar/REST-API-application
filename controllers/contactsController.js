import * as contactService from "../services/contactsService.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export const getAllContacts = asyncWrapper(async (req, res) => {
  const contacts = await contactService.getAllContacts();
  res.status(200).json(contacts);
});

export const getContactById = asyncWrapper(async (req, res) => {
  const contact = await contactService.getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

export const createContact = asyncWrapper(async (req, res) => {
  const newContact = await contactService.createContact(req.body);
  res.status(201).json(newContact);
});

export const updateContact = asyncWrapper(async (req, res) => {
  const updatedContact = await contactService.updateContact(
    req.params.contactId,
    req.body
  );
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(updatedContact);
});

export const deleteContact = asyncWrapper(async (req, res) => {
  const deletedContact = await contactService.deleteContact(
    req.params.contactId
  );
  if (!deletedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Contact deleted" });
});

export const updateContactFavorite = asyncWrapper(async (req, res) => {
  const { favorite } = req.body;
  if (typeof favorite === "undefined") {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const updatedContact = await contactService.updateContactFavorite(
    req.params.contactId,
    favorite
  );
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(updatedContact);
});
