const express = require("express");
const app = express();
const cors = require("cors");

require("./components/config/evault.config");

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

require("./components/routes/evault.routes")(app);
const server = app.listen(8000, () => console.log("Listening at port 8000"));

const socketio = require("socket.io");
const { Passwords } = require("./components/models/evault.models");
io = socketio(server, {cors:true});

io.on("connection", socket => {
    socket.on("newpass", () => {
        io.emit("passwords");
    })
})