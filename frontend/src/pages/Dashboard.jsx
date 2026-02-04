import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ContactForm from "./ContactForm";
import EditContactModal from "../components/EditContactModal";

const Dashboard = () => {

  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const contactsPerPage = 10;

  // ✅ Fetch contacts
  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
    setCurrentPage(1); // reset page after fetch
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ✅ Filter contacts (optimized)
  const filteredContacts = useMemo(() => {
    const value = search.toLowerCase();

    return contacts.filter((contact) => (
      contact.name?.toLowerCase().includes(value) ||
      contact.phone?.includes(value) ||
      contact.email?.toLowerCase().includes(value)
    ));
  }, [contacts, search]);

  // ✅ Pagination logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / contactsPerPage)
  );

  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;

  const currentContacts = filteredContacts.slice(
    indexOfFirst,
    indexOfLast
  );

  // ✅ Toggle favorite
  const toggleFavorite = async (id) => {
    await api.patch(`/contacts/favorite/${id}`);
    fetchContacts();
  };

  return (
    <>
      {/* Navbar with search */}
      <Navbar search={search} setSearch={setSearch} />

      <div className="bg-gray-50 min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl border border-gray-200">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">
              Dashboard
            </h1>

            <button
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition font-medium"
            >
              Add New Contact
            </button>
          </div>

          {/* Contacts Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full">

              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Favorite</th>
                </tr>
              </thead>

              <tbody>
                {currentContacts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No contacts found.
                    </td>
                  </tr>
                ) : (
                  currentContacts.map((c) => (
                    <tr
                      key={c._id}
                      onClick={() => setSelectedContact(c)}
                      className="border-t hover:bg-gray-50 transition cursor-pointer"
                    >

                      <td className="p-4 font-medium">
                        {c.name}
                      </td>

                      <td className="p-4">
                        {c.phone}
                      </td>

                      <td className="p-4 text-blue-600">
                        {c.email}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(c._id);
                          }}
                          className="text-xl"
                        >
                          {c.favorite ? "⭐" : "☆"}
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">

            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
              className="
                px-4 py-2
                rounded-full
                border border-gray-300
                hover:bg-gray-100
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
            >
              Previous
            </button>

            <span className="text-gray-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages}
              className="
                px-4 py-2
                rounded-full
                border border-gray-300
                hover:bg-gray-100
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
            >
              Next
            </button>

          </div>

        </div>
      </div>

      {/* Add Contact Modal */}
      {showForm && (
        <ContactForm
          close={() => {
            setShowForm(false);
            fetchContacts();
          }}
        />
      )}

      {/* Edit Contact Modal */}
      {selectedContact && (
        <EditContactModal
          contact={selectedContact}
          close={() => {
            setSelectedContact(null);
            fetchContacts();
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
