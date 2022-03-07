import Layout from '../components/layout'
import { createTagList } from '../lib/tags'
import { generateHomePosts } from '../lib/posts';
import Carousel from '../components/carousel';
import PostList from '../components/postlist';

export default function Home({ homePosts, tagList }) {
  const {topPosts, recentPosts, trendingPosts, popularPosts} = homePosts;
  return (
    <Layout tagList={tagList} sidePosts={recentPosts.slice(0,5)}>
        <Carousel posts={topPosts.slice(0,5)}></Carousel>
        <h1>PostList</h1>
        <PostList posts={topPosts}></PostList>
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
