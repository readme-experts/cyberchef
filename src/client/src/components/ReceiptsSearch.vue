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
import Recipe from '@/components/Recipe';
import Search from '@/components/Search';

export default {
  name: 'ReceiptsSearch',
  components: {
    Recipe,
    Search,
  },
};
</script>

<style scoped></style>
