use actix_web::{web::Json, HttpRequest, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;

use crate::api::{constants, middlewares::auth_middleware::check_auth};
use crate::config::state::AppData;
use crate::database::repositories::links_repository::LinkRepository;
use crate::utils::{code_utils::generate_random_code, loader_utils::return_loader_html};

#[derive(Serialize, Deserialize)]
pub struct NewLink {
    pub analytics_code: Option<String>,
    pub long_url: String,
    pub custom_code: Option<String>,
    pub enabled: bool,

    #[serde(skip)]
    pub user_id: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateLink {
    pub analytics_code: Option<String>,
    pub long_url: Option<String>,
    pub custom_code: Option<String>,
    pub enabled: Option<bool>,
}

pub async fn create_link(req: HttpRequest, body: Json<NewLink>, state: AppData) -> HttpResponse {
    let user_id = if let Some(cookie) = req.cookie("__token") {
        match check_auth(&cookie.value().to_string(), &state).await {
            Ok(user) => Some(user.id),
            Err(_) => {
                return HttpResponse::Unauthorized().json(json!({
                    "error": constants::errors::ERR_UNAUTHORIZED,
                }))
            }
        }
    } else {
        None
    };

    let mut new_link = body.into_inner();
    new_link.user_id = user_id;

    let analytics_code = generate_random_code(6);

    if new_link.custom_code.is_none() {
        new_link.custom_code = Some(generate_random_code(6));
    }

    match LinkRepository::create_link(
        &state,
        new_link.user_id,
        &analytics_code,
        &new_link.long_url,
        new_link.custom_code,
    )
    .await
    {
        Ok(link) => link,
        Err(e) => {
            return HttpResponse::InternalServerError().json(json!({
                "error": constants::errors::ERR_INTERNAL_SERVER_ERROR,
                "message": format!("Failed to create link: {}", e)
            }))
        }
    };

    HttpResponse::Created().finish()
}

pub async fn redirect_to_link(req: HttpRequest, state: AppData) -> HttpResponse {
    let custom_code = req.match_info().get("custom_code").unwrap();

    match LinkRepository::find_link_by_code(&state, custom_code).await {
        Ok(link) => {
            if link.enabled {
                let html = return_loader_html(link.long_url);

                HttpResponse::Ok()
                    .content_type("text/html; charset=utf-8")
                    .body(html)
            } else {
                HttpResponse::BadRequest().json(json!({
                    "error": constants::errors::ERR_LINK_DISABLED,
                }))
            }
        }
        Err(_) => HttpResponse::NotFound().json(json!({
            "error": constants::errors::ERR_LINK_NOT_FOUND,
        })),
    }
}

pub async fn fetch_my_links(req: HttpRequest, state: AppData) -> HttpResponse {
    let user_id = if let Some(cookie) = req.cookie("__token") {
        match check_auth(&cookie.value().to_string(), &state).await {
            Ok(user) => Some(user.id),
            Err(_) => {
                return HttpResponse::Unauthorized().json(json!({
                    "error": constants::errors::ERR_UNAUTHORIZED,
                }))
            }
        }
    } else {
        None
    };

    if let Some(id) = user_id {
        if let Some(user_links) = state.user_links_cache.get(&id) {
            return HttpResponse::Ok().json(json!({
                "data": json!({
                    "links": user_links,
                })
            }));
        }
    }

    let user_id_value = match user_id {
        Some(id) => id,
        None => return HttpResponse::Unauthorized().json(json!({
            "error": constants::errors::ERR_UNAUTHORIZED,
        })),
    };

    match LinkRepository::find_links_by_user_id(&state, user_id_value).await {
        Ok(links) => {
            state.user_links_cache.set(user_id_value, links.clone());
            HttpResponse::Ok().json(json!({
                "data": json!({
                    "links": links,
                })
            }))
        }
        Err(_) => HttpResponse::NotFound().json(json!({
            "error": constants::errors::ERR_NOT_FOUND,
        })),
    }
}

pub async fn update_link(req: HttpRequest, body: Json<UpdateLink>, state: AppData) -> HttpResponse {
    let user_id = if let Some(cookie) = req.cookie("__token") {
        match check_auth(&cookie.value().to_string(), &state).await {
            Ok(user) => Some(user.id),
            Err(_) => {
                return HttpResponse::Unauthorized().json(json!({
                    "error": constants::errors::ERR_UNAUTHORIZED,
                }))
            }
        }
    } else {
        None
    };

    let custom_code = req.match_info().get("custom_code").unwrap();
    let update_link = body.into_inner();

    match LinkRepository::find_link_by_code(&state, custom_code).await {
        Ok(link) => {
            if link.user_id != user_id {
                return HttpResponse::Unauthorized().json(json!({
                    "error": constants::errors::ERR_UNAUTHORIZED,
                }));
            }

            match LinkRepository::update_link(
                &state,
                link.id,
                update_link.long_url.as_deref(),
                update_link.custom_code,
                update_link.enabled,
            )
            .await
            {
                Ok(_) => HttpResponse::NoContent().finish(),
                Err(_) => HttpResponse::InternalServerError().json(json!({
                    "error": constants::errors::ERR_INTERNAL_SERVER_ERROR,
                })),
            }
        }
        Err(_) => HttpResponse::NotFound().json(json!({
            "error": constants::errors::ERR_LINK_NOT_FOUND,
        })),
    }
}
