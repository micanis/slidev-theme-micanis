<script setup lang="ts">
import type { Frontmatter } from '../utils/slideTitle'

defineProps<{ frontmatter?: Frontmatter }>()
</script>

<template>
  <div class="slidev-layout micanis-layout">
    <MicanisFrame :page-number="false">
      <div data-micanis-clip class="flex h-full w-[82%] max-w-[54rem] flex-col justify-center overflow-hidden">
        <div data-micanis-clip class="overflow-hidden [&_h1]:!mb-4 [&_h1]:!text-5xl [&_h1]:!leading-tight [&_p]:!text-xl [&_p]:!text-neutral-600">
          <slot />
        </div>
      </div>
    </MicanisFrame>
  </div>
</template>
