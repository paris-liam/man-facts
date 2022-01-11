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
  if(postData && postData.res) {
    let data = postData.res.fields;
    title = data.title;
    body = data.body;
    date = new Date(data.dateOfPublication);
    imgSrc = data.titleImage.fields.file.url;
    author = data.author.fields.name
    console.warn(postData);
  }
  return (
  <Layout> 
    <img src={imgSrc}/>
    <h1>{title}</h1>
    <h2>{date.toLocaleString()} by <a href={formatAuthorLink(author)}>{author}</a></h2>

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