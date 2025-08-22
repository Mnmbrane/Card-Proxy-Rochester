use wasm_bindgen::prelude::*;
use std::collections::HashMap;

pub struct Debouncer {
    timeouts: HashMap<String, i32>, // timeout_id by key
    delay_ms: u32,
}

impl Debouncer {
    pub fn new(delay_ms: u32) -> Self {
        Self {
            timeouts: HashMap::new(),
            delay_ms,
        }
    }

    // TODO: Debounce a function call
    pub fn debounce<F>(&mut self, key: &str, callback: F) -> Result<(), JsValue>
    where
        F: FnOnce() + 'static,
    {
        todo!("Implement debouncing logic")
        // 1. Clear existing timeout for this key
        // 2. Set new timeout with delay
        // 3. Store timeout ID
        // 4. Execute callback after delay
    }

    // TODO: Cancel debounced function
    pub fn cancel(&mut self, key: &str) -> Result<(), JsValue> {
        todo!("Cancel pending debounced function")
    }

    // TODO: Cancel all debounced functions
    pub fn cancel_all(&mut self) -> Result<(), JsValue> {
        todo!("Cancel all pending debounced functions")
    }
}