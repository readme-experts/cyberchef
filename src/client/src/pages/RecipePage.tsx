import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/store';
import { RecipeModel } from '../services/models/RecipeModel';

function RecipePage() {
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);
  const params = useParams();
  const id =  params ? params.id : 0;

  useEffect(() => {
    const recipes = useAppSelector(state => state.recipes.recipes);
    const foundRecipe = recipes.find(item => item.id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, []);

  if (!recipe) return <h1>Recipe error</h1>;

  return (
    <main className='container'>
      <img src={recipe.image_link} alt='Receipt image' />
      <h3>{recipe.name}</h3>
      <pre>{recipe.products}</pre>
      <pre>{recipe.description}</pre>
    </main>
  );
}

export default RecipePage;
