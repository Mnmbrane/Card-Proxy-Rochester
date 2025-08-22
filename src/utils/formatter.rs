use regex::Regex;

pub struct CardFormatter;

impl CardFormatter {
    // TODO: Parse card input text into (name, quantity) pairs
    pub fn parse_card_input(input: &str) -> Result<Vec<(String, u32)>, String> {
        todo!("Parse '4x Lightning Bolt\\n2x Counterspell' format")
        // 1. Split by lines
        // 2. Use regex to extract quantity and name
        // 3. Default to quantity 1 if no quantity specified
        // 4. Return vector of (name, quantity) tuples
    }

    // TODO: Format cards as text for generator
    pub fn format_cards_as_text(cards: &[(String, u32)]) -> String {
        todo!("Format cards as '4x Lightning Bolt\\n2x Counterspell'")
    }

    // TODO: Escape HTML for safe DOM insertion
    pub fn escape_html(text: &str) -> String {
        todo!("Escape HTML characters for safe DOM insertion")
        // Replace <, >, &, ", ' with HTML entities
    }

    // TODO: Format mana cost for display
    pub fn format_mana_cost(mana_cost: Option<&str>) -> String {
        todo!("Format mana cost string for display")
        // Handle empty/None mana costs
        // Maybe convert {T} symbols to more readable format later
    }
}