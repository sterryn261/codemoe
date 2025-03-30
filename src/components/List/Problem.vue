<script setup lang="ts">
</script>

<template>
  <div class="problem">
    <div class="id">
      A
    </div>
    <span> Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>

    <div class="tags">
      <div class="tag"> owo </div>
      <div class="tag"> 9999 </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.problem {
  display: flex;
  flex-direction: row;
  gap: 1em;
  position: relative;

  background: var(--dt-bg);
  padding: 0.5em;
  border-radius: 0.5em;

  .id {
    background: var(--dq-bg);

    padding: 0 1em;
    border-radius: 0.5em;
  }

  .tags {
    display: flex;
    flex-direction: row;
    gap: 0.3em;
    position: absolute;
    right: 0;
    margin-right: 1em;

    .tag {
      background: var(--dq-bg);

      padding: 0 1em;
      border-radius: 0.5em;
    }
  }
}
</style>
