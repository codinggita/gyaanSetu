import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Replace with your production URL if needed
    const socketURL = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ?? "http://localhost:5005";
    const newSocket = io(socketURL);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("notification", (data) => {
      // Show live toast for all users (like a social proof feature)
      toast(data.message, {
        icon: data.type === "enrollment" ? "🚀" : "🔔",
        description: new Date(data.timestamp).toLocaleTimeString(),
      });
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
