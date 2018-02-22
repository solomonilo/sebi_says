<template>
  <transition name="post">
    <article v-if="post" class="post">
      <header class="post__header">
        <h2 class="post__title" style="display: inline-block;">{{ title }}</h2>

        <form v-if="post != 'about' && post != 'disclaimer'" class="search-container" style="display: inline-block; width: auto; float: right;">
          <input id="search-box" type="text" class="search-box" v-model="search" placeholder="Filter"/>
          <label for="search-box"><span class="fa fa-search search-icon"></span></label>
          <input type="submit" id="search-submit" />
        </form>

        <h3 class="post__meta">
          <!-- by <router-link class="post__author"
          :to="`/by/${kebabify(author)}`">{{ author }}</router-link>
          <span class="post__sep"></span>
          <time>{{ prettyDate(published) }}</time>-->
        </h3> 
        <!-- <blockquote class="post__subtitle">{{ description }}</blockquote> -->
      </header>
      <div v-if="post == 'about' || post == 'disclaimer'">
        <section 
          class="post__body rte" 
          v-html="content"></section>
      </div>
      <div v-else>
        <section class="post__body rte" v-if="list && list.length > 0">
            <ul v-for="food in filteredList">
              <li>{{ food.name }}
                <span v-if="food.description"> - {{ food.description }}</span>
              </li>
            </ul>
            <span v-if="filteredList.length < 1">We couldn't find this item. It may not be recommended by Dr.Sebi.</span>
        </section>
      </div>

      <footer class="post__footer">
        <!-- <vue-disqus v-if="commentsReady" shortname="vue-blog-demo"
          :key="post" :identifier="post" :url="`https://vue-blog-demo.netlify.com/read/${post}`"/> -->
      </footer>
    </article>
  </transition>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus'
import { kebabify, prettyDate } from '../helpers'

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: { VueDisqus },
  props: { post: String },

  data() {
    return {
      title: '',
      author: '',
      content: '',
      published: '',
      description: '',
      list: '',
      commentsReady: false,
      search: ''
    }
  },

  watch: {
    post(to, from) {
      if (to === from || !this.post) return;
      this.search = ''
      this.list = ''
      this.commentsReady = false
      this.$getResource('post', to)
        .then(this.showComments)
    }
  },
  computed: {
    filteredList() {
      var self = this;
      if (this.list) {
        return this.list.filter(function (food) {
          return food.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
        });
        // return this.customers;
      }
    }
  },

  methods: {
    kebabify,
    prettyDate,
    showComments() {
      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    }
  },

  beforeMount() {
    if (!this.post) return;
    document.addEventListener('touchstart', function() {}, true);
    this.$getResource('post', this.post)
      .then(this.showComments)
  }
}
</script>

<style lang="scss" scoped>
  $tl: 0.6s; // transition length

  body {
    margin: 5%;
  }

  .search-box {
    transition: width $tl, border-radius $tl, background $tl, box-shadow $tl;
    width: 40px;height: 40px;
    border-radius: 20px;border: none;
    cursor: pointer;
    background: rgb(235, 235, 235);
    & + label .search-icon {    color: black    }
    &:hover {
      color: white;
      background: rgb(200, 200, 200);
      box-shadow: 0 0 0 5px rgb(61, 71, 82);
      & + label .search-icon {    color: white    }
    }
    &:focus {
      transition: width $tl cubic-bezier(0,1.22,.66,1.39), border-radius $tl, background $tl;
      border: none;outline: none;
      box-shadow: none;
      padding-left: 15px;
      cursor: text;
      width: 300px;
      border-radius: auto;
      background: rgb(235, 235, 235);
      color: black;
      & + label .search-icon {    color: black;    }
    }
    &:not(:focus) {    text-indent:-5000px;    } // for more-graceful falling back (:not browsers likely support indent)
  }

  #search-submit {
    position: relative;left: -5000px;
  }

  .search-icon {
    position: relative;
    left: -32px;
    color: white;
    cursor: pointer;
  }

</style>
