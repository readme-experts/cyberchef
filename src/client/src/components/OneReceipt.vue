<template>
  <main class="container">
    <img :src="receipt.img" alt="Receipt image" />
    <h3>{{ receipt.title }}</h3>
    <p>receipt.text</p>
  </main>
</template>

<script>
export default {
  name: 'OneReceipt',
  data() {
    return {
      receipt: this.$store.getters.receipt,
    };
  },
};
</script>

<style scoped></style>
