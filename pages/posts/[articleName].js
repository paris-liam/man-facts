import Layout from '../../components/layout'
import { generatePostPaths, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.articleName)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
    return (<Layout>
      xx{postData.res.fields.title}xx
    </Layout>
    )
  }

export async function getStaticPaths() {
    const pathsArr = await generatePostPaths();
    return {
      paths: pathsArr,
      fallback: true
    }
  }