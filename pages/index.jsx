import Layout from '../components/layout'
import { createTagList } from '../lib/tags'
import { generateHomePosts } from '../lib/posts';
import Carousel from '../components/carousel';
import PostList from '../components/postlist';
import ThreePostShuffle from '../components/threePostShuffle';

export default function Home({homePosts, tagList }) {
  const {topPosts, recentPosts, trendingPosts, popularPosts} = homePosts;
  return (
    <Layout tagList={tagList} sidePosts={topPosts} sideTitle="Top Posts">
        <Carousel posts={recentPosts}></Carousel>
        {/*<ThreePostShuffle title={"Trending"} posts={trendingPosts}></ThreePostShuffle>*/}
        <PostList title="Popular" posts={popularPosts}></PostList>
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
