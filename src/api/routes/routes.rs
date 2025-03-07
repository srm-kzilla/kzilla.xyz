use actix_web::{web, HttpResponse, Responder};

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

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/api").route("/health", web::get().to(health_check)))
        .default_service(web::route().to(route_not_found));
}
