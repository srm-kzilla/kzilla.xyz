use actix_web::{web, HttpResponse, Responder};

use crate::api::controllers::{auth_controller, links_controller};

async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": 200,
        "message": "UP",
        "prettyMessage": "Service is up and running",
        "timestamp": chrono::Utc::now(),
    }))
}

async fn route_not_found() -> impl Responder {
    HttpResponse::NotFound().json(serde_json::json!({
        "status": 404,
        "message": "Not Found",
        "prettyMessage": "Route not found",
    }))
}

pub fn auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/auth")
            .route("/google/login", web::get().to(auth_controller::google_login))
            .route("/google/callback", web::get().to(auth_controller::google_callback))
    );
}

pub fn link_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/links")
            .route("", web::post().to(links_controller::create_link))
            .route("/{code}", web::get().to(links_controller::redirect_to_link))
            .route("/{code}", web::get().to(links_controller::fetch_my_links))
            .route("/{code}", web::put().to(links_controller::update_link))
    );
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .route("/health", web::get().to(health_check))
            .configure(auth_routes)
            .configure(link_routes)
        )
        .default_service(web::route().to(route_not_found));
}
