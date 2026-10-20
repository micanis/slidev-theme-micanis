<script setup lang="ts">
import type { Frontmatter } from '../utils/slideTitle'

withDefaults(defineProps<{
  section?: string | number
  frontmatter?: Frontmatter
}>(), {
  section: '',
})
</script>

<template>
  <div class="slidev-layout micanis-layout">
    <MicanisFrame>
      <div class="flex h-full w-[86%] max-w-[58rem] flex-col justify-center overflow-hidden">
        <div v-if="section" class="mb-2 text-lg font-extrabold tracking-wider text-neutral-600">{{ section }}</div>
        <div class="overflow-hidden [&_h1]:!mb-3 [&_h1]:!text-5xl [&_p]:!text-lg [&_p]:!text-neutral-600">
          <slot />
        </div>
      </div>
    </MicanisFrame>
  </div>
</template>
