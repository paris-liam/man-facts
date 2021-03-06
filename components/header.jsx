import { useState, useEffect, useRef, LegacyRef, Ref } from "react";
import Link from 'next/link';
import Image from 'next/image';
import * as logo from '../public/images/logo.png';
import Router from 'next/router'
export default function Header({ headerHeight = 100, tagList = [], activeLink = '' }) {

  const [searchInputActive, toggleSearchInput] = useState(false);
  const inputRef = useRef(null);
  const performSearch = () => {
    Router.push({
      pathname: '/collection/search',
      query: { q: inputRef.current.value?.trim() },
    })
  }


  const [navActive, setNav] = useState(false);
  useEffect(() => {
    if (navActive)
      document.querySelector('body').classList.add('mobile-menu-active');
    else
      document.querySelector('body').classList.remove('mobile-menu-active');
  },[navActive]);  

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setNav(false);
    })
  }, [])

  return (<header>
    <div className="mobile-menu-container">
      <Link href="/"><a><div className='logo-container'>
        <Image src={logo} />
      </div></a></Link>
      <div className="menu-toggle-container">
        <button onClick={() => setNav(!navActive)} aria-label="mobile menu" className={`nav-toggle${navActive ? ' open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <div className="menu-container">
      <ul className="header-list section-links">
        {tagList.map((tag, index) => (
          <li key={tag.id}><Link href={`/collection/tags?q=${tag.id}`}><a className={activeLink === tag.id ? 'active-link' : ''}><h3>{tag.displayName}</h3></a></Link></li>
        ))}
        <ul className="about-link-container">
          <li className={'about-header-link'}><Link href="/about-us"><a className={activeLink === 'about-us' ? 'active-link' : ''}><h3>About Us</h3></a></Link></li>
          <li className={'about-header-link'}><Link href="/collection/authors"><a className={activeLink === 'authors' ? 'active-link' : ''}><h3>Authors</h3></a></Link></li>
          <li className={'about-header-link'}><Link href="/write-for-us"><a className={activeLink === 'write-for-us' ? 'active-link' : ''}><h3>Write for us</h3></a></Link></li>
        </ul>
      </ul>
      <ul className="header-list social-links">
        <li><a href="https://www.facebook.com/ManFacts7/" target="_blank" rel="noreferrer"><i className="fb"></i></a></li>
        <li><a href="https://twitter.com/ManFacts7" target="_blank" rel="noreferrer"><i className="twitter"></i></a></li>
        <li><a href="https://www.instagram.com/therealmanfacts/" target="_blank" rel="noreferrer"><i className="ig"></i></a></li>
        <li>                  <button className='search-trigger' onClick={() => { toggleSearchInput(!searchInputActive) }}>
          {!searchInputActive ? <i className='fa fa-search'></i> : <i className='fa fa-close'></i>}
        </button></li>
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault();
        performSearch();
      }}className={`search-input-container ${searchInputActive ? 'search-input-active' : ''}`} style={{ top: `${headerHeight}px` }}>
        <input ref={inputRef} type='text' />
        <button>
          <i className='fa fa-search'></i>
        </button>
      </form>
    </div>
  </header>);
}
