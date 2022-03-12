import { formatLink } from "../lib/utils";


export default function SideList({posts}) {
    return (
    <>
    <h2>Top Posts</h2>
    <ul className='side-list'>
    {posts.map((post) => {
        return (
        <li className='side-list-item'><a href={'/posts/'+formatLink(post.title)}>
            {post.image ? <img className='side-list-item-image' src={post.image.url}/> : ''}
            <p className="side-list-item-text-title">{post.title}</p>
        </a>
        </li>
    )})}
</ul></>);
}