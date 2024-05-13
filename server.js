const express = require("express");
const bodyParser = require("body-parser")
var cors = require('cors');
const app = express();
app.use(cors());
// app.use(cors());
// app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const dbConfig = require('./db')

const roomsRoute = require('./routes/roomsRoute')

const usersRoute = require('./routes/usersRoute')

const bookingsRoute = require('./routes/bookingsRoute')

app.get("/", function (request, response) {
    response.send("Server is online!");
});

app.use("/api/rooms" , roomsRoute);
app.use("/api/users" , usersRoute);
app.use("/api/bookings" , bookingsRoute);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Node Server Started using nodemon')); 