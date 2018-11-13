<template>
  <div>
    <Nav />
    <Content />
  </div>
</template>

<script>
import Content from './Content'
import Nav from './Nav'

export default {
  name: 'Body',
  components: {
    Content,
    Nav
  }
}
</script>
