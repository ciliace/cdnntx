$(function () {
    console.log("Connecting to SignalR...");

    var connection = new signalR.HubConnectionBuilder()
        .withUrl("https://notifications.penha.fr/notificationhub")
        .withAutomaticReconnect([0, 2000, 5000, 10000]) // Reconnect after 0ms, 2s, 5s, 10s
        .build();

    let messageQueue = []; // 🛑 Store messages while disconnected

    // ✅ Function to start connection with retry logic
    async function startConnection() {
        try {
            await connection.start();
            console.log("Connected to SignalR hub!");

            // 🚀 Process queued messages after reconnection
            messageQueue.forEach(({ message, type }) => {
                showToast(message, type);
                showBrowserNotification(message, type);
            });
            messageQueue = []; // Clear queue
        } catch (err) {
            console.error("Connection failed. Retrying in 5 seconds...", err);
            setTimeout(startConnection, 5000); // Retry after 5 sec
        }
    }

    startConnection(); // Start the connection

    // 📌 Handle received notifications
    connection.on("ReceiveNotification", function (message, type) {
        console.log(`New ${type} notification received:`, message);

        if (connection.state !== signalR.HubConnectionState.Connected) {
            console.warn("Connection not ready, queuing message.");
            messageQueue.push({ message, type }); // 🛑 Queue messages if disconnected
        } else {
            showToast(message, type);
            showBrowserNotification(message, type);
        }
    });

    // ✅ Handle reconnection attempts
    connection.onreconnecting(error => {
        console.warn(`Reconnecting... Error: ${error}`);
    });

    connection.onreconnected(connectionId => {
        console.log(`Reconnected successfully. Connection ID: ${connectionId}`);
        messageQueue.forEach(({ message, type }) => {
            showToast(message, type);
            showBrowserNotification(message, type);
        });
        messageQueue = []; // Clear queued messages
    });

    connection.onclose(error => {
        console.error("Connection closed. Restarting...", error);
        setTimeout(startConnection, 5000); // Restart connection after 5s
    });

    // ✅ Send Notification Function
    window.sendNotification = function (message, type) {
        if (connection.state !== signalR.HubConnectionState.Connected) {
            console.warn("Connection not ready, queuing sent message.");
            messageQueue.push({ message, type });
            return;
        }

        connection.invoke("SendNotification", message, type)
            .then(() => console.log("Notification sent successfully."))
            .catch(error => console.error("Error sending notification:", error));
    };

    // ✅ Browser Notification Function
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
                body: message//,
                //icon: iconUrl
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
