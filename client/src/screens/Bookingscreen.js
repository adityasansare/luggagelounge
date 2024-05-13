import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../components/Loader';
import Error from '../components/Error';
import StripeCheckout from 'react-stripe-checkout';
import moment from "moment";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000
});

function Bookingscreen() {
  const { roomid } = useParams();
  const [room, setroom] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const { fromdate } = useParams();
  const { todate } = useParams();

  const fromdate1 = moment(fromdate, "DD MM YYYY");
  const todate1 = moment(todate, "DD MM YYYY");
  console.log(fromdate1);
  console.log(todate1);
  const totaldays = todate1.diff(fromdate1, 'days') + 1;
  console.log(totaldays);
  const totalamount = totaldays * room.rentperday;
  console.log(totalamount);


  useState(async () => {

    try {
      setloading(true);
      const data = (await axios.post(`https://luggage-lounge-server.vercel.app/api/rooms/getroombyid/${roomid}`)).data;
      
      setroom(data);
      setloading(false);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
    }
  }, []);

  function onToken(token) {
    console.log(token);

    if (token && token.id) {
      // Payment was successful
      console.log("Payment successful!");
      window.location.href = '/profile'

      // You can trigger your action here, for example, call the `bookRoom` function
    } else {
      // Payment was not successful
      console.log("Payment failed.");
    }
  }

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    };

    try {
      const result = await axios.post('https://luggagelounge-server.vercel.app/api/bookings/bookroom', bookingDetails);

      if (result.data.success) {
        // Booking was successful
        console.log("Booking successful!");

        // Redirect to the success page or perform other actions if needed
        // history.push('/success'); // If you want to redirect to a success page
      } else {
        // Booking failed
        console.log("Booking failed.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className="container m-5" data-aos='fade-up-left'>
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 ">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img
                src={room.imageurls && room.imageurls[0]}
                alt="image"
                className="bigimg"
              />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>Name : {user.name} </p>
                  <p>From Date : {fromdate}</p>
                  <p>To Date : {todate}</p>
                  <p>Max Count : {room.maxcount} </p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount </h1>
                  <hr />
                  <p>Total days: {totaldays}</p>
                  <p>Rent per day: ₹{room.rentperday}</p>
                  <p>Total Amount: ₹{totalamount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <StripeCheckout
                  token={onToken}
                  stripeKey="pk_test_51NfOJFSCDeXCVV2OPIHsqPoVmR8vFU5mxupvYPFS9LhaETsNmANyrFQLVqP1cKheqkBeHXFyA5ZjDTbTXTCajreV00KI4CQjfa"
                >
                  <button className="btn">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
