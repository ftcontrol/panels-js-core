<script lang="ts">
  import Video from "./Video.svelte"

  let {
    src,
    alt = "Video",
  }: {
    src: string
    alt?: string
  } = $props()
</script>

<Video {src} {alt} autoplay={false} loop={false} controls={true} muted={true} />
