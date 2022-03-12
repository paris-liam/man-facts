import { getAllPostData } from "./posts";

export async function createTagList() {
    const posts = await getAllPostData();
    const tagList = posts.filter((post) => post.tags.length >= 1)
    .map((post) => post.tags)
    .flat();
    return [...new Set(tagList)];
  }