import Layout from '../../components/layout'
import { getAllAuthorData } from '../../lib/authors';
import PostList from '../../components/postlist';
import { createTagList } from '../../lib/tags';
import { getAllPostData, getTopPosts } from '../../lib/posts';
import { sortByDate } from '../../lib/utils';
import {performFuseSearch} from '../../lib/search-utils'
export async function getServerSideProps({query}) {  
  const postData = await getAllPostData();
  const authorData = await getAllAuthorData();
  const tagList = await createTagList();
  const sidePosts = await getTopPosts();
  return {
    props: {
      postData,
      authorData,
      tagList,
      sidePosts,
      type: query.type,
      q: query.q ? query.q : null
    }
  }
}

export const findTaggedArticles = (articles, q) => sortByDate(articles.filter((article) => article.tags.includes(q)));

export const getTagName = (tagList, q) => tagList.find(tag => tag.id === q).displayName

export default function Collection({ sidePosts, postData, authorData, tagList, type, q}) {
  let results = [];
  let searchType = '';
  if(type === 'authors') {
    searchType = 'Brave Patriots';
    results = authorData
  }
  else if(type === 'tags') {
    searchType = getTagName(tagList, q);
    results = findTaggedArticles(postData, q);
  } else {
    searchType = `Search Results for: ${q}`; 
    console.warn([...postData,...authorData]);
    results = performFuseSearch([...postData,...authorData], q).map((post) => post.item);
  }
  console.warn(results);
  return (
  <Layout tagList={tagList} sidePosts={sidePosts} sideTitle={"Top Posts"}> 
    <h1 className="collection-header">{searchType}</h1>
    <PostList posts={results}></PostList>
    </Layout>)
}