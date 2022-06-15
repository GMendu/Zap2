"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    if (user == $("#userInput").val()) {
        li.classList.add('usuario1');
    }
    else
    {
        li.classList.add('usuario2');
    }
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    const d = new Date();
    li.textContent = `${d.getHours()}:${d.getMinutes()} - ${user}: ${message}`;
    window.setTimeout(scrollDown, 5)
});

connection.on("ReceiveJoin", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.classList.add('entrou');
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    const d = new Date();
    li.textContent = `                                  ${user} ${message}`;
    window.setTimeout(scrollDown, 5)
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (erro) {
    return console.error(erro.toString());
});

document.getElementById("entrar").addEventListener("click", function (event) {
    var room = $("#room").val();
    var user = $("#name").val();
    var message = "";
    connection.invoke("SendMessage", user, message, room, 1).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sair").addEventListener("click", function (event) {
    var user = $("#userInput").val();
    var message = $("#messageInput").val();
    var room = $("#roomInput").val();
    connection.invoke("SendMessage", user, message, room, 2).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = $("#userInput").val();
    var message = $("#messageInput").val();
    var room = $("#roomInput").val();
    connection.invoke("SendMessage", user, message,room, 0).catch(function (erro) {
        return console.error(erro.toString());
    });
    event.preventDefault();
    $('#messageInput').val("");
});

function scrollDown() {
    var objDiv = $('#scroll')[0] /*document.getElementById("scroll");*/
    objDiv.scrollTop = objDiv.scrollHeight;
}