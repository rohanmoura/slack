"use client";

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket, io as ClientIo } from "socket.io-client";

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
})

export const useSocket = () => useContext(SocketContext)

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false)

    useEffect(() => {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

        if (!siteUrl) {
            console.log("Next public site url is not set");
            return;
        }

        const socketInstance = ClientIo(siteUrl, {
            path: "/api/web-socket/io",
            addTrailingSlash: false
        });

        socketInstance.on("connect", () => {
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}

export default WebSocketProvider