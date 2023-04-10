import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading" data-testid="loading-test">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
  );
};

export default Loading;
