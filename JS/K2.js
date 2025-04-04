$(function () {
    console.log("Connecting to SignalR...");

    // Connect to the SignalR hub hosted on notifications.penha.fr
    var connection = $.hubConnection("https://notifications.penha.fr");
    var hubProxy = connection.createHubProxy("notificationhub");

    // Define the function to receive notifications
    hubProxy.on("ReceiveNotification", function (message) {
        console.log("New notification received:", message);
        showToast(message, 'info'); // Call the showToast function
        showBrowserNotification(message);
    });

    // Start connection
    connection.start()
        .done(function () {
            console.log("Connected to SignalR hub!");

            // Manually define sendNotification function
            window.sendNotification = function (message, type) {
                hubProxy.invoke("SendNotification", message, type)
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

    // ✅ Function to show browser notifications
    function showBrowserNotification(message, type) {
        if (!("Notification" in window)) {
            console.warn("This browser does not support notifications.");
            return;
        }

        if (Notification.permission === "granted") {
            new Notification("New Notification", { body: message });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("New Notification", { body: message });
                } else {
                    console.warn("User denied notifications.");
                }
            });
        } else {
            console.warn("Notifications are blocked.");
        }
    }

});
function showToast(message, type) {
    toastr[type](message);
}