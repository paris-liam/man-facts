import { formatLink } from "../lib/utils";


export default function PostList({posts}) {

    posts.forEach((post, index) => {
        let summary = '';
        let endOfBody = false
        const MAX_LENGTH = 150;
        if(post.body) { 
            while(summary.length < MAX_LENGTH && !endOfBody) {
                if(post.body.nodeType === 'document') {
                    post.body.content.forEach((paragraphContent) => {
                        paragraphContent.content.forEach((content) => {
                            if(content.value) {
                                summary += content.value.slice(0, MAX_LENGTH-summary.length) + ' ';
                            }
                        })
                    })
                } else {
                    post.body.content.forEach((content) => {
                        if(content.value) {
                            summary += content.value.slice(0, MAX_LENGTH-summary.length) + ' ';
                        }                    
                    })
                } 
                endOfBody = true;
            }
        }
        posts[index].summary = summary;
        summary = '';
    })

    return (<ul className='post-list container-border '>
    {posts.map((post) => {
        return (
        <li className='post-list-item'><a href={'/posts/'+formatLink(post.title)}>
            {post.image ? <img className='post-list-item-image' src={post.image}/> : ''}
            <div className="post-list-item-text-container">
                <h2 className="post-list-item-text-title">{post.title}</h2>
                <h3 className="post-list-item-text-date">{post.date}</h3>
                <p className="post-list-item-text-body">{post.summary}...</p>
            </div></a>
        </li>
    )})}
</ul>);
}