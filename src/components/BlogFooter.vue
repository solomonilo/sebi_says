<template>
  <transition appear name="v--mask">
    <footer v-once class="blog__footer">
      <a href="https://drsebiscellfood.com/" target="_blank" style="text-decoration: underline; display: block;">
        <h2>Support Dr.Sebi</h2>
        <!-- <img src="../assets/vue-snip.svg"/> -->
      </a>
    </footer>
  </transition>
</template>

<script>
export default { name: 'blog-footer' }
</script>

<style scoped>
  .clearfix {
    clear: both;
  }
</style>

