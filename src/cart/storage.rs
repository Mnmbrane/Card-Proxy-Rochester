use wasm_bindgen::prelude::*;
use web_sys::window;

pub struct BrowserStorage;

impl BrowserStorage {
    // TODO: Save cart to localStorage
    pub fn save_cart(cart_data: &str) -> Result<(), JsValue> {
        todo!("Save cart data to localStorage with key 'selectedCards'")
        // Use web_sys to access localStorage
        // window().unwrap().local_storage()...
    }

    // TODO: Load cart from localStorage
    pub fn load_cart() -> Result<Option<String>, JsValue> {
        todo!("Load cart data from localStorage")
        // Return None if no data exists
    }

    // TODO: Clear cart from localStorage
    pub fn clear_cart() -> Result<(), JsValue> {
        todo!("Remove cart data from localStorage")
    }

    // TODO: Check if cart exists in localStorage
    pub fn has_cart() -> Result<bool, JsValue> {
        todo!("Check if cart data exists in localStorage")
    }
}