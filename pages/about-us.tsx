import Layout from '../components/layout'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getAboutUsData } from '../lib/miscData';
import { createTagList } from '../lib/tags';
import { getTopPosts } from '../lib/posts';

export default function AboutUs({ tagList, sidePosts, aboutUsContent }) {
    const body = aboutUsContent.items[0].fields.aboutUsContent
  return (<Layout tagList={tagList} sidePosts={sidePosts} sideTitle="Top Posts"> 
    <div className='container-border'>
    <h1>About Us</h1>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div></div>
  </Layout>)
}

export async function getStaticProps() {
  const aboutUsContent = await getAboutUsData();
  const tagList = await createTagList();
  const sidePosts = await getTopPosts();
  return {
    props: {
        aboutUsContent,
        tagList,
        sidePosts
    }
  }
}