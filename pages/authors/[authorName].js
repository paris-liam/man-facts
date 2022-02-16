import Layout from '../../components/layout'
import { generateAuthorPaths, getAuthorData } from '../../lib/authors'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Header from '../../components/header';
import { createTagList } from '../../lib/posts';

export async function getStaticProps({ params }) {
  const authorData = await getAuthorData(params.authorName);
  const tagList = await createTagList();

  return {
    props: {
      authorData,
      tagList
    }
  }
}

export default function Author({ authorData, tagList }) {
  let name, imgSrc, body = '';
  let articleList = [];
  if(authorData && authorData.res) {
    let data = authorData.res.fields;
    name = data.name;
    body = data.aboutSection;
    imgSrc = data.headshot?.fields?.file.url;
    articleList = authorData.res.articleList;
  }
  return (
  <Layout> 
    <Header tagList={tagList}></Header>
    <div className='container-border'><img src={imgSrc}/>
    <h1>{name}</h1>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div>
    <div>
      <h2>Articles by {name}:</h2>
      <ul>
        {articleList.map((article) => {
          return (<li key={article.name}>
            <a href={article.link}>
              {article.name}
            </a>
          </li>)
        })}
      </ul>    
    </div></div>
  </Layout>)
}
export async function getStaticPaths() {
    const paths = await generateAuthorPaths();
    return {
      paths,
      fallback: false
    }
  }