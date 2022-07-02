import { formatLink } from "../lib/utils";
import Link from 'next/link';


export default function SideList({title, posts}) {
    return (
    <>
    <h2 className="side-list-title">{title}</h2>
    <ul className='side-list'>
    {posts.map((post) => {
        return (
        <li className='side-list-item' key={post.title}><Link  href={'/posts/'+formatLink(post.title, true)}><a>
            {post.image ? <img className='side-list-item-image' src={post.image.url}/> : ''}
            <p className="side-list-item-text-title">{post.title}</p>
        </a></Link>
        </li>
    )})}
</ul></>);
}