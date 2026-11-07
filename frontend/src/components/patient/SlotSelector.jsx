function SlotSelector({
  slots,
  selectedSlot,
  onSelect,
}) {
  if (!slots.length) {
    return (
      <p className="text-gray-500">
        No slots available.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {slots.map((slot, index) => {

        const active =
          selectedSlot &&
          selectedSlot.date === slot.date &&
          selectedSlot.startTime === slot.startTime;

        return (
          <button
            key={index}
            onClick={() => onSelect(slot)}
            className={`border rounded-xl p-4 text-left transition ${
              active
                ? "bg-emerald-600 text-white border-emerald-600"
                : "hover:border-emerald-600"
            }`}
          >
            <p className="font-semibold">
              {slot.date}
            </p>

            <p className="mt-2">
              {slot.startTime} - {slot.endTime}
            </p>
          </button>
        );
      })}

    </div>
  );
}

export default SlotSelector;