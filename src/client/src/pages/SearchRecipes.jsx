import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';
import { loadRecipes } from '../app/actions/recipes/loadRecipes';
import { addUserRecipe } from '../app/actions/account/addUserRecipe';
import Recipe from '../components/Recipe';
import Loader from '../components/Loader';
function SearchRecipes() {
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.recipes.recipes);
  const searchCallback = useCallback((event, { queryString }) => {
    event.preventDefault();
    dispatch(loadRecipes(queryString));
    const newRecipes = useSelector(state => state.recipes.recipes);
    setRecipes(newRecipes);
  }, [recipes]);
  const clickCallback = useCallback(
    recipe => dispatch(addUserRecipe(recipe)),
    [],
  );

  if (loading) return <Loader />;
  if (error) return <pre>Error occurred: {error.message}</pre>;

  return (
    <main className="container">
      <div className="content">
        <Search searchCallback={searchCallback}/>
        { recipes.length ?
          <div className="content__recipes">
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
