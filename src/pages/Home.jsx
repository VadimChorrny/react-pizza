import React, { useRef } from 'react';
import { useEffect } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzasSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { list } from '../components/Sort';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false); // для перевірки першого рендеру

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  const searchValue = useSelector((state) => state.filterSlice.searchValue);
  const { items, status } = useSelector(pizzaSelector);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangeCurrentPage = (id) => {
    dispatch(setCurrentPage(id));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `search=${searchValue}` : '';

    try {
      dispatch(
        fetchPizzas({
          category,
          sortBy,
          order,
          search,
          currentPage,
        }),
      );
    } catch (error) {
      // setIsLoading(false);
      console.error('Error while loading items: ' + error.message);
    } finally {
      // setIsLoading(false);
    }
  };

  // якщо був перший рендер, тоді робимо запит на піцци
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) getPizzas();

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // якщо змінили параметри та був перший рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  // якщо був перший рендер, то перевіряєм URL-параметри та зберігаємо в редаксі
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {}, []);

  const pizzas = items.map((res, idx) => <PizzaBlock {...res} key={idx} />);
  const skeletons = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={onClickCategory} // props drilling
        />
        <Sort />
      </div>
      <h2 className='content__title'>Всі піци</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Сталась помилка 😔</h2>
          <p>Нажаль, не вдалось отримати піци :(</p>
          <p>Спробуйте повторити пізніше.</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => onChangeCurrentPage(number)}
      />
    </div>
  );
};

export default Home;
