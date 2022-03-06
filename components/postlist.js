import { formatLink } from "../lib/utils";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';


export default function PostList({posts}) {

    posts.forEach((post, index) => {
        let summary = '';
        const MAX_LENGTH = 150;
        if(post.body) {
            let bodyString = documentToHtmlString(post.body).replaceAll(/<[a-z]>|<\/[a-z]>/g, ' ')
            summary = bodyString.substring(0,MAX_LENGTH) + '...';
        }
        posts[index].summary = summary;
    })

    return (<ul className='post-list'>
    {posts.map((post) => {
        return (
        <li className='post-list-item'><a href={'/posts/'+formatLink(post.title)}>
            {post.image ? <img className='post-list-item-image' src={post.image.url}/> : ''}
            <div className="post-list-item-text-container">
                <h3 className="post-list-item-text-title">
                    {post.title}<br/><br/>  
                    {post.date ? new Date(post.date).toLocaleString()?.split(',')[0] : ''} by {post.author}</h3>
                <p className="post-list-item-text-body">{post.summary}</p>
            </div></a>
        </li>
    )})}
</ul>);
}