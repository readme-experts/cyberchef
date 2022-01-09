<template>
  <main class="container">
    <div class="content">
      <form class="content__filter">
        <h3>Find recipes</h3>
        <label for="search" class="content__label"></label>
        <div>
          <input
            type="text"
            name="search"
            id="search"
            class="content__search"
          />
          <button type="submit" class="content__submit">Search</button>
        </div>
      </form>
      <div v-if="recipes" class="content__recipes">
        <Recipe v-for="recipe of recipes" :key="recipe.id"></Recipe>
      </div>
      <h3 v-else>No recipes</h3>
    </div>
  </main>
</template>

<script>
export default {
  name: 'RecipesSearch',
};
</script>

<style scoped></style>
