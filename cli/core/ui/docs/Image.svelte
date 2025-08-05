<script lang="ts">
  let {
    src,
    alt = "Image",
  }: {
    src: string
    alt?: string
  } = $props()
</script>

<img {src} {alt} />
<p>{alt}</p>

<style>
  img,
  p {
    width: 100%;
    max-width: 500px;
  }
  p {
    text-align: center;
    opacity: 0.5;
  }
  img {
    border: 1px solid currentColor;
  }
</style>
