import Layout from '../components/layout'
import { createTagList } from '../lib/tags'
import { generateHomePosts, getTopPosts } from '../lib/posts';
import Carousel from '../components/carousel';
import PostList from '../components/postlist';
export default function Home({homePosts, topPosts, tagList }) {
  const {recentPosts, trendingPosts, popularPosts} = homePosts;
  return (
    <Layout description={"Home"} tagList={tagList} sidePosts={topPosts} sideTitle="Top Posts">
        <Carousel posts={recentPosts}></Carousel>
        {/*<ThreePostShuffle title={"Trending"} posts={trendingPosts}></ThreePostShuffle>*/}
        <PostList title="Popular" posts={popularPosts}></PostList>
    </Layout>
  )
}

export async function getStaticProps() {
  const homePosts = await generateHomePosts(); 
  const tagList = await createTagList();
  const topPosts = await getTopPosts();
  return {
    props: {
      homePosts,
      tagList,
      topPosts
    }
  }
}
