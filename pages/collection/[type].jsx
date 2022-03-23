import Layout from '../../components/layout'
import { getAllAuthorData } from '../../lib/authors';
import PostList from '../../components/postlist';
import { createTagList } from '../../lib/tags';
import { getAllPostData, getTopPosts } from '../../lib/posts';
import { sortByDate } from '../../lib/utils';
import {performFuseSearch} from '../../lib/search-utils';
import * as logo from '../../public/images/logo.png';
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
  let activelink = '';
  if(type === 'authors') {
    searchType = 'Authors';
    results = authorData
    activelink = type;
  }
  else if(type === 'tags') {
    searchType = getTagName(tagList, q);
    results = findTaggedArticles(postData, q);
    activelink = q;
  } else {
    searchType = `Search Results for: ${q}`; 
    results = performFuseSearch([...postData,...authorData], q).map((post) => post.item);
  }
  return (
  <Layout description={searchType}  activeLink={activelink} tagList={tagList} sidePosts={sidePosts} sideTitle={"Top Posts"}> 
    <h1 className="collection-header">{searchType}</h1>
    <PostList posts={results}></PostList>
    </Layout>)
}