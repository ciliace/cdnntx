$(function () {
    console.log("Connecting to SignalR...");

    // Connect to the SignalR hub hosted on `notifications.penha.fr`
    var connection = $.hubConnection("https://notifications.penha.fr");
    var hubProxy = connection.createHubProxy("notificationhub");

    // Define `sendNotification` globally (before connection starts)
    window.sendNotification = function (message, type = "info") {
        if (connection.state !== $.signalR.connectionState.connected) {
            console.warn("Cannot send notification: Not connected to SignalR.");
            return;
        }
        hubProxy.invoke("SendNotification", message, type)
            .done(function () {
                console.log("Notification sent successfully.");
            })
            .fail(function (error) {
                console.error("Error sending notification:", error);
            });
    };

    // Define the function to receive notifications
    hubProxy.on("ReceiveNotification", function (message, type) {
        console.log(`New ${type} notification received:`, message);
        showToast(message, type || "info");
        showBrowserNotification(message, type || "info");
    });

    // Start connection
    connection.start()
        .done(function () {
            console.log("Connected to SignalR hub!");
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

        let iconUrl = "https://your-icon-url.com/default.png";
        if (type === "success") iconUrl = "https://your-icon-url.com/success.png";
        if (type === "error") iconUrl = "https://your-icon-url.com/error.png";
        if (type === "warning") iconUrl = "https://your-icon-url.com/warning.png";

        if (Notification.permission === "granted") {
            let notification = new Notification("New Notification", {
                body: message
            });

            notification.onclick = () => window.focus();
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    showBrowserNotification(message, type);
                } else {
                    console.warn("User denied notifications.");
                }
            });
        } else {
            console.warn("Notifications are blocked.");
        }
    }
});

// ✅ Toastr notification function
function showToast(message, type) {
    toastr[type](message);
}
