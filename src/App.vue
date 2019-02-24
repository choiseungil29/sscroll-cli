<template>
  <div style="min-height: 100%; height: 100%;">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav'
export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style scoped>
div {
  background-color: #CFCFCF;
}
</style>
