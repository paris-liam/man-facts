import Head from 'next/head'
import styles from './layout.module.css'
import { useState, useEffect } from 'react'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children }) {
  const [headerHeight, setHeaderHeight] = useState(100);
  useEffect(() => {
    document.querySelector('body').classList += 'no-scroll';
    setHeaderHeight(150);
    const checkScroll = () => {
      !window.scrollY || window.scrollY === 0 ? document.querySelector('body').classList += 'no-scroll' : document.querySelector('body').classList = '';
    };

    window.addEventListener("scroll", checkScroll);

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <>
    <div id='header-placeholder' style={{'height': `${headerHeight}px`}}></div>
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
      </Head>
      
      <main>{children}</main>
    </div>
    </>
  )
}
