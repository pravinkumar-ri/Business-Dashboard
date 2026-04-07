import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "../css/table.css";
import Header from "../component/header";
import LeftSideBar from "../component/left-sidebar";

const TableScreen = () => {
    const [animatedCompletions, setAnimatedCompletions] = useState([0, 0, 0, 0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [sortBy, setSortBy] = useState("project");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const componentRef = useRef(null);

    const projects = useMemo(() => [
        { id: 1, project: 'Spotify', budget: '$2,500', status: 'working', completion: 60, lead: 'Sarah Johnson', team: ['John', 'Mike', 'Lisa'], startDate: '2024-01-15', deadline: '2024-03-15', priority: 'High' },
        { id: 2, project: 'Invision', budget: '$5,000', status: 'done', completion: 100, lead: 'David Chen', team: ['Anna', 'Peter'], startDate: '2023-12-01', deadline: '2024-01-30', priority: 'Medium' },
        { id: 3, project: 'Jira', budget: '$3,400', status: 'canceled', completion: 30, lead: 'Maria Garcia', team: ['Carlos', 'Elena'], startDate: '2024-01-10', deadline: '2024-02-28', priority: 'Low' },
        { id: 4, project: 'Slack', budget: '$1,000', status: 'canceled', completion: 0, lead: 'James Wilson', team: ['Tom'], startDate: '2024-02-01', deadline: '2024-03-01', priority: 'Low' },
        { id: 5, project: 'Webdev', budget: '$14,000', status: 'working', completion: 80, lead: 'Emily Brown', team: ['Chris', 'Jessica', 'Ryan'], startDate: '2023-11-15', deadline: '2024-04-30', priority: 'High' },
        { id: 6, project: 'Adobe XD', budget: '$2,300', status: 'done', completion: 100, lead: 'Robert Taylor', team: ['Amanda'], startDate: '2024-01-05', deadline: '2024-02-15', priority: 'Medium' }
    ], []);

    const authors = useMemo(() => [
        { id: 1, name: "Esthera Jackson", email: "esthera@simmmple.com", function: "Manager", department: "Organization", status: "Online", employed: "23/04/18", action: "Edit", avatar: "EJ", projects: 12, rating: 4.8 },
        { id: 2, name: "Alexa Liras", email: "alexa@simmmple.com", function: "Programator", department: "Developer", status: "Offline", employed: "11/01/19", action: "Edit", avatar: "AL", projects: 8, rating: 4.6 },
        { id: 3, name: "Laurent Michael", email: "laurent@simmmple.com", function: "Executive", department: "Projects", status: "Online", employed: "19/09/17", action: "Edit", avatar: "LM", projects: 15, rating: 4.9 },
        { id: 4, name: "Freduardo Hill", email: "freduardo@simmmple.com", function: "Programator", department: "Developer", status: "Online", employed: "24/12/08", action: "Edit", avatar: "FH", projects: 10, rating: 4.7 },
        { id: 5, name: "Daniel Thomas", email: "daniel@simmmple.com", function: "Manager", department: "Executive", status: "Offline", employed: "04/10/21", action: "Edit", avatar: "DT", projects: 6, rating: 4.5 },
        { id: 6, name: "Mark Wilson", email: "mark@simmmple.com", function: "Programtor", department: "Developer", status: "Offline", employed: "14/09/20", action: "Edit", avatar: "MW", projects: 9, rating: 4.6 }
    ], []);

    // Filter projects based on search and status
    const filteredProjects = useMemo(() => {
        let filtered = projects;
        
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.lead.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (selectedStatus !== "all") {
            filtered = filtered.filter(project => project.status === selectedStatus);
        }
        
        // Sort projects
        filtered.sort((a, b) => {
            let aVal, bVal;
            switch(sortBy) {
                case 'project':
                    aVal = a.project;
                    bVal = b.project;
                    break;
                case 'budget':
                    aVal = parseFloat(a.budget.replace('$', '').replace(',', ''));
                    bVal = parseFloat(b.budget.replace('$', '').replace(',', ''));
                    break;
                case 'completion':
                    aVal = a.completion;
                    bVal = b.completion;
                    break;
                default:
                    aVal = a.project;
                    bVal = b.project;
            }
            
            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
        
        return filtered;
    }, [projects, searchTerm, selectedStatus, sortBy, sortOrder]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    const animateValue = useCallback((index, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + easeOutQuart * (end - start));
            
            setAnimatedCompletions(prev => {
                const newValues = [...prev];
                newValues[index] = currentValue;
                return newValues;
            });

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, []);

    const animateProgressBars = useCallback(() => {
        projects.forEach((project, index) => {
            animateValue(index, 0, project.completion, 2000);
        });
    }, [animateValue, projects]);

    useEffect(() => {
        const currentRef = componentRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateProgressBars();
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
    }, [hasAnimated, animateProgressBars]);

    const getProjectStatusBadge = useCallback((status) => {
        const statusConfig = {
            working: { className: 'status-working', label: 'Working', icon: '⚙️' },
            done: { className: 'status-done', label: 'Done', icon: '✅' },
            canceled: { className: 'status-canceled', label: 'Canceled', icon: '❌' }
        };
        const config = statusConfig[status];
        return <span className={`status-badge ${config.className}`}>{config.icon} {config.label}</span>;
    }, []);

    const getAuthorStatusBadge = useCallback((status) => {
        const isOnline = status === "Online";
        return (
            <span className={`status-badge ${isOnline ? 'status-online' : 'status-offline'}`}>
                <span className="status-dot"></span>
                {status}
            </span>
        );
    }, []);

    const getPriorityBadge = useCallback((priority) => {
        const priorityConfig = {
            High: { class: 'priority-high', icon: '🔴' },
            Medium: { class: 'priority-medium', icon: '🟡' },
            Low: { class: 'priority-low', icon: '🟢' }
        };
        const config = priorityConfig[priority];
        return <span className={`priority-badge ${config.className}`}>{config.icon} {priority}</span>;
    }, []);

    const getCompletionBar = useCallback((completion, index) => {
        const colors = ['#3b82f6', '#10b981', '#ef4444', '#6b7280', '#f59e0b', '#8b5cf6'];
        return (
            <div className="completion-container">
                <div className="completion-bar">
                    <div
                        className="completion-fill"
                        style={{ width: `${animatedCompletions[index]}%`, backgroundColor: colors[index] }}
                    ></div>
                </div>
                <span className="completion-text">{animatedCompletions[index]}%</span>
            </div>
        );
    }, [animatedCompletions]);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setShowDetailsModal(true);
    };

    const getSortIcon = (column) => {
        if (sortBy !== column) return '↕️';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    const StatCard = ({ icon, label, value, color }) => (
        <div className="stat-card-mini" style={{ borderLeftColor: color }}>
            <div className="stat-icon-mini">{icon}</div>
            <div className="stat-info-mini">
                <div className="stat-label-mini">{label}</div>
                <div className="stat-value-mini">{value}</div>
            </div>
        </div>
    );

    return (
        <div ref={componentRef}>
            <Header />
            <div className="wrapper">
                <LeftSideBar />
                <div className="content">
                    {/* Statistics Overview */}
                    <div className="table-stats">
                        <StatCard icon="📊" label="Total Projects" value={projects.length} color="#667eea" />
                        <StatCard icon="✅" label="Completed" value={projects.filter(p => p.status === 'done').length} color="#48bb78" />
                        <StatCard icon="⚙️" label="In Progress" value={projects.filter(p => p.status === 'working').length} color="#f59e0b" />
                        <StatCard icon="👥" label="Team Members" value={authors.length} color="#9f7aea" />
                    </div>

                    {/* Projects Table Section */}
                    <div className="projects-table-container">
                        <div className="table-header-actions">
                            <h2 className="table-title">📊 Projects Overview</h2>
                            <div className="table-controls">
                                <div className="search-wrapper">
                                    <input 
                                        type="text" 
                                        placeholder="Search projects..." 
                                        className="table-search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <span className="search-icon">🔍</span>
                                </div>
                                <select 
                                    className="status-filter"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="working">Working</option>
                                    <option value="done">Done</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                        </div>

                        <div className="table-wrapper">
                            <table className="projects-table">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('project')} className="sortable">
                                            PROJECT {getSortIcon('project')}
                                        </th>
                                        <th onClick={() => handleSort('budget')} className="sortable">
                                            BUDGET {getSortIcon('budget')}
                                        </th>
                                        <th>STATUS</th>
                                        <th>PRIORITY</th>
                                        <th onClick={() => handleSort('completion')} className="sortable">
                                            COMPLETION {getSortIcon('completion')}
                                        </th>
                                        <th>LEAD</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProjects.map((project, index) => (
                                        <tr key={project.id} className="project-row" onClick={() => handleProjectClick(project)}>
                                            <td className="project-name">
                                                <div className="project-cell">
                                                    <span className="project-icon">📁</span>
                                                    {project.project}
                                                </div>
                                            </td>
                                            <td className="project-budget">{project.budget}</td>
                                            <td>{getProjectStatusBadge(project.status)}</td>
                                            <td>{getPriorityBadge(project.priority)}</td>
                                            <td>{getCompletionBar(project.completion, projects.findIndex(p => p.id === project.id))}</td>
                                            <td className="project-lead">{project.lead}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="action-icon-btn" title="Edit">✏️</button>
                                                    <button className="action-icon-btn" title="View">👁️</button>
                                                    <button className="action-icon-btn" title="Share">📤</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button 
                                    className="page-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    ← Previous
                                </button>
                                <div className="page-numbers">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            className={`page-number ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    className="page-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Authors Table Section */}
                    <div className="authors-table-container">
                        <div className="table-header-actions">
                            <h2 className="table-title">👥 Team Members</h2>
                            <button className="add-member-btn">+ Add Member</button>
                        </div>
                        <div className="table-wrapper">
                            <table className="authors-table">
                                <thead>
                                    <tr>
                                        <th>AUTHOR</th>
                                        <th>FUNCTION</th>
                                        <th>STATUS</th>
                                        <th>PROJECTS</th>
                                        <th>RATING</th>
                                        <th>EMPLOYED</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authors.map((author) => (
                                        <tr key={author.id} className="author-row">
                                            <td className="author-info">
                                                <div className="author-avatar">{author.avatar}</div>
                                                <div>
                                                    <div className="author-name">{author.name}</div>
                                                    <div className="author-email">{author.email}</div>
                                                </div>
                                            </td>
                                            <td className="function-info">
                                                <div className="function-title">{author.function}</div>
                                                <div className="function-department">{author.department}</div>
                                            </td>
                                            <td>{getAuthorStatusBadge(author.status)}</td>
                                            <td className="projects-count">{author.projects}</td>
                                            <td className="rating">
                                                <span className="stars">⭐</span> {author.rating}
                                            </td>
                                            <td className="employed-date">{author.employed}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="action-icon-btn" title="Edit">✏️</button>
                                                    <button className="action-icon-btn" title="Message">💬</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="recent-activity">
                        <h3>🔄 Recent Activity</h3>
                        <div className="activity-timeline">
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <span className="timeline-title">Project "Webdev" updated</span>
                                    <span className="timeline-time">2 minutes ago</span>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <span className="timeline-title">New member joined</span>
                                    <span className="timeline-time">1 hour ago</span>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <span className="timeline-title">Project "Spotify" completed</span>
                                    <span className="timeline-time">3 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Details Modal */}
            {showDetailsModal && selectedProject && (
                <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
                    <div className="modal-content project-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedProject.project} Details</h2>
                            <button className="close-modal" onClick={() => setShowDetailsModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="project-details-grid">
                                <div className="detail-group">
                                    <label>Project Lead</label>
                                    <p>{selectedProject.lead}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Budget</label>
                                    <p>{selectedProject.budget}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Start Date</label>
                                    <p>{selectedProject.startDate}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Deadline</label>
                                    <p>{selectedProject.deadline}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Priority</label>
                                    <p>{getPriorityBadge(selectedProject.priority)}</p>
                                </div>
                                <div className="detail-group">
                                    <label>Status</label>
                                    <p>{getProjectStatusBadge(selectedProject.status)}</p>
                                </div>
                                <div className="detail-group full-width">
                                    <label>Team Members</label>
                                    <div className="team-members">
                                        {selectedProject.team.map((member, i) => (
                                            <span key={i} className="team-member-tag">{member}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-modal-btn" onClick={() => setShowDetailsModal(false)}>Close</button>
                            <button className="use-modal-btn">Edit Project</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableScreen;