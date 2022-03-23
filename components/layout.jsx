import Head from 'next/head'
import styles from './layout.module.css'
import { useState, useEffect } from 'react'
import Header from './header';
import SideList from './sidelist';

export default function Layout({ children, activeLink = '', tagList, sidePosts, sideTitle, description, shareImage='/images/logo.png' }) {
  const [headerHeight, setHeaderHeight] = useState(100);
  useEffect(() => {
    document.querySelector('body').classList.add('no-scroll');
    setHeaderHeight(document.querySelector('header').getBoundingClientRect().height);
    const checkScroll = () => {
      !window.scrollY || window.scrollY === 0 ? document.querySelector('body').classList.add('no-scroll') : document.querySelector('body').classList.remove('no-scroll');
    };

    const resizeHeader = () => {
      setHeaderHeight(document.querySelector('header').scrollHeight);
    }

    window.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", resizeHeader);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);
  
  return (
    <>
      <div id='header-placeholder' style={{ 'height': `${headerHeight}px` }}></div>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/images/logo.png" />
          <meta
            name="description"
            content={description ? description : " Man Facts: The only comedy source BY men FOR men"}
          />
          <meta
            property="og:image"
            content={shareImage}
          />
          <meta name="og:title" content={description ? description : "Man Facts"} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Head>
        <Header activeLink={activeLink} headerHeight={headerHeight} tagList={tagList}></Header>
        {/*<ul>
              <li><Link  href="/"><a>About</a></Link></li>
              <li><Link  href="/collection/authors"><a>Brave Patriots</a></Link></li>
              <li><Link  href="/"><a>Write for us</a></Link></li>
            </ul>*/}
        <main className="main-container">
          {children}
        </main>
        
        {sidePosts && sidePosts.length > 0 &&
          <div className="side-list-container" style={{top: `${headerHeight}px`}}>
  
            <SideList title={sideTitle} posts={sidePosts}></SideList>
          </div>
        }
      </div>
    </>
  )
}
