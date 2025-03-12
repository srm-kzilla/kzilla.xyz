mod api;
mod config;
mod database;
mod services;
mod utils;

use crate::api::routes::routes::config;
use crate::config::env::Environment;
use crate::config::state::AppState;
use config::cache::{UserCache, UserLinksCache};
use crate::database::db::init_pool;

use actix_web::{web, App, HttpServer};
use dotenvy::dotenv;
use env_logger::Env;
use log::{error, info};
use std::process;

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    dotenv().ok();

    let env = match Environment::new() {
        Ok(env) => env,
        Err(e) => {
            error!("Failed to load environment variables: {}", e);
            process::exit(1);
        }
    };

    env_logger::Builder::from_env(Env::default().default_filter_or("debug")).init();

    let pool = match init_pool(&env).await {
        Ok(pool) => {
            info!("Database connection established 🚀");
            pool
        }
        Err(e) => {
            error!("Failed to connect to database: {}", e);
            process::exit(1);
        }
    };

    let user_cache = UserCache::new(60 * 60);
    let user_links_cache = UserLinksCache::new(60 * 60);

    let state = web::Data::new(AppState {
        env: env.clone(),
        db_pool: pool,
        user_cache,
        user_links_cache,
    });

    info!("Starting server at {}:{} 🚀", env.host, env.port);

    HttpServer::new(move || App::new().app_data(state.clone()).configure(config))
        .bind((env.host.as_str(), env.port))?
        .run()
        .await
}
