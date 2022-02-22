export const formatLink = (title) => encodeURIComponent(title.toLowerCase().replace(/[^0-9a-zA-Z_\s]+/g, '').split(' ').slice(0,4).join('-'));

export const  formatPostData = (allPosts) => allPosts.map((post) => {
        return {
        title: post.fields.title || '',
        body: post.fields.body || '',
        date: post.fields.dateOfPublication || null,
        image: post.fields.titleImage.fields.file.url || null,
        author: post.fields.author.fields.name || '',
        tags: post.metadata && post.metadata.tags ? post.metadata.tags : [],
        } 
    })

export const formatAuthorData = (allAuthors) =>
    allAuthors.map((post) => {
        return {
        name: post.fields.name || '',
        body: post.fields.aboutSection || '',
        image: post.fields.headshot?.fields.file.url || null,
        } 
    });