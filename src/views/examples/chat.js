import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const SOCKET_IO_URL = "http://localhost:5000";
const socket = io(SOCKET_IO_URL);


function Chat() {
    const [initialized, setInitialized] = useState(false);
    const connectToRoom = () => {
        socket.emit("join","room1");

        socket.on("newMessage", data => {
            console.log("hi recieved a new message", data)
        });
        setInitialized(true);
    };
    useEffect(() => {
        if (!initialized) {
            connectToRoom();
        }
    });
    return (
        <>
            <h1>CHAT</h1>
        </>
    )
}

export default Chat