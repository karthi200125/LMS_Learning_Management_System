import React, { useState } from 'react';
import Card from '../../MainPageComponents/Card/Card';
import Categories from '../../MainPageComponents/Categories/Categories';
import Button from '../../MainPageComponents/Button/Button';
import java from '../../assets/java.jfif';
import './Home.scss';

const Home = () => {
  const cards = [
    {
      id: 1,
      title: "one",
      img: java,
      cat: "engineering",
      chapters: 10,
    },
    {
      id: 2,
      title: "two",
      img: java,
      cat: "engineering",
      chapters: 10,
    },
    {
      id: 3,
      title: "three",
      img: java,
      cat: "engineering",
      chapters: 10,
    },
    {
      id: 4,
      title: "three",
      img: java,
      cat: "engineering",
      chapters: 10,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const totalPosts = Math.ceil(cards.length / postsPerPage);

  const LastPost = currentPage * postsPerPage;
  const FirstPost = LastPost - postsPerPage;
  const currentCards = cards.slice(FirstPost, LastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='home'>
      <Categories />
      <div className='cardcon'>
        <div className="cards">
          {currentCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        <div className="pagination">
          <Button title="Prev" glow={false} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPosts }, (_, page) => (
            <Button key={page + 1} title={String(page + 1)} glow={false} onClick={() => paginate(page + 1)} active={currentPage === page + 1} />
          ))}
          <Button title="Next" glow={false} onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPosts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
