

import { createContentfulClient } from "./utils";

async function getAllTags() {

  return await createContentfulClient().getTags();
}

export async function createTagList() {
    const tags = await getAllTags();
    const tagList = tags.items.map((tag) => {
      return {
        displayName: tag.name,
        id: tag.sys.id
      }
    });
    return tagList.filter((tag) => tag.id !== 'topPost');
}