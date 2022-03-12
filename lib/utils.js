export const sortByDate = (posts) => posts.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).reverse();
export const formatLink = (title) => encodeURIComponent(title.toLowerCase().replace(/[^0-9a-zA-Z_\s]+/g, '').split(' ').slice(0, 4).join('-'));
export const formatAuthors = (post) => {
    if(post.fields?.authors?.length > 0) {
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
export const formatPostData = (allPosts) => sortByDate(allPosts
    .filter((post) => {
        if(post.fields?.dateOfPublication) {
            return new Date(post.fields?.dateOfPublication?.replace('T',' ')).getTime() > new Date().getTime();
        }
        return false;
    })
    .map((post) => {
        return {
            title: post.fields?.title || '',
            body: post.fields?.body || '',
            date: post.fields?.dateOfPublication?.replace('T',' ') || null,
            image: post.fields?.titleImage?.fields?.file || null,
            authors: formatAuthors(post),
            tags: formatTags(post.metadata?.tags) || [],
        }
    }));

export const formatAuthorData = (allAuthors) =>
    allAuthors.map((post) => {
        return {
            name: post?.fields?.name || '',
            body: post?.fields?.aboutSection || '',
            image: post?.fields?.headshot?.fields?.file || null,
        }
    });