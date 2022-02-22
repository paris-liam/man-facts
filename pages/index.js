import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { createTagList } from '../lib/tags'
import { getAllAuthorData } from '../lib/authors';
import { getAllPostData } from '../lib/posts';
import Header from '../components/header';
import Carousel from '../components/carousel';
import CarouselThumb from '../components/carouselThumb';
import SideList from '../components/sidelist';
import PostList from '../components/postlist';

export default function Home({ allPostsData, allAuthorsData, tagList }) {
  const allPosts = allPostsData;
  const allAuthors = allAuthorsData;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header tagList={tagList}></Header>
      <Carousel posts={allPosts.slice(0,3)}></Carousel>
      <CarouselThumb posts={allPosts}></CarouselThumb>
      <h1>PostList</h1>
      <PostList posts={allPosts}></PostList>
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
