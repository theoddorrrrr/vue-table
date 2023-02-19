<script setup>
import Table from './components/Table.vue';
</script>

<template>
  <n-notification-provider :max="2">
    <div class="wrapper">
      <Table />
    </div>
  </n-notification-provider>
</template>

<style scoped>
.wrapper {
  white-space: pre;
  overflow: auto;
}
</style>
