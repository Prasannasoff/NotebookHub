import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api";
const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const completeBooking = async () => {
      try {
        // You may retrieve booking data from localStorage or context
        const bookingData = JSON.parse(localStorage.getItem("bookingData"));

        const response = await axios.post(
          "http://localhost:9092/user/book-note",
          bookingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Booking completed:", response.data);
        navigate("/tracking");
      } catch (error) {
        console.error("Booking error:", error);
      }
    };

    completeBooking();
  }, []);

  return <div>Payment successful! Finalizing your booking...</div>;
};

export default PaymentSuccess;
