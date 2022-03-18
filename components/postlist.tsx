import { checkValidDate, formatLink } from "../lib/utils";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Link from 'next/link';

interface PostListProps {
    title?: string;
    posts: Array<any>
}

export default function PostList({ title, posts }: PostListProps) {
    posts.forEach((post, index) => {
        let summary = '';
        const MAX_LENGTH = 150;
        if (post.body) {
            let bodyString = documentToHtmlString(post.body) || '';
            let parsed = bodyString.replace(/<[^<>]+>/gi, ' ');
            summary = parsed.substring(0, MAX_LENGTH) + '...';
        }
        post.summary = summary;
        post.validDate = checkValidDate(post.date);
    })

    return (
        <>
            <h2 className="post-list-title">{title}</h2>
            <ul className='post-list'>
                {posts.map((post) => {
                    return (
                        <li key={post.title} className='post-list-item'>
                            <Link href={'/posts/' + formatLink(post.title)}><a>
                                {post.image ? <img className='post-list-item-image' src={post.image.url} /> : ''}
                                <div className="post-list-item-text-container" style={{ marginLeft: !post.image && post.isAuthor ? '0' : 'auto' }}>
                                    <p className="post-list-item-text-body">
                                        {post.date && post.validDate && !post.isAuthor ? new Date(post.date).toLocaleString()?.split(',')[0] : ''}
                                        {!post.isAuthor && ' by' } {post.authors && !post.isAuthor && post.authors.map((author, index) =>
                                        <span key={author}>{author} {index !== post.authors.length - 1 ? ',' : ''} </span>)}
                                    </p>
                                    <h3 className="post-list-item-text-title">{post.title}</h3>
                                    {!post.isAuthor && <p className="post-list-item-text-body">{post.summary}</p>}
                                </div>
                            </a></Link>
                        </li>
            )
                })}
        </ul></>);
}