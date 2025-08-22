use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Card {
    pub name: String,
    pub mana_cost: Option<String>,
    pub type_line: Option<String>,
    pub oracle_text: Option<String>,
    pub set_name: Option<String>,
    pub image_uris: Option<ImageUris>,
    pub card_faces: Option<Vec<CardFace>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ImageUris {
    pub small: Option<String>,
    pub normal: Option<String>,
    pub large: Option<String>,
    pub png: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CardFace {
    pub image_uris: Option<ImageUris>,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScryfallSearchResponse {
    pub data: Vec<Card>,
    pub has_more: bool,
    pub total_cards: Option<u32>,
}

#[derive(Debug, Clone)]
pub enum CardCategory {
    All,
    Creatures,
    Spells,
    Lands,
    Artifacts,
}

impl CardCategory {
    pub fn as_str(&self) -> &'static str {
        match self {
            CardCategory::All => "all",
            CardCategory::Creatures => "creatures", 
            CardCategory::Spells => "spells",
            CardCategory::Lands => "lands",
            CardCategory::Artifacts => "artifacts",
        }
    }
}

// TODO: Implement helper methods for Card
impl Card {
    // TODO: Get best available image URL (prefer PNG > large > normal)
    pub fn get_image_url(&self) -> Option<String> {
        todo!("Implement image URL selection logic")
    }
    
    // TODO: Categorize card based on type_line
    pub fn get_category(&self) -> CardCategory {
        todo!("Implement card categorization based on type_line")
    }
}