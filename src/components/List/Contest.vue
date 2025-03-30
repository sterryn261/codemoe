<script setup lang="ts">
import Problem from './Problem.vue';
</script>

<template>
  <div class="contest">

    <div class="title">
      <div class="type"> Rated </div> <span> Lorem Ispum </span>
    </div>
    <div class="problems">
      <Problem />
      <Problem />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contest {
  display: flex;
  flex-direction: column;
  gap: 0.75em;

  width: 76vw;
  padding: 0.75em 1em;
  border-radius: 0.5em;
  margin: 2em 2vw;

  color: var(--dp-text);
  background: var(--ds-bg);

  .title {
    display: flex;
    flex-direction: row;
    gap: 1em;

    margin-left: 1em;

    .type {
      padding: 0.1em 0.5em;
      border-radius: 0.5em;

      font-weight: bold;

      background: var(--dp);

    }

    span {
      font-weight: bold;
      line-height: 1.7em;
    }
  }

  .problems {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
}
</style>
