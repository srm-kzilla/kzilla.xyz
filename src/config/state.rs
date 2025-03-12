use actix_web::web;

use super::env::Environment;
use super::cache::{UserCache, UserLinksCache};
use crate::database::db::DbPool;

#[derive(Clone)]
pub struct AppState {
    pub env: Environment,
    pub db_pool: DbPool,
    pub user_cache: UserCache,
    pub user_links_cache: UserLinksCache,
}

pub type AppData = web::Data<AppState>;
