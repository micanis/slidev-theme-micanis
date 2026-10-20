<script setup lang="ts">
import type { ClassValue } from 'clsx'
import { cn } from '../utils/cn'

// Extra classes from the parent win over the defaults (tailwind-merge),
// e.g. <MicanisSummary class="h-20 text-xl" />. Other attributes pass through.
defineOptions({ inheritAttrs: false })

function withoutClass(attrs: Record<string, unknown>) {
  const { class: _, ...rest } = attrs
  return rest
}
</script>

<template>
  <footer
    v-bind="withoutClass($attrs)"
    :class="cn('flex h-[4.4rem] w-full shrink-0 items-center overflow-hidden border-t border-neutral-200 px-[2%] py-3 text-2xl font-semibold leading-snug text-neutral-800 [&_p]:!m-0 [&_p]:!text-2xl [&_p]:!leading-snug', $attrs.class as ClassValue)"
  >
    <slot />
  </footer>
</template>
