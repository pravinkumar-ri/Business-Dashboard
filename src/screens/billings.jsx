import React, { useState } from "react";
import Header from "../component/header";
import LeftSideBar from "../component/left-sidebar";
import "../css/billing.css";

const BillingScreen = () => {
    const [selectedCard, setSelectedCard] = useState('visa');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    
    const invoices = [
        { id: "INV-001", date: "2024-01-15", amount: "$250.00", status: "Paid", pdf: "Download" },
        { id: "INV-002", date: "2024-01-20", amount: "$125.50", status: "Pending", pdf: "Download" },
        { id: "INV-003", date: "2024-01-25", amount: "$89.99", status: "Paid", pdf: "Download" },
        { id: "INV-004", date: "2024-02-01", amount: "$430.00", status: "Overdue", pdf: "Download" },
        { id: "INV-005", date: "2024-02-05", amount: "$67.50", status: "Pending", pdf: "Download" },
    ];

    const creditCards = [
        { type: "visa", number: "**** **** **** 4532", name: "Aathiya", expiry: "12/26", color: "linear-gradient(135deg, #1e3c72, #2a5298)" },
        { type: "mastercard", number: "**** **** **** 7890", name: "Aathiya", expiry: "08/25", color: "linear-gradient(135deg, #f12711, #f5af19)" },
        { type: "amex", number: "**** **** **** 3456", name: "Aathiya", expiry: "04/27", color: "linear-gradient(135deg, #134e5e, #71b280)" }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            Paid: { class: "status-paid", icon: "✓" },
            Pending: { class: "status-pending", icon: "⏳" },
            Overdue: { class: "status-overdue", icon: "⚠" }
        };
        const config = statusConfig[status];
        return <span className={`status-badge ${config.className}`}>{config.icon} {status}</span>;
    };

    const handleDownload = (invoiceId) => {
        alert(`Downloading invoice ${invoiceId}`);
    };

    const getCardIcon = (type) => {
        switch(type) {
            case 'visa': return '💳';
            case 'mastercard': return '🏦';
            case 'amex': return '💎';
            default: return '💳';
        }
    };

    const totalAmount = invoices.reduce((sum, invoice) => {
        const amount = parseFloat(invoice.amount.replace('$', ''));
        return sum + amount;
    }, 0).toFixed(2);

    const paidAmount = invoices
        .filter(inv => inv.status === 'Paid')
        .reduce((sum, invoice) => sum + parseFloat(invoice.amount.replace('$', '')), 0)
        .toFixed(2);

    const pendingAmount = invoices
        .filter(inv => inv.status === 'Pending')
        .reduce((sum, invoice) => sum + parseFloat(invoice.amount.replace('$', '')), 0)
        .toFixed(2);

    return (
        <div>
            <Header />
            <div className="wrapper">
                <LeftSideBar />
                <div className="content">
                    <div className="billing-dashboard">
                        {/* Stats Overview */}
                        <div className="billing-stats">
                            <div className="stat-card">
                                <div className="stat-icon">💰</div>
                                <div className="stat-info">
                                    <h3>Total Billed</h3>
                                    <p>${totalAmount}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">✅</div>
                                <div className="stat-info">
                                    <h3>Paid Amount</h3>
                                    <p>${paidAmount}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">⏳</div>
                                <div className="stat-info">
                                    <h3>Pending</h3>
                                    <p>${pendingAmount}</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">📄</div>
                                <div className="stat-info">
                                    <h3>Total Invoices</h3>
                                    <p>{invoices.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="billing-top">
                            <div className="credit-card-container">
                                <div className="section-header">
                                    <h2>💳 My Cards</h2>
                                    <button className="add-card-btn" onClick={() => setShowPaymentModal(true)}>
                                        + Add New Card
                                    </button>
                                </div>
                                
                                <div className="credit-cards-wrapper">
                                    {creditCards.map((card, index) => (
                                        <div 
                                            key={index} 
                                            className={`credit-card ${selectedCard === card.type ? 'active' : ''}`}
                                            style={{ background: card.color }}
                                            onClick={() => setSelectedCard(card.type)}
                                        >
                                            <div className="card-chip">💳</div>
                                            <div className="card-number">{card.number}</div>
                                            <div className="card-details">
                                                <div className="card-holder">
                                                    <span>Card Holder</span>
                                                    <strong>{card.name}</strong>
                                                </div>
                                                <div className="card-expiry">
                                                    <span>Expires</span>
                                                    <strong>{card.expiry}</strong>
                                                </div>
                                            </div>
                                            <div className="card-type">{getCardIcon(card.type)} {card.type.toUpperCase()}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="payment-methods">
                                    <h3>Quick Payment Methods</h3>
                                    <div className="methods-grid">
                                        <div className="method-item">
                                            <i className="fab fa-paypal"></i>
                                            <span>PayPal</span>
                                        </div>
                                        <div className="method-item">
                                            <i className="fab fa-google-pay"></i>
                                            <span>Google Pay</span>
                                        </div>
                                        <div className="method-item">
                                            <i className="fab fa-apple-pay"></i>
                                            <span>Apple Pay</span>
                                        </div>
                                        <div className="method-item">
                                            <i className="fas fa-university"></i>
                                            <span>Bank Transfer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="billing-invoices">
                                <div className="section-header">
                                    <h2>📋 Recent Invoices</h2>
                                    <button className="view-all-btn">View All</button>
                                </div>
                                
                                <div className="invoice-table">
                                    <table className="billing-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Invoice ID</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoices.map((invoice, index) => (
                                                <tr key={index} className="invoice-row">
                                                    <td>
                                                        <div className="invoice-date">
                                                            <span className="date-day">{new Date(invoice.date).getDate()}</span>
                                                            <span className="date-month">{new Date(invoice.date).toLocaleString('default', { month: 'short' })}</span>
                                                        </div>
                                                    </td>
                                                    <td><span className="invoice-id">#{invoice.id}</span></td>
                                                    <td className="billing-price">{invoice.amount}</td>
                                                    <td>{getStatusBadge(invoice.status)}</td>
                                                    <td className="billing-pdf">
                                                        <button 
                                                            className="pdf-button"
                                                            onClick={() => handleDownload(invoice.id)}
                                                        >
                                                            📄 {invoice.pdf}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="payment-summary">
                                    <div className="summary-item">
                                        <span>Subtotal</span>
                                        <strong>${totalAmount}</strong>
                                    </div>
                                    <div className="summary-item">
                                        <span>Tax (10%)</span>
                                        <strong>${(totalAmount * 0.1).toFixed(2)}</strong>
                                    </div>
                                    <div className="summary-item total">
                                        <span>Total Due</span>
                                        <strong>${(totalAmount * 1.1).toFixed(2)}</strong>
                                    </div>
                                    <button className="pay-now-btn">Pay Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPaymentModal && (
                <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Payment Method</h2>
                            <button className="close-modal" onClick={() => setShowPaymentModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <form className="payment-form">
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <input type="text" placeholder="MM/YY" />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input type="text" placeholder="123" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Card Holder Name</label>
                                    <input type="text" placeholder="John Doe" />
                                </div>
                                <button type="submit" className="submit-btn">Add Card</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingScreen;