<script setup lang="ts">
import type { Frontmatter } from '../utils/slideTitle'

withDefaults(defineProps<{
  heading?: string
  frontmatter?: Frontmatter
}>(), {
  heading: '',
})
</script>

<template>
  <div class="slidev-layout micanis-layout">
    <MicanisFrame :page-number="false">
      <div data-micanis-clip class="flex size-full min-h-0 flex-col items-center justify-center overflow-hidden px-24 pb-8 pt-4 text-center">
        <header data-micanis-clip class="w-[88%] max-w-[58rem] overflow-hidden text-5xl font-bold leading-tight text-neutral-900 [&_h1]:!m-0 [&_h1]:!text-5xl [&_h1]:!leading-tight [&_p]:!m-0 [&_p]:!text-5xl [&_p]:!font-bold [&_p]:!leading-tight">
          <slot name="title">
            <h1 v-if="heading">{{ heading }}</h1>
          </slot>
        </header>

        <div v-if="$slots.date" class="mt-9 text-lg text-neutral-600 [&_p]:!m-0 [&_p]:!text-lg">
          <slot name="date" />
        </div>

        <div class="mt-3 text-base text-neutral-500 [&_p]:!m-0 [&_p]:!text-base">
          <slot />
        </div>
      </div>
    </MicanisFrame>
  </div>
</template>
