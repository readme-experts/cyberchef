<template>
  <div>
    <Header></Header>
    <User></User>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header';
import User from '@/components/User';
import Footer from '@/components/Footer';
export default {
  name: 'UserPage',
  components: {
    Header,
    User,
    Footer,
  },
};
</script>

<style scoped></style>
