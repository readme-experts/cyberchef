<template>
  <header class="header">
    <div class="header__left">
      <a href="#" class="header__logo_link">
        <h3 class="header__logo"><span>Cyber</span>chef</h3>
      </a>
    </div>
    <div class="header__right">
      <p class="header__username">{{ user.name }}</p>
      <img :src="user.avatar" alt="avatar" class="header__avatar" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    user: Object,
  },
};
</script>

<style scoped></style>
