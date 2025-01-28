import express from "express";
import * as contactsController from "../controllers/contactsController.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);
router.get("/:contactId", contactsController.getContactById);
router.post("/", contactsController.createContact);
router.put("/:contactId", contactsController.updateContact);
router.delete("/:contactId", contactsController.deleteContact);
router.patch("/:contactId/favorite", contactsController.updateContactFavorite);

export default router;
