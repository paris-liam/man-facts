import { createClient } from "contentful";
import { formatLink, formatAuthorData } from "./utils";
import { getAllPostData } from "./posts";


export async function getAllAuthorData() {  

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

let authorData = await client.getEntries({ content_type: 'author'});
return formatAuthorData(authorData.items);
}

export async function generateAuthorPaths() {
  const authorData = await getAllAuthorData();
  return authorData.filter((author) => author.name).map((author) => {
    return '/authors/' + formatLink(author.name)
  })
}

export async function getAuthorData(authorName) {
  const allAuthors = await getAllAuthorData();
  let allPosts = await getAllPostData();

  let authorData =  allAuthors.find((item) => {
    return authorName === formatLink(item.name)
  });

  let articleListFiltered = allPosts.filter((article) => { 
    return article.author && formatLink(article.title) === authorData.name
  }) 

  authorData.articleList = articleListFiltered.map((article) => {
    return {
      name: article.title,
      link: generateLink(article.title)
    }
  })
  return authorData
}
