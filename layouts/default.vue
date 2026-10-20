<script setup lang="ts">
import { computed } from 'vue'
import { type Frontmatter, slideTitle } from '../utils/slideTitle'

const props = withDefaults(defineProps<{
  heading?: string
  frontmatter?: Frontmatter
}>(), {
  heading: '',
})

const pageTitle = computed(() => slideTitle(props.heading, props.frontmatter))
</script>

<template>
  <div class="slidev-layout micanis-layout">
    <MicanisFrame wide :titled="!!(pageTitle || $slots.title)">
      <div class="flex size-full min-h-0 flex-col overflow-hidden">
        <MicanisTitle v-if="pageTitle || $slots.title">
          <slot name="title">
            <h1>{{ pageTitle }}</h1>
          </slot>
        </MicanisTitle>

        <div
          class="grid min-h-0 min-w-0 flex-1 overflow-hidden pt-10"
          :class="$slots.conc ? 'grid-rows-[minmax(0,1fr)_auto] gap-4' : 'grid-rows-[minmax(0,1fr)]'"
        >
          <section class="min-h-0 min-w-0 overflow-hidden px-[2%]">
            <slot />
          </section>

          <MicanisSummary v-if="$slots.conc">
            <slot name="conc" />
          </MicanisSummary>
        </div>
      </div>
    </MicanisFrame>
  </div>
</template>
