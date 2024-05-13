import React, { useState, useCallback, useEffect } from 'react';
// import { Tabs } from "antd";
import axios from 'axios';
import Loader from "../components/Loader";
import Swal from 'sweetalert2'
import { Tabs, Tab } from 'react-bootstrap';


const { TabPane } = Tabs;

function AdminPanel() {

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = '/home'

    }
  }, [])



  // const handleTabChange = useCallback((key) => {
  //   // Your code to handle tab change goes here
  //   console.log("Tab changed to:", key);
  // }, []);

  return (
    <div className='mt-3 ml-3 bs nishit sansu' style={{ textAlign: 'center' }}>
      <h1 ><b>Locker Admin Page</b></h1>
      
      <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" data-bs-theme="dark">
        <Tab eventKey="1" title="Bookings">
          <Bookings />
        </Tab>
        <Tab eventKey="2" title="Lockers">
          <Rooms />
        </Tab>
        <Tab eventKey="3" title="Add Locker">
          <Addroom />
        </Tab>
        <Tab eventKey="4" title="Users">
          <Users />
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminPanel;

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = (await axios.get("https://luggagelounge-server.vercel.app/api/bookings/getallbookings")).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-12 '>
        <h1 style={{ colour: 'white' }}>Bookingscreen</h1>
        {loading && <Loader />}

        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Bookings ID</th>
              <th>User ID</th>
              <th>Locker</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 && (bookings.map(booking => {
              return <tr>
                <td>{booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.room}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
                <td>{booking.status}</td>
              </tr>
            }))}
          </tbody>
        </table>



        {/* {bookings.length > 0 && <h1>There are a total of {bookings.length} bookings</h1>} */}
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = (await axios.get("https://luggagelounge-server.vercel.app/api/rooms/getalllockers")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Lockers</h1>
        {loading && <Loader />}

        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length > 0 && (rooms.map(room => {
              return <tr>
                <td>{room._id}</td>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.rentperday}</td>
                <td>{room.maxcount}</td>
                <td>{room.phonenumber}</td>
              </tr>
            }))}
          </tbody>
        </table>



        {/* {bookings.length > 0 && <h1>There are a total of {bookings.length} bookings</h1>} */}
      </div>
    </div>
  );
}

export function Users() {
  const [user, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = (await axios.get("https://luggagelounge-server.vercel.app/api/users/getallusers")).data;
        setusers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='row'>
      <div className='col-md-12'>

        <h1>Users</h1>
        {loading && <Loader />}

        <table className='table table-dark table-bordered'>

          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>User Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>

          <tbody>
            {user && (user.map(user => {
              return <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
              </tr>
            }))}
          </tbody>

        </table>

      </div>

    </div>
  )

}

export function Addroom() {

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [name, setname] = useState('')
  const [rentperday, setrentperday] = useState()
  const [maxcount, setmaxcount] = useState()
  const [description, setdescription] = useState()
  const [phonenumber, setphonenumber] = useState()
  const [type, settype] = useState()
  const [imageurl1, setimageurl1] = useState()
  const [imageurl2, setimageurl2] = useState()
  const [imageurl3, setimageurl3] = useState()

  async function addRoom() {

    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3]
    }

    try {
      setloading(true);
      const result = (await axios.post('https://luggagelounge-server.vercel.app/api/rooms/addlockers', newroom)).data
      console.log(result)
      setloading(false);
      Swal.fire('Congrats', "Your New Room Added Successfully", 'Success').then(result => {
        window.location.href = '/home'
      })
    } catch (error) {
      console.log(error)
      setloading(false)
      Swal.fire('Oops', 'Something went wrong', 'error')
    }

  }



  return (
    <div className='row'>
      <div className='col-md-5'>
        {loading && <Loader />}
        <input type='text' className='form-control' placeholder='Locker Name'
          value={name} onChange={(e) => { setname(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Rent Per Day'
          value={rentperday} onChange={(e) => { setrentperday(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Max Luggage'
          value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Description'
          value={description} onChange={(e) => { setdescription(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Phone Number'
          value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} />

      </div>
      <div className='col-md-5'>
        <input type='text' className='form-control' placeholder='Location (City)'
          value={type} onChange={(e) => { settype(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Image URL 1'
          value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Image URL 2'
          value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Image URL 3'
          value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }} />

        <div className='text-right'>

          <button className='btn btn-primary mt-2' onClick={addRoom}>Add Locker</button>

        </div>

      </div>

    </div>
  )
}