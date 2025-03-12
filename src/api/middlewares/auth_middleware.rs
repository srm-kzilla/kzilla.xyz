use crate::config::state::AppData;
use crate::database::repositories::user_repository::UserRepository;
use crate::database::schema::users::User;
use crate::services::auth_service::AuthError;
use crate::utils::jwt_utils::decode_jwt_token;

pub async fn check_auth(token: &str, state: &AppData) -> Result<User, AuthError> {
    let user_id = decode_jwt_token(token, state.env.jwt_secret.clone());

    if let Some(user) = state.user_cache.get(&user_id) {
        return Ok(user);
    } else {
        let user = UserRepository::fetch_user_by_id(&state, user_id).await;

        match user {
            Ok(user) => {
                state.user_cache.set(user_id, user.clone());
                Ok(user)
            }
            Err(_) => {
                Err(AuthError::OAuthError {
                    error: "User not found".to_string(),
                    description: "User not found".to_string(),
                })
            }
        }
    }
}
