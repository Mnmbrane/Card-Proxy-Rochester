use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CartItem {
    pub card_name: String,
    pub quantity: u32,
}

pub struct CartManager {
    items: HashMap<String, u32>, // card_name -> quantity
}

impl CartManager {
    pub fn new() -> Self {
        Self {
            items: HashMap::new(),
        }
    }

    // TODO: Add card to cart
    pub fn add_card(&mut self, card_name: &str, quantity: u32) {
        todo!("Add card to cart with specified quantity")
    }

    // TODO: Remove card from cart
    pub fn remove_card(&mut self, card_name: &str) {
        todo!("Remove card completely from cart")
    }

    // TODO: Update card quantity
    pub fn update_quantity(&mut self, card_name: &str, quantity: u32) {
        todo!("Update card quantity, remove if 0")
    }

    // TODO: Increase card quantity by 1
    pub fn increase_quantity(&mut self, card_name: &str) {
        todo!("Increment card quantity by 1")
    }

    // TODO: Decrease card quantity by 1
    pub fn decrease_quantity(&mut self, card_name: &str) {
        todo!("Decrement card quantity by 1, remove if reaches 0")
    }

    // TODO: Get card quantity
    pub fn get_quantity(&self, card_name: &str) -> u32 {
        todo!("Get current quantity of a card")
    }

    // TODO: Check if cart contains card
    pub fn contains_card(&self, card_name: &str) -> bool {
        todo!("Check if card is in cart")
    }

    // TODO: Get all cart items
    pub fn get_items(&self) -> Vec<CartItem> {
        todo!("Return all cart items as vector")
    }

    // TODO: Get total number of items in cart
    pub fn get_total_items(&self) -> u32 {
        todo!("Sum all quantities in cart")
    }

    // TODO: Clear entire cart
    pub fn clear(&mut self) {
        todo!("Remove all items from cart")
    }

    // TODO: Check if cart is empty
    pub fn is_empty(&self) -> bool {
        todo!("Return true if cart has no items")
    }

    // TODO: Convert cart to text format for generator
    pub fn to_text_format(&self) -> String {
        todo!("Convert cart to '4x Lightning Bolt\\n2x Counterspell' format")
    }

    // TODO: Load cart from text format
    pub fn from_text_format(&mut self, text: &str) -> Result<(), String> {
        todo!("Parse '4x Lightning Bolt\\n2x Counterspell' format into cart")
    }
}