import { useEffect, useState } from "react";
import {
  getAvailableSlots,
  addAvailableSlot,
  updateAvailableSlot,
  deleteAvailableSlot,
} from "../../services/doctorService";

const timeOptions = [
  "12:00 AM", "12:30 AM",
  "1:00 AM", "1:30 AM",
  "2:00 AM", "2:30 AM",
  "3:00 AM", "3:30 AM",
  "4:00 AM", "4:30 AM",
  "5:00 AM", "5:30 AM",
  "6:00 AM", "6:30 AM",
  "7:00 AM", "7:30 AM",
  "8:00 AM", "8:30 AM",
  "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM",
  "10:00 PM", "10:30 PM",
  "11:00 PM", "11:30 PM",
];

function Slots() {
  const [slots, setSlots] = useState([]);
  const [editingSlotId, setEditingSlotId] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const fetchSlots = async () => {
    try {
      const data = await getAvailableSlots();
      setSlots(data.availableSlots);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSlotId) {
        await updateAvailableSlot(editingSlotId, formData);
        alert("Slot updated successfully");
      } else {
        await addAvailableSlot(formData);
        alert("Slot added successfully");
      }

      setFormData({
        date: "",
        startTime: "",
        endTime: "",
      });

      setEditingSlotId(null);

      fetchSlots();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (slot) => {
    setEditingSlotId(slot._id);

    setFormData({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (slotId) => {
    try {
      await deleteAvailableSlot(slotId);
      fetchSlots();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Manage Available Slots
        </h1>

        <p className="mt-2 text-slate-500">
          Add, update and manage your consultation schedule.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-3xl bg-white shadow-xl mb-10"
      >

        {/* Card Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white">

          <h2 className="text-2xl font-bold">
            {editingSlotId ? "Edit Available Slot" : "Add New Slot"}
          </h2>

          <p className="mt-1 text-emerald-100">
            Select a consultation date and available time.
          </p>

        </div>

        {/* Form Body */}
        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Date */}

            <div>

              <label className="block mb-2 font-semibold text-slate-700">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />

            </div>

            {/* Start Time */}

            <div>

              <label className="block mb-2 font-semibold text-slate-700">
                Start Time
              </label>

              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              >

                <option value="">
                  Select Start Time
                </option>

                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}

              </select>

            </div>

            {/* End Time */}

            <div>

              <label className="block mb-2 font-semibold text-slate-700">
                End Time
              </label>

              <select
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              >

                <option value="">
                  Select End Time
                </option>

                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-700"
            >
              {editingSlotId ? "Update Slot" : "Add Slot"}
            </button>

            {editingSlotId && (

              <button
                type="button"
                onClick={() => {
                  setEditingSlotId(null);

                  setFormData({
                    date: "",
                    startTime: "",
                    endTime: "",
                  });
                }}
                className="rounded-xl bg-slate-500 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-slate-600"
              >
                Cancel
              </button>

            )}

          </div>

        </div>

      </form>

      {/* Slots */}

      {slots.length === 0 ? (

        <div className="rounded-3xl bg-white p-14 text-center shadow-xl">

          <div className="mb-5 text-6xl">
            📅
          </div>

          <h2 className="text-2xl font-bold text-slate-700">
            No Slots Available
          </h2>

          <p className="mt-2 text-slate-500">
            Create your first consultation slot.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {slots.map((slot) => (

            <div
              key={slot._id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* Left */}

                <div className="flex items-center gap-5">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">

                    📅

                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-800">
                      {slot.date}
                    </h2>

                    <p className="mt-1 text-slate-500">
                      {slot.startTime} • {slot.endTime}
                    </p>

                  </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-wrap gap-3">

                  <button
                    onClick={() => handleEdit(slot)}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(slot._id)}
                    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  </div>
);
}

export default Slots;