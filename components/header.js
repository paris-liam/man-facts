import { useState, useEffect } from "react";
import Image from 'next/image';
import * as logo from '../public/images/logo.png';



export default function Header() {
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
                <a href="#" className="logo"><Image src={logo}/></a>
              </div>
              <div className="menu-toggle-container">
                <button onClick={()=> setNav(!navActive)}  aria-label="mobile menu" className={`nav-toggle${navActive ? ' open': ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className={`menu-container`}>
              <ul className="section-list">
                <li><a href="#about">About</a></li>
                <li><a href="#exp">Resume</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
              <ul className="section-list">
                <li><a href="#about">About</a></li>
                <li><a href="#exp">Brave Patriots</a></li>
                <li><a href="#exp">Write for us</a></li>
              </ul>
              <ul className="socials-list">
                <li>facebook</li>
                <li>twitter</li>
                <li>ig</li>
              </ul>
              <button>search</button>
          </div>
          </nav>
      </header>
    </>);
}