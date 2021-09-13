import React, { useState, useEffect } from 'react';
import { getTrending } from '../api/tmdb';

export const Billboard = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getTrending().then((res) => {
      console.log(res);
      setTrendingList(res.data.results);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () =>{
    console.log('hi')
    setPage((prevPage) =>
      prevPage >= trendingList.length - 1 ? 0 : prevPage + 1
    );
  }
  const handlePrev = () =>
    page <= 0 ? setPage(trendingList.length - 1) : setPage(page - 1);

  const render = () => (
    <div>
      <img
        className="w-screen o"
        src={`https://image.tmdb.org/t/p/original/${trendingList[page].backdrop_path}`}
      ></img>
    </div>
  );

  return (
    <div>
      <div className="max-h-screen overflow-hidden">
        <div>{trendingList.length !== 0 ? render() : null}</div>
      </div>
      <div className="h-20 text-white bg-gray-600">
        <button classname="bg-gray-900 p-4" onClick={handlePrev}>
          Prev
        </button>
        <br />
        <button classname="bg-gray-900 p-4" onClick={handleNext}>
          next
        </button>
      </div>
    </div>
  );
};
