import * as contactService from "../services/contactsService.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export const getAllContacts = asyncWrapper(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner: req.user._id };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }

  console.log("Fetching contacts for user:", req.user._id);

  const contacts = await contactService.getAllContacts(filter, skip, limit);
  res.status(200).json(contacts);
});

export const getContactById = asyncWrapper(async (req, res) => {
  const contact = await contactService.getContactById(req.params.contactId);
  if (!contact || contact.owner.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

export const createContact = asyncWrapper(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  console.log("Creating contact for user:", req.user._id);

  const newContact = await contactService.createContact({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json(newContact);
});

export const updateContact = asyncWrapper(async (req, res) => {
  const contact = await contactService.getContactById(req.params.contactId);
  if (!contact || contact.owner.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Not found" });
  }

  const updatedContact = await contactService.updateContact(
    req.params.contactId,
    req.body
  );
  res.status(200).json(updatedContact);
});

export const deleteContact = asyncWrapper(async (req, res) => {
  const contact = await contactService.getContactById(req.params.contactId);
  if (!contact || contact.owner.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Not found" });
  }

  await contactService.deleteContact(req.params.contactId);
  res.status(200).json({ message: "Contact deleted" });
});

export const updateContactFavorite = asyncWrapper(async (req, res) => {
  const { favorite } = req.body;
  if (typeof favorite === "undefined") {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const contact = await contactService.getContactById(req.params.contactId);
  if (!contact || contact.owner.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Not found" });
  }

  const updatedContact = await contactService.updateContactFavorite(
    req.params.contactId,
    favorite
  );
  res.status(200).json(updatedContact);
});
