import Layout from '../../components/layout'
import { createTagList, generatePostPaths, getPostData } from '../../lib/posts'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Header from '../../components/header';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.articleName);
  const tagList = await createTagList();
  return {
    props: {
      postData,
      tagList
    }
  }
}

const formatAuthorLink = (name) => {
  return !name ? '' : name.toLowerCase().split(' ').join('-');
}

export default function Post({ postData, tagList }) {
  return (<Layout> 
    <Header tagList={tagList}></Header>
    <div className='container-border'><img src={postData.image}/>
    <h1>{postData.title}</h1>
    <h4>{postData.date ? postData.data.toLocaleString()?.split(',')[0] : ''} by <a className='author-link' href={formatAuthorLink(post.author)}>{post.author}</a></h4>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(post.body)}}></div>
    </div></Layout>)
}

export async function getStaticPaths() {
  const pathsArr = await generatePostPaths();
  return {
    paths: pathsArr,
    fallback: true
  }
}