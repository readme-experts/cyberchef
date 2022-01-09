<template>
  <main class="container">
    <div class="content">
      <Search></Search>
      <div v-if="recipes" class="content__recipes">
        <Recipe v-for="recipe of recipes" :key="recipe.id"></Recipe>
      </div>
      <h3 v-else>No recipes</h3>
    </div>
  </main>
</template>

<script>
import Recipe from './Recipe';
import Search from './Search';

export default {
  name: 'RecipesSearch',
  components: {
    Recipe,
    Search,
  },
};
</script>

<style scoped></style>
