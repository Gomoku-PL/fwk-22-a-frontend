import { io } from "socket.io-client";

export let socket;

export function connect() {
    // Om backend körs lokalt, använd http://localhost:4000 (inte https)
    socket = io("http://localhost:4000");

    // OBS: Eventet heter "connect", inte "connet"
    socket.on("connect", () => {
        console.log("🔌 Socket connected:", socket.id);
    });
}

export function joinRoom(roomId) {
    if (socket) {
        socket.emit("join", roomId);
        console.log("🚪 Joined room:", roomId);
    }
}

export function on(event, callback) {
    if (socket) {
        // Var noga med att använda 'event', inte 'EventTarget'
        socket.on(event, callback);
    }
}

export function off(event) {
    if (socket) {
        socket.off(event);
    }
}
