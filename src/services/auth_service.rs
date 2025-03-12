use reqwest::Client;
use serde::{Deserialize, Serialize};

use crate::config::env::Environment;

#[derive(Deserialize)]
pub struct OAuthResponse {
    pub access_token: String,
}

#[derive(Deserialize)]
pub struct OAuthErrorResponse {
    pub error: String,
    pub error_description: Option<String>,
}

#[derive(thiserror::Error, Debug)]
pub enum AuthError {
    #[error("OAuth error: {error} - {description}")]
    OAuthError {
        error: String,
        description: String,
    },
    
    #[error("Request failed: {0}")]
    RequestError(#[from] reqwest::Error),
    
    #[error("Unexpected error: {0}")]
    Other(String),
}

#[derive(Serialize, Deserialize)]pub struct GoogleUserResult {
    pub id: String,
    pub email: String,
    pub verified_email: bool,
    pub name: String,
    #[serde(default)]
    pub given_name: String,
    #[serde(default)]
    pub family_name: String,
    #[serde(default)]
    pub picture: String,
    #[serde(default)]
    pub locale: String,
}

pub fn get_google_login_url(redirect_uri: &str, client_id: &str) -> String {
    format!(
        "https://accounts.google.com/o/oauth2/v2/auth?client_id={}&redirect_uri={}&response_type=code&scope=email profile",
        client_id,
        redirect_uri
    )
}

pub async fn get_access_token(env: Environment, code: &str) -> Result<String, AuthError> {
    let client = Client::new();

    let params = [
        ("code", code),
        ("client_id", env.google_client_id.as_str()),
        ("client_secret", env.google_client_secret.as_str()),
        ("redirect_uri", env.google_redirect_uri.as_str()),
        ("grant_type", "authorization_code"),
    ];

    let response = client
        .post("https://oauth2.googleapis.com/token")
        .form(&params)
        .send()
        .await?;

    if response.status().is_success() {
        let response: OAuthResponse = response.json::<OAuthResponse>().await?;
        Ok(response.access_token)
    } else {
        let error_body = response.json::<OAuthErrorResponse>().await?;
        Err(AuthError::OAuthError {
            error: error_body.error,
            description: error_body.error_description.unwrap_or_else(|| "No description provided".to_string()),
        })
    }
}

pub async fn get_user_info(access_token: &str) -> Result<GoogleUserResult, AuthError> {
    let client = Client::new();

    let response = client
        .get("https://www.googleapis.com/oauth2/v1/userinfo")
        .header("Authorization", format!("Bearer {}", access_token))
        .send()
        .await?;

    if response.status().is_success() {
        let response: GoogleUserResult = response.json::<GoogleUserResult>().await?;
        Ok(response)
    } else {
        let error_body = response.text().await?;
        Err(AuthError::Other(format!("Failed to get user info: {}", error_body)))
    }
}