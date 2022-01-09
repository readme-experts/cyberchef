<template>
  <form class="content__filter" @submit.prevent="$emit('submitQuery', query)">
    <h3>Find recipes</h3>
    <label for="search" class="content__label"></label>
    <div>
      <input
        type="text"
        name="search"
        id="search"
        class="content__search"
        v-model="query"
      />
      <button type="submit" class="content__submit">Search</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      query: '',
    };
  },
};
</script>

<style scoped></style>
