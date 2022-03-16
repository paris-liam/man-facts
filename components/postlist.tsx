import { formatLink } from "../lib/utils";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Link from 'next/link';


export default function PostList({posts}) {

    posts.forEach((post, index) => {
        let summary = '';
        const MAX_LENGTH = 150;
        if(post.body) {
            let bodyString = documentToHtmlString(post.body) || '';
            let parsed = bodyString.replaceAll(/<[^<>]+>/g, ' ');
            summary = parsed.substring(0,MAX_LENGTH) + '...';
        }
        posts[index].summary = summary;
    })

    return (<ul className='post-list'>
    {posts.map((post) => {
        return (
        <li key={post.title} className='post-list-item'><Link  href={'/posts/'+formatLink(post.title)}><a>
            {post.image ? <img className='post-list-item-image' src={post.image.url}/> : ''}
            <div className="post-list-item-text-container">
                <h3 className="post-list-item-text-title">
                    {post.title}<br/><br/>  
                    {post.date ? new Date(post.date).toLocaleString()?.split(',')[0] : ''} by {post.authors && post.authors.map((author) => <span key={author}>{author}, </span> )}</h3>
                <p className="post-list-item-text-body">{post.summary}</p>
            </div></a></Link>
        </li>
    )})}
</ul>);
}