import { getAllPostData } from "./posts";

export async function createTagList() {
    const posts = await getAllPostData();
    const tagList = new Set();
    posts.forEach((post) => {
      if(post.tags) {
        post.tags.forEach((tag) => {
          tagList.add(tag.sys.id);
        })
      }
    })
    return [...tagList];
  }