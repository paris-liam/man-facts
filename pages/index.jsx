import Layout from '../components/layout'
import { createTagList } from '../lib/tags'
import { generateHomePosts } from '../lib/posts';
import Carousel from '../components/carousel';
import PostList from '../components/postlist';
import ThreePostShuffle from '../components/threePostShuffle';
export default function Home({homePosts, tagList }) {
  const { recentPosts, topPosts, popularPosts, trendingPosts} = homePosts;
  return (
    <Layout description={"Home"} tagList={tagList} sidePosts={trendingPosts} sideTitle="Popular">
        <Carousel posts={topPosts}></Carousel>
        {/*<ThreePostShuffle title="Trending" posts={trendingPosts}></ThreePostShuffle>*/}
        <PostList title="Recent" posts={recentPosts} showMore></PostList>
    </Layout>
  )
}

export async function getStaticProps() {
  const homePosts = await generateHomePosts(); 
  const tagList = await createTagList();
  return {
    props: {
      homePosts,
      tagList,
    }
  }
}
