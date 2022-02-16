import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllPostData } from '../lib/posts'
import { getAllAuthorData, generateLink } from '../lib/authors';

export default function Home({ allPostsData, allAuthorsData }) {
  const allPosts = allPostsData.items;
  const allAuthors = allAuthorsData.items;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({sys,fields}) => (

            <a href={'/posts/'+generateLink(fields.title)}><li className={utilStyles.listItem} key={sys.id}>
              {fields.title}
              <br />
              {}
              <br />
              {}
            </li></a>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Authors</h2>
        <ul className={utilStyles.list}>
        <i className="fas fa-user"></i>
          {allAuthors.map(({sys,fields}) => (

            <a href={'/authors/'+generateLink(fields.name)}><li className={utilStyles.listItem} key={sys.id}>
              {fields.name}
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
  const allAuthorsData = await getAllAuthorData();
  return {
    props: {
      allPostsData,
      allAuthorsData
    }
  }
}
