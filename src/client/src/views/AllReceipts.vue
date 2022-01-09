<template>
  <div>
    <Header></Header>
    <ReceiptsSearch></ReceiptsSearch>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header';
import ReceiptsSearch from '@/components/ReceiptsSearch';
import Footer from '@/components/Footer';
export default {
  name: 'AllReceipts',
  components: {
    Header,
    ReceiptsSearch,
    Footer,
  },
};
</script>

<style scoped></style>
