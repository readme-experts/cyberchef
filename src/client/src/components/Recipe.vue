<template>
  <div class="content__recipes">
    <div class="content__recipe">
      <router-link :to="{ path: `/receipts/${recipe.id}` }">
        <img :src="recipe.image_link" alt="Recipe" class="content__pic" />
      </router-link>
      <div class="content__desc">
        <h3 class="content__heading">
          <router-link :to="{ path: `/receipts/${recipe.id}` }">{{
            recipe.name
          }}</router-link>
        </h3>
        <pre class="content__description">{{ recipe.products }}</pre>
        <button class="content__add" @click="$emit('addRecipe', recipe)">
          Add to favourites
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recipe',
  props: {
    recipe: Object,
  },
};
</script>

<style scoped></style>
