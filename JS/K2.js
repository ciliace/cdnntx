$(function () {
    console.log("Connecting to SignalR...");

    if (typeof signalR === "undefined") {
        console.error("SignalR is not loaded. Check your script imports.");
        return;
    }

    var connection = new signalR.HubConnectionBuilder()
        .withUrl("https://notifications.penha.fr/notificationhub")
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(() => console.log("Connected to SignalR hub!"))
        .catch(err => console.error("Connection failed:", err));

    connection.on("ReceiveNotification", function (message, type) {
        console.log(`New ${type} notification received:`, message);
        showToast(message, type);
        showBrowserNotification(message, type);
    });

    window.sendNotification = function (message, type) {
        connection.invoke("SendNotification", message, type)
            .then(() => console.log("Notification sent successfully."))
            .catch(error => console.error("Error sending notification:", error));
    };
});
