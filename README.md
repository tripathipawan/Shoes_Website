# Nike Shoes — E-Commerce Frontend

A fully functional Nike shoes e-commerce storefront built with React 18, Tailwind CSS 3, and Framer Motion. The app delivers a multi-page shopping experience with a real cart system, product browsing by category, a dedicated product detail page with image switcher, a contact form, dark mode, and a custom animated mouse cursor — all without any backend, running entirely on the client.

**Live Demo → [nike-eta-beryl.vercel.app](https://nike-eta-beryl.vercel.app)**

---

## What This Project Does

The app is a fully navigable storefront powered by React Router DOM with 7 defined routes. A `ShopContext` — built with the React Context API — holds the global cart state and exposes `addToCart`, `removeFromCart`, `getTotalCartAmount`, and `getTotalCartItems` functions to every component in the tree. Products come from a static `all_product.js` data file. Framer Motion drives all animations on the hero section, and `react-mouse-follower` wraps the entire app via `UpdateFollower` to render a white circular cursor that trails the pointer at a configurable `followSpeed`. Dark mode is applied by toggling a `dark` class on the document root, which activates `dark:bg-[#00042b]` and matching text color overrides across all pages.

---

## Features

**1. Animated hero with shoe switcher** — The landing page hero displays 3 featured Nike shoes (Jordan Luka 3 PF, Nike G.T. Cut 3 EP, Nike G.T. Cut Academy EP). Clicking any thumbnail at the bottom swaps the active product using Framer Motion's `AnimatePresence` in `wait` mode. The background color, large shoe image, product title, subtitle, and CTA button each animate independently with staggered `SlideRight` delays (0.2s, 0.4s, 0.6s). The section's background transitions color smoothly via `motion.section`'s `animate={{ backgroundColor }}`.

**2. Product catalogue by category** — Three routes (`/mens`, `/womens`, `/kids`) each render `ProductList` with a `category` prop. The component filters `all_product` for matching entries and renders a responsive grid of `Item` cards, each showing the product image, name, and price with a link to the product detail page.

**3. Product detail page with image switcher** — `/products/:productId` renders `SingleProduct`, which reads the route param and finds the matching product. `ProductDisplay` renders a two-column layout: 4 clickable thumbnail images on the left swap the main display image via local `useState`. The right column shows product name, 4-star rating, old price with strikethrough, new price, a description, size selector buttons (UK 7–11), an "ADD TO CART" button that calls `addToCart` from context, and category/tags metadata.

**4. Cart page with totals and promo code** — `/cart` shows an empty-state illustration (`EmptyCart.png`) when no items are in the cart. When items exist, a responsive grid table lists each item with image, title, unit price, quantity display, line total, and a remove button (Lucide `X` icon). Below, a "Cart Totals" panel shows subtotal, free shipping, and grand total. A promo code input and a "PROCEED TO CHECKOUT" button are present on the page.

**5. Contact page** — A dedicated `/contact` route renders a styled contact page accessible from both navbars.

**6. Custom animated mouse follower** — The entire app is wrapped in `UpdateFollower` with `backgroundColor: "white"`, `zIndex: 10`, and `followSpeed: 1.5`. This replaces the default pointer with a smooth trailing cursor across all pages.

**7. Dark / Light mode toggle** — `DarkMode.jsx` renders two image buttons (`dark-mode-button.png` / `light-mode-button.png`) that toggle the `dark` class on the document root. Dark mode applies `dark:bg-[#00042b]` to all page wrappers and `dark:text-[#9dffe8]` / `dark:text-[#08b089]` to product and price text throughout.

**8. Dual responsive navbars** — `Navbar` (used inside the hero section on the home page) shows the full link bar on desktop and collapses to a hamburger icon on mobile, toggling a slide-in `ResponsiveMenu`. `Navbar2` is used on all inner pages (category, cart, product, contact) and includes the `DarkMode` toggle. Both navbars contain a cart icon linking to `/cart`.

**9. Fully responsive layout** — Every page uses Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) only — no custom CSS breakpoints or media queries. The hero, product grid, product detail two-column layout, and cart table all reflow cleanly from 320 px mobile up to full desktop.

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 18.3.1 | Component architecture, Context API for cart state, JSX rendering |
| Tailwind CSS | 3.4.16 | All utility-class styling — layout, spacing, colors, dark mode, responsive breakpoints |
| React Router DOM | 7.6.2 | Client-side routing for all 7 routes |
| Framer Motion | 11.18.2 | Hero background color transitions, `AnimatePresence` + `motion` for shoe/text slide animations |
| React Icons | 5.5.0 | Navbar icons (`FaRegUser`, `HiMenuAlt1`, `HiMenuAlt3`) |
| Lucide React | 0.468.0 | Cart icon (`ShoppingCart`), remove icon (`X`), product rating (`Star`) |
| react-mouse-follower | 2.0.3 | Custom animated cursor wrapping the entire app via `UpdateFollower` |
| Vite | 6.0.1 | Build tool and dev server |
| ESLint | 9.15.0 | Linting with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` |

---

## State Management

Global cart state is managed through React Context (`ShopContext`) — no Redux or external state library.

| State / Function | Type | Purpose |
|---|---|---|
| `cartItems` | `object` | Map of `{ productId: quantity }` — initialized to 0 for every product on mount |
| `addToCart(itemId)` | function | Increments `cartItems[itemId]` by 1 |
| `removeFromCart(itemId)` | function | Decrements `cartItems[itemId]` by 1 |
| `getTotalCartAmount()` | function | Iterates `cartItems`, looks up `new_price` from `all_product`, sums and returns total |
| `getTotalCartItems()` | function | Iterates `cartItems`, returns the total item count across all products |
| `all_product` | `array` | Full product catalogue — passed through context so all components can access it |

The Hero component manages its own `activeData` local state via `useState` to track the currently selected featured shoe.

---

## Project Structure

```
Nike/
├── index.html                      # Vite entry point — single div#root mount target
├── package.json                    # Dependencies: react 18, tailwindcss 3, react-router-dom 7, framer-motion, lucide-react, react-icons, react-mouse-follower, vite 6
├── package-lock.json               # Exact dependency lockfile
├── vite.config.js                  # Vite configuration — React plugin
├── tailwind.config.js              # Tailwind configuration — content paths, dark mode `class` strategy, custom font extensions
├── postcss.config.js               # PostCSS configuration — Tailwind + Autoprefixer plugins
├── eslint.config.js                # ESLint flat config — react-hooks and react-refresh rules
├── vercel.json                     # Vercel SPA rewrite rule — all routes serve index.html so React Router handles navigation
├── .gitignore                      # node_modules, dist, .env excluded
└── src/
    ├── main.jsx                    # React DOM root render — mounts <App /> wrapped in <ShopContextProvider> into #root
    ├── App.jsx                     # Root component — defines all 7 routes via createBrowserRouter, wraps entire app in <UpdateFollower> for custom cursor
    ├── index.css                   # Tailwind base/components/utilities directives; custom `img-shadow` and `text-shadow` classes
    ├── assets/
    │   ├── Shoes1.png              # Jordan Luka 3 PF — used in hero switcher and product pages
    │   ├── Shoes2.png              # Nike G.T. Cut 3 EP — used in hero switcher and product pages
    │   ├── Shoes3.png              # Nike G.T. Cut Academy EP — used in hero switcher and product pages
    │   ├── logo2.png               # Nike logo used in Navbar — rendered with Tailwind `invert` class for white on dark backgrounds
    │   ├── EmptyCart.png           # Illustration displayed on Cart page when cartItems count is 0
    │   └── website/
    │       ├── dark-mode-button.png    # Image button — clicking activates dark mode
    │       └── light-mode-button.png   # Image button — clicking activates light mode
    ├── Utils/
    │   └── all_product.js          # Static product data array — each object has id, name, category (men/women/kid), image, image1, image2, image3, old_price, new_price
    ├── context/
    │   └── ShopContext.jsx         # React Context — ShopContext + ShopContextProvider; manages cartItems state, exposes addToCart / removeFromCart / getTotalCartAmount / getTotalCartItems
    ├── Pages/
    │   ├── Home.jsx                # Home page — renders <Hero /> (Hero internally renders Navbar)
    │   ├── Cart.jsx                # Cart page — reads ShopContext, conditionally renders empty state or full cart table with totals and promo code input
    │   └── Contact.jsx             # Contact page — name, email, message form fields with contact details section
    └── components/
        ├── Navbar.jsx              # Home page navbar — logo, nav links (Home / Mens / Womens / Kids / Contact), cart icon, user icon, mobile hamburger toggle
        ├── Navbar2.jsx             # Inner pages navbar — same links as Navbar plus DarkMode toggle; used on category, cart, product, and contact pages
        ├── ResponsiveMenu.jsx      # Mobile drawer menu — conditionally shown when hamburger is toggled; maps and renders all NavbarMenu links
        ├── Hero.jsx                # Landing hero — 3-shoe animated switcher; Framer Motion background color transition, AnimatePresence SlideRight for title/subtitle/button/image
        ├── ProductList.jsx         # Category product grid — filters all_product by category prop, renders grid of <Item> cards
        ├── Item.jsx                # Single product card — product image, name, old price (strikethrough), new price; wraps in Link to /products/:id
        ├── SingleProduct.jsx       # Product detail shell — reads :productId from useParams, finds product in all_product, renders <Breadcrum> + <ProductDisplay> + <Description>
        ├── ProductDisplay.jsx      # Product detail UI — 4 swappable thumbnails (local useState for mainImage), star rating, old/new price, size buttons, Add to Cart button, category/tags
        ├── Breadcrum.jsx           # Breadcrumb trail — Home > category > product name; used above ProductDisplay
        ├── Description.jsx         # Product description and review tabs section — displayed below ProductDisplay on the detail page
        ├── DarkMode.jsx            # Theme toggle — image buttons toggle `dark` class on document.documentElement
        └── Footer.jsx              # Site footer — logo, grouped nav link columns, social media icons
```

---

## How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/tripathipawan/Nike.git
   ```

2. Move into the project directory
   ```bash
   cd Nike
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173`. Browse Mens / Womens / Kids, open any product, select a size, add it to the cart, then visit `/cart` to see totals.

6. To build for production:
   ```bash
   npm run build
   ```
   Output goes into `dist/`. The `vercel.json` SPA rewrite ensures React Router routes work correctly after deploying to Vercel.

---

## Repository

[https://github.com/tripathipawan/Nike](https://github.com/tripathipawan/Nike)
