import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api";
const CustomPaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const completeBooking = async () => {
      try {
        // You may retrieve booking data from localStorage or context
        const customBookingData = JSON.parse(
          localStorage.getItem("customBookingData")
        );

        // Convert it back to FormData if necessary (if you need to send files or use it as FormData)
        const formData = new FormData();
        for (const key in customBookingData) {
          formData.append(key, customBookingData[key]);
        }

        const response = await axios.post(
          "http://localhost:9092/user/save-custom-order",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        alert("Order submitted successfully!");

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

export default CustomPaymentSuccess;
