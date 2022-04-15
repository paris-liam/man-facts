import Layout from '../components/layout'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getAboutUsData, getWriteForUsData } from '../lib/miscData';
import { createTagList } from '../lib/tags';
import * as logo from '../public/images/logo.png';
import { generateHomePosts } from '../lib/posts';
export default function WriteForUs({ tagList, sidePosts, writeForUsContent }) {
    const body = writeForUsContent.items[0].fields.writeForUs
  return (<Layout description={"Write For Us"} activeLink="write-for-us"  tagList={tagList} sidePosts={sidePosts} sideTitle="Top Posts"> 
    <div className='container-border'>
    <h1>Write For Us</h1>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div></div>
  </Layout>)
}

export async function getStaticProps() {
  const writeForUsContent = await getWriteForUsData();
  const tagList = await createTagList();
  const { popularPosts } = await generateHomePosts();
  return {
    props: {
        writeForUsContent,
        tagList,
        sidePosts: popularPosts
    }
  }
}