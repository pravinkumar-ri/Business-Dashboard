import React, { useState } from "react";
import "../css/inbox.css";
import Header from "../component/header";
import LeftSideBar from "../component/left-sidebar";

const InboxScreen = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [activeTab, setActiveTab] = useState("messages");

    const [messages, setMessages] = useState([
        { id: 1, from: "RI Pravin", avatar: "RIP", message: "Hey! How are you doing?", time: "10:30 AM", unread: true, online: true, email: "sarah@example.com" },
        { id: 2, from: "Michael Chen", avatar: "MC", message: "The project deadline has been extended", time: "Yesterday", unread: true, online: false, email: "michael@example.com" },
        { id: 3, from: "Emily Davis", avatar: "ED", message: "Great job on the presentation!", time: "Yesterday", unread: false, online: true, email: "emily@example.com" },
        { id: 4, from: "James Wilson", avatar: "JW", message: "Can we schedule a meeting?", time: "2 days ago", unread: false, online: false, email: "james@example.com" },
        { id: 5, from: "Lisa Anderson", avatar: "LA", message: "The files are ready for review", time: "3 days ago", unread: false, online: true, email: "lisa@example.com" },
    ]);

    const [notifications, setNotifications] = useState([
        { id: 1, title: "New feature released", message: "Check out our latest updates", time: "1 hour ago", read: false, icon: "🎉" },
        { id: 2, title: "Meeting reminder", message: "Team sync at 3 PM today", time: "3 hours ago", read: false, icon: "📅" },
        { id: 3, title: "Task completed", message: "Project milestone achieved", time: "1 day ago", read: true, icon: "✅" },
    ]);

    const [conversations, setConversations] = useState({
        1: [
            { id: 1, text: "Hey! How are you doing?", sender: "them", time: "10:30 AM" },
            { id: 2, text: "I'm doing great! Thanks for asking. How about you?", sender: "me", time: "10:32 AM" },
            { id: 3, text: "Pretty good! Working on some exciting projects.", sender: "them", time: "10:35 AM" },
        ],
        2: [
            { id: 1, text: "The project deadline has been extended to next Friday", sender: "them", time: "Yesterday" },
            { id: 2, text: "That's great news! Thanks for letting me know.", sender: "me", time: "Yesterday" },
        ],
        3: [
            { id: 1, text: "Great job on the presentation! Everyone loved it.", sender: "them", time: "Yesterday" },
            { id: 2, text: "Thank you! I'm glad it went well.", sender: "me", time: "Yesterday" },
        ],
    });

    const filteredMessages = messages.filter(msg =>
        msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedChat) {
            const newMsg = {
                id: conversations[selectedChat.id].length + 1,
                text: newMessage,
                sender: "me",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setConversations(prev => ({
                ...prev,
                [selectedChat.id]: [...prev[selectedChat.id], newMsg]
            }));
            setNewMessage("");
        }
    };

    const markAsRead = (id) => {
        setMessages(prev => prev.map(msg => 
            msg.id === id ? { ...msg, unread: false } : msg
        ));
    };

    const markNotificationAsRead = (id) => {
        setNotifications(prev => prev.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const getUnreadCount = () => {
        return messages.filter(msg => msg.unread).length;
    };

    const getUnreadNotificationsCount = () => {
        return notifications.filter(notif => !notif.read).length;
    };

    return (
        <div>
            <Header />
            <div className="wrapper">
                <LeftSideBar />
                <div className="content">
                    <div className="inbox-container">
                        {/* Header */}
                        <div className="inbox-header">
                            <div className="header-left">
                                <h1>📬 Inbox</h1>
                                <p>Manage your messages and notifications</p>
                            </div>
                            <div className="header-right">
                                <button className="compose-btn">+ Compose New</button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="inbox-tabs">
                            <button 
                                className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                                onClick={() => setActiveTab('messages')}
                            >
                                💬 Messages
                                {getUnreadCount() > 0 && <span className="badge">{getUnreadCount()}</span>}
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                                onClick={() => setActiveTab('notifications')}
                            >
                                🔔 Notifications
                                {getUnreadNotificationsCount() > 0 && <span className="badge">{getUnreadNotificationsCount()}</span>}
                            </button>
                        </div>

                        {/* Main Content */}
                        <div className="inbox-main">
                            {activeTab === 'messages' ? (
                                <>
                                    {/* Messages Sidebar */}
                                    <div className="messages-sidebar">
                                        <div className="search-bar">
                                            <input 
                                                type="text" 
                                                placeholder="Search messages..." 
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <span className="search-icon">🔍</span>
                                        </div>
                                        <div className="messages-list">
                                            {filteredMessages.map(msg => (
                                                <div 
                                                    key={msg.id} 
                                                    className={`message-item ${selectedChat?.id === msg.id ? 'active' : ''} ${msg.unread ? 'unread' : ''}`}
                                                    onClick={() => {
                                                        setSelectedChat(msg);
                                                        markAsRead(msg.id);
                                                    }}
                                                >
                                                    <div className="message-avatar">
                                                        <div className="avatar">{msg.avatar}</div>
                                                        {msg.online && <div className="online-dot"></div>}
                                                    </div>
                                                    <div className="message-info">
                                                        <div className="message-sender">{msg.from}</div>
                                                        <div className="message-preview">{msg.message}</div>
                                                    </div>
                                                    <div className="message-time">{msg.time}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Chat Area */}
                                    <div className="chat-area">
                                        {selectedChat ? (
                                            <>
                                                <div className="chat-header">
                                                    <div className="chat-user-info">
                                                        <div className="chat-avatar">{selectedChat.avatar}</div>
                                                        <div>
                                                            <h3>{selectedChat.from}</h3>
                                                            <p>{selectedChat.online ? 'Online' : 'Offline'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="chat-actions">
                                                        <button className="chat-action-btn">📞</button>
                                                        <button className="chat-action-btn">📹</button>
                                                        <button className="chat-action-btn">🔍</button>
                                                    </div>
                                                </div>
                                                <div className="chat-messages">
                                                    {conversations[selectedChat.id]?.map(msg => (
                                                        <div key={msg.id} className={`message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                                                            <div className="message-text">{msg.text}</div>
                                                            <div className="message-time">{msg.time}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="chat-input-area">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Type a message..." 
                                                        value={newMessage}
                                                        onChange={(e) => setNewMessage(e.target.value)}
                                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                    />
                                                    <button onClick={handleSendMessage}>Send →</button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="no-chat-selected">
                                                <span className="no-chat-icon">💬</span>
                                                <h3>Select a conversation</h3>
                                                <p>Choose a message from the list to start chatting</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                // Notifications Panel
                                <div className="notifications-panel">
                                    <div className="notifications-header">
                                        <h3>All Notifications</h3>
                                        <button className="mark-all-read">Mark all as read</button>
                                    </div>
                                    <div className="notifications-list">
                                        {notifications.map(notif => (
                                            <div 
                                                key={notif.id} 
                                                className={`notification-item ${!notif.read ? 'unread' : ''}`}
                                                onClick={() => markNotificationAsRead(notif.id)}
                                            >
                                                <div className="notification-icon">{notif.icon}</div>
                                                <div className="notification-content">
                                                    <div className="notification-title">{notif.title}</div>
                                                    <div className="notification-message">{notif.message}</div>
                                                    <div className="notification-time">{notif.time}</div>
                                                </div>
                                                {!notif.read && <div className="unread-dot"></div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxScreen;