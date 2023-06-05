import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Recipe from '../components/Recipe';
import ErrorMessage from '../components/ErrorMessage';
import { loadFavoriteRecipes } from '../app/actions/account/loadFavoriteRecipes';
import Loader from '../components/Loader';
import { deleteFavoriteRecipe } from '../app/actions/account/deleteFavoriteRecipe';

function User() {
  const userRecipes = useSelector(state => state.account.userRecipes);
  const { error, loading } = useSelector(state => state.account);
  const dispatch = useDispatch();
  const deleteHandler = useCallback(recipe => {
    dispatch(deleteFavoriteRecipe(recipe));
  },
  [],
  );

  useEffect(() => {
    dispatch(loadFavoriteRecipes());
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error}/>;

  return (
    <main className='container'>
      <div className='content'>
        <h3>Here is your precious recipes you added to favourites</h3>
        {userRecipes ? <div className='content__recipes'>
          {userRecipes.map((recipe, index) => <Recipe recipe={recipe} key={index} deleteHandler={deleteHandler} />)}
        </div> :
          <h3>No recipes</h3>}
      </div>
    </main>
  );
}

export default User;