<template>
  <div>
    <Header></Header>
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
export default {
  name: 'Home',
  components: { Banner, Header, Footer },
};
</script>

<style scoped></style>
