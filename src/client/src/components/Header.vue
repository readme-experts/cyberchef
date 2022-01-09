<template>
  <header class="header">
    <div class="header__left">
      <router-link to="/" class="header__logo_link">
        <h3 class="header__logo"><span>Cyber</span>chef</h3>
      </router-link>
    </div>
    <div class="header__right">
      <router-link
        v-if="chefUser"
        :to="{ path: `/user/${chefUser.id}` }"
        class="header__logo_link"
      >
        <p class="header__username">{{ chefUser.username }}</p>
        <img :src="chefUser.avatar" alt="avatar" class="header__avatar" />
      </router-link>
      <router-link v-else :to="{ path: `Login` }" class="header__logo_link">
        <p class="header__username">Login</p>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      chefUser: this.$store.getters.user,
    };
  },
};
</script>

<style scoped></style>
