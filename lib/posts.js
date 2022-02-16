import { createClient } from "contentful";


export const formatLink = (title) => encodeURIComponent(title.toLowerCase().replace(/[^0-9a-zA-Z_\s]+/g, '').split(' ').slice(0,4).join('-'));

export async function getAllPostData() {  
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })
  return await client.getEntries({ content_type: 'blogPost'});
}

export async function generatePostPaths() {
  const postData = await getAllPostData();
  return postData.items.map((post) => {
    return '/posts/' + formatLink(post.fields.title);
  })
}

export async function getPostData(articleName) {
  const posts = await getAllPostData();

  let postData = posts.items.find((post) => {
    return articleName === formatLink(post.fields.title)
  })
  return {
    res: postData
  }
}

export async function findTaggedArticles() {
  return [];
}
export async function createTagList() {
  const posts = await getAllPostData();
  const tagList = new Set();
  posts.items.forEach((post) => {
    if(post.metadata && post.metadata.tags) {
      post.metadata.tags.forEach((tag) => {
        tagList.add(tag.sys.id);
      })
    }
  })
  return [...tagList];
}

