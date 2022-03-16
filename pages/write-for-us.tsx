import Layout from '../components/layout'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getAboutUsData, getWriteForUsData } from '../lib/miscData';

export default function WriteForUs({ writeForUsContent }) {
    const body = writeForUsContent.items[0].fields.writeForUs
  return (<Layout tagList={tagList} sidePosts={sidePosts} sideTitle="Top Posts"> 
    <div className='container-border'>
    <h1>Write For Us</h1>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div></div>
  </Layout>)
}

export async function getStaticProps() {
  const writeForUsContent = await getWriteForUsData();
  const tagList = await createTagList();
  const sidePosts = await getTopPosts();
  return {
    props: {
        writeForUsContent,
        tagList,
        sidePosts
    }
  }
}