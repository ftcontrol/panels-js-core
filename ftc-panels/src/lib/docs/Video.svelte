<script lang="ts">
  let {
    src,
    alt = "Video",
    autoplay = true,
    loop = true,
    controls = true,
    muted = true,
  }: {
    src: string
    alt?: string
    autoplay?: boolean
    loop?: boolean
    controls?: boolean
    muted?: boolean
  } = $props()
</script>

<video
  {src}
  {autoplay}
  {loop}
  {controls}
  {muted}
  playsinline
  style="display: block;"
></video>

<p>{alt}</p>

<style>
  video,
  p {
    width: 100%;
    max-width: 500px;
  }

  p {
    text-align: center;
    opacity: 0.5;
  }

  video {
    border: 1px solid currentColor;
    border-radius: 0.25rem;
  }
</style>
