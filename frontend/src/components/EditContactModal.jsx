import { useState } from "react";
import api from "../api/axios";

const EditContactModal = ({ contact, close }) => {

  const [form, setForm] = useState({
    name: contact.name || "",
    phone: contact.phone || "",
    email: contact.email || "",
    notes: contact.notes || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    await api.put(`/contacts/${contact._id}`, form);
    close();
  };

  const handleDelete = async () => {
    await api.delete(`/contacts/${contact._id}`);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white w-[420px] p-8 rounded-3xl border border-gray-200">

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Contact Details
        </h2>

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="
            w-full 
            border border-gray-300 
            p-3 mb-4 
            rounded-full 
            outline-none 
            focus:border-red-500
            transition
          "
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="
            w-full 
            border border-gray-300 
            p-3 mb-4 
            rounded-full 
            outline-none 
            focus:border-red-500
            transition
          "
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="
            w-full 
            border border-gray-300 
            p-3 mb-4 
            rounded-full 
            outline-none 
            focus:border-red-500
            transition
          "
        />

        {/* Notes */}
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Notes"
          className="
            w-full 
            border border-gray-300 
            p-3 mb-4 
            rounded-2xl
            outline-none 
            focus:border-red-500
            transition
            resize-none
          "
        />

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
            onClick={handleSave}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition"
          >
            Save
          </button>

          <button
            onClick={close}
            className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-full font-medium transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default EditContactModal;
