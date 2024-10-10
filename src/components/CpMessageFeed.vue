<template>
  <div
    class="h-[90%] overflow-y-auto no-scrollbar"
    v-auto-scroll
    ref="message-feed"
    id="message-feed"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import vAutoScroll from '@/directives/vAutoScroll';
</script>
