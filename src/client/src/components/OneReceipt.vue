<template>
  <main class="container">
    <img :src="receipt.img" alt="Receipt image" />
    <h3>{{ receipt.title }}</h3>
    <p>receipt.desc</p>
  </main>
</template>

<script>
export default {
  name: 'OneReceipt',
  data() {
    return {
      receipt: this.$store.getters.receiptById(this.$route.params.id),
    };
  },
};
</script>

<style scoped>
img {
  float: left;
  margin: 5px;
}
</style>
