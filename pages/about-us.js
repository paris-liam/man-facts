import Layout from '../components/layout'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getAboutUsData } from '../lib/miscData';

export async function getStaticProps() {
  const aboutUsContent = await getAboutUsData();
  return {
    props: {
        aboutUsContent
    }
  }
}

export default function AboutUs({ aboutUsContent }) {
    const body = aboutUsContent.items[0].fields.aboutUsContent
  return (<Layout> 
    <div className='container-border'>
    <h1>About Us</h1>
    <div dangerouslySetInnerHTML={{__html: documentToHtmlString(body)}}></div></div>
  </Layout>)
}