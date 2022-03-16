import { createClient } from "contentful";

export const sortByDate = (posts) => posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).reverse();

export const formatLink = (title) => title ? encodeURIComponent(title.toLowerCase().replace(/[^0-9a-zA-Z_\s]+/g, '').split(' ').slice(0, 4).join('-')) : '';

export const formatAuthors = (post) => {
    if (post.fields?.authors?.length > 0) {
        return post.fields?.authors.map((author) => author.fields?.name);
    }
    return post.fields?.author?.fields.name ? [post.fields?.author?.fields.name] : null;
}
export const formatTags = (tags) => {
    const tagList = new Set();
    tags.forEach((tag) => {
        if (tag.sys && tag.sys.id) {
            tagList.add(tag.sys?.id);
        }
    })
    return [...tagList];
}

export const formatPostData = (allPosts: Array<any>) => sortByDate(allPosts
    .map((post) => ({
        title: post.fields?.title || '',
        body: post.fields?.body || '',
        date: post.fields?.dateOfPublication?.replace('T', ' ') || null,
        image: post.fields?.titleImage?.fields?.file || null,
        authors: formatAuthors(post),
        tags: formatTags(post.metadata?.tags) || [],
    }))
    .filter((post) => post.title && post.authors?.length > 0)
    .filter((post) => {
        if (post.date) {
            return new Date(post.date.replace('T', ' ')).getTime() <= new Date().getTime();
        }
        return false;
    })
);

export const formatAuthorData = (allAuthors) =>
    allAuthors.map((post) => {
        return {
            name: post?.fields?.name || '',
            body: post?.fields?.aboutSection || '',
            image: post?.fields?.headshot?.fields?.file || null,
        }
    });

export const createContentfulClient = () => {
    return createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })
}