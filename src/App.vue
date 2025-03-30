<script setup lang="ts">
import Header from './components/Header.vue';
import List from './components/List/List.vue';
</script>

<template>
  <Header />
  <div class="content">
    <List />
    <div class="sidebar">
      <div class="user">
        <input type="text" placeholder="Enter here...">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  margin-top: 5em;
}

.sidebar {
  position: absolute;
  top: 0;
  right: 0;

  width: 24vw;
  height: 10em;
  margin-right: 2em;

  .user {
    width: 100%;
    padding: 1em;
    border-radius: 0.5em;

    background: var(--ds-bg);

    input {
      width: 100%;
      padding: 0.5em;
      border: none;
      border-radius: 0.5em;

      color: var(--dp-text);
      background: var(--ds-bg);
    }


    input:focus {
      outline: none;
      background: var(--dt-bg);
    }
  }
}
</style>
