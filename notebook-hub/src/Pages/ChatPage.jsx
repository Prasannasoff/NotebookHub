import { useEffect, useRef, useState } from "react";
import { PaperclipIcon, Send } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card";
import { Input } from "../Components/ui/input";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";

const socketUrl = "http://localhost:9092/chat-websocket";

let stompClient = null;

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = new SockJS(socketUrl);

    stompClient = new StompJs.Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("STOMP connection established");
        stompClient.subscribe("/topic/messages", (message) => {
          setMessages((prev) => [...prev, JSON.parse(message.body)]);
        });
      },
      onWebSocketError: (error) => {
        console.log("WebSocket error", error);
      },
    });

    stompClient.activate();

    return () => {
      if (stompClient) stompClient.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient.connected && input.trim()) {
      console.log("Sending message:", input);
      stompClient.publish({
        destination: "/app/send",
        body: JSON.stringify({
          sender: "user",
          content: input,
        }),
      });
      setInput("");
    } else {
      console.log("STOMP client is not connected yet.");
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container px-4 py-8 md:px-6 md:py-12 flex flex-col flex-1">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <h1 className="text-3xl font-bold">Live Chat Customer Service</h1>
              <p className="text-muted-foreground">Get help from our customer service representatives</p>
            </div>

            <Card className="flex-1 flex flex-col">
              <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    S
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                    <CardDescription>Customer Service Representative</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-sm text-muted-foreground">Online</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 chat-bubble-in ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.sender === "rep"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className="text-xs mt-1 opacity-70 text-right">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">support@notebookwholesale.com</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">+1 (555) 123-4567</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Hours</div>
                    <div className="font-medium">Monday - Friday: 9AM - 5PM EST</div>
                  </div>
                  <Button className="w-full">Request Callback</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
