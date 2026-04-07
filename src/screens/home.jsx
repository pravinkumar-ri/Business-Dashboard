import React, { useState, useEffect } from "react";
import Header from "../component/header";
import LeftSideBar from "../component/left-sidebar";
import CalendarComponent from "../component/calendercomponent";
import DashboardStats from "../component/dashboardComponent";
import ActivityComponent from "../component/activityComponent";
import ReviewsComponent from "../component/reviewComponent";
import "../css/style.css";

const HomeScreen = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [greeting, setGreeting] = useState("");
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
    };

    return (
        <div>
            <Header />
            <div className="wrapper">
                <LeftSideBar />
                <div className="content">
                    {/* Welcome Banner */}
                    <div className="welcome-banner">
                        <div className="banner-content">
                            <div className="greeting-section">
                                <span className="greeting-icon">👋</span>
                                <div>
                                    <h2>{greeting}!</h2>
                                    <p>Welcome back to your dashboard</p>
                                </div>
                            </div>
                            <div className="datetime-section">
                                <div className="date-display">
                                    <span className="date-icon">📅</span>
                                    <span>{formatDate(currentTime)}</span>
                                </div>
                                <div className="time-display">
                                    <span className="time-icon">⏰</span>
                                    <span>{formatTime(currentTime)}</span>
                                </div>
                            </div>
                        </div>
                        {showNotification && (
                            <div className="notification-banner">
                                <span>🎉 New features available! Check out the latest updates.</span>
                                <button onClick={() => setShowNotification(false)}>×</button>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats Row */}
                    <div className="quick-stats-row">
                        <div className="quick-stat-card">
                            <div className="quick-stat-icon">📈</div>
                            <div className="quick-stat-info">
                                <span className="quick-stat-value">+24%</span>
                                <span className="quick-stat-label">Revenue Growth</span>
                            </div>
                        </div>
                        <div className="quick-stat-card">
                            <div className="quick-stat-icon">👥</div>
                            <div className="quick-stat-info">
                                <span className="quick-stat-value">1,234</span>
                                <span className="quick-stat-label">Active Users</span>
                            </div>
                        </div>
                        <div className="quick-stat-card">
                            <div className="quick-stat-icon">⭐</div>
                            <div className="quick-stat-info">
                                <span className="quick-stat-value">4.8</span>
                                <span className="quick-stat-label">Rating</span>
                            </div>
                        </div>
                        <div className="quick-stat-card">
                            <div className="quick-stat-icon">🚀</div>
                            <div className="quick-stat-info">
                                <span className="quick-stat-value">99.9%</span>
                                <span className="quick-stat-label">Uptime</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="first">
                        <div className="dashboard">
                            <DashboardStats />
                        </div>
                        <div className="calendar">
                            <CalendarComponent />
                        </div>
                    </div>

                    {/* Secondary Content Grid */}
                    <div className="second">
                        <div className="order">
                            <ReviewsComponent />
                        </div>
                        <div className="comment">
                            <ActivityComponent />
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="recent-activity-section">
                        <div className="section-header">
                            <h3>🔄 Recent Activity</h3>
                            <button className="view-all-link">View All →</button>
                        </div>
                        <div className="activity-grid">
                            <div className="activity-card">
                                <div className="activity-icon">✅</div>
                                <div className="activity-details">
                                    <h4>Project Completed</h4>
                                    <p>Website redesign project finished</p>
                                    <span className="activity-time">2 hours ago</span>
                                </div>
                            </div>
                            <div className="activity-card">
                                <div className="activity-icon">💬</div>
                                <div className="activity-details">
                                    <h4>New Comment</h4>
                                    <p>John commented on your post</p>
                                    <span className="activity-time">5 hours ago</span>
                                </div>
                            </div>
                            <div className="activity-card">
                                <div className="activity-icon">📊</div>
                                <div className="activity-details">
                                    <h4>Report Generated</h4>
                                    <p>Monthly analytics report ready</p>
                                    <span className="activity-time">1 day ago</span>
                                </div>
                            </div>
                            <div className="activity-card">
                                <div className="activity-icon">👤</div>
                                <div className="activity-details">
                                    <h4>New User</h4>
                                    <p>Sarah Johnson joined the team</p>
                                    <span className="activity-time">2 days ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="footer-stats">
                        <div className="footer-stat-item">
                            <span className="footer-stat-value">$45.2K</span>
                            <span className="footer-stat-label">Total Revenue</span>
                        </div>
                        <div className="footer-stat-item">
                            <span className="footer-stat-value">342</span>
                            <span className="footer-stat-label">Total Orders</span>
                        </div>
                        <div className="footer-stat-item">
                            <span className="footer-stat-value">89%</span>
                            <span className="footer-stat-label">Customer Satisfaction</span>
                        </div>
                        <div className="footer-stat-item">
                            <span className="footer-stat-value">24/7</span>
                            <span className="footer-stat-label">Support Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;