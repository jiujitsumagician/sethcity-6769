# SethCity 6769 — Android shell

Full-screen offline WebView wrapper around the built game (`dist/` → bundled
assets). Build from the repo root:

```bash
npm run apk     # vite build → copy dist into assets → gradle assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`.

**Signing:** `android/sethcity-release.jks` + `android/keystore.properties`
(both git-ignored, kept only on this machine). The same keystore MUST be used
for every future release or installed copies can't upgrade in place. Back it up.
