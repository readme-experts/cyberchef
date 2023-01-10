import React from 'react';
import { useSelector } from 'react-redux';
import Recipe from '../components/Recipe';

function User() {
  const userRecipes = useSelector(state => state.account.userRecipes);

  return (
    <main className="container">
      <div className="content">
        <h3>Here is your precious recipes you added to favourites</h3>
        {userRecipes ? <div className="content__recipes">
          {userRecipes.map((recipe, index) => <Recipe recipe={recipe} key={index}/>)}
        </div> :
          <h3 >No recipes</h3>}
      </div>
    </main>
  );
}

export default User;
