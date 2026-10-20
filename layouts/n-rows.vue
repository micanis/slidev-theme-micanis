<script setup lang="ts">
import { computed } from 'vue'
import { toCssLength, toTrackCount } from '../utils/grid'
import { type Frontmatter, slideTitle } from '../utils/slideTitle'

const props = withDefaults(defineProps<{
  rows?: number | string
  gap?: number | string
  heading?: string
  frontmatter?: Frontmatter
}>(), {
  rows: 2,
  gap: 18,
  heading: '',
})

const pageTitle = computed(() => slideTitle(props.heading, props.frontmatter))

const count = computed(() => toTrackCount(props.rows))
// The number of rows and the gap are dynamic, so they stay inline styles.
const gridStyle = computed(() => ({
  gap: toCssLength(props.gap),
  gridTemplateRows: `repeat(${count.value}, minmax(0, 1fr))`,
}))
</script>

<template>
  <div class="slidev-layout micanis-layout">
    <MicanisFrame wide :titled="!!(pageTitle || $slots.title)">
      <div data-micanis-clip class="flex size-full min-h-0 flex-col overflow-hidden">
        <MicanisTitle v-if="pageTitle || $slots.title">
          <slot name="title">
            <h1>{{ pageTitle }}</h1>
          </slot>
        </MicanisTitle>

        <!-- pt-7 + py-3 = pt-10 of the default layout, so the body starts at the same height -->
        <div data-micanis-clip class="grid min-h-0 min-w-0 flex-1 overflow-hidden px-[2%] pt-7" :style="gridStyle">
          <section
            v-for="index in count"
            :key="index"
            data-micanis-clip
            class="min-h-0 min-w-0 overflow-hidden border-b border-neutral-200 py-3 last:border-b-0 [&_h2]:!mb-1.5 [&_h3]:!mb-1.5"
          >
            <slot :name="index === 1 ? 'default' : `row-${index}`" />
          </section>
        </div>

        <MicanisSummary v-if="$slots.conc" class="mt-4">
          <slot name="conc" />
        </MicanisSummary>
      </div>
    </MicanisFrame>
  </div>
</template>
