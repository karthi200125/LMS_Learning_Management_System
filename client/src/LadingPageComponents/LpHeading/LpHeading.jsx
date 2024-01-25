import React from 'react';
import './LpHeading.scss';

const LpHeading = () => {

    return (
        <div className='lph'>
            <div className="wrapper">
                <p>Learn</p>
                <div className="words">
                    <span>Technology</span>
                    <span>Programming</span>
                    <span>Algorithms</span>
                    <span>Literatures</span>
                    <span>Full Stack</span>
                </div>
            </div>
            <span>With Our LMS</span>
        </div>
    );
}

export default LpHeading;
