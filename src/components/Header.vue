<script setup lang="ts">
</script>

<template>
  <header>
    <a href="/" class="title">
      codemoe
    </a>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 3.5em;

  z-index: 9999;

  background: #000;

  .title {
    position: absolute;
    margin-top: 0.25em;
    margin-left: 2.5em;

    text-decoration: none;

    font-size: 150%;
    font-weight: bold;

    color: #fff;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
