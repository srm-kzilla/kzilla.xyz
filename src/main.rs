mod api;
mod config;

use crate::api::routes::routes::config;
use crate::config::env::load_env;
use actix_web::{App, HttpServer};
use env_logger::Env;
use log::info;

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    let env = load_env();

    env_logger::Builder::from_env(Env::default().default_filter_or("debug")).init();

    info!("Starting server at {}:{} 🚀", env.host, env.port);
    HttpServer::new(move || App::new().configure(config))
        .bind((env.host.as_str(), env.port))?
        .run()
        .await
}
