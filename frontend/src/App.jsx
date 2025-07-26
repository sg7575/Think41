import { useState } from 'react';

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedSlots, setBookedSlots] = useState({});
  const [prebookedSlots, setPrebookedSlots] = useState({});
  const [confirmation, setConfirmation] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const allSlots = ['10:00 AM', '11:00 AM', '12:00 PM'];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setConfirmation('');
  };

  const handleBookSlot = (slot) => {
    if (isAdmin) {
      setPrebookedSlots((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), slot],
      }));
      setConfirmation(`✅ Slot '${slot}' marked as PRE-BOOKED for ${selectedDate}`);
    } else {
      setBookedSlots((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), slot],
      }));
      setConfirmation(`✅ Slot '${slot}' booked successfully for ${selectedDate}`);
    }
    setTimeout(() => setConfirmation(''), 3000);
  };

  const isBooked = (slot) =>
    bookedSlots[selectedDate]?.includes(slot) || prebookedSlots[selectedDate]?.includes(slot);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>📅 Book a Slot</h2>

      <label>
        Select a date:
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </label>

      <div style={{ marginTop: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin Mode
        </label>
      </div>

      {selectedDate && (
        <>
          <h3 style={{ marginTop: '20px' }}>
            {isAdmin ? 'Mark Slots as Pre-Booked' : `Available Slots for ${selectedDate}`}
          </h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            {allSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleBookSlot(slot)}
                disabled={isBooked(slot)}
                style={{
                  padding: '10px',
                  backgroundColor: isBooked(slot) ? '#999' : isAdmin ? '#FF9800' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: isBooked(slot) ? 'not-allowed' : 'pointer',
                }}
              >
                {isBooked(slot)
                  ? 'Booked'
                  : isAdmin
                  ? `Pre-book ${slot}`
                  : slot}
              </button>
            ))}
          </div>
        </>
      )}

      {confirmation && (
        <p style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}>
          {confirmation}
        </p>
      )}
    </div>
  );
}

export default App;
