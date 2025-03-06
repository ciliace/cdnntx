$(function () {
    console.log("Connecting to SignalR (jQuery-based)...");

    // ✅ Ensure jQuery SignalR is loaded before using it
    if (typeof $.hubConnection === "undefined") {
        console.error("jQuery SignalR is not loaded. Check your script imports.");
        return;
    }

    // ✅ Create SignalR connection for ASP.NET Framework
    var connection = $.hubConnection("https://notifications.penha.fr");
    var hubProxy = connection.createHubProxy("notificationhub");

    // ✅ Handle received notifications
    hubProxy.on("ReceiveNotification", function (message, type) {
        console.log(`New ${type} notification received:`, message);
        showToast(message, type);
        showBrowserNotification(message, type);
    });

    // ✅ Start connection
    connection.start()
        .done(function () {
            console.log("Connected to SignalR hub!");

            // ✅ Define sendNotification function
            window.sendNotification = function (message, type) {
                hubProxy.invoke("SendNotification", message, type)
                    .done(() => console.log("Notification sent successfully."))
                    .fail(error => console.error("Error sending notification:", error));
            };
        })
        .fail(error => console.error("Failed to connect to SignalR:", error));

    // ✅ Function to show browser notifications
    function showBrowserNotification(message, type) {
        if (!("Notification" in window)) {
            console.warn("This browser does not support notifications.");
            return;
        }

        let iconUrl = "https://your-icon-url.com/default.png"; // Default icon
        if (type === "success") iconUrl = "https://your-icon-url.com/success.png";
        if (type === "error") iconUrl = "https://your-icon-url.com/error.png";
        if (type === "warning") iconUrl = "https://your-icon-url.com/warning.png";

        if (Notification.permission === "granted") {
            let notification = new Notification("New Notification", {
                body: message,
                icon: iconUrl
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

    // ✅ Toastr Notification Function
    function showToast(message, type) {
        toastr[type](message);
    }
});
