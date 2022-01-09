<template>
  <main class="container">
    <img :src="receipt.image_link" alt="Receipt image" />
    <h3>{{ receipt.name }}</h3>
    <pre>{{ receipt.products }}</pre>
    <pre>{{ receipt.description }}</pre>
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
