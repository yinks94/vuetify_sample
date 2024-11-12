<template>
  <div
    class="v-container"
    :class="{
      absolute,
      fixed
    }"
    :style="{
      zIndex: `${zIndex}`
    }">
    <v-progress-circular
      :size="`${size}`"
      color="primary"
      indeterminate>
    </v-progress-circular>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 50
  },
  absolute: {
    type: Boolean,
    default: false
  },
  fixed: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number,
    default: 0
  }
})
</script>

<!-- <script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script> -->

<style lang="scss" scoped>
.v-container {
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>
