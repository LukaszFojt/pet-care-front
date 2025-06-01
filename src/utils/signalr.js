import * as signalR from "@microsoft/signalr";

const hubUrl = "https://localhost:5001/chatHub";

const connection = new signalR.HubConnectionBuilder()
  .withUrl(hubUrl)
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

async function startConnection() {
  try {
    await connection.start();
    console.log("Połączono z SignalR!");
  } catch (err) {
    console.error("Błąd połączenia z SignalR:", err);
    setTimeout(startConnection, 5000);
  }
}

connection.onclose(async () => {
  console.log("Połączenie z SignalR zerwane. Ponawianie...");
  await startConnection();
});

connection.on("ReceiveMessage", (senderId, message) => {
  console.log(`New message from ${senderId}: ${message}`);
});

startConnection();

export default connection;
