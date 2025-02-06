import { useState, useEffect } from "react";
import FormField from "./formField";

const ReservationForm = ({ dispatchOnDateChange, submitData }) => {
  const minimumDate = new Date().toISOString().split("T")[0]; // Get today's date
  const occasions = ["Birthday", "Anniversary"];

  const convertTo12HourFormat = (time) => {
    let [hour, minute] = time.split(":").map(Number);
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour}:${minute === 0 ? "00" : minute} ${period}`;
  };

  const allTimes = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", // Lunch
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"  // Dinner
  ];

  const [date, setDate] = useState(minimumDate); // Default to today's date
  const [mealType, setMealType] = useState(""); // Default: No meal type selected
  const [time, setTime] = useState("");
  const [numberOfGuests, setNumberGuests] = useState("");
  const [occasion, setOccasion] = useState("");
  const [showAllSlots, setShowAllSlots] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const currentTime = new Date();
    setCurrentTime(currentTime);
  }, []);

  const isToday = new Date(date).toDateString() === new Date().toDateString();
  const currentHour = currentTime ? currentTime.getHours() : 0;
  const currentMinute = currentTime ? currentTime.getMinutes() : 0;

  // Function to check if the time slot is available based on the current time
  const isTimeAvailable = (time) => {
    const [slotHour, slotMinute] = time.split(":").map(Number);
    return (slotHour > currentHour) || (slotHour === currentHour && slotMinute > currentMinute);
  };

  // Filtered times logic based on the new condition
  const filteredTimes = allTimes
    .filter((time) => {
      const hour = parseInt(time.split(":")[0]);
      const [slotHour, slotMinute] = time.split(":").map(Number);

      // If the booking date is not today, show both lunch and dinner time slots without checking time
      if (new Date(date) > new Date()) {
        return (
          (mealType === "Lunch" && hour >= 12 && hour <= 17) ||
          (mealType === "Dinner" && hour >= 18 && hour <= 23)
        );
      }

      // If the booking date is today, show only the applicable meal type based on current time
      if (isToday) {
        if (mealType === "Lunch" && hour >= 12 && hour <= 17) {
          return (slotHour > currentHour) || (slotHour === currentHour && slotMinute > currentMinute);
        }
        if (mealType === "Dinner" && hour >= 18 && hour <= 23) {
          return (slotHour > currentHour) || (slotHour === currentHour && slotMinute > currentMinute);
        }
      }

      return false;
    })
    .map((time) => ({
      value: time,
      label: convertTo12HourFormat(time),
    }));

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatchOnDateChange(e.target.value);
  };

  const handleMealTypeChange = (e) => {
    setMealType(e.target.value);
    setTime(""); // Reset time when meal type changes
  };

  const handleTimeChange = (value) => {
    setTime(value); // Update time slot without triggering validation
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!date || !mealType || !time || !numberOfGuests || !occasion) {
      alert("Please fill out all required fields.");
      return;
    }

    submitData({ date, mealType, time, numberOfGuests, occasion });
  };

  // Check if the form is valid
  const isFormValid = () => {
    return date && mealType && time && numberOfGuests && occasion;
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormField label="Date" htmlFor="reservation-date">
        <input
          type="date"
          id="reservation-date"
          value={date}
          min={minimumDate} // Prevent selecting past dates
          onChange={handleDateChange}
          required
        />
      </FormField>

      <FormField label="Meal Type" htmlFor="meal-type">
        <select
          id="meal-type"
          value={mealType}
          onChange={handleMealTypeChange}
          required
        >
          <option value="" hidden>Select Meal Type</option>
          {isToday && currentHour < 17 && <option value="Lunch">Lunch (12 PM - 5 PM)</option>}
          {isToday && currentHour >= 17 && <option value="Dinner">Dinner (6 PM - 11 PM)</option>}
          {new Date(date) > new Date() && (
            <>
              <option value="Lunch">Lunch (12 PM - 5 PM)</option>
              <option value="Dinner">Dinner (6 PM - 11 PM)</option>
            </>
          )}
        </select>
      </FormField>

      <FormField label="Time" htmlFor="reservation-time">
        <div className="time-slots">
          {filteredTimes.slice(0, showAllSlots ? filteredTimes.length : 4).map(({ value, label }) => (
            <button
              key={value}
              className={`${time === value ? "selected" : ""} ${!isTimeAvailable(value) && new Date(date) <= new Date() ? "unavailable" : ""}`}
              onClick={() => handleTimeChange(value)} // Call time change function without validation
              disabled={new Date(date) <= new Date() && !isTimeAvailable(value)} // Only disable if time is in the past and date is today
            >
              {label}
            </button>
          ))}
        </div>

        {/* Show More button */}
        {filteredTimes.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAllSlots(!showAllSlots)}
            className="show-more-btn"
          >
            {showAllSlots ? "Show Less" : "Show More"}
          </button>
        )}
      </FormField>

      {/* Render fields only when time is selected */}
      {time && (
        <>
          <FormField label="Number of guests (max upto 10)" htmlFor="reservation-number-guests">
            <input
              type="number"
              id="reservation-number-guests"
              value={numberOfGuests}
              min="1"
              max="10"
              onChange={(e) => setNumberGuests(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Occasion" htmlFor="reservation-occasion">
            <select
              id="reservation-occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              required
            >
              <option value="">Select Occasion</option>
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>{occasion}</option>
              ))}
            </select>
          </FormField>
        </>
      )}

      <button className="button-primary" type="submit" disabled={!isFormValid()}>
        Reserve now!
      </button>
    </form>
  );
};

export default ReservationForm;
