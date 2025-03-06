$(function () {
    console.log("Connecting to SignalR...");

    var connection = $.hubConnection("https://notifications.penha.fr");
    var hubProxy = connection.createHubProxy("notificationhub");

    hubProxy.on("ReceiveNotification", function (message) {
        console.log("New notification received:", message);
        showBrowserNotification(message);
    });

    connection.start()
        .done(function () {
            console.log("Connected to SignalR hub!");
        })
        .fail(function (error) {
            console.error("Failed to connect to SignalR:", error);
        });
});
function showBrowserNotification(message) {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
        console.warn("This browser does not support notifications.");
        return;
    }

    // Check permission
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
function showToast(message, type) {
    toastr[type](message);
}
