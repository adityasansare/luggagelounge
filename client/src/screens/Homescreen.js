import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

import { ConfigProvider, DatePicker, Space } from "antd";
import "antd/dist/antd";
import { func } from "joi";
import moment from "moment";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init({
  duration: 1000,
});



function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const { RangePicker } = DatePicker;
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([])
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  // const App = () => (
  //   <Space direction="vertical" size={12}>
  //     <RangePicker />
  //     <RangePicker showTime />
  //     <RangePicker picker="week" />
  //     <RangePicker picker="month" />
  //     <RangePicker picker="quarter" />
  //     <RangePicker picker="year" />
  //   </Space>
  // );



  useState(async () => {
    try {
      setloading(true);
      const data = (await axios.get("/api/rooms/getalllockers")).data;

      setrooms(data);
      setduplicaterooms(data)
      setloading(false);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
    }
  }, []);

  function filterByDate(dates) {
    console.log("helo");
    console.log(moment(new Date(dates[0])).format("DD-MM-YYYY"));
    console.log(moment(new Date(dates[1])).format("DD-MM-YYYY"));
    setfromdate(moment(new Date(dates[0])).format("DD-MM-YYYY"));
    settodate(moment(new Date(dates[1])).format("DD-MM-YYYY"));


    var temprooms = []
    var availability = false

    for (const room of duplicaterooms) {

      if (room.currentbookings.length > 0) {


        for (const booking of room.currentbookings) {


          if (!moment(moment(new Date(dates[0])).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate)
            && !moment(moment(new Date(dates[1])).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate)
          ) {

            if (


              moment(new Date(dates[0])).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(new Date(dates[0])).format('DD-MM-YYYY') !== booking.todate &&
              moment(new Date(dates[1])).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(new Date(dates[1])).format('DD-MM-YYYY') !== booking.todate


            ) {


              availability = true

            }




          }

        }


      }

      if (availability == true || room.currentbookings.length == 0) {
        temprooms.push(room)
      }

      setrooms(temprooms)

    }

  }

  function testhehe() {
    console.log("first")
  }

  function filterByType(type) {
  setType(type);

  if (type !== "all") {
    const tempRooms = duplicaterooms.filter((x) =>
      x.type.toLowerCase() === type.toLowerCase()
    );
    setrooms(tempRooms);
  } else {
    setrooms(duplicaterooms);
  }
}



  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3  ">
          <ConfigProvider theme={{
            token: {
              // Seed Token
              colorPrimary: '#ffa31a',
              borderRadius: 2,
              colorBgElevated: '#1b1b1b',
              colorText: '#ffff',
              colorPrimaryText: '#ffff',
              colorBgMask: '#ffff',
              cellHoverBg: '#8080',
              cellHoverWithRangeBg: '#8080',
              colorIconHover: '#ffff',
              activeBorderColor: '#ffa31a',
              cellActiveWithRangeBg: '#8080',


              // Alias Token
              colorBgContainer: '#1b1b1b',
            },
          }}>
            <RangePicker className="meow" format={'DD-MM-YYYY'} onChange={filterByDate} />

            {/* <button onClick={() => filterByDate([fromdate, todate])}>Filter</button> */}
          </ConfigProvider>
        </div>
        <div className="col-md-3">
          <select
            className="form-control blacky"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="pune">Pune</option>
            <option value="bangalore">Bangalore</option>
          </select>
        </div>

      </div>
      <Space direction="vertical" size={12}>
      </Space>
      <div className="row justify-content-center mt-5 ">
        {loading ? (
          <Loader />
        ) : rooms.length > 0 ? (
          rooms.map((room) => {
            return (
              <div key={room.id} className="col-md-9">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;