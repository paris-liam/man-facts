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
  let title, imgSrc, body, author, date = '';
  if(postData && postData.res) {
    let data = postData.res.fields;
    title = data.title;
    body = data.body;
    date = new Date(data.dateOfPublication);
    imgSrc = data.titleImage.fields.file.url;
    author = data.author.fields.name
  }
  return (
  <Layout> 
    <Header tagList={tagList}></Header>
    <div className='container-border'><img src={imgSrc}/>
    <h1>{title}</h1>
    <h4>{date.toLocaleString()?.split(',')[0]} by <a className='author-link' href={formatAuthorLink(author)}>{author}</a></h4>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div>
    </div></Layout>)
}

export async function getStaticPaths() {
  const pathsArr = await generatePostPaths();
  return {
    paths: pathsArr,
    fallback: true
  }
}