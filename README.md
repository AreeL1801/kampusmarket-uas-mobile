# KampusMarket

KampusMarket is an Expo + React Native UAS project for the Praktikum Pemrograman Mobile brief. It uses DummyJSON for product data and login simulation.

## Requirement Mapping

- Login screen with validation for name, email format, and password length.
- Protected main app: users must log in before accessing tabs.
- Bottom tabs: Home, Wishlist, Profile.
- Home catalog: `FlatList`, product search, category filter, loading, error, empty, and refresh states.
- Detail screen: navigated from Home product cards.
- Reusable components: `AppButton`, `TextField`, `ProductCard`, `CategoryPill`, `StatusBlock`.
- Networking: DummyJSON products and auth simulation.
- Responsive layout: phone-first, with wider grid behavior for tablet/web.

## Run Locally

```bash
npm install
npm run web
```

For native preview:

```bash
npm run android
```

## Verification

```bash
npm run typecheck
npm run verify:web
npm run record:demo
```

`verify:web` runs the full browser flow in a mobile viewport: validation errors, login, DummyJSON catalog loading, search, detail navigation, wishlist, and profile. The generated local demo video is saved at `videos/kampusmarket-demo.webm` and can be uploaded to YouTube or Google Drive for submission.

## Demo Login

Enter any realistic name, valid email address, and password with at least 8 characters. The form validates the input, then calls DummyJSON auth with a demo account to create the session.

## Submission Placeholders

- Student name / NPM: pending user confirmation
- GitHub repository: https://github.com/AreeL1801/kampusmarket-uas-mobile
- Demo video link: pending upload
