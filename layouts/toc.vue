<script setup lang="ts">
import type { Frontmatter } from '../utils/slideTitle'

// `label: ''` hides the small label above the title.
withDefaults(defineProps<{
  label?: string
  frontmatter?: Frontmatter
}>(), {
  label: 'Contents',
})
</script>

<template>
  <div class="slidev-layout micanis-layout">
    <MicanisFrame>
      <div class="grid size-full min-h-0 grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] items-center gap-16 overflow-hidden">
        <header class="max-h-full min-w-0 overflow-hidden text-5xl font-bold text-neutral-900 [&_h1]:!mb-5 [&_h1]:!text-5xl [&_p]:!m-0 [&_p]:!text-5xl [&_p]:!font-bold">
          <div v-if="label" class="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">{{ label }}</div>
          <slot name="title">
            <h1>目次</h1>
          </slot>
        </header>

        <!--
          <Toc> renders ol.slidev-toc-list.slidev-toc-list-level-N > li.slidev-toc-item.
          Top-level items are numbered with a CSS counter; nested items (level 2+)
          are indented once, smaller and unnumbered. Links have no underline.
        -->
        <section
          class="max-h-full min-w-0 overflow-hidden py-4
            [&_.slidev-toc-list]:!m-0 [&_.slidev-toc-list]:!list-none [&_.slidev-toc-list]:!ps-0 [&_.slidev-toc-list]:[counter-reset:toc-item]
            [&_.slidev-toc-item]:relative [&_.slidev-toc-item]:mb-3 [&_.slidev-toc-item]:ps-11 [&_.slidev-toc-item]:[counter-increment:toc-item]
            [&_.slidev-toc-item::before]:absolute [&_.slidev-toc-item::before]:start-0 [&_.slidev-toc-item::before]:w-8 [&_.slidev-toc-item::before]:text-right [&_.slidev-toc-item::before]:tabular-nums [&_.slidev-toc-item::before]:text-neutral-500 [&_.slidev-toc-item::before]:[content:counter(toc-item)]
            [&_.slidev-toc-list-level-1_.slidev-toc-list]:!mt-2
            [&_.slidev-toc-list-level-1_.slidev-toc-item_.slidev-toc-item]:!mb-1 [&_.slidev-toc-list-level-1_.slidev-toc-item_.slidev-toc-item]:!ps-0 [&_.slidev-toc-list-level-1_.slidev-toc-item_.slidev-toc-item]:text-xl [&_.slidev-toc-list-level-1_.slidev-toc-item_.slidev-toc-item]:text-neutral-600
            [&_.slidev-toc-list-level-1_.slidev-toc-item_.slidev-toc-item::before]:!content-none
            [&_a]:!no-underline"
        >
          <slot />
        </section>
      </div>
    </MicanisFrame>
  </div>
</template>
