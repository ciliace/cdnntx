$(document).ready(function () {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://notifications.penha.fr/notificationhub")
        .build();

    connection.on("ReceiveMessage", function (user, message) {
        showToast(message, 'info'); // Call the showToast function
    });

    connection.start().catch(function (err) {
        return console.error(err.toString());
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
