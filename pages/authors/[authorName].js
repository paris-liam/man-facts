import Layout from '../../components/layout'
import { generateAuthorPaths, getAuthorData } from '../../lib/authors'

export async function getStaticProps({ params }) {
  const authorData = await getAuthorData(params.authorName)
  return {
    props: {
      authorData
    }
  }
}

export default function Post({ authorData }) {
    return (
      <Layout>
        {authorData.res.fields.name}
      </Layout>
    )
  }

export async function getStaticPaths() {
    const paths = await generateAuthorPaths()
    return {
      paths,
      fallback: false
    }
  }