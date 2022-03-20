import { formatLink, formatAuthorData, createContentfulClient } from "./utils";
import { getAllPostData } from "./posts";


export async function getAllAuthorData() {  

let authorData = await createContentfulClient().getEntries({ content_type: 'author'});
return formatAuthorData(authorData.items);
}

export async function generateAuthorPaths() {
  const authorData = await getAllAuthorData();
  return authorData.filter((author) => author.title).map((author) => {
    return '/authors/' + formatLink(author.title)
  })
}

export async function generateAuthorPosts(authorName) {
  const posts = await getAllPostData();
  const authorPosts = posts.filter((post) => {
    return post.authors?.some((author) => {
      return formatLink(author) === authorName;
    });
  });
  if(authorPosts.length >= 3) {
    return authorPosts.slice(0,3);
  } else {
    const randomAuthorPostsRemoved = posts.sort(() => .5 - Math.random()).filter((post) => authorPosts?.some((existingPost) => {
      return post.title === existingPost.title;
    }));
    return [...authorPosts, randomAuthorPostsRemoved].slice(0,3);
  }
}

export async function getAuthorData(authorName) {
  const allAuthors = await getAllAuthorData();
  let allPosts = await getAllPostData();

  let authorData = allAuthors.find((item) => {
    return authorName === formatLink(item.title)
  });
  let articleListFiltered = allPosts.filter((article) => { 
    return article.authors?.some((author) => formatLink(author) === authorName)
  }); 

  authorData.articleList = articleListFiltered.map((article) => {
    return {
      name: article.title,
      link: formatLink(article.title)
    }
  })
  return authorData
}
