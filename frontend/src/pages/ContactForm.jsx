import { useState } from "react";
import api from "../api/axios";

const ContactForm = ({ close }) => {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  // ✅ Handle Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    // remove error when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  // ✅ Validation Function
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } 
    else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Invalid Phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await api.post("/contacts", form);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-[420px] p-8 rounded-3xl border border-gray-200"
      >

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add Contact
        </h2>

        {/* Name */}
        <div>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className={`w-full border p-3 mb-1 rounded-full outline-none transition
              ${errors.name ? "border-red-500" : "border-gray-300 focus:border-red-500"}
            `}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-3">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className={`w-full border p-3 mb-1 rounded-full outline-none transition
              ${errors.phone ? "border-red-500" : "border-gray-300 focus:border-red-500"}
            `}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mb-3">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={`w-full border p-3 mb-1 rounded-full outline-none transition
              ${errors.email ? "border-red-500" : "border-gray-300 focus:border-red-500"}
            `}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email}</p>
          )}
        </div>

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Notes"
          rows="4"
          onChange={handleChange}
          className="
            w-full border border-gray-300
            p-3 mb-4 rounded-2xl
            outline-none focus:border-red-500
            transition resize-none
          "
        />

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <button
            className="
              flex-1 bg-red-600 hover:bg-red-700
              text-white py-3 rounded-full
              font-medium transition
            "
          >
            Save Contact
          </button>

          <button
            type="button"
            onClick={close}
            className="
              flex-1 border border-gray-300
              hover:bg-gray-100 py-3
              rounded-full font-medium transition
            "
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
};

export default ContactForm;
