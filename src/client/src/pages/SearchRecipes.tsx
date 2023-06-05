import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';
import { loadRecipes } from '../app/actions/recipes/loadRecipes';
import { addFavoriteRecipe } from '../app/actions/account/addFavoriteRecipe';
import Recipe from '../components/Recipe';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function SearchRecipes() {
  const [recipes, setRecipes] = useState([]);
  const storeRecipes = useSelector(state => state.recipes.recipes);
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.recipes.recipes);
  const searchCallback = useCallback((event, { queryString }) => {
    event.preventDefault();
    dispatch(loadRecipes(queryString));
  }, []);
  const clickCallback = useCallback(
    recipe => dispatch(addFavoriteRecipe(recipe)),
    [],
  );

  useEffect(() => {
    setRecipes(storeRecipes);
  }, [storeRecipes]);


  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error}/>;

  return (
    <main className='container'>
      <div className='content'>
        <Search searchCallback={searchCallback} />
        {recipes.length ?
          <div className='content__recipes'>
            {recipes.map((recipe, index) => <Recipe recipe={recipe}
              clickHandler={clickCallback}
              key={index} />)}
          </div> :
          <h3>No recipes</h3>}
      </div>
    </main>
  );
}

export default SearchRecipes;
