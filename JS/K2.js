$(document).ready(function () {
const connection = $.hubConnection("https://notifications.penha.fr");
const hubProxy = connection.createHubProxy("notificationhub");

// Define event handlers
hubProxy.on("ReceiveNotification", function (message) {
    console.log("New notification:", message);
});

// Start the connection
connection.start()
    .done(function () {
        console.log("Connected to SignalR hub!");
    })
    .fail(function (error) {
        console.error("Failed to connect to SignalR:", error);
    });


    function sendNotification(user, message) {
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
    }

    function showToast(message, type) {
        toastr[type](message);
    }

    // Example: Attach sendNotification to a button click
    $('#yourButtonId').on('click', function () {
        sendNotification('username', 'Your message here!');
    });
});
