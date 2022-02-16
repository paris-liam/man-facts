import Layout from '../../components/layout'
import { generatePostPaths, getPostData } from '../../lib/posts'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.articleName);
  return {
    props: {
      postData: postData
    }
  }
}

const formatAuthorLink = (name) => {
  return !name ? '' : name.toLowerCase().split(' ').join('-');
}

export default function Post({ postData }) {
  let title, imgSrc, body, author, date = '';
  if(postData.res) {
    let data = postData.res.fields;
    title = data.title;
    body = data.body;
    date = new Date(data.dateOfPublication);
    imgSrc = data.titleImage.fields.file.url;
    author = data.author.fields.name
  }
  return (
  <Layout> 
    <img src={imgSrc}/>
    <h1 className='test'>{title}</h1>
    <h1 className='test2'>{title}</h1>
    <h1 className='test3'>{title}</h1>
    <h4>{date.toLocaleString()?.split(',')[0]} by <a className='author-link' href={formatAuthorLink(author)}>{author}</a></h4>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div>
  </Layout>)
}

export async function getStaticPaths() {
  const pathsArr = await generatePostPaths();
  return {
    paths: pathsArr,
    fallback: true
  }
}