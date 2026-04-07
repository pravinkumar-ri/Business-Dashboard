import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../component/header";
import LeftSideBar from "../component/left-sidebar";
import "../css/profile.css";

const ProfileScreen = () => {
    const [currentLoad, setCurrentLoad] = useState(0);
    const [batteryHealth, setBatteryHealth] = useState(0);
    const [consumption, setConsumption] = useState(0);
    const [efficiency, setEfficiency] = useState(0);
    const [weeklyDistance, setWeeklyDistance] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState(null);
    const profileRef = useRef(null);

    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    const [progress4, setProgress4] = useState(0);

    const [userData, setUserData] = useState({
        fullName: "Aathiya",
        mobile: "(+91) 99436 14667",
        email: "aathi07@simple.com",
        location: "United States",
        bio: "H. I'm Aathiya, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
        avatar: null
    });

    const recentActivities = [
        { id: 1, action: "Logged in", time: "2 minutes ago", icon: "🔐" },
        { id: 2, action: "Updated profile", time: "1 hour ago", icon: "✏️" },
        { id: 3, action: "Changed password", time: "3 days ago", icon: "🔒" },
        { id: 4, action: "Viewed analytics", time: "5 days ago", icon: "📊" }
    ];

    const achievements = [
        { name: "Speed Demon", progress: 85, icon: "⚡", color: "#f59e0b" },
        { name: "Eco Warrior", progress: 92, icon: "🌱", color: "#10b981" },
        { name: "Long Ranger", progress: 78, icon: "🏆", color: "#3b82f6" }
    ];

    const animateValue = useCallback((setter, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            setter(value);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, []);

    const startAnimations = useCallback(() => {
        animateValue(setCurrentLoad, 0, 68, 2000);
        animateValue(setBatteryHealth, 0, 76, 2000);
        animateValue(setConsumption, 0, 163, 2000);
        animateValue(setEfficiency, 0, 20, 2000);
        animateValue(setWeeklyDistance, 0, 1342, 2000);
        animateValue(setProgress1, 0, 85, 2500);
        animateValue(setProgress2, 0, 72, 2500);
        animateValue(setProgress3, 0, 90, 2500);
        animateValue(setProgress4, 0, 88, 2500);
    }, [animateValue]);

    useEffect(() => {
        const currentRef = profileRef.current;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    startAnimations();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.3 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasAnimated, startAnimations]);

    const formatDistance = (value) => {
        return value.toLocaleString() + 'km';
    };

    const handleEditProfile = () => {
        setShowEditModal(true);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setShowEditModal(false);
        alert("Profile updated successfully!");
    };

    const handleMetricClick = (metric) => {
        setSelectedMetric(metric);
        setTimeout(() => setSelectedMetric(null), 1000);
    };

    const CircularProgress = ({ percentage, label, color, icon }) => {
        const radius = 55;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className="circular-progress-card" onClick={() => handleMetricClick(label)}>
                <div className="circular-progress-container">
                    <svg className="circular-progress" width="130" height="130" viewBox="0 0 130 130">
                        <circle
                            className="progress-bg"
                            cx="65"
                            cy="65"
                            r={radius}
                            strokeWidth="6"
                            fill="none"
                        />
                        <circle
                            className="progress-bar"
                            cx="65"
                            cy="65"
                            r={radius}
                            strokeWidth="6"
                            stroke={color}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            fill="none"
                        />
                        <text
                            x="65"
                            y="58"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="progress-text"
                            fill={color}
                        >
                            {percentage}%
                        </text>
                    </svg>
                    {icon && <div className="progress-icon-overlay">{icon}</div>}
                </div>
                <div className="circular-label">{label}</div>
            </div>
        );
    };

    const AchievementBar = ({ name, progress, icon, color }) => (
        <div className="achievement-item">
            <div className="achievement-icon">{icon}</div>
            <div className="achievement-info">
                <div className="achievement-name">{name}</div>
                <div className="achievement-bar-container">
                    <div className="achievement-bar" style={{ width: `${progress}%`, backgroundColor: color }}></div>
                </div>
            </div>
            <div className="achievement-progress">{progress}%</div>
        </div>
    );

    return (
        <div ref={profileRef}> 
            <Header />
            <div className="wrapper">
                <LeftSideBar />
                <div className="content">
                    <div className="dashboard-container">
                        <div className="welcome-section">
                            <div className="welcome-header">
                                <h1>Welcome back!</h1>
                                <p>Nice to see you, {userData.fullName}!</p>
                            </div>
                        </div>

                        <div className="dashboard-content">
                            <div className="left-column">
                                <div className="card car-info-card">
                                    <div className="card-header">
                                        <h2>🚗 Car Information</h2>
                                        <button className="edit-btn" onClick={handleEditProfile}>✏️ Edit</button>
                                    </div>
                                    <div className="card-content">
                                        <p className="greeting">Hello, {userData.fullName}! Your Tesla Model 3 is ready.</p>

                                        <div className="stats-grid">
                                            <div className="stat-item" onClick={() => handleMetricClick("Current Load")}>
                                                <div className="stat-value">{currentLoad}%</div>
                                                <div className="stat-label">Current Load</div>
                                                <div className="stat-trend">⬆️ +5%</div>
                                            </div>
                                            <div className="stat-item" onClick={() => handleMetricClick("Charge Time")}>
                                                <div className="stat-value">58 min</div>
                                                <div className="stat-label">Time to full charge</div>
                                                <div className="stat-trend">⚡ Fast Charging</div>
                                            </div>
                                        </div>

                                        <div className="additional-stats">
                                            <div className="additional-stat">
                                                <span className="stat-title">🔋 Battery Health</span>
                                                <span className="stat-number">{batteryHealth}%</span>
                                            </div>
                                            <div className="additional-stat">
                                                <span className="stat-title">⚡ Consumption</span>
                                                <span className="stat-number">{consumption}W/km</span>
                                            </div>
                                            <div className="additional-stat">
                                                <span className="stat-title">📈 Efficiency</span>
                                                <span className="stat-number positive">+{efficiency}%</span>
                                            </div>
                                            <div className="additional-stat">
                                                <span className="stat-title">📊 This Week</span>
                                                <span className="stat-number">{formatDistance(weeklyDistance)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="circular-progress-section">
                                    <div className="circular-header">
                                        <h3>📊 Performance Metrics</h3>
                                        <span className="metric-info">Click on any metric for details</span>
                                    </div>

                                    <div className="circular-progress-grid">
                                        <CircularProgress
                                            percentage={progress1}
                                            label="Overall Performance"
                                            color="rgba(76, 175, 80, 1)"
                                        />
                                        <CircularProgress
                                            percentage={progress2}
                                            label="Energy Efficiency"
                                            color="rgba(33, 150, 243, 1)"
                                        />
                                        <CircularProgress
                                            percentage={progress3}
                                            label="Charging Speed"
                                            color="rgba(255, 152, 0, 1)"
                                        />
                                        <CircularProgress
                                            percentage={progress4}
                                            label="Battery Life"
                                            color="rgba(156, 39, 176, 1)"
                                        />
                                    </div>
                                </div>

                                <div className="achievements-section">
                                    <div className="achievements-header">
                                        <h3>🏅 Achievements</h3>
                                        <button className="view-all-achievements">View All</button>
                                    </div>
                                    <div className="achievements-list">
                                        {achievements.map((achievement, index) => (
                                            <AchievementBar key={index} {...achievement} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="right-column">
                                <div className="card profile-card">
                                    <div className="card-header">
                                        <h2>👤 Profile Information</h2>
                                        <button className="edit-btn" onClick={handleEditProfile}>Edit Profile</button>
                                    </div>
                                    <div className="card-content">
                                        <div className="profile-avatar">
                                            <div className="avatar-placeholder">
                                                {userData.fullName.charAt(0)}
                                            </div>
                                            <div className="online-status"></div>
                                        </div>
                                        <p className="profile-bio">{userData.bio}</p>

                                        <div className="profile-details">
                                            <div className="detail-item">
                                                <span className="detail-label">📛 Full Name:</span>
                                                <span className="detail-value">{userData.fullName}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">📱 Mobile:</span>
                                                <span className="detail-value">{userData.mobile}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">✉️ Email:</span>
                                                <span className="detail-value">{userData.email}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">📍 Location:</span>
                                                <span className="detail-value">{userData.location}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">🎂 Member Since:</span>
                                                <span className="detail-value">January 2024</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">💬 Social:</span>
                                                <span className="detail-value social-icons">
                                                    <i className="fab fa-twitter"></i>
                                                    <i className="fab fa-linkedin"></i>
                                                    <i className="fab fa-github"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card activity-card">
                                    <div className="card-header">
                                        <h2>🕒 Recent Activity</h2>
                                        <button className="view-all-btn">View All</button>
                                    </div>
                                    <div className="card-content">
                                        {recentActivities.map((activity) => (
                                            <div key={activity.id} className="activity-item">
                                                <div className="activity-icon">{activity.icon}</div>
                                                <div className="activity-details">
                                                    <div className="activity-action">{activity.action}</div>
                                                    <div className="activity-time">{activity.time}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="card quick-stats-card">
                                    <div className="card-header">
                                        <h2>📈 Quick Stats</h2>
                                    </div>
                                    <div className="card-content">
                                        <div className="quick-stat">
                                            <div className="quick-stat-icon">👁️</div>
                                            <div className="quick-stat-info">
                                                <div className="quick-stat-value">1,234</div>
                                                <div className="quick-stat-label">Profile Views</div>
                                            </div>
                                        </div>
                                        <div className="quick-stat">
                                            <div className="quick-stat-icon">❤️</div>
                                            <div className="quick-stat-info">
                                                <div className="quick-stat-value">567</div>
                                                <div className="quick-stat-label">Likes Received</div>
                                            </div>
                                        </div>
                                        <div className="quick-stat">
                                            <div className="quick-stat-icon">💬</div>
                                            <div className="quick-stat-info">
                                                <div className="quick-stat-value">89</div>
                                                <div className="quick-stat-label">Comments</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Profile</h2>
                            <button className="close-modal" onClick={() => setShowEditModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSaveProfile}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input 
                                        type="text" 
                                        value={userData.fullName}
                                        onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input 
                                        type="text" 
                                        value={userData.mobile}
                                        onChange={(e) => setUserData({...userData, mobile: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        value={userData.email}
                                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input 
                                        type="text" 
                                        value={userData.location}
                                        onChange={(e) => setUserData({...userData, location: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Bio</label>
                                    <textarea 
                                        rows="4"
                                        value={userData.bio}
                                        onChange={(e) => setUserData({...userData, bio: e.target.value})}
                                    ></textarea>
                                </div>
                                <button type="submit" className="save-btn">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {selectedMetric && (
                <div className="metric-toast">
                    Viewing details for: {selectedMetric}
                </div>
            )}
        </div>
    )
}

export default ProfileScreen;