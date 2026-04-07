import React, { useState, useEffect, useRef } from "react";
import "../css/dashboardStats.css";

const DashboardStats = () => {
    const [income, setIncome] = useState(0);
    const [item1, setItem1] = useState(0);
    const [item2, setItem2] = useState(0);
    const [item3, setItem3] = useState(0);
    const [item5, setItem5] = useState(0);
    const [total, setTotal] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const dashboardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    startAnimations();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.3 }
        );

        if (dashboardRef.current) {
            observer.observe(dashboardRef.current);
        }

        return () => {
            if (dashboardRef.current) {
                observer.unobserve(dashboardRef.current);
            }
        };
    }, [hasAnimated]);

    const startAnimations = () => {
        animateValue(setIncome, 0, 7500, 2000);
        
        animateValue(setItem1, 0, 50, 1500);
        animateValue(setItem2, 0, 10, 1500);
        animateValue(setItem3, 0, 5, 1500);
        animateValue(setItem5, 0, 7, 1500);
        
        const totalItems = 50 + 10 + 5 + 7;
        animateValue(setTotal, 0, totalItems, 2000);
    };

    const animateValue = (setter, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOutQuart * (end - start) + start);
            
            setter(value);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const formatCurrency = (value) => {
        return `$ ${value.toLocaleString()}`;
    };

    return (
        <div className="dashboard-stats" ref={dashboardRef}>
            <div className="stats-header">
                <h2>This Week Income :</h2>
                <div className="income-amount">{formatCurrency(income)}</div>
            </div>

            <div className="sales-breakdown">
                <h3>Sales Breakdown</h3>
                <div className="sales-items">
                    <div className="sales-item">
                        <span className="item-name">Item #1 Sold :</span>
                        <span className="item-count">{item1}</span>
                    </div>
                    <div className="sales-item">
                        <span className="item-name">Item #2 Sold :</span>
                        <span className="item-count">{item2}</span>
                    </div>
                    <div className="sales-item">
                        <span className="item-name">Item #3 Sold :</span>
                        <span className="item-count">{item3}</span>
                    </div>
                    <div className="sales-item">
                        <span className="item-name">Item #5 Sold :</span>
                        <span className="item-count">{item5}</span>
                    </div>
                    <div className="sales-total">
                        <span className="total-name">Total Item Sold :</span>
                        <span className="total-count">{total}</span>
                    </div>
                </div>
            </div>

            <div className="monthly-view">
                <div className="month-header">
                    <h3>July</h3>
                    <button className="view-monthly-btn">View Monthly</button>
                </div>
                <div className="weeks-grid">
                    <div className="week-card">
                        <span className="week-label">Week 1</span>
                        <div className="week-bar" style={{height: '60%'}}></div>
                    </div>
                    <div className="week-card">
                        <span className="week-label">Week 2</span>
                        <div className="week-bar" style={{height: '80%'}}></div>
                    </div>
                    <div className="week-card">
                        <span className="week-label">Week 3</span>
                        <div className="week-bar" style={{height: '45%'}}></div>
                    </div>
                    <div className="week-card">
                        <span className="week-label">Week 4</span>
                        <div className="week-bar" style={{height: '70%'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;