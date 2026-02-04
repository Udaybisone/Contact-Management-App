import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  toggleFavorite
} from "../controllers/contact.controller.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createContact)
  .get(getContacts);

router.route("/:id")
  .put(updateContact)
  .delete(deleteContact);

router.patch("/favorite/:id", toggleFavorite);

export default router;
