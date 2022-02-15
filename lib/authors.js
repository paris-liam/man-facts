import { createClient } from "contentful";
import { getAllPostData } from "./posts";

export const generateLink = (title) => title.toLowerCase().split(' ').slice(0,4).join('-');

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
    return '/authors/' + author.fields.name.toLowerCase().split(' ').slice(0,4).join('-');
  })
}

export async function getAuthorData(authorName) {
  const authors = await getAllAuthorData();

  let authorData = authors.items.find((item) => {
    return authorName === item.fields.name.toLowerCase().split(' ').slice(0,4).join('-');
  })
  let allPosts = await getAllPostData();
  let articleListFiltered = allPosts.items.filter((article) => { 
    return article.fields.author && article.fields.author.fields.name.toLowerCase() === authorName.split('-').join(' ')
  }) 
  authorData.articleList = articleListFiltered.map((article) => {
    return {
      name: article.fields.title,
      link: generateLink(article.fields.title)
    }
  })
  return {
    res: authorData
  }
}
