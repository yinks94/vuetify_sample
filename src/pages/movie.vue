<template>
  <template v-if="loading">
    <Loader :size="100" />
  </template>
</template>

<script setup>
import Loader from '@/components/Loader.vue'

const loading = ref(true)
</script>

<style lang="scss" scoped></style>
