import React, { useState, useEffect } from 'react';
import { orderBy, limit } from 'firebase/firestore';
import { Footer, Navbar, dbBlogArticles } from './App';
import './BlogGuide.css';

function BlogArticle({ text }) {
    // Esto es para presentar la primera línea del artículo como el título
    const paragraphs = text.split('\n');
    const title = paragraphs[0];
    const body = paragraphs.slice(1);
    return <div className="blog_article">
        <h2 className="blog_article_title">{title ?? ''}</h2>
        {body.map((par, idx) => <p key={idx} className="blog_article_body">{par}</p>)}
    </div>
}

export function BlogGuide({ setPage, user }) {
    useEffect(() => void window.history.pushState(null, "", "blogGuide"), []);
    const [blogArticles, setBlogArticles] = useState([]);
    // Cargamos 4 artículos por defecto
    // Cargamos 4 más cuando el usuario hace click en "cargar más"
    const [shownArticleCount, setShownArticleCount] = useState(4);
    const [totalArticleCount, setTotalArticleCount] = useState(0);
    // Ocultamos el botón si estamos cargando artículos o si no hay más que mostrar
    const [showMoreHidden, setShowMoreHidden] = useState(false);

    async function loadBlogArticles(articleCount) {
        const articles = await dbBlogArticles.get(orderBy('date'), limit(articleCount));
        setBlogArticles(articles.map((article) => article.text));
    }

    async function showMoreArticles() {
        setShowMoreHidden(true);
        if (shownArticleCount >= totalArticleCount) return;
        const newShownArticleCount = shownArticleCount + 4;
        await loadBlogArticles(newShownArticleCount);
        setShownArticleCount(newShownArticleCount);
        if (newShownArticleCount <= totalArticleCount) setShowMoreHidden(false);
    }

    useEffect(() => void loadBlogArticles(shownArticleCount), []);
    useEffect(() => void dbBlogArticles.count().then((c) => void setTotalArticleCount(c)), []);

    return <>
        <Navbar setPage={setPage} user={user} />
        <div className="blog_home-page">
            <div className="blog_hero-section">
                <div className="blog_hero-content">
                    <h1 className="blog_main-title"> Guía </h1>
                    <h2 className="blog_subtitle">
                        Más que un reto: una experiencia. Aquí tendrás:
                        rutas, reseñas, consejos y muchas otras cosas.
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
                {blogArticles.map((text, idx) =>
                    <li className="li_unformatted" key={idx}><BlogArticle text={text} /> </li>
                )}
                <button className='blog_load-more' hidden={showMoreHidden} onClick={showMoreArticles}>
                    Cargár más
                </button>
            </div>
        </div>
        <Footer />
    </>;

}
