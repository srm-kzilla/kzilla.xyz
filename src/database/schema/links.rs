use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct Link {
    pub id: i32,
    pub user_id: Option<i32>,
    pub clicks: i32,
    pub analytics_code: Option<String>,
    pub long_url: String,
    pub custom_code: Option<String>,
    pub enabled: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,
    pub is_deleted: bool,
}