import axios from "axios";
import { showAlert } from "./alerts";

var stripe = Stripe(
  "pk_test_51OerncSBSUncXohLr1mnWktKy5EuuQ47ycJDTNsWM6Nd4spoE3sFwHVkZ4qM9WKKCoySs9rfJ2Z39R3twNaNTlrT009GcX3Y6W"
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}`
    );
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
