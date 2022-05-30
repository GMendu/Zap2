"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    const d = new Date();
    li.textContent = `${d.getHours()}:${d.getMinutes()} - ${user}: ${message}`;
    $('#messageInput').val("");
    window.setTimeout(scrollDown, 5)
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (erro) {
    return console.error(erro.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = $("#userInput").val();
    var message = $("#messageInput").val();
    connection.invoke("SendMessage", user, message).catch(function (erro) {
        return console.error(erro.toString());
    });

    
    event.preventDefault();
});

function scrollDown() {
    var objDiv = $('#scroll')[0] /*document.getElementById("scroll");*/
    objDiv.scrollTop = objDiv.scrollHeight;
}