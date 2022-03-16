import Head from 'next/head'
import styles from './layout.module.css'
import { useState, useEffect } from 'react'
import Header from './header';
import SideList from './sidelist';
import Link from 'next/link';
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, tagList, sidePosts, sideTitle }) {
  const [headerHeight, setHeaderHeight] = useState(100);
  useEffect(() => {
    document.querySelector('body').classList += 'no-scroll';
    setHeaderHeight(document.querySelector('header').getBoundingClientRect().height);
    const checkScroll = () => {
      !window.scrollY || window.scrollY === 0 ? document.querySelector('body').classList += 'no-scroll' : document.querySelector('body').classList = '';
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
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Head>
        <Header headerHeight={headerHeight} tagList={tagList}></Header>
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
