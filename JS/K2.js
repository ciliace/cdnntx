$(function () {
    console.log("Connecting to SignalR...");

    var connection = new signalR.HubConnectionBuilder()
        .withUrl("https://notifications.penha.fr/notificationhub")
        .withAutomaticReconnect()
        .build();

    async function startConnection() {
        try {
            await connection.start();
            console.log("Connected to SignalR hub!");
        } catch (err) {
            console.error("Connection failed. Retrying in 5 seconds...", err);
            setTimeout(startConnection, 5000);
        }
    }

    startConnection();

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

function showToast(message, type) {
    toastr[type](message);
}
