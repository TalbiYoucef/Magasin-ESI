import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Circle(props) {
  return (
    <div>
      <CircularProgressbar 
        value={props.DischargeReturned} 
        text={`${props.DischargeReturned}%`}
        strokeWidth={13}
        styles={buildStyles({
          textSize: '16px',
          textColor: '#557BDD',
          pathColor: '#557BDD',
          trailColor: '#E6EDFF',
          transition: 'stroke-dashoffset 2s ease-in-out' // Animation de 2 secondes pour la transition de stroke-dashoffset
        })}
      />
    </div>
  );
}

export default Circle;
