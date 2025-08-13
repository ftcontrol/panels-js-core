<script lang="ts">
    import {onDestroy, onMount, tick} from "svelte";

    type Heading = {
        level: number;
        text: string;
        element: HTMLElement;
    };

    let titles: Heading[] = $state([]);

    let smallestTitleLevel = $derived.by(()=>{
        let min = 0
        for (const title of titles){
            min = Math.min(min, title.level)
        }
        return min + 1
    })

    function init() {
        const elements = document.querySelectorAll<HTMLElement>(".docs-heading");
        titles = Array.from(elements).map((el) => {
            const tag = el.dataset.level || "";
            const level = parseInt(tag.replace(/^h/, ""), 10) || 0;
            return {
                level,
                text: el.textContent?.trim() || "",
                element: el
            };
        });
    }

    let lastUrl = "";
    let reinitScheduled = false;
    let rafId: number;

    async function scheduleReinit() {
        if (reinitScheduled) return;
        reinitScheduled = true;

        await tick();
        requestAnimationFrame(async () => {
            await tick();
            init();
            reinitScheduled = false;
        });
    }

    function updateStuff() {
        const href = location.href;
        if (href !== lastUrl || titles.length === 0) {
            lastUrl = href;
            scheduleReinit();
        }

        rafId = requestAnimationFrame(updateStuff);
    }

    onMount(async () => {
        await tick()
        lastUrl = location.href;
        init();
        rafId = requestAnimationFrame(updateStuff);
    })

    onDestroy(() => {
        cancelAnimationFrame(rafId);
    })

    function scrollToHeading(heading: Heading) {
        heading.element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

</script>

{#if titles.length >= 1}
    <section>
        {#each titles as t, i}
            <button
                    style="padding-left: {(t.level - smallestTitleLevel) * 0.75}rem"
                    onclick={() => scrollToHeading(t)}
            >
                {t.text}
            </button>
        {/each}
    </section>
{/if}

<style>
    section {
        overflow-y: auto;
        background: var(--bgMedium);
        border: 1px solid var(--bgLight);
        padding: 0.5rem;
        font-size: 0.9rem;
        position: absolute;
        right: 1rem;
        top: 30%;
        z-index: 1;
    }

    button {
        display: block;
        color: inherit;
        width: 100%;
        text-align: left;
        padding: 0.25rem 0.5rem;
        border: none;
        background: none;
        cursor: pointer;
    }

    button:hover {
        background: var(--bgLight);
    }
</style>
