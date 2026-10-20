<script setup lang="ts">
// The TUT cover is the same page as `cover`: props (heading, frontmatter,
// class) fall through to it and every slot is forwarded as is.
import Cover from './cover.vue'
</script>

<template>
  <Cover>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </Cover>
</template>
