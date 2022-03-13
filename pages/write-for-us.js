import Layout from '../components/layout'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getAboutUsData, getWriteForUsData } from '../lib/miscData';

export async function getStaticProps() {
  const writeForUsContent = await getWriteForUsData();
  return {
    props: {
        writeForUsContent
    }
  }
}

export default function WriteForUs({ writeForUsContent }) {
    const body = writeForUsContent.items[0].fields.writeForUs
  return (<Layout> 
    <div className='container-border'>
    <h1>Write For Us</h1>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div></div>
  </Layout>)
}