import { useState, useRef, useEffect } from "react"
import { PaperclipIcon, Send } from "lucide-react"
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
import { Input } from "../Components/ui/input"
const initialMessages = [
  {
    id: 1,
    sender: "system",
    content: "Welcome to our live chat! A customer service representative will be with you shortly.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 2,
    sender: "rep",
    content: "Hello! I'm Sarah from NotebookWholesale. How can I assist you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: 3,
    sender: "user",
    content:
      "Hi Sarah, I'm interested in ordering custom notebooks for my company. Can you tell me about your bulk pricing?",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
  {
    id: 4,
    sender: "rep",
    content:
      "Of course! Our bulk pricing starts at 50 units. For hardcover notebooks, prices start at $15 per unit for 50-100 units, and drop to $12 per unit for orders over 100. Would you like me to send you our full pricing sheet?",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate rep response after a delay
    setTimeout(() => {
      const repMessage = {
        id: messages.length + 2,
        sender: "rep",
        content:
          "I can offer you a special discount of 15% if you order more than 200 units. Would that work for your needs?",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, repMessage])
    }, 2000)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

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
                {messages.map((message) => (
                  <div
                    key={message.id}
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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
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
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-medium">What is the minimum order quantity?</div>
                    <div className="text-sm text-muted-foreground">
                      Our minimum order quantity is 50 units per product.
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">How long does shipping take?</div>
                    <div className="text-sm text-muted-foreground">
                      Standard shipping takes 5-7 business days. Express shipping is available.
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Do you offer samples?</div>
                    <div className="text-sm text-muted-foreground">
                      Yes, we offer sample packs for $25 which includes 5 different notebook styles.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
  )
}

