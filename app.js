var express = require("express");
var app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/views'));

var server = app.listen(8080, () => {
    console.log("Server listening on port %d", server.address().port);
});

var io = require('socket.io')(server);

io.on("connection", function(socket) {
    socket.on("chatMessage", function(e) {
        io.emit("chatMessage", e);
    });
});
