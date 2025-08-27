<script lang="ts">
    import Video from "./Video.svelte";

    let {
        src,
        alt = "Video",
    }: {
        src: string
        alt?: string
    } = $props()
</script>

<Video src={src} alt={alt} autoplay={true} loop={true} controls={false} muted={true}/>