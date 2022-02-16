import Layout from '../../components/layout'
import { createTagList, generatePostPaths, getAllPostData, getPostData } from '../../lib/posts'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Header from '../../components/header';
import { getAllAuthorData } from '../../lib/authors';

export async function getServerSideProps({query}) {  
  const postData = await getAllPostData();
  const authorData = await getAllAuthorData();
  const tagList = await createTagList();

  return {
    props: {
      postData,
      authorData,
      tagList,
      type: query.type,
      q: query.q ? query.q : null
    }
  }
}

export function findTaggedArticles(articles, q) {
  return []; //TODO implement
}

export function performSearch(articles, q) {
  return []; //TODO implement
}

export default function Post({ postData, authorData, tagList, type, q}) {
  let results = [];
  let searchType = ''
  if(type === 'authors') {
    searchType = 'Brave Patriots';
    results = authorData.items; //TODO create standard format 
  }
  else if(type === 'tags') {
    searchType = q;
    results = findTaggedArticles(postData, q);
  } else {
    searchType = `Search Results for: ${q}`; 
  }
  return (
  <Layout> 
    <Header tagList={tagList}></Header>
    <div className='container-border'>
    <h1>{searchType}</h1>
    <ul className='results-container'>
      {results.map((result) => {
        return <li>{result.title}</li> //TODO: format results 
      })}
    </ul>
    </div>
    </Layout>)
}