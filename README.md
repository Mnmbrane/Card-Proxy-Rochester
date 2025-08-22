# MTG Card Proxy Generator

<div align="center">

  <h3>🃏 A Magic: The Gathering proxy card generator built with Rust + WebAssembly</h3>

  <p>
    <strong>Enter card names, get high-quality proxy images. No backend required!</strong>
  </p>

</div>

## ✨ Features

- **Bulk Card Input**: Supports "4x Lightning Bolt" quantity format
- **Scryfall Integration**: Fetches official card data and images
- **Fast Performance**: Core logic runs in WebAssembly
- **Mobile Friendly**: Responsive design for all devices
- **No Backend**: Everything runs in your browser
- **Free Hosting**: Deploy to GitHub Pages

## 🚀 Quick Start

### Prerequisites
- [Rust](https://rustup.rs/) with `wasm32-unknown-unknown` target
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Node.js](https://nodejs.org/) (for frontend development)

### Development

1. **Clone and setup**
   ```bash
   git clone <your-repo>
   cd card-proxy-wasm
   ```

2. **Build the WASM module**
   ```bash
   wasm-pack build
   ```

3. **Setup and start frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   JavaScript    │───▶│   Rust + WASM    │───▶│  Scryfall API   │
│   (Frontend)    │    │  (Card Parser)   │    │   (Card Data)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

- **JavaScript**: Handles UI, DOM manipulation, and WASM integration
- **Rust/WASM**: Parses card input, makes API calls, processes data
- **Scryfall API**: Provides official MTG card data and images

## 📝 Usage Examples

**Input formats supported:**
```
Lightning Bolt
4x Lightning Bolt
2x Counterspell
Black Lotus
3x Sol Ring
```

**The app will:**
1. Parse quantities and card names
2. Fetch data from Scryfall API
3. Display card images and details
4. Handle fuzzy name matching

## 🛠️ Build Commands

| Command | Description |
|---------|-------------|
| `wasm-pack build` | Compile Rust to WASM (run in root) |
| `npm install` | Install frontend dependencies (run in frontend/) |
| `npm start` | Start webpack dev server (run in frontend/) |

## 📦 Project Structure

```
card-proxy-wasm/
├── src/                    # Rust source code
│   ├── lib.rs             # Main WASM bindings
│   └── utils.rs           # Utility functions
├── frontend/              # Web frontend
│   ├── index.html         # Main HTML page
│   ├── css/style.css      # Responsive styling
│   ├── js/main.js         # JavaScript WASM integration
│   ├── package.json       # Frontend dependencies
│   └── webpack.config.js  # Webpack configuration
├── pkg/                   # Generated WASM files (gitignored)
├── Cargo.toml             # Rust dependencies
└── docs/                  # Documentation and demo files
```

## 🔧 WASM Interface

The JavaScript frontend expects these Rust functions:

```rust
// Initialize panic handling
pub fn init_panic_hook()

// Process card input and return structured data
pub async fn process_card_input(input: &str) -> Result<JsValue, JsValue>
```

Expected return format:
```rust
struct ProcessedCard {
    quantity: u32,
    card_data: CardData, // name, image_uris, set_name, type_line, etc.
}
```

## 🚀 Deployment

### GitHub Pages
1. Build the project: `wasm-pack build` then `cd frontend && npm run build`
2. Push the `frontend/dist/` directory to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Other Static Hosts
The `frontend/dist/` directory contains everything needed for deployment to:
- Netlify
- Vercel  
- Firebase Hosting
- Any static file host

## License

Licensed under either of

* Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
* MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally
submitted for inclusion in the work by you, as defined in the Apache-2.0
license, shall be dual licensed as above, without any additional terms or
conditions.
# Card-Proxy-Rochester
