import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmedReservation = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5); // Timer starts at 15 seconds

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          navigate("/reservations"); // Redirect when countdown reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Updates every second
    return () => clearInterval(countdown); // Cleanup function to prevent memory leaks
  }, [navigate]);

  return (
    <div className="confirmed-reservation">
      <FontAwesomeIcon icon={faCircleCheck} size="3x" />
      <h2>Your table has been reserved!</h2>
      <p>You'll receive a confirmation email with all the details.</p>
      <p>Redirecting to home in <strong>{secondsLeft} seconds...</strong></p> {/* Running countdown */}
    </div>
  );
};

export default ConfirmedReservation;
