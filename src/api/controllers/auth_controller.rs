use actix_web::cookie::{time::Duration, Cookie};
use actix_web::{web, HttpResponse}; 
use serde::{Deserialize, Serialize};
use serde_json::json;

use crate::services::auth_service::AuthError;
use crate::{
    api::constants,
    config::state::AppData,
    database::{repositories::user_repository::UserRepository, schema::users::User},
    services::auth_service::{get_access_token, get_google_login_url, get_user_info},
    utils::jwt_utils::encode_jwt_token,
};

#[derive(Serialize)]
pub struct UserResponse {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub avatar: Option<String>,
    pub prefix: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub user: UserResponse,
    pub token: String,
}

#[derive(Deserialize)]
pub struct CallbackQuery {
    code: Option<String>,
    error: Option<String>,
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        Self {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            prefix: user.prefix,
        }
    }
}

pub async fn google_login(state: AppData) -> HttpResponse {
    let redirect_uri = state.env.google_redirect_uri.clone();

    let url = get_google_login_url(&redirect_uri, &state.env.google_client_id);

    HttpResponse::Found()
        .append_header(("Location", url))
        .finish()
}

pub async fn google_callback(state: AppData, query: web::Query<CallbackQuery>) -> HttpResponse {
    if let Some(_error) = &query.error {
        return HttpResponse::BadRequest().json(json!({
            "error": constants::errors::ERR_OAUTH_ERROR
        }));
    }

    let code = match &query.code {
        Some(code) => code.clone(),
        None => {
            return HttpResponse::BadRequest().json(json!({
                "error": constants::errors::ERR_MISSING_CODE
            }));
        }
    };

    let access_token = match get_access_token(state.env.clone(), &code).await {
        Ok(token) => {
            token
        }
        Err(e) => {
            match e {
                AuthError::OAuthError { error, description: _ } => {
                    if error == "invalid_grant" {
                        return HttpResponse::BadRequest()
                            .json(json!({
                                "error": constants::errors::ERR_OAUTH_INVALID_GRANT
                            }));
                    }

                    return HttpResponse::BadRequest().json(json!({
                        "error": constants::errors::ERR_OAUTH_ERROR
                    }));
                }
                _ => {
                    return HttpResponse::InternalServerError()
                        .json(json!({
                            "error": constants::errors::ERR_INTERNAL_SERVER_ERROR
                        }));
                }
            }
        }
    };

    let user_info = match get_user_info(&access_token).await {
        Ok(info) => info,
        Err(_e) => {
            return HttpResponse::InternalServerError()
                .json(json!({
                    "error": constants::errors::ERR_INTERNAL_SERVER_ERROR
                }));
        }
    };

    let user = match UserRepository::create_user_from_oauth(&state, &user_info).await {
        Ok(user) => user,
        Err(_e) => {
            return HttpResponse::InternalServerError()
                .json(json!({
                    "error": constants::errors::ERR_INTERNAL_SERVER_ERROR
                }));
        }
    };

    let token = encode_jwt_token(user.id, state.env.jwt_secret.clone());

    let cookie = Cookie::build("__token", token)
        .http_only(true)
        .path("/")
        .secure(true)
        .max_age(Duration::seconds(3600))
        .finish();

    HttpResponse::Ok()
        .cookie(cookie)
        .finish()
}
