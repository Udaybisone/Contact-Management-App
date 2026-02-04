import Contact from "../models/contact.model.js";

// Create
export const createContact = async (req, res) => {
  const contact = await Contact.create({
    ...req.body,
    user: req.user._id
  });

  res.status(201).json(contact);
};

// Get all (Search + Favorite filter)
export const getContacts = async (req, res) => {
  const { search, favorite } = req.query;

  let query = { user: req.user._id };

  if (favorite) query.favorite = favorite === "true";

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const contacts = await Contact.find(query).sort({ createdAt: -1 });

  res.json(contacts);
};

// Update
export const updateContact = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );

  res.json(contact);
};

// Delete
export const deleteContact = async (req, res) => {
  await Contact.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  res.json({ message: "Contact removed" });
};

// Toggle favorite
export const toggleFavorite = async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  contact.favorite = !contact.favorite;
  await contact.save();

  res.json(contact);
};
