import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../components/Loader'
import Error from '../components/Error'
import StripeCheckout from'react-stripe-checkout';
import moment from "moment";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:1000
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
  console.log(fromdate1)
  console.log(todate1)
  const totaldays = todate1.diff( fromdate1, 'days') + 1
  const totalamount = totaldays * room.rentperday
  // const [totalamount , settotalamount] = useState()



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

  function onToken(token){
    console.log(token) 
  }
 
  async function bookRoom(){
    const bookingDetails = {
      room , 
      userid : JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount, 
      totaldays
    }

    try {
      const result = await axios.post('https://luggage-lounge-server.vercel.app/api/bookings/bookroom' , bookingDetails)
    } catch (error) {
      
    }
  }

  const user = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <div className="container m-5" data-aos='fade-up-left'>
      {loading ? (
        <Loader/>
      ) : room ? (<div>

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
            <div style={{textAlign:'right'}}>
              <h1>Booking Details</h1>
              <hr/>

              <b>
              <p>Name : {user.name} </p>
              <p>From Date : {fromdate}</p>
              <p>To Date : {todate}</p>
              <p>Max Count : {room.maxcount} </p> 
              </b>
              
            </div>
            <div style={{textAlign:'right'}}>
              <b>
              <h1>Amount </h1>
              <hr/>

              {/* <p>Total days: </p> */}
              <p>Total days: {totaldays}</p>
              <p>Rent per day: ₹{room.rentperday}</p>
              <p>Total Amount: ₹{totalamount}</p>

              </b>
            </div>
            <div style={{float:'right'}}>
              <StripeCheckout
              // amount={totalamount * 100}
              token={onToken}
              // currency="INR"
              stripeKey="pk_test_51NfOJFSCDeXCVV2OPIHsqPoVmR8vFU5mxupvYPFS9LhaETsNmANyrFQLVqP1cKheqkBeHXFyA5ZjDTbTXTCajreV00KI4CQjfa">
              <button className="btn" onClick={bookRoom}>Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
        </div> ) : (<Error/>)}
      
    </div>
  );
  
}

export default Bookingscreen;