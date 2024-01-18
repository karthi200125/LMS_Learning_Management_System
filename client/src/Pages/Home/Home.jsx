import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Button from '../../MainPageComponents/Button/Button';
import Card from '../../MainPageComponents/Card/Card';
import Categories from '../../MainPageComponents/Categories/Categories';
import useCustomFetch from '../../Utils/CustomFetch';
import './Home.scss';
import Skeleton from '../../MainPageComponents/Skeleton/Skeleton';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const searchQuery = location.state;

  const { result, isLoading, error, fetchData } = useCustomFetch({
    url: `/course/getallcourses`,
    id: user?._id
  });

  const filteredData = useMemo(() => {
    if (searchQuery && typeof searchQuery === 'string' && Array.isArray(result)) {
      const queryLowerCase = searchQuery.toLowerCase();

      return result.filter((course) =>
        course.title?.toLowerCase()?.includes(queryLowerCase) ||
        course.description?.toLowerCase()?.includes(queryLowerCase) ||
        course.category?.toLowerCase()?.includes(queryLowerCase)
      );
    } else {
      return result;
    }
  }, [result, searchQuery]);

  const postsPerPage = 10;
  const totalPosts = Math.ceil(filteredData?.length / postsPerPage);

  const LastPost = currentPage * postsPerPage;
  const FirstPost = LastPost - postsPerPage;
  const currentCards = useMemo(() => filteredData?.slice(FirstPost, LastPost), [filteredData, FirstPost, LastPost]);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);


  return (
    <div className='home'>
      <Categories />
      <div className='cardcon'>
        <div className="cards">
          {isLoading ? (
            <Skeleton type="card" count={filteredData?.length}/>
          ) : (
            filteredData?.length > 0 ? (
              currentCards?.map((card) => (
                <Card key={card?._id} card={card} />
              ))
            ) : (
              <p>No search items found</p>
            )
          )}
        </div>
        {totalPosts?.length >= 10 &&
          <div className="pagination">
            <Button title="Prev" glow={false} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPosts }, (_, page) => (
              <Button key={page + 1} title={String(page + 1)} glow={false} onClick={() => paginate(page + 1)} active={currentPage === page + 1} />
            ))}
            <Button title="Next" glow={false} onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPosts} />
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
