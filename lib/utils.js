import { createClient } from "contentful";

export const sortByDate = (posts) => posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).reverse();

export const formatLink = (title, isPost) => {
    if(title) {
        let choppedUp = title.toLowerCase().replace(/[^0-9a-zA-Z_\s]+/g, '').split(' ');
        let beginning = choppedUp.slice(0,2)
        let end = choppedUp.reverse().slice(0,2).reverse()
        let newLink = isPost ? [...beginning, ...end].join('-') : [...beginning].join('-')
        return encodeURIComponent(newLink);
    } else {
        return ''
    }
}

export const checkValidDate = (date) => {
    let testDate = new Date(date);
    return testDate.getTime() === testDate.getTime();
}

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
    const finalTagList = Array.from(tagList);
    return finalTagList;
}

export const formatPostData = (allPosts) => {
    let formattedPosts = allPosts.map((post) => ({
        title: post.fields?.title || '',
        body: post.fields?.body || '',
        date: post.fields?.dateOfPublication || null,
        image: post.fields?.titleImage?.fields?.file || null,
        authors: formatAuthors(post),
        tags: formatTags(post.metadata?.tags) || [],
    }))
    let formattedPostsFiltered = formattedPosts.filter((post) => post.title && post.authors?.length > 0).filter((post) => {
        if (post.date) {
            return new Date(post.date.replace('T', ' ')).getTime() <= new Date().getTime();
        }
        return false;
    });
    return sortByDate(formattedPostsFiltered);
}

export const formatAuthorData = (allAuthors) =>
    allAuthors.map((post) => {
        return {
            title: post?.fields?.name || '',
            body: post?.fields?.aboutSection || '',
            image: post?.fields?.headshot?.fields?.file || null,
            isAuthor: true
        }
    }).sort((a, b) => a.title.localeCompare(b.title));

export const createContentfulClient = () => {
    return createClient({
        space: 'jsm52d0gpu5i',//process.env.CONTENTFUL_SPACE_ID,
        accessToken: 'YdW-e16xBHwIIDUTgObwuhWgin3CYGJis2wlQJe-u-A' //process.env.CONTENTFUL_ACCESS_KEY
    })
}