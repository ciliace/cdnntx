$(document).ready(function () {
    // Connect to the SignalR hub
    var connection = $.hubConnection("https://notifications.penha.fr");
    var hubProxy = connection.createHubProxy("notificationhub");

    // Define the function that will be called when a notification is received
    hubProxy.on("ReceiveNotification", function (message) {
        console.log("New notification:", message);
        alert("New Notification: " + message);
    });

    // Start the connection
    connection.start()
        .done(function () {
            console.log("Connected to SignalR hub!");

            // Manually define sendNotification function
            window.sendNotification = function (message) {
                hubProxy.invoke("SendNotification", message)
                    .done(function () {
                        console.log("Notification sent successfully.");
                    })
                    .fail(function (error) {
                        console.error("Error sending notification:", error);
                    });
            };
        })
        .fail(function (error) {
            console.error("Failed to connect to SignalR:", error);
        });
    });
    function showToast(message, type) {
        toastr[type](message);
    }
});
