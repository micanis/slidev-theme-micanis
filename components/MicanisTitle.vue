<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { cva } from 'class-variance-authority'
import { cn } from '../utils/cn'
import { isTut } from '../utils/variant'

// Title slot content (heading or plain text) is always bold, text-4xl.
// Extra classes from the parent win over the defaults (tailwind-merge);
// other attributes (style, id, ...) are passed through as is.
defineOptions({ inheritAttrs: false })

const title = cva(
  'flex min-h-[5.2rem] shrink-0 items-center overflow-hidden text-4xl font-bold leading-tight text-neutral-900 [&_h1]:!m-0 [&_h1]:!text-4xl [&_h1]:!leading-tight [&_p]:!m-0 [&_p]:!text-4xl [&_p]:!font-bold [&_p]:!leading-tight',
  {
    variants: {
      // default: same 2% inset as the body, so the left edges line up
      variant: { default: 'px-[2%]', tut: 'pl-[6%] pr-[3.7%]' },
    },
  },
)

function withoutClass(attrs: Record<string, unknown>) {
  const { class: _, ...rest } = attrs
  return rest
}
</script>

<template>
  <header
    data-micanis-clip
    v-bind="withoutClass($attrs)"
    :class="cn(title({ variant: isTut ? 'tut' : 'default' }), $attrs.class as ClassValue)"
  >
    <slot />
  </header>
</template>
