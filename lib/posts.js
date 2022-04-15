import { createContentfulClient, formatLink, formatPostData, sortByDate } from "./utils";

export const TOP_POST_TAG_NAME = 'topPost';
export const TRENDING_POST_TAG_NAME = 'trendingPost';
export const POPULAR_POST_TAG_NAME = 'popularPost';
const NUMBER_OF_RECENT_POSTS = 20;
const NUMBER_OF_TRENDING_POSTS = 10;
const NUMBER_OF_POPULAR_POSTS = 4;

const filterTopPosts = (posts) => posts.filter((post) => {
  return post.tags.includes(TOP_POST_TAG_NAME)
});

const getRecentPosts = (posts) => sortByDate(posts.splice(0, NUMBER_OF_RECENT_POSTS));

const filterTrendingPosts = (posts) => {
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  const postsTrendingTagRemoved = sortByDate(posts.filter((post) => {
    return post.tags.includes(TRENDING_POST_TAG_NAME)
  }));
  const lastMonthPosts = postsTrendingTagRemoved.filter((post) => new Date(post.date).getTime() - lastMonthDate.getTime() >= 0);
  const sortedTrendingPosts = sortByDate(lastMonthPosts.sort(() => .5 - Math.random()).splice(0, NUMBER_OF_TRENDING_POSTS));
  return [...postsTrendingTagRemoved, ...sortedTrendingPosts, ...posts].slice(0, NUMBER_OF_TRENDING_POSTS);
};

const filterPopularPosts = (posts) => {
  const postsPopularTagRemoved = sortByDate(posts.filter((post) => {
    return post.tags.includes(TRENDING_POST_TAG_NAME)
  }));
  const remainingPopular = sortByDate(postsPopularTagRemoved.sort(() => .5 - Math.random()).splice(0, NUMBER_OF_POPULAR_POSTS));
  return [...postsPopularTagRemoved, ...remainingPopular].splice(0, NUMBER_OF_POPULAR_POSTS);
};

const removeFilteredPosts = (filteredPosts, allPosts) => {
  const filteredPostTitles = filteredPosts.map((post) => post.title);
  return sortByDate(allPosts.filter((post) => !filteredPostTitles.includes(post.title)));
}

export async function getAllPostData() {

  const allPosts = await createContentfulClient().getEntries({ content_type: 'blogPost', limit: 1000 });

  return formatPostData(allPosts.items);
}

export async function generateHomePosts() {
  const postData = await getAllPostData();
  //grab top posts
  const topPosts = sortByDate(filterTopPosts(postData));
  const postDataTopRemoved = removeFilteredPosts(topPosts, postData);
  //grab recent posts
  const recentPosts = getRecentPosts(postDataTopRemoved);
  const postDataRecentRemoved = removeFilteredPosts(recentPosts, postDataTopRemoved);
  //filter out the last month of posts and randomize
  const trendingPosts = filterTrendingPosts(postDataRecentRemoved);
  const postDataTrendingRemoved = removeFilteredPosts(trendingPosts, postDataRecentRemoved);
  //randomize from all time 
  const popularPosts = filterPopularPosts(postDataTrendingRemoved);

  //TEMP combining popular and trending is not being used

  const tempPopularPosts = [...trendingPosts, ...popularPosts].slice(0, NUMBER_OF_POPULAR_POSTS);
  return {
    topPosts,
    recentPosts,
    trendingPosts,
    popularPosts: tempPopularPosts
  }
}

export async function getRelatedPosts(articleInfo) {
  const postData = await getAllPostData();
  let articlesToRemove = [articleInfo];
  //grab posts with the same tags
  const taggedPost = postData.filter((post) => {
    return post.tags.filter((tag) => articleInfo.tags.includes(tag)).length > 0;
  })
  const taggedPostRemoved = taggedPost.filter((post) => {
    return !articlesToRemove.find((removePost) => post.title === removePost.title);
  });

  if (taggedPostRemoved.length >= 3) {
    return taggedPostRemoved.slice(0, 3);
  }
  //grab posts with same author
  const authorPosts = postData.filter((post) => {
    return post.authors.filter((author) => articleInfo.authors.includes(author)).length > 0;
  });
  const authorPostsRemoved = authorPosts.filter((post) => {
    return !articlesToRemove.find((removePost) => post.title === removePost.title);
  });
  if ([...taggedPostRemoved, ...authorPostsRemoved].length >= 3) {
    return [...taggedPost, ...authorPosts].slice(0, 3);
  }


  return [...taggedPostRemoved, ...authorPostsRemoved, ...postData.sort(() => .5 - Math.random())].slice(0, 3);
}

export async function generatePostPaths() {
  const postData = await getAllPostData();
  return postData.filter((post) => post.title).map((post) => {
    return '/posts/' + formatLink(post.title)
  });
}

export async function getPostData(articleName) {
  const posts = await getAllPostData();

  return posts.find((post) => {
    return articleName === formatLink(post.title)
  })
}



