<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSlideContext } from '@slidev/client'
import { cva } from 'class-variance-authority'
import { cn } from '../utils/cn'
import { isTut } from '../utils/variant'
import backgroundImage from '../assets/tut/background.png'

// wide:       body spans nearly the full width (default / n-columns / n-rows)
// titled:     the page has a title band (only matters for wide frames in tut)
// pageNumber: show the page number (cover / title / tut turn it off)
withDefaults(defineProps<{ wide?: boolean, titled?: boolean, pageNumber?: boolean }>(), {
  pageNumber: true,
})

// cva only joins the matching variants; cn() (tailwind-merge) then drops the
// overridden ones, so the wide tut classes replace the narrow insets.
const frame = cva('absolute z-[11] min-h-0 min-w-0 overflow-hidden', {
  variants: {
    variant: {
      default: 'top-[8%] right-[7%] bottom-[9%] left-[7%]',
      tut: 'top-[8.5%] right-[6.5%] bottom-[7.5%] left-[7.5%]',
    },
    wide: { true: '', false: '' },
    titled: { true: '', false: '' },
    overflowing: { true: '[outline:2px_solid_#ef4444]', false: '' },
  },
  compoundVariants: [
    { variant: 'tut', wide: true, class: 'right-[3%] left-[3%]' },
    { variant: 'tut', wide: true, titled: true, class: 'top-[3.5%]' },
  ],
})

const pageNumberClass = cva('absolute z-20 grid place-items-center leading-none tabular-nums', {
  variants: {
    variant: {
      default: 'bottom-[4.5%] right-[7%] text-sm font-medium tracking-widest text-neutral-400',
      tut: 'bottom-[3.4%] right-[14.5%] h-6 min-w-8 text-xl font-bold text-[var(--tut-navy)]',
    },
  },
})

// `var(--micanis-accent)` follows the variant for everything inside the frame
const accent = isTut ? { '--micanis-accent': 'var(--tut-navy)' } : undefined

// Content that does not fit is clipped (overflow: hidden). Report it so it is
// not lost silently: a console warning (also shown in `slidev export` logs)
// and, in the dev server's slide view only, a red outline around the frame.
const { $page, $renderContext } = useSlideContext()
const root = ref<HTMLElement>()
const overflowing = ref(false)
// `slidev export` also runs the dev server with renderContext "slide"; it opens
// each slide with ?print (or the /export page), so exclude those explicitly
const printing = typeof location !== 'undefined'
  && (new URLSearchParams(location.search).has('print') || /\/export\b/.test(location.pathname + location.hash))
const showOutline = import.meta.env.DEV && $renderContext.value === 'slide' && !printing
let observer: ResizeObserver | undefined

function check() {
  const el = root.value
  if (!el)
    return
  // A clipping element hides a descendant when the descendant's box crosses
  // its own box. (scrollHeight also counts trailing margins, which are
  // invisible, so it reports false positives.) Rects are compared with rects
  // because the slide is scaled.
  const clipped = [el, ...el.querySelectorAll<HTMLElement>('*')].filter((node) => {
    if (getComputedStyle(node).overflow !== 'hidden')
      return false
    const box = node.getBoundingClientRect()
    return [...node.querySelectorAll('*')].some((child) => {
      const r = child.getBoundingClientRect()
      return r.width > 0 && r.height > 0 && (r.bottom > box.bottom + 1 || r.right > box.right + 1)
    })
  })
  const next = clipped.length > 0
  if (next && !overflowing.value) {
    // report the innermost clipping elements only
    const where = clipped
      .filter(node => !clipped.some(other => other !== node && node.contains(other)))
      .map(node => `<${node.tagName.toLowerCase()}> content ${node.scrollWidth}x${node.scrollHeight} in ${node.clientWidth}x${node.clientHeight}`)
      .join(', ')
    console.warn(`[micanis] overflow on slide ${$page.value}: content is clipped (${where})`)
  }
  overflowing.value = next
}

onMounted(async () => {
  // thumbnails (overview, presenter) would only repeat the same warning
  if (!['slide', 'print'].includes($renderContext.value))
    return
  await document.fonts.ready
  check()
  observer = new ResizeObserver(check)
  if (root.value)
    observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <img
    v-if="isTut"
    class="pointer-events-none absolute inset-0 z-10 size-full max-w-none select-none object-fill"
    :src="backgroundImage"
    alt=""
    aria-hidden="true"
    draggable="false"
  >
  <span v-else class="absolute left-[7%] top-[5.5%] z-[11] h-1 w-10 rounded-sm bg-[var(--micanis-accent)]" aria-hidden="true" />
  <div
    ref="root"
    :class="cn(frame({ variant: isTut ? 'tut' : 'default', wide: !!wide, titled: !!titled, overflowing: overflowing && showOutline }))"
    :style="accent"
  >
    <slot />
  </div>
  <div v-if="pageNumber" :class="pageNumberClass({ variant: isTut ? 'tut' : 'default' })">
    {{ $page }}
  </div>
</template>
