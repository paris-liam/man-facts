import Layout from '../../components/layout'
import { getRelatedPosts, generatePostPaths, getPostData, } from '../../lib/posts'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { createTagList } from '../../lib/tags'
import Link from 'next/link';
import { checkValidDate, formatLink } from '../../lib/utils';
import { useRouter } from 'next/router'
import absoluteUrl from 'next-absolute-url';

const formatAuthorLink = (name) => {
  return !name ? '' : name.toLowerCase().split(' ').join('-');
}

export default function Post({ postData, tagList, sidePosts, req }) {
  const { image, title, date, authors, body } = postData || '';
  validDate = checkValidDate(post.date);
  const router = useRouter();
  const shareLink = `https://man-facts.org${router.asPath}`;
  return (<Layout tagList={tagList} sidePosts={sidePosts} sideTitle="Related Posts">
    <div className='container-border post-container'>
      {image && image.url && <img src={image.url} />}
      <h1>{title}</h1>
      <h4>
        {date && validDate ? new Date(date).toLocaleString()?.split(',')[0] : ''}{' '} 
      {authors && (
        <>
          <span>by</span>{' '}
          {authors.map((author,index) => (
            <><Link key={author} href={'/authors/' + formatAuthorLink(author)}>
              <a className='author-link'>{author}</a>
            </Link>
            {index === authors.length - 1 ? '' : ','}{' '}
            </>
          ))}
        </>
      )}
      </h4>
      <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(body) }}>
      </div>
      <a className="resp-sharing-button__link" href={`https://facebook.com/sharer/sharer.php?u=${shareLink}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm3.6 11.5h-2.1v7h-3v-7h-2v-2h2V8.34c0-1.1.35-2.82 2.65-2.82h2.35v2.3h-1.4c-.25 0-.6.13-.6.66V9.5h2.34l-.24 2z" /></svg>
        </div>Share on Facebook</div>
      </a>

      <a className="resp-sharing-button__link" href={`https://twitter.com/intent/tweet/?text=${shareLink}`} target="_blank" rel="noreferrer" aria-label="Share on Twitter">
        <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm5.26 9.38v.34c0 3.48-2.64 7.5-7.48 7.5-1.48 0-2.87-.44-4.03-1.2 1.37.17 2.77-.2 3.9-1.08-1.16-.02-2.13-.78-2.46-1.83.38.1.8.07 1.17-.03-1.2-.24-2.1-1.3-2.1-2.58v-.05c.35.2.75.32 1.18.33-.7-.47-1.17-1.28-1.17-2.2 0-.47.13-.92.36-1.3C7.94 8.85 9.88 9.9 12.06 10c-.04-.2-.06-.4-.06-.6 0-1.46 1.18-2.63 2.63-2.63.76 0 1.44.3 1.92.82.6-.12 1.95-.27 1.95-.27-.35.53-.72 1.66-1.24 2.04z" /></svg>
        </div>Share on Twitter</div>
      </a>
    </div>
  </Layout>)
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.articleName);
  const sidePosts = await getRelatedPosts(postData);
  const tagList = await createTagList();
  return {
    props: {
      postData,
      tagList,
      sidePosts
    }
  }
}

export async function getStaticPaths() {
  const pathsArr = await generatePostPaths();
  return {
    paths: pathsArr,
    fallback: true
  }
}