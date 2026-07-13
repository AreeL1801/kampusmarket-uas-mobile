# KampusMarket Design Notes

Scene: A student checks used goods between classes on a phone in bright indoor light, moving quickly and comparing price, stock, and category.

Color strategy: restrained product UI. The background is a soft green-tinted neutral, content surfaces are near-white but not pure white, and primary actions use a grounded campus green. Amber highlights price and commerce cues. Rose is reserved for validation and destructive actions.

Typography: React Native system font stack. Headings use stronger weight and compact scale; form labels and metadata stay small and scannable.

Components:

- AppButton: consistent filled, soft, ghost, and danger variants with loading and disabled states.
- TextField: label, icon, helper text, validation error, secure text support.
- ProductCard: image-first product summary for FlatList, with price, rating, stock, and wishlist affordance.
- CategoryPill and StatusBlock: filter and network state vocabulary.

Layout:

- Login uses a single-column mobile form with concise supporting context.
- Home uses a sticky-feeling top area for search and filters, then a FlatList catalog.
- Detail uses product image, metadata rows, and a clear wishlist action.
- Tabs expose Home, Wishlist, and Profile after authentication.
