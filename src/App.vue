<script setup lang="ts">
import Header from './components/Header.vue';
import Subheader from './components/Subheader.vue';
import List from './components/List.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Header />
  <Subheader />
  <div class="content">
    <List />
    <Sidebar />
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  margin-top: 6em;
}
</style>
