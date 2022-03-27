import Layout from '../components/layout'
import { createTagList } from '../lib/tags'
import { generateHomePosts } from '../lib/posts';
import Carousel from '../components/carousel';
import PostList from '../components/postlist';
export default function Home({homePosts, tagList }) {
  const {topPosts, recentPosts, trendingPosts, popularPosts} = homePosts;
  const tempPopular = [...trendingPosts, ...popularPosts].slice(0,20); 
  return (
    <Layout description={"Home"}   tagList={tagList} sidePosts={topPosts} sideTitle="Top Posts">
        <Carousel posts={recentPosts}></Carousel>
        {/*<ThreePostShuffle title={"Trending"} posts={trendingPosts}></ThreePostShuffle>*/}
        <PostList title="Popular" posts={tempPopular}></PostList>
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
