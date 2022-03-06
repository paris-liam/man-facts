import Layout from '../../components/layout'
import { generatePostPaths, getAllPostData, getPostData } from '../../lib/posts'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Header from '../../components/header';
import {createTagList} from '../../lib/tags'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.articleName);
  const sidePosts = await getAllPostData();
  const tagList = await createTagList();
  console.warn(postData);
  return {
    props: {
      postData,
      tagList,
      sidePosts
    }
  }
}

const formatAuthorLink = (name) => {
  return !name ? '' : name.toLowerCase().split(' ').join('-');
}

export default function Post({ postData, tagList, sidePosts }) {
  const {image, title, date, author, body} = postData;
  return (<Layout> 
    <div className='container-border'><img src={image}/>    
    <h1>{title}</h1>
    <h4>{date ? date.toLocaleString()?.split(',')[0] : ''} by <a className='author-link' href={formatAuthorLink(author)}>{author}</a></h4>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div></div>
  </Layout>)
}

export async function getStaticPaths() {
  const pathsArr = await generatePostPaths();
  return {
    paths: pathsArr,
    fallback: true
  }
}