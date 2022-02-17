import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import * as logo from '../public/images/logo.png';
import Router from 'next/router'

export default function Header({tagList = []}) {
 //TODO: create and style search button

  const [searchInputActive, toggleSearchInput] = useState(false);
  const performSearch = () => {
    if(currentQuery.current.value && currentQuery.current.value.trim() !== '') {
      Router.push({
        pathname: '/collection/search',
        query: { keyword: currentQuery.current.value.trim() },
      })
    }
  }

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
                  <li key={tag}><a href={`/collection/tags?q=${tag}`}>{tag}</a></li>
                ))}
                <li><a href="/">About</a></li>
                <li><a href="/collection/authors">Brave Patriots</a></li>
                <li><a href="/">Write for us</a></li>
              </ul>
              <ul className="social-links">
                <li><a href="https://www.facebook.com/ManFacts7/" target="_blank"><i className="fb"></i></a></li>
                <li><a href="https://twitter.com/ManFacts7" target="_blank"><i className="twitter"></i></a></li>
                <li><a href="https://www.instagram.com/therealmanfacts/" target="_blank"><i className="ig"></i></a></li>
              </ul>
              <div className="search-container">
                  <button className='search-trigger' onClick={() => {toggleSearchInput(!searchInputActive)}}>
                    {!searchInputActive ? <i className='fa fa-search'></i> : <i className='fa fa-close'></i> }
                  </button>
                  <div className={`search-input-container ` + searchInputActive ? 'search-input-active' : ''}>
                    <input type='text' />
                    <button onClick={() => { performSearch() }}>
                      <i className='fa fa-search'></i>
                    </button>
                  </div>
              </div>
            </div>
          </nav>
      </header>
    </>);
}
