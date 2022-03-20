import { formatLink } from "../lib/utils";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Link from 'next/link';
import { useEffect, useState } from "react";


export default function ThreePostShuffle({ posts, title }) {
    const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 3));
    const [currentIndex, setCurrentIndex] = useState(3);
    posts.forEach((post, index) => {
        let summary = '';
        const MAX_LENGTH = 150;
        if (post.body) {
            let bodyString = documentToHtmlString(post.body) || '';
            let parsed = bodyString.replace(/<[^<>]+>/gi, ' ');
            summary = parsed.substring(0, MAX_LENGTH) + '...';
        }
        posts[index].summary = summary;
    });

    useEffect(() => {
        let newSlides = [];
        if(currentIndex < 0) {
            newSlides.push(posts.reverse().slice(0,(currentIndex * -1)));
            setDisplayedPosts([...newSlides, posts.slice(0,3 - currentIndex * -1 )])
        } else if(currentIndex > posts.length - 1) {
            newSlides.push(posts.reverse().slice(0,currentIndex - posts.length -1));
            setDisplayedPosts([...newSlides, posts.slice(0,3 - currentIndex * -1 )])
        } else {
            setDisplayedPosts(posts.slice(currentIndex, currentIndex-3));
        }
    }, [currentIndex]);

    useEffect(() => {


    }, [displayedPosts])

    function moveShuffle(direction) {
        let newIndex = currentIndex + (direction * 3);
        if (newIndex <= -2) {
            newIndex = posts.length - 1;
        } else if (newIndex > posts.length+2) {
            newIndex = 0;
        }
        return setCurrentIndex(newIndex)
    }

    return (
        <div className='three-post-shuffle'>
            <div className='three-post-shuffle-title-row'>
                <h3 className='three-post-shuffle-title-row-title'>{title}</h3>
                <div className="three-post-shuffle-title-row-button-container">
                    <button onClick={() => { moveShuffle(1) }} className='three-post-shuffle-button'><i className="fa-solid fa-arrow-left"></i></button>
                    <button onClick={() => { moveShuffle(-1) }} className='three-post-shuffle-button'><i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
            <div className="three-post-shuffle-post-container">
                {displayedPosts.map((post,index) => <div key={displayedPosts[0].title} className={`${index === 0 ? 'shuffle-item-large' : 'shuffle-item-small'}`}><Link href={'/posts/' + formatLink(displayedPosts[0].title)}><a>
                    {displayedPosts[0].image ? <img className='post-list-item-image' src={displayedPosts[0].image.url} /> : ''}
                    <div className="post-list-item-text-container">
                        <h3 className="post-list-item-text-title">
                            {displayedPosts[0].title}<br /><br />
                        </h3>
                        <p className="post-list-item-text-body">{displayedPosts[0].summary}</p>
                    </div></a></Link>
                </div>)}
            </div>
        </div>
    );
}