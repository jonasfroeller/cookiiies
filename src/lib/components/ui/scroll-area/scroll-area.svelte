<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive, type WithoutChild } from 'bits-ui';
	import { Scrollbar } from './index.js';
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'vertical',
		scrollbarXClasses = '',
		scrollbarYClasses = '',
		oneLinePerScroll = false,
		children,
		...restProps
	}: WithoutChild<ScrollAreaPrimitive.RootProps> & {
		orientation?: 'vertical' | 'horizontal' | 'both' | undefined;
		scrollbarXClasses?: string | undefined;
		scrollbarYClasses?: string | undefined;
		oneLinePerScroll?: boolean | undefined;
	} = $props();

	let viewportRef = $state<HTMLElement | null>(null);
	let computedLineHeightPx = 16;
	let cachedVisualStepPx: number | null = null;
	let cachedContainerWidth: number | null = null;

	function computeLineHeightPx(node: HTMLElement | null): number {
		if (!node) return 16;
		const style = getComputedStyle(node);
		const parsedLineHeight = parseFloat(style.lineHeight);
		if (!Number.isNaN(parsedLineHeight)) return Math.max(1, Math.round(parsedLineHeight));
		const fontSizePx = parseFloat(style.fontSize) || 16;
		return Math.max(1, Math.round(fontSizePx * 1.4));
	}

	type LineGroup = { top: number; bottom: number };
	function groupRectsIntoRows(rects: readonly DOMRect[]): LineGroup[] {
		const byRow = new Map<number, LineGroup>();
		for (const rect of rects) {
			const key = Math.round(rect.top);
			const existing = byRow.get(key);
			if (!existing) {
				byRow.set(key, { top: rect.top, bottom: rect.bottom });
			} else {
				if (rect.top < existing.top) existing.top = rect.top;
				if (rect.bottom > existing.bottom) existing.bottom = rect.bottom;
			}
		}
		return Array.from(byRow.values()).sort((a, b) => a.top - b.top);
	}

	function computeVisualLineStepFromContainer(): number | null {
		if (!viewportRef) return null;
		const el = (viewportRef.firstElementChild as Element | null) ?? null;
		if (!el) return null;
		const w = Math.round(el.getBoundingClientRect().width);
		if (cachedVisualStepPx && cachedContainerWidth === w) return cachedVisualStepPx;
		try {
			const r = el.ownerDocument.createRange();
			r.selectNodeContents(el);
			const rects = Array.from(r.getClientRects());
			if (rects.length === 0) return null;
			const groups = groupRectsIntoRows(rects);
			if (groups.length <= 1) return null;
			const diffs: number[] = [];
			for (let i = 1; i < groups.length; i += 1) {
				const d = groups[i].top - groups[i - 1].top;
				if (d > 0.5 && d < 200) diffs.push(d);
			}
			if (diffs.length === 0) return null;
			diffs.sort((a, b) => a - b);
			const mid = Math.floor(diffs.length / 2);
			const median = diffs.length % 2 === 0 ? (diffs[mid - 1] + diffs[mid]) / 2 : diffs[mid];
			const step = Math.max(1, Math.round(median));
			cachedVisualStepPx = step;
			cachedContainerWidth = w;
			return step;
		} catch {
			return null;
		}
	}

	function computePaddingSnap(direction: number): number | null {
		if (!viewportRef) return null;
		const doc = viewportRef.ownerDocument;
		const viewportRect = viewportRef.getBoundingClientRect();
		const rootContent =
			((viewportRef.firstElementChild || viewportRef).querySelector?.(
				':scope > *'
			) as Element | null) || (viewportRef.firstElementChild as Element | null);
		const el = rootContent || (viewportRef.firstElementChild as Element | null);
		if (!el) return null;
		try {
			const r = doc.createRange();
			r.selectNodeContents(el);
			const rects = Array.from(r.getClientRects());
			if (rects.length === 0) return null;
			const groups = groupRectsIntoRows(rects);
			const firstTop = groups[0]?.top ?? viewportRect.top;
			const lastBottom = groups[groups.length - 1]?.bottom ?? viewportRect.bottom;
			if (direction > 0 && viewportRect.top < firstTop && viewportRef.scrollTop <= 0) {
				return Math.max(1, Math.round(firstTop - viewportRect.top));
			}
			if (direction < 0 && viewportRect.bottom > lastBottom) {
				return Math.max(1, Math.round(viewportRect.bottom - lastBottom));
			}
			return null;
		} catch {
			return null;
		}
	}

	function handleWheel(event: WheelEvent) {
		if (!oneLinePerScroll || orientation === 'horizontal') return;
		if (!viewportRef) return;
		// Prevent native pixel scrolling to enforce line-step behavior
		event.preventDefault();
		const direction = Math.sign(event.deltaY || 1) || 1;
		const constantStep = computeVisualLineStepFromContainer();
		const paddingSnap = computePaddingSnap(direction);
		if (paddingSnap) {
			viewportRef.scrollBy({ top: direction * paddingSnap, left: 0, behavior: 'auto' });
			return;
		}
		let baseStep = constantStep ?? computedLineHeightPx;
		baseStep = Math.max(1, Math.round(baseStep));
		viewportRef.scrollBy({ top: direction * baseStep, left: 0, behavior: 'auto' });
	}

	onMount(() => {
		const node = viewportRef;
		if (!node) return;
		computedLineHeightPx = computeLineHeightPx(node);
		node.addEventListener('wheel', handleWheel, { passive: false });
		const handleResize = () => {
			cachedVisualStepPx = null;
			cachedContainerWidth = null;
		};
		window.addEventListener('resize', handleResize);
		return () => {
			node.removeEventListener('wheel', handleWheel as EventListener);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<ScrollAreaPrimitive.Root
	bind:ref
	{...restProps}
	class={cn('cc:relative cc:overflow-hidden', className)}
>
	<ScrollAreaPrimitive.Viewport
		bind:ref={viewportRef}
		class="cc:h-full cc:w-full cc:rounded-[inherit]"
	>
		{@render children?.()}
	</ScrollAreaPrimitive.Viewport>
	{#if orientation === 'vertical' || orientation === 'both'}
		<Scrollbar orientation="vertical" class={scrollbarYClasses} />
	{/if}
	{#if orientation === 'horizontal' || orientation === 'both'}
		<Scrollbar orientation="horizontal" class={scrollbarXClasses} />
	{/if}
	<ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
