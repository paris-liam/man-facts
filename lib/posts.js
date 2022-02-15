import { createClient } from "contentful";

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
    return '/posts/' + post.fields.title.toLowerCase().split(' ').slice(0,4).join('-').replace('/','-');
  })
}

export async function getPostData(articleName) {
  const posts = await getAllPostData();

  let postData = posts.items.find((item) => {
    return articleName === item.fields.title.toLowerCase().split(' ').slice(0,4).join('-');
  })
  // Combine the data with the id
  return {
    res: postData
  }
}

