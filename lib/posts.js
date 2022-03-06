import { createClient } from "contentful";
import { formatLink, formatPostData } from "./utils";

export async function getAllPostData() {  
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })
  const allPosts = await client.getEntries({ content_type: 'blogPost'});
  
  return formatPostData(allPosts.items);
}

export async function generateHomePosts() {
  const postData = await getAllPostData();
  console.warn(postData);
  return {
    topPosts: postData, 
    recentPosts: postData, 
    trendingPosts: postData, 
    popularPosts: postData
  }
}

export async function generatePostPaths() {
  const postData = await getAllPostData();
  return postData.map((post) => {
    return '/posts/' + formatLink(post.title);
  })
}

export async function getPostData(articleName) {
  const posts = await getAllPostData();

  return posts.find((post) => {
    return articleName === formatLink(post.title)
  })
}



