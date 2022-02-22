import { formatLink } from "../lib/utils";


export default function SideList({posts}) {
    return (<ul className='side-list container-border '>
    {posts.map((post) => {
        return (
        <li className='side-list-item'><a href={'/posts/'+formatLink(post.title)}>
            {post.image ? <img className='side-list-item-image' src={post.image}/> : ''}
            <div className="side-list-item-text-container">
                <h2 className="side-list-item-text-title">{post.title}</h2>
                <h3 className="side-list-item-text-date">{post.date}</h3>
            </div></a>
        </li>
    )})}
</ul>);
}