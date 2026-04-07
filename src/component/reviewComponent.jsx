import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "../css/reviewsComponent.css";

const ReviewsComponent = () => {
    const reviewData = useMemo(() => [
        { type: "Positive Reviews", percentage: 80, color: "rgba(72, 187, 120, 1)" },
        { type: "Neutral Reviews", percentage: 17, color: "rgba(237, 137, 54, 1)" },
        { type: "Negative Reviews", percentage: 3, color: "rgba(245, 101, 101, 1)" }
    ], []);

    const [animatedPercentages, setAnimatedPercentages] = useState([0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const componentRef = useRef(null);

    const animateValue = useCallback((index, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + easeOutQuart * (end - start));
            
            setAnimatedPercentages(prev => {
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
        reviewData.forEach((review, index) => {
            animateValue(index, 0, review.percentage, 1500);
        });
    }, [animateValue, reviewData]);

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

    return (
        <div className="reviews-container" ref={componentRef}>
            <h2 className="reviews-title">Reviews</h2>
            
            <div className="reviews-content">
                {reviewData.map((review, index) => (
                    <div key={index} className="review-item">
                        <div className="review-header">
                            <span className="review-type">{review.type}</span>
                            <span className="review-percentage">{animatedPercentages[index]}%</span>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${animatedPercentages[index]}%`,
                                    backgroundColor: review.color
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="reviews-stats">
                <p className="stats-text">
                    More than <strong>1,500,000</strong> developers used Creative Tim's products 
                    and over <strong>700,000</strong> projects were created.
                </p>
            </div>

            <div className="reviews-divider"></div>

            <button className="view-all-button">
                View all reviews
            </button>
        </div>
    );
};

export default ReviewsComponent;