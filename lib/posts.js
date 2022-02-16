import { createClient } from "contentful";

export async function getAllPostData() {  

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

return await client.getEntries({ content_type: 'blogPost'});
}

export async function getAllTags() {  

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })
  
  return await client.getTags();
  }

export async function generatePostPaths() {
  const postData = await getAllPostData();
  return postData.items.map((post) => {
    return '/posts/' + encodeURIComponent(post.fields.title.toLowerCase().split(' ').slice(0,4).join('-').replace(/'|"/,''));
  })
}

export async function getPostData(articleName) {
  console.warn(articleName);
  const posts = await getAllPostData();
  let postData = posts.items[0];
  return {
    res: postData
  }
}

export async function createTagList() {
  const posts = await getAllPostData();
  return {
    res: posts
  }
}

