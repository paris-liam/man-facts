import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { createTagList } from '../lib/tags'
import { getAllAuthorData } from '../lib/authors';
import { getAllPostData } from '../lib/posts';
import Header from '../components/header';
import Carousel from '../components/carousel';
import PostList from '../components/postlist';

export default function Home({ allPostsData, allAuthorsData, tagList }) {
  const allPosts = allPostsData;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header tagList={tagList} sidePosts={allPosts.slice(0,5)}></Header>
      <div className="main-container">
      <Carousel posts={allPosts}></Carousel>
      <h1>PostList</h1>
      <PostList posts={allPosts}></PostList>
      </div>
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
