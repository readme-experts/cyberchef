<template>
  <div class="content__recipes">
    <div class="content__recipe">
      <router-link :to="{ path: `/recipes/${recipe.id}` }">
        <img :src="recipe.img" alt="Recipe" class="content__pic" />
      </router-link>
      <div class="content__desc">
        <h3 class="content__heading">
          <router-link :to="{ path: `/recipes/${recipe.id}` }">{{
            recipe.head
          }}</router-link>
        </h3>
        <p class="content__description">{{ recipe.text }}</p>
        <button class="content__add" @click="$emit('addRecipe')">
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
