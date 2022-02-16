import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllPostData, formatLink, createTagList } from '../lib/posts'
import { getAllAuthorData } from '../lib/authors';
import Header from '../components/header';

export default function Home({ allPostsData, allAuthorsData, tagList }) {
  const allPosts = allPostsData.items;
  const allAuthors = allAuthorsData.items;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header tagList={tagList}></Header>
      <div className='container-border'><section className={utilStyles.headingMd}>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({sys,fields}) => (

            <a href={'/posts/'+formatLink(fields.title)}><li className={utilStyles.listItem} key={sys.id}>
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

            <a href={'/authors/'+formatLink(fields.name)}><li className={utilStyles.listItem} key={sys.id}>
              {fields.name}
              <br />
              {}
              <br />
              {}
            </li></a>
          ))}
        </ul>
      </section></div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = await getAllPostData();
  const allAuthorsData = await getAllAuthorData();
  const tagList = await createTagList();
  return {
    props: {
      allPostsData,
      allAuthorsData,
      tagList
    }
  }
}
