import { createClient } from "contentful";

export async function getAllAuthorData() {  

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

return await client.getEntries({ content_type: 'author'});
}

export async function generateAuthorPaths() {
  const authorData = await getAllAuthorData();
  return authorData.items.map((author) => {
    return '/authors/' + author.fields.name.split(' ').join('-');
  })
}

export async function getAuthorData(authorName) {
  const authors = await getAllAuthorData();

  let authorData = authors.items.find((item) => {
    return authorName === item.fields.name.toLowerCase().split(' ').join('-');
  })
  // Combine the data with the id
  return {
    res: authorData
  }
}

