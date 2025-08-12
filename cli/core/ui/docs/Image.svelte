<script lang="ts">
    let {
        src = '',
        alt = '',
        caption = '',
        rounded = true,
    }: {
        src: string
        alt: string
        caption: string
        rounded?: boolean
    } = $props();
</script>

<figure>
    <img src={src} alt={alt}
         class:rounded loading="lazy"/>
    {#if caption}
        <figcaption>{caption}</figcaption>
    {/if}
</figure>

<style>
    figure {
        margin: 1rem 0;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
    }

    .rounded {
        border-radius: 0.25rem;
    }

    figcaption {
        font-size: .9em;
        margin-top: .4rem;
    }
</style>
