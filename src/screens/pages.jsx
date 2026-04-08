import React, { useState } from "react";
import Header from "../component/header";
import LeftSideBar from "../component/left-sidebar";
import "../css/pages.css";

const PageScreen = () => {
    const [activePage, setActivePage] = useState("home");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showTemplateModal, setShowTemplateModal] = useState(false);

    const templates = [
        { id: 1, name: "Landing Page", category: "Marketing", icon: "🏠", downloads: 1234, rating: 4.8, color: "#667eea" },
        { id: 2, name: "Dashboard", category: "Admin", icon: "📊", downloads: 892, rating: 4.9, color: "#48bb78" },
        { id: 3, name: "E-commerce", category: "Shop", icon: "🛒", downloads: 2341, rating: 4.7, color: "#f59e0b" },
        { id: 4, name: "Portfolio", category: "Creative", icon: "🎨", downloads: 1567, rating: 4.8, color: "#ed64a6" },
        { id: 5, name: "Blog", category: "Content", icon: "📝", downloads: 987, rating: 4.6, color: "#4299e1" },
        { id: 6, name: "Social Media", category: "Community", icon: "💬", downloads: 2134, rating: 4.9, color: "#9f7aea" },
        { id: 7, name: "CRM", category: "Business", icon: "👥", downloads: 765, rating: 4.5, color: "#f687b3" },
        { id: 8, name: "Analytics", category: "Data", icon: "📈", downloads: 1456, rating: 4.8, color: "#fc8181" }
    ];

    const recentPages = [
        { id: 1, name: "My Dashboard", lastEdited: "2 hours ago", status: "Published", thumbnail: "📊" },
        { id: 2, name: "User Profile", lastEdited: "1 day ago", status: "Draft", thumbnail: "👤" },
        { id: 3, name: "Analytics Report", lastEdited: "3 days ago", status: "Published", thumbnail: "📈" },
        { id: 4, name: "Landing Page", lastEdited: "1 week ago", status: "Archived", thumbnail: "🏠" }
    ];

    const categories = [
        { name: "All", count: 24, icon: "📁" },
        { name: "Marketing", count: 8, icon: "📢" },
        { name: "Admin", count: 6, icon: "⚙️" },
        { name: "E-commerce", count: 5, icon: "🛍️" },
        { name: "Creative", count: 5, icon: "🎨" }
    ];

    const filteredTemplates = templates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreatePage = () => {
        alert("Creating new page...");
    };

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
        setShowTemplateModal(true);
    };

    const handleUseTemplate = () => {
        alert(`Using template: ${selectedTemplate.name}`);
        setShowTemplateModal(false);
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            Published: { class: "status-published", icon: "✅" },
            Draft: { class: "status-draft", icon: "✏️" },
            Archived: { class: "status-archived", icon: "📦" }
        };
        const config = statusConfig[status];
        return <span className={`page-status ${config.className}`}>{config.icon} {status}</span>;
    };

    return (
        <div>
            <Header />
            <div className="wrapper">
                <LeftSideBar />
                <div className="content">
                    <div className="pages-container">
                        <div className="pages-header">
                            <div className="header-left">
                                <h1>📄 Pages</h1>
                                <p>Create, manage, and customize your pages</p>
                            </div>
                            <button className="create-page-btn" onClick={handleCreatePage}>
                                + Create New Page
                            </button>
                        </div>

                        <div className="pages-stats">
                            <div className="stat-card">
                                <div className="stat-icon">📄</div>
                                <div className="stat-info">
                                    <h3>Total Pages</h3>
                                    <p>24</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">✅</div>
                                <div className="stat-info">
                                    <h3>Published</h3>
                                    <p>18</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">✏️</div>
                                <div className="stat-info">
                                    <h3>In Draft</h3>
                                    <p>4</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">👁️</div>
                                <div className="stat-info">
                                    <h3>Total Views</h3>
                                    <p>12.5K</p>
                                </div>
                            </div>
                        </div>

                        <div className="pages-content">
                            <div className="pages-sidebar">
                                <div className="search-box">
                                    <input 
                                        type="text" 
                                        placeholder="Search templates..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"/>
                                    <span className="search-icon">🔍</span>
                                </div>

                                <div className="categories">
                                    <h3>Categories</h3>
                                    {categories.map((category, index) => (
                                        <button 
                                            key={index} 
                                            className={`category-btn ${activePage === category.name.toLowerCase() ? 'active' : ''}`}
                                            onClick={() => setActivePage(category.name.toLowerCase())}>
                                            <span className="category-icon">{category.icon}</span>
                                            <span className="category-name">{category.name}</span>
                                            <span className="category-count">{category.count}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="quick-actions">
                                    <h3>Quick Actions</h3>
                                    <button className="quick-action-btn">
                                        <span>📋</span> Duplicate Page
                                    </button>
                                    <button className="quick-action-btn">
                                        <span>🔄</span> Import Template
                                    </button>
                                    <button className="quick-action-btn">
                                        <span>📤</span> Export Page
                                    </button>
                                    <button className="quick-action-btn">
                                        <span>🗑️</span> Trash
                                    </button>
                                </div>
                            </div>

                            <div className="pages-main">
                                <div className="recent-pages">
                                    <div className="section-header">
                                        <h2>🕒 Recent Pages</h2>
                                        <button className="view-all-link">View All →</button>
                                    </div>
                                    <div className="recent-pages-grid">
                                        {recentPages.map(page => (
                                            <div key={page.id} className="recent-page-card">
                                                <div className="page-thumbnail">{page.thumbnail}</div>
                                                <div className="page-info">
                                                    <h4>{page.name}</h4>
                                                    <p>Last edited: {page.lastEdited}</p>
                                                    {getStatusBadge(page.status)}
                                                </div>
                                                <div className="page-actions">
                                                    <button className="icon-btn">✏️</button>
                                                    <button className="icon-btn">👁️</button>
                                                    <button className="icon-btn">⋯</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="templates-section">
                                    <div className="section-header">
                                        <h2>🎨 Popular Templates</h2>
                                        <button className="view-all-link">Browse All →</button>
                                    </div>
                                    <div className="templates-grid">
                                        {filteredTemplates.map(template => (
                                            <div 
                                                key={template.id} 
                                                className="template-card"
                                                onClick={() => handleTemplateClick(template)}>
                                                <div className="template-icon" style={{ backgroundColor: template.color }}>
                                                    {template.icon}
                                                </div>
                                                <div className="template-info">
                                                    <h4>{template.name}</h4>
                                                    <p className="template-category">{template.category}</p>
                                                    <div className="template-stats">
                                                        <span>⬇️ {template.downloads}</span>
                                                        <span>⭐ {template.rating}</span>
                                                    </div>
                                                </div>
                                                <button className="use-template-btn">Use</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="featured-section">
                                    <div className="featured-card">
                                        <div className="featured-content">
                                            <span className="featured-badge">🔥 Featured</span>
                                            <h2>Premium Dashboard Template</h2>
                                            <p>Professional dashboard with 50+ components, dark/light mode, and fully responsive design.</p>
                                            <div className="featured-meta">
                                                <span>⭐ 4.9 (1.2k reviews)</span>
                                                <span>📥 5.6k downloads</span>
                                            </div>
                                            <button className="preview-btn">Preview Template →</button>
                                        </div>
                                        <div className="featured-image">
                                            <span>📊</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="tips-section">
                                    <div className="tips-header">
                                        <h3>💡 Pro Tips</h3>
                                        <button className="tips-close">×</button>
                                    </div>
                                    <div className="tips-list">
                                        <div className="tip-item">
                                            <span className="tip-icon">✨</span>
                                            <span>Use responsive layouts for better mobile experience</span>
                                        </div>
                                        <div className="tip-item">
                                            <span className="tip-icon">🎨</span>
                                            <span>Customize colors to match your brand identity</span>
                                        </div>
                                        <div className="tip-item">
                                            <span className="tip-icon">⚡</span>
                                            <span>Optimize images for faster loading times</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showTemplateModal && selectedTemplate && (
                <div className="template-modal-overlay" onClick={() => setShowTemplateModal(false)}>
                    <div className="template-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-icon" style={{ backgroundColor: selectedTemplate.color }}>
                                {selectedTemplate.icon}
                            </div>
                            <h2>{selectedTemplate.name}</h2>
                            <button className="modal-close" onClick={() => setShowTemplateModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="template-details">
                                <div className="detail-row">
                                    <span className="detail-label">Category:</span>
                                    <span className="detail-value">{selectedTemplate.category}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Downloads:</span>
                                    <span className="detail-value">{selectedTemplate.downloads.toLocaleString()}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Rating:</span>
                                    <span className="detail-value">⭐ {selectedTemplate.rating} / 5.0</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Description:</span>
                                    <span className="detail-value">A beautiful {selectedTemplate.name.toLowerCase()} template perfect for your next project. Fully responsive and customizable.</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-modal-btn" onClick={() => setShowTemplateModal(false)}>Cancel</button>
                            <button className="use-modal-btn" onClick={handleUseTemplate}>Use Template</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageScreen;
