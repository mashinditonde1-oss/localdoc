# LocalDoc

LocalDoc is a static Next.js app for local image, PDF, and Office file utilities.

## Development

- `pnpm install`
- `pnpm dev`
- `pnpm build`

The production export is written to `out/` and can be deployed to Cloudflare Pages. The build scripts copy the PDF.js worker into the static assets and create `public/localdoc-source.zip`, a source and notice archive linked from the app footer.

Most operations run without a network connection after the page is loaded. On first use, AI background removal fetches IMG.LY's model/WASM assets (about 40 MB for the selected quantized model); the browser caches these assets for later use. Photos remain on-device.

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the background-removal package attribution and license.
