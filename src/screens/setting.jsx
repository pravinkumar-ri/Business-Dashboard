import React, { useState } from "react";
import Header from "../component/header";
import LeftSideBar from "../component/left-sidebar";
import "../css/setting.css";

const SettingScreen = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        pushNotifications: true,
        smsAlerts: false,
        weeklyReport: true,
        marketingEmails: false
    });
    
    const [appearance, setAppearance] = useState({
        theme: "dark",
        fontSize: "medium",
        compactView: false
    });
    
    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        loginAlerts: true,
        deviceManagement: true
    });
    
    const [language, setLanguage] = useState("english");
    
    const [backupSettings, setBackupSettings] = useState({
        autoBackup: true,
        backupFrequency: "weekly",
        cloudSync: true
    });

    const handleNotificationChange = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleAppearanceChange = (key, value) => {
        setAppearance(prev => ({ ...prev, [key]: value }));
    };

    const handleSecurityChange = (key) => {
        setSecurity(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleBackupChange = (key) => {
        if (key === 'autoBackup') {
            setBackupSettings(prev => ({ ...prev, [key]: !prev[key] }));
        }
    };

    const tabs = [
        { id: "profile", name: "Profile Settings", icon: "👤" },
        { id: "notifications", name: "Notifications", icon: "🔔" },
        { id: "appearance", name: "Appearance", icon: "🎨" },
        { id: "security", name: "Security", icon: "🔒" },
        { id: "backup", name: "Backup & Sync", icon: "☁️" },
        { id: "integrations", name: "Integrations", icon: "🔌" }
    ];

    return (
        <div>
            <Header />
            <div className="wrapper">
                <LeftSideBar />
                <div className="content">
                    <div className="settings-container">
                        <div className="settings-header">
                            <h1>⚙️ Settings</h1>
                            <p>Manage your account preferences and configurations</p>
                        </div>

                        <div className="settings-grid">
                            <div className="settings-sidebar">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <span className="tab-icon">{tab.icon}</span>
                                        <span className="tab-name">{tab.name}</span>
                                        {activeTab === tab.id && <span className="active-indicator"></span>}
                                    </button>
                                ))}
                            </div>

                            <div className="settings-main">
                                {activeTab === "profile" && (
                                    <div className="settings-section">
                                        <div className="section-header">
                                            <h2>👤 Profile Settings</h2>
                                            <p>Update your personal information</p>
                                        </div>
                                        
                                        <div className="profile-avatar-section">
                                            <div className="avatar-container">
                                                <div className="profile-avatar-large">
                                                    <span>A</span>
                                                </div>
                                                <button className="change-avatar-btn">
                                                    <i className="fas fa-camera"></i> Change Avatar
                                                </button>
                                            </div>
                                        </div>

                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input type="text" defaultValue="Aathiya" className="setting-input" />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input type="email" defaultValue="aathi07@simple.com" className="setting-input" />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input type="tel" defaultValue="+91 99436 14667" className="setting-input" />
                                            </div>
                                            <div className="form-group">
                                                <label>Location</label>
                                                <input type="text" defaultValue="United States" className="setting-input" />
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Bio</label>
                                                <textarea rows="3" defaultValue="Decisions: If you can't decide, the answer is no..." className="setting-textarea"></textarea>
                                            </div>
                                        </div>
                                        
                                        <div className="form-actions">
                                            <button className="cancel-btn">Cancel</button>
                                            <button className="save-btn">Save Changes</button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "notifications" && (
                                    <div className="settings-section">
                                        <div className="section-header">
                                            <h2>🔔 Notification Preferences</h2>
                                            <p>Choose what notifications you want to receive</p>
                                        </div>
                                        
                                        <div className="notifications-list">
                                            <div className="notification-item">
                                                <div className="notification-info">
                                                    <div className="notification-icon">📧</div>
                                                    <div className="notification-details">
                                                        <h4>Email Alerts</h4>
                                                        <p>Receive important updates via email</p>
                                                    </div>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={notifications.emailAlerts}
                                                        onChange={() => handleNotificationChange('emailAlerts')}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            
                                            <div className="notification-item">
                                                <div className="notification-info">
                                                    <div className="notification-icon">📱</div>
                                                    <div className="notification-details">
                                                        <h4>Push Notifications</h4>
                                                        <p>Get real-time updates on your device</p>
                                                    </div>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={notifications.pushNotifications}
                                                        onChange={() => handleNotificationChange('pushNotifications')}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            
                                            <div className="notification-item">
                                                <div className="notification-info">
                                                    <div className="notification-icon">💬</div>
                                                    <div className="notification-details">
                                                        <h4>SMS Alerts</h4>
                                                        <p>Get text messages for critical updates</p>
                                                    </div>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={notifications.smsAlerts}
                                                        onChange={() => handleNotificationChange('smsAlerts')}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            
                                            <div className="notification-item">
                                                <div className="notification-info">
                                                    <div className="notification-icon">📊</div>
                                                    <div className="notification-details">
                                                        <h4>Weekly Report</h4>
                                                        <p>Receive weekly performance summary</p>
                                                    </div>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={notifications.weeklyReport}
                                                        onChange={() => handleNotificationChange('weeklyReport')}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "appearance" && (
                                    <div className="settings-section">
                                        <div className="section-header">
                                            <h2>🎨 Appearance</h2>
                                            <p>Customize how the dashboard looks</p>
                                        </div>
                                        
                                        <div className="appearance-options">
                                            <div className="option-group">
                                                <label>Theme</label>
                                                <div className="theme-options">
                                                    <button 
                                                        className={`theme-btn ${appearance.theme === 'light' ? 'active' : ''}`}
                                                        onClick={() => handleAppearanceChange('theme', 'light')}
                                                    >
                                                        <span>☀️</span> Light
                                                    </button>
                                                    <button 
                                                        className={`theme-btn ${appearance.theme === 'dark' ? 'active' : ''}`}
                                                        onClick={() => handleAppearanceChange('theme', 'dark')}
                                                    >
                                                        <span>🌙</span> Dark
                                                    </button>
                                                    <button 
                                                        className={`theme-btn ${appearance.theme === 'auto' ? 'active' : ''}`}
                                                        onClick={() => handleAppearanceChange('theme', 'auto')}
                                                    >
                                                        <span>🔄</span> Auto
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="option-group">
                                                <label>Font Size</label>
                                                <div className="font-size-options">
                                                    <button 
                                                        className={`font-btn ${appearance.fontSize === 'small' ? 'active' : ''}`}
                                                        onClick={() => handleAppearanceChange('fontSize', 'small')}
                                                    >
                                                        Small
                                                    </button>
                                                    <button 
                                                        className={`font-btn ${appearance.fontSize === 'medium' ? 'active' : ''}`}
                                                        onClick={() => handleAppearanceChange('fontSize', 'medium')}
                                                    >
                                                        Medium
                                                    </button>
                                                    <button 
                                                        className={`font-btn ${appearance.fontSize === 'large' ? 'active' : ''}`}
                                                        onClick={() => handleAppearanceChange('fontSize', 'large')}
                                                    >
                                                        Large
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="option-group">
                                                <label>Language</label>
                                                <select 
                                                    className="language-select"
                                                    value={language}
                                                    onChange={(e) => setLanguage(e.target.value)}
                                                >
                                                    <option value="english">English (US)</option>
                                                    <option value="spanish">Español</option>
                                                    <option value="french">Français</option>
                                                    <option value="german">Deutsch</option>
                                                    <option value="japanese">日本語</option>
                                                </select>
                                            </div>
                                            
                                            <div className="option-group">
                                                <label className="checkbox-label">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={appearance.compactView}
                                                        onChange={() => handleAppearanceChange('compactView', !appearance.compactView)}
                                                    />
                                                    <span>Compact View</span>
                                                    <small>Reduce spacing for more content</small>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "security" && (
                                    <div className="settings-section">
                                        <div className="section-header">
                                            <h2>🔒 Security Settings</h2>
                                            <p>Protect your account</p>
                                        </div>
                                        
                                        <div className="security-options">
                                            <div className="security-item">
                                                <div className="security-info">
                                                    <h4>Two-Factor Authentication</h4>
                                                    <p>Add an extra layer of security to your account</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={security.twoFactorAuth}
                                                        onChange={() => handleSecurityChange('twoFactorAuth')}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            
                                            <div className="security-item">
                                                <div className="security-info">
                                                    <h4>Login Alerts</h4>
                                                    <p>Get notified when someone logs into your account</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={security.loginAlerts}
                                                        onChange={() => handleSecurityChange('loginAlerts')}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            
                                            <div className="security-item">
                                                <div className="security-info">
                                                    <h4>Device Management</h4>
                                                    <p>Manage devices connected to your account</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={security.deviceManagement}
                                                        onChange={() => handleSecurityChange('deviceManagement')}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className="password-section">
                                            <h4>Change Password</h4>
                                            <div className="form-group">
                                                <input type="password" placeholder="Current Password" className="setting-input" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" placeholder="New Password" className="setting-input" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" placeholder="Confirm New Password" className="setting-input" />
                                            </div>
                                            <button className="update-password-btn">Update Password</button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "backup" && (
                                    <div className="settings-section">
                                        <div className="section-header">
                                            <h2>☁️ Backup & Sync</h2>
                                            <p>Manage your data backup preferences</p>
                                        </div>
                                        
                                        <div className="backup-options">
                                            <div className="backup-item">
                                                <div className="backup-info">
                                                    <h4>Auto Backup</h4>
                                                    <p>Automatically backup your data</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={backupSettings.autoBackup}
                                                        onChange={() => handleBackupChange('autoBackup')}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                            
                                            {backupSettings.autoBackup && (
                                                <div className="backup-frequency">
                                                    <label>Backup Frequency</label>
                                                    <select 
                                                        className="frequency-select"
                                                        value={backupSettings.backupFrequency}
                                                        onChange={(e) => setBackupSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                                                    >
                                                        <option value="daily">Daily</option>
                                                        <option value="weekly">Weekly</option>
                                                        <option value="monthly">Monthly</option>
                                                    </select>
                                                </div>
                                            )}
                                            
                                            <div className="backup-item">
                                                <div className="backup-info">
                                                    <h4>Cloud Sync</h4>
                                                    <p>Synchronize data across devices</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={backupSettings.cloudSync}
                                                        onChange={() => setBackupSettings(prev => ({ ...prev, cloudSync: !prev.cloudSync }))}
                                                    />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className="backup-actions">
                                            <button className="backup-now-btn">📥 Backup Now</button>
                                            <button className="restore-btn">🔄 Restore from Backup</button>
                                        </div>
                                        
                                        <div className="backup-info-card">
                                            <div className="info-icon">ℹ️</div>
                                            <div className="info-text">
                                                <strong>Last Backup:</strong> Today at 10:30 AM
                                                <br />
                                                <strong>Backup Size:</strong> 245 MB
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "integrations" && (
                                    <div className="settings-section">
                                        <div className="section-header">
                                            <h2>🔌 Integrations</h2>
                                            <p>Connect your favorite apps and services</p>
                                        </div>
                                        
                                        <div className="integrations-grid">
                                            <div className="integration-card">
                                                <div className="integration-icon">📧</div>
                                                <div className="integration-info">
                                                    <h4>Gmail</h4>
                                                    <p>Sync your emails and calendar</p>
                                                </div>
                                                <button className="connect-btn">Connect</button>
                                            </div>
                                            
                                            <div className="integration-card">
                                                <div className="integration-icon">☁️</div>
                                                <div className="integration-info">
                                                    <h4>Google Drive</h4>
                                                    <p>Access and store files</p>
                                                </div>
                                                <button className="connect-btn">Connect</button>
                                            </div>
                                            
                                            <div className="integration-card">
                                                <div className="integration-icon">📊</div>
                                                <div className="integration-info">
                                                    <h4>Slack</h4>
                                                    <p>Get notifications in Slack</p>
                                                </div>
                                                <button className="connect-btn">Connect</button>
                                            </div>
                                            
                                            <div className="integration-card">
                                                <div className="integration-icon">🐙</div>
                                                <div className="integration-info">
                                                    <h4>GitHub</h4>
                                                    <p>Track your repositories</p>
                                                </div>
                                                <button className="connect-btn">Connect</button>
                                            </div>
                                            
                                            <div className="integration-card">
                                                <div className="integration-icon">📅</div>
                                                <div className="integration-info">
                                                    <h4>Calendar</h4>
                                                    <p>Sync your schedule</p>
                                                </div>
                                                <button className="connect-btn">Connect</button>
                                            </div>
                                            
                                            <div className="integration-card">
                                                <div className="integration-icon">💬</div>
                                                <div className="integration-info">
                                                    <h4>Discord</h4>
                                                    <p>Receive alerts on Discord</p>
                                                </div>
                                                <button className="connect-btn">Connect</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingScreen;