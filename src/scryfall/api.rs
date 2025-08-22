use crate::scryfall::types::*;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};

pub struct ScryfallClient {
    base_url: String,
    last_request_time: f64,
    request_delay: f64, // 150ms delay
}

impl ScryfallClient {
    pub fn new() -> Self {
        Self {
            base_url: "https://api.scryfall.com".to_string(),
            last_request_time: 0.0,
            request_delay: 150.0,
        }
    }

    // TODO: Implement rate-limited API requests
    async fn make_request(&mut self, url: &str) -> Result<Response, JsValue> {
        todo!("Implement rate limiting and HTTP request logic")
        // 1. Check if 150ms has passed since last request
        // 2. If not, wait the remaining time
        // 3. Create Request with proper User-Agent header
        // 4. Make fetch request
        // 5. Update last_request_time
        // 6. Return Response
    }

    // TODO: Search for cards by query string
    pub async fn search_cards(&mut self, query: &str, limit: Option<u32>) -> Result<Vec<Card>, JsValue> {
        todo!("Implement card search")
        // 1. Encode query parameter
        // 2. Build search URL with pagination
        // 3. Make API request
        // 4. Parse JSON response
        // 5. Return cards (limit to 20 by default)
    }

    // TODO: Get specific card by exact name
    pub async fn get_card_by_name(&mut self, name: &str) -> Result<Option<Card>, JsValue> {
        todo!("Implement exact card lookup")
        // Use /cards/named?exact= endpoint
    }

    // TODO: Get popular/featured cards (hardcoded list for now)
    pub fn get_popular_cards() -> Vec<Card> {
        todo!("Return hardcoded list of popular cards")
        // Convert the current JavaScript popular cards to Rust structs
    }
}