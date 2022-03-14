import Layout from '../components/layout'
import { createTagList } from '../lib/tags'
import { generateHomePosts, getAllPostData } from '../lib/posts';
import Carousel from '../components/carousel';
import PostList from '../components/postlist';

export default function Home({homePosts, tagList }) {
  const {topPosts, recentPosts, trendingPosts, popularPosts} = homePosts;
  return (
    <Layout tagList={tagList} sidePosts={topPosts}>
        <h2>Recent</h2>
        <Carousel posts={recentPosts}></Carousel>
        <h2>Trending</h2>
        <PostList posts={trendingPosts}></PostList>
        <h2>Popular</h2>
        <PostList posts={popularPosts}></PostList>
    </Layout>
  )
}

export async function getStaticProps() {
  const homePosts = await generateHomePosts(); 
  const tagList = await createTagList();
  return {
    props: {
      homePosts,
      tagList
    }
  }
}
