import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function RecipePage() {
  const [recipe, setRecipe] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    const recipes = useSelector(state => state.recipes.recipes);
    const foundRecipe = recipes.filter(item => item.id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, []);

  if (!recipe) return <h1>Recipe error</h1>;

  return (
    <main className="container">
      <img src={recipe.image_link} alt="Receipt image" />
      <h3>{ recipe.name }</h3>
      <pre>{ recipe.products }</pre>
      <pre>{ recipe.description }</pre>
    </main>
  );
}

export default RecipePage;
