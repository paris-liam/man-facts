import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Header from './header'
import { useState } from 'react/cjs/react.development'
import { useEffect } from 'react'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  const [headerHeight, setHeaderHeight] = useState(100);
  useEffect(() => {
    document.querySelector('body').classList += 'no-scroll';
    //TODO grab header height from ref and set
    const checkScroll = () => {
      !window.scrollY || window.scrollY === 0 ? document.querySelector('body').classList += 'no-scroll' : document.querySelector('body').classList = '';
    };

    window.addEventListener("scroll", checkScroll);

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);
  return (
    <>
    <div id='header-placeholder' style={{'height': `${headerHeight}px`}}></div>
    <Header></Header>
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
      
      <main className='container-border'>{children}</main>
     
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
    </>
  )
}
