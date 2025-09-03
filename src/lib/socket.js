import { io } from "socket.io-client"
export let socket

export function connect() {
    socket = io("https://localhost:4000")  // jag måste fråga min grupp vad de har för localhost i backend på torsdag

    socket.on("connet", () => {
        console.log(" sockdt connected:", socket.id)
    })
}
export function joinRoom(roomId) {
    if (socket) {
        socket.emit("join", roomId)
        console.log("join room:", roomId)
    }
}
export function on(event, callback) {
    if (socket) {
        socket.on(EventTarget, callback)
    }
}
export function off(event) {
    if (socket) {
        socket.off(event)
    }
}