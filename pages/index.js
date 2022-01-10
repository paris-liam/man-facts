import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllPostData } from '../lib/posts'

const generateTitle = (title) => title.toLowerCase().split(' ').join('-');

export default function Home({ allPostsData }) {
  const allPosts = allPostsData.items;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({sys,fields}) => (

            <a href={'/posts/'+generateTitle(fields.title)}><li className={utilStyles.listItem} key={sys.id}>
              {fields.title}
              <br />
              {}
              <br />
              {}
            </li></a>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = await getAllPostData();

  return {
    props: {
      allPostsData
    }
  }
}
