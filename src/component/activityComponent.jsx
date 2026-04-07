import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import '../css/activityComponent.css';

const ActivityComponent = () => {
  const metrics = useMemo(() => [
    { value: 1600, change: '+55%', label: 'Users Active' },
    { value: 350, change: '+124%', label: 'Click Events' },
    { value: 2300, change: '+15%', label: 'Purchases' },
    { value: 940, change: '+90%', label: 'Likes' }
  ], []);

  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const componentRef = useRef(null);

  const animateValue = useCallback((index, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + easeOutQuart * (end - start));
      
      setAnimatedValues(prev => {
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

  const startAnimation = useCallback(() => {
    metrics.forEach((metric, index) => {
      animateValue(index, 0, metric.value, 2000);
    });
  }, [animateValue, metrics]);

  useEffect(() => {
    const currentRef = componentRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startAnimation();
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
  }, [hasAnimated, startAnimation]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="activity-container" ref={componentRef}>
      <h1 className="activity-title">Metrics Dashboard</h1>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-value">
              {formatNumber(animatedValues[index])}
            </div>
            <div className="metric-change positive">{metric.change}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityComponent;