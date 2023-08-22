<script setup>
import { onMounted, ref } from "vue";
import { search } from "./apis/search";
const list = ref([]);
const useData = async (id = 1) => {
  const res = await search(id);
  list.value = res.data;
  // console.log(list);
};
onMounted(() => useData());
</script>

<template>
  <!-- 一级路由出口组件 -->
  <RouterView />
  <div class="test">test scss</div>
</template>

<style scoped lang="scss">
html,
body {
  padding: 0;
  width: 100%;
  min-height: 100px;
}
.test {
  color: $priceColor;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
