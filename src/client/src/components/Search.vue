<template>
  <form class="content__filter">
    <h3>Find recipes</h3>
    <label for="search" class="content__label"></label>
    <div>
      <input type="text" name="search" id="search" class="content__search" />
      <button type="submit" class="content__submit">Search</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Search',
};
</script>

<style scoped></style>
