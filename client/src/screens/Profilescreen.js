import { Content } from 'antd/es/layout/layout';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        const checkUserAndRedirect = async () => {
            if (!user) {
                try {
                    // Use async operations here
                    const response = await fetch('/login');
                    // Handle the response or perform other actions
                    window.location.href = '/login';
                } catch (error) {
                    // Handle errors here
                    console.error('Error:', error);
                }
            }
        };

        // Call the asynchronous function
        checkUserAndRedirect();
    }, []);

    return (
        <div className='blacky'>
            <div className='row justify-content-center mt-10'>
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example" data-bs-theme="dark">
                    <Tab eventKey={1} className=''  title="Profile">
                        {/* <h1>My Profile</h1> */}
                        <br />
                        <h1>Name : {user.name}</h1>
                        <h1>Email : {user.email}</h1>
                        <h1>User Type : {user.isAdmin ? 'Host' : 'Customer'}</h1><br/>
                        {user.isAdmin && <a href="/admin"><button className="btn">Admin Panel</button></a>}
                    </Tab>
                    <Tab eventKey={2} className='sansu' title="Bookings">
                        <MyBookings />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default Profilescreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const response = await axios.post('/api/bookings/getbookingsbyuserid/', { userid: user._id });
                setbookings(response.data);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(error);
            }
        };

        fetchData();

    }, []);

    async function cancelBooking(bookingid, roomid) {


        try {
            setloading(true)
            const result = (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            // console.log(data)
            setloading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }

    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6 sansu'>
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs' key={booking._id}>
                            <h1><b>{booking.room}</b></h1>
                            <h1><b>Booking ID:</b> {booking._id}</h1>
                            <h1><b>Check-In:</b> {booking.fromdate}</h1>
                            <h1><b>Check-Out:</b> {booking.todate}</h1>
                            <h1><b>Amount:</b> {booking.totalamount}</h1>
                            <h1><b>Status:</b> {booking.status == 'booked' ? 'CONFIRMED' : 'CANCELLED'}</h1>
                            <br></br>
                            {booking.status !== 'cancelled' && (<div>
                                <button class="btn btn-primary" onClick={() => { cancelBooking(booking._id, booking.roomid) }}>Cancel</button>
                            </div>)}
                        </div>


                    }))}
                    {error && (<Error error={error} />)}
                </div>
            </div>
        </div>
    );
}
