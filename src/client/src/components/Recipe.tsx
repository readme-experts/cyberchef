import React from 'react';
import { RecipeModel } from '../services/models/RecipeModel';
import { Link } from 'react-router-dom';
interface Props {
  recipe: RecipeModel,
  clickHandler: (recipe: RecipeModel) => void,
  deleteHandler: (recipe: RecipeModel) => void
}

function Recipe({ recipe, clickHandler, deleteHandler }: Props) {
  return (
    <div className='content__recipes'>
      <div className='content__recipe'>
        <Link to={`/recipes/${recipe.id}`}>
          <img src={recipe.image_link} alt='Recipe' className='content__pic' />
        </Link>
        <div className='content__desc'>
          <h3 className='content__heading'>
            <Link to={`/receipts/${recipe.id}`}>{recipe.name}</Link>
          </h3>
          <pre className='content__description'>{recipe.products}</pre>
          {clickHandler && <button className='content__add' onClick={() => clickHandler(recipe)}>
            Add to favourites
          </button>}
          {deleteHandler && <button className='content__add' onClick={() => deleteHandler(recipe)}>
            Delete from favourites
          </button>}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
