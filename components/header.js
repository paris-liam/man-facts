import { useState, useEffect } from "react";
import Image from 'next/image';
import * as logo from '../public/images/logo.png';

export default function Header({tagList}) {
  const [navActive, setNav] = useState(false);
  useEffect(() => {
    if(navActive)
      document.querySelector('body').classList.add('mobile-menu-active');
    else 
      document.querySelector('body').classList.remove('mobile-menu-active');
    });

    return (<>
      <header>
          <nav>
            <div className="mobile-menu-container">
              <div className='logo-container'>
                <a href="/" className="logo"><Image src={logo}/></a>
              </div>
              <div className="menu-toggle-container">
                <button onClick={()=> setNav(!navActive)}  aria-label="mobile menu" className={`nav-toggle${navActive ? ' open': ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className="menu-container">
              <ul className="section-links">
                {tagList.map((tag) => (
                  <li key={tag}><a href={tag}>{tag}</a></li>
                ))}
                <li><a href="#about">About</a></li>
                <li><a href="#exp">Brave Patriots</a></li>
                <li><a href="#exp">Write for us</a></li>
              </ul>
              <ul className="social-links">
                <li><i className="fb"></i></li>
                <li><i className="twitter"></i></li>
                <li><i className="ig"></i></li>
                <button>search</button>
              </ul>
            </div>
          </nav>
      </header>
    </>);
}
