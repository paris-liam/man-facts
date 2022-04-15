

import { TOP_POST_TAG_NAME, TRENDING_POST_TAG_NAME, POPULAR_POST_TAG_NAME } from "./posts";
import { createContentfulClient } from "./utils";

async function getAllTags() {

  return await createContentfulClient().getTags();
}
const ignoreTags = [TOP_POST_TAG_NAME, TRENDING_POST_TAG_NAME, POPULAR_POST_TAG_NAME];

export async function createTagList() {
  const tags = await getAllTags();
  const tagList = tags.items.map((tag) => {
    return {
      displayName: tag.name,
      id: tag.sys.id
    }
  });
  return tagList.filter((tag) => !ignoreTags.includes(tag.id));
}