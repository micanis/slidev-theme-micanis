<script setup lang="ts">
import { computed } from 'vue'
import { toCssLength, toTrackCount } from '../utils/grid'
import { type Frontmatter, slideTitle } from '../utils/slideTitle'

const props = withDefaults(defineProps<{
  columns?: number | string
  gap?: number | string
  heading?: string
  frontmatter?: Frontmatter
}>(), {
  columns: 2,
  gap: 24,
  heading: '',
})

const pageTitle = computed(() => slideTitle(props.heading, props.frontmatter))

const count = computed(() => toTrackCount(props.columns))
// The number of columns and the gap are dynamic, so they stay inline styles.
const gridStyle = computed(() => ({
  gap: toCssLength(props.gap),
  gridTemplateColumns: `repeat(${count.value}, minmax(0, 1fr))`,
}))
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

        <!-- pt-8 + py-2 = pt-10 of the default layout, so the body starts at the same height -->
        <div class="grid min-h-0 min-w-0 flex-1 overflow-hidden px-[2%] pt-8" :style="gridStyle">
          <section v-for="index in count" :key="index" class="min-h-0 min-w-0 overflow-hidden py-2">
            <slot :name="index === 1 ? 'default' : `column-${index}`" />
          </section>
        </div>

        <MicanisSummary v-if="$slots.conc" class="mt-4">
          <slot name="conc" />
        </MicanisSummary>
      </div>
    </MicanisFrame>
  </div>
</template>
