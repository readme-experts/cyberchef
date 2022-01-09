<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted: function () {
    this.$http.interceptors.response.use(null, (err) => {
      return new Promise(() => {
        if (err.status === 403) {
          this.$store.dispatch('logout');
        }
        throw err;
      });
    });
  },
};
</script>
