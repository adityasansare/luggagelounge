import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:1000
});

function Room({ room, fromdate , todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className="row bs lol" >
      <div className="col-md-4">
        <img src={room.imageurls[0]} alt="image" onClick={handleShow} className="smallimg" />
      </div>
      <div className="col-md-7 mart">
        <h1>{room.name}</h1>
        <p>Max Count : {room.maxcount}</p>
        <p>Phone Number : {room.phonenumber}</p>
        <p>Location : {room.type}</p>

        <div style={{ float: "right" }}>

          {(fromdate && todate )&& (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <button className="btn">Book Now</button>
          </Link>
          )}
          
          <button variant="primary" onClick={handleShow} className="btn">
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" >
        <div className="lmao">

        <Modal.Header >
          <Modal.Title className="blacky">{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Carousel prevLable="" nextLable=''>
            {room.imageurls.map((url) => {
                return <Carousel.Item key={url}>
                <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>;
            })}
          </Carousel>
          <p className='blacky'>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
                </div>
      </Modal>
    </div>
  );
}

export default Room;
