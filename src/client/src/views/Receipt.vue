<template>
  <div>
    <Header></Header>
    <Receipt></Receipt>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Receipt from '@/components/Receipt';
import Footer from '@/components/Footer';
export default {
  name: 'Receipt',
  components: { Header, Receipt, Footer },
};
</script>

<style scoped></style>
