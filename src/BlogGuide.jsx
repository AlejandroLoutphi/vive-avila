import React, { useState, useEffect } from 'react';
import { query, getDocs, orderBy, limit, getCountFromServer } from 'firebase/firestore';
import { Footer, Navbar, firebaseBlogArticlesCollection } from './App';
import './BlogGuide.css';

export function BlogArticle({ text }) {
    const firstNewLineIndex = text.indexOf("\n");
    const title = firstNewLineIndex != -1 ? text.slice(0, firstNewLineIndex) : text;
    const body = firstNewLineIndex != -1 ? text.slice(firstNewLineIndex, undefined) : '';
    return <div className="blog_article">
        <h2 className="blog_article_title">{title}</h2>
        <p className="blog_article_body">{body}</p>
    </div>
}

export function BlogGuide({ setPage, user }) {
    const [blogArticles, setBlogArticles] = useState([]);
    const [shownArticles, setShownArticles] = useState(4);
    const [articleCount, setArticleCount] = useState(0);
    const [showMoreHidden, setShowMoreHidden] = useState(false);

    async function loadBlogArticles() {
        const q = query(firebaseBlogArticlesCollection, orderBy('date', 'desc'), limit(shownArticles));
        const querySnapshot = await getDocs(q);
        setBlogArticles(querySnapshot.docs.map((doc) => doc.data().text));
    }

    async function showMoreArticles() {
        setShowMoreHidden(true);
        if (shownArticles >= articleCount) return;
        setShownArticles((shownArticles) => shownArticles + 4);
        await loadBlogArticles();
        setShowMoreHidden(false);
    }

    useEffect(() => { loadBlogArticles(); }, []);
    useEffect(() => {
        setArticleCount(getCountFromServer(query(firebaseBlogArticlesCollection)));
    }, []);

    const blogArticlesJsx = blogArticles.map((text, idx) =>
        <li className="li_unformatted" key={idx}><BlogArticle text={text} /> </li>
    );

    return <>
        <Navbar setPage={setPage} user={user} />
        <div className="blog_home-page">
            <div className="blog_hero-section">
                <div className="blog_hero-content">
                    <h1 className="blog_main-title"> Guía </h1>
                    <h2 className="blog_subtitle">
                        Más que un reto: una experiencia. Aquí tendras:
                        Rutas, Reseñas, Personal y muchas otras cosas.
                    </h2>
                </div>
                <img
                    loading="lazy"
                    src="/blogGuide_hero.jpg"
                    className="blog_hero-background"
                    alt="Hero background"
                />
            </div>
            <div className="blog_main-content">
                {blogArticlesJsx}
                <button className='blog_load-more' hidden={showMoreHidden} onClick={showMoreArticles}>
                    Cargár más
                </button>
            </div>
        </div>
        <Footer />
    </>
}
