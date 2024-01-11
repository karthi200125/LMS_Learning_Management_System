import React, { useEffect, useState } from 'react';
import './Collabc.scss';
import google from '../../assets/companies/google.png'
import ms from '../../assets/companies/ms.png'
import gfg from '../../assets/companies/gfg.png'
import tcs from '../../assets/companies/tcs.png'
import wipro from '../../assets/companies/wipro.png'
import amazon from '../../assets/companies/amazon.png'
import byjus from '../../assets/companies/byjus.png'
import cred from '../../assets/companies/cred.png'
import vit from '../../assets/companies/vit.png'
import iit from '../../assets/companies/iit.png'


const CollabCompanies = () => {
  const [currentSpan, setCurrentSpan] = useState(1);

  const MNC = [ms, google, tcs, amazon, wipro]
  const STARTUP = [cred, byjus, gfg]
  const INSTITUTE = [iit, vit]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSpan((prevSpan) => (prevSpan % 3) + 1);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='collabc'>
      <div className="cnames">
        <p>We Collaborate with</p>
        <span className={currentSpan === 1 ? 'active' : ''}>MNC companies ,</span>
        <span className={currentSpan === 2 ? 'active' : ''}>Startup companies ,</span>
        <span className={currentSpan === 3 ? 'active' : ''}>Institutes</span>
      </div>

      <div className='images'>
        {currentSpan === 1 &&
          <div>
            {MNC.map((mnc) => (
              <img src={mnc} alt="company" key={mnc} />
            ))}
          </div>}
        {currentSpan === 2 &&
          <div>
            {STARTUP.map((mnc) => (
              <img src={mnc} alt="company" key={mnc} />
            ))}
          </div>}
        {currentSpan === 3 &&
          <div>
            {INSTITUTE.map((mnc) => (
              <img src={mnc} alt="company" key={mnc} />
            ))}
          </div>}
      </div>
    </div>
  );
}

export default CollabCompanies;
