<template>
  <div>
    <Header></Header>
    <OneReceipt></OneReceipt>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header';
import OneReceipt from '@/components/OneReceipt';
import Footer from '@/components/Footer';
export default {
  name: 'Receipt',
  components: { Header, OneReceipt, Footer },
};
</script>

<style scoped></style>
