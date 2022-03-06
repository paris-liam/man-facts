import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import * as logo from '../public/images/logo.png';
import Router from 'next/router'
export default function Header({tagList = []}) {

  const [searchInputActive, toggleSearchInput] = useState(false);
  const currentQuery = useRef('');  
  const [validQuery, setValidQuery] = useState(false);
  const performSearch = () => {
    if(validQuery) {
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

    return (<header>
            <div className="mobile-menu-container">
              <a href="/"><div className='logo-container'>
                <Image src={logo}/>
              </div></a>
              <div className="menu-toggle-container">
                <button onClick={()=> setNav(!navActive)}  aria-label="mobile menu" className={`nav-toggle${navActive ? ' open': ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <div className="menu-container">
              <ul className="header-list section-links">
                {tagList.map((tag, index) => (
                  <li key={tag}><a href={`/collection/tags?q=${tag}`}><h3>test {index}</h3></a></li>
                ))}
                <li className='about-header-link'><a href="/about"><h3>About</h3></a></li>
                <li className='about-header-link'><a href="/collection/authors"><h3>Brave Patriots</h3></a></li>
                <li className='about-header-link'><a href="/write-for-us"><h3>Write for us</h3></a></li>
              </ul>
              <ul className="header-list social-links">
                <li><a href="https://www.facebook.com/ManFacts7/" target="_blank"><i className="fb"></i></a></li>
                <li><a href="https://twitter.com/ManFacts7" target="_blank"><i className="twitter"></i></a></li>
                <li><a href="https://www.instagram.com/therealmanfacts/" target="_blank"><i className="ig"></i></a></li>
                <li>                  <button className='search-trigger' onClick={() => {toggleSearchInput(!searchInputActive)}}>
                    {!searchInputActive ? <i className='fa fa-search'></i> : <i className='fa fa-close'></i> }
                  </button></li>
              </ul>
              <div className={`search-input-container ${searchInputActive ? 'search-input-active' : ''}`}>
                <input onChange={() => setValidQuery(currentQuery.current.value && currentQuery.current.value.trim() !== '')}ref={currentQuery} type='text' />
                <button disabled={!validQuery} onClick={() => { performSearch() }}>
                  <i className='fa fa-search'></i>
                </button>
              </div>
            </div>
      </header>);
}
