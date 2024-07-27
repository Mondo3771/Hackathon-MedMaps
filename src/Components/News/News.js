import React, { useState, useEffect } from 'react';
import { Article,Wrapper } from './News.styles';

const News = () => {
  const [articles, setArticles] = useState([
    // {title:'Paris Olympics safety concerns and tips - CBS News"'},
    // {title:'Paris Olympics safety concerns and tips - CBS News"'},
    // {title:'Paris Olympics safety concerns and tips - CBS Newswqfqwfq"'},
    // {title:'Paris Olympics safety concerns and tips - CBS News"'}

  ]);

  useEffect(() => {
    const fetchArticles = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=za&category=health&apiKey=1e98a2df3a274dd9bc267a9f9f07ca2f`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchArticles();
}, []); 

  return (
    <Wrapper>
            <h1>Trending articles</h1>

      {articles && articles.map((item, index) => (
             <a href={item.url} >
       
              

        <Article key={index}>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" height={50} width={50}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
</svg>


          <p>{item.title}</p>
          {console.log(item)}
        </Article>
        </a>
      ))}
    </Wrapper>
  );
};

export default News;
