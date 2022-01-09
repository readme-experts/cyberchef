<template>
  <main class="container">
    <div class="banner">
      <h3>Cyberchef - light and easy to use cooking ideas app</h3>
      <p>Start now</p>
      <div class="banner__buttons">
        <router-link to="/login" class="banner__href">Login</router-link>
        <router-link to="/register" class="banner__href">Register</router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Banner',
};
</script>

<style scoped></style>
