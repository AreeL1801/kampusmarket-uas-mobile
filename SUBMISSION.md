# UAS Praktikum Pemrograman Mobile

## Deliverables

1. Repository GitHub (source code)  
   https://github.com/AreeL1801/kampusmarket-uas-mobile

2. Video demo aplikasi berjalan  
   https://github.com/AreeL1801/kampusmarket-uas-mobile/releases/tag/demo-video

Direct video file:  
https://github.com/AreeL1801/kampusmarket-uas-mobile/releases/download/demo-video/kampusmarket-demo.webm

## Demo Coverage

The demo shows:

- Login form validation for name, email, and password.
- Protected main app after login.
- Home, Wishlist, and Profile bottom tabs.
- Product catalog from DummyJSON.
- FlatList product rendering.
- Product search and category filtering.
- Product detail navigation.
- Wishlist add/remove flow.
- Profile screen and logout action.

## Verification

The project was verified with:

```bash
npm run typecheck
npx expo export --platform web --output-dir web-dist
npm run verify:web
npm run record:demo
```

## Notes

The local upload-ready video file is:

```text
videos/kampusmarket-demo.webm
```

If the submission form strictly requires YouTube or Google Drive, upload that file there and use the resulting share link.
