import React from 'react';

const RouteGraph = ({ route }) => {
  const radius = 10;
  const nodeSpacing = 30;

  return (
    <svg height={radius * 2} width={(route.length - 1) * nodeSpacing + radius * 2}>
      {route.map((node, index) => (
        <g key={index} transform={`translate(${index * nodeSpacing + radius}, ${radius})`}>
          <circle cx="0" cy="0" r={radius} fill="blue" />
          <text x="0" y="0" textAnchor="middle" dy=".3em" fill="white" fontSize="10">{node}</text>
          {index < route.length - 1 && (
            <line x1={radius} y1="0" x2={nodeSpacing - radius} y2="0" stroke="black" strokeWidth="2" />
          )}
        </g>
      ))}
    </svg>
  );
};

export default RouteGraph;