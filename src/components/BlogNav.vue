<template>
  <nav class="nav">
    <h1 class="nav__title">
      <router-link to="/">{{ content.title }}</router-link>
    </h1>

    <!--
    <li class="nav__item">
      <router-link to="/read/about"
        @click.native="scrollTo(0, 220, scrollDelay)">
        <span class="nav__item--label" style="padding: 0 10px;">About</span>
      </router-link>
      <router-link to="/read/disclaimer"
        @click.native="scrollTo(0, 220, scrollDelay)">
        <span class="nav__item--label" style="padding: 0 10px;">Disclaimer</span>
      </router-link>
    </li>-->

    <transition-group tag="menu" name="nav__item" class="nav__menu">
      <li v-for="label in labels" class="nav__item" :key="label" @click="navBack">
        <i class="nav__item--icon"></i>
        <span class="nav__item--label">{{ label }}</span>
      </li>
    </transition-group>
  </nav>
</template>

<script>
import { scrollTo } from '../helpers'
export default {
  name: 'blog-nav',
  props: {
    navs: Number,
    content: Object,
    filters: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    scrollDelay() { return (this.$device.phone) ? 0 : 560 },
    labels() {
      return Object.keys(this.filters)
        .map(filter => this.content.labels[filter])
    }
  },

  methods: {
    scrollTo,
    navBack() {
      if (this.navs && !this.filters.author) this.$router.go(-1)
      else this.$router.push('/')
    }
  }
}
</script>
