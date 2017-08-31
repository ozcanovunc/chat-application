/* globals io, $ */

var myUserID = guid();
var socket = io();

socket.on("chatMessage", onMessage);

$(function() {
    $(".send_message").click(function(e) {
        return brodcastMessage();
    });

    $(".message_input").keyup(function(e) {
        if (e.which === 13) {
            return brodcastMessage();
        }
    });
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function onMessage(e) {
    var $messages = $(".messages");
    var message = new Message({
        text: e.message,
        messageSide: e.userID === myUserID ? "right" : "left"
    });
    message.draw();
    $messages.animate({
        scrollTop: $messages.prop("scrollHeight")
    }, 300);
}

function brodcastMessage() {
    var message = $(".message_input").val();
    if (message.trim() === "") {
        return;
    }
    $(".message_input").val("");
    socket.emit("chatMessage", {
        message: message,
        userID: myUserID
    });
}

function Message(arg) {
    this.text = arg.text, this.messageSide = arg.messageSide;
    this.draw = function(_this) {
        return function() {
            var $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.messageSide).find('.text').html(_this.text);
            $('.messages').append($message);
            return setTimeout(function() {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
}
