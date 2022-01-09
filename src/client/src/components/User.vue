<template>
  <main class="container">
    <div class="content">
      <h3>Here is your precious recipes you added to favourites</h3>
      <div v-if="recipes" class="content__recipes">
        <Recipe v-for="recipe of recipes" :key="recipe.id"></Recipe>
      </div>
      <h3 v-else>No recipes</h3>
    </div>
  </main>
</template>

<script>
import Recipe from '@/components/Recipe';

export default {
  name: 'User',
  components: {
    Recipe,
  },
  data() {
    return {
      recipes: null,
    };
  },
  mounted() {
    this.$store
      .dispatch('loadUserReceipts')
      .then(() => (this.recipes = this.$store.getters.userReceipts));
  },
};
</script>

<style scoped></style>
