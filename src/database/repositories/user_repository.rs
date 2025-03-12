use chrono::Utc;
use rand::{thread_rng, Rng};
use sqlx::{query, Error};

use crate::config::state::AppData;
use crate::database::schema::users::User;
use crate::services::auth_service::GoogleUserResult;

pub struct UserRepository;

impl UserRepository {
    pub async fn find_all(state: &AppData) -> Result<Vec<User>, Error> {
        let query = format!(
            r#"
            SELECT * FROM users
            WHERE is_deleted = false
            ORDER BY id
            "#,
        );

        let users = sqlx::query_as::<_, User>(&query)
            .fetch_all(&state.db_pool)
            .await?;

        Ok(users)
    }

    pub async fn find_by_user_id(state: &AppData, user_id: i32) -> Result<User, Error> {
        let query = format!(
            r#"
            SELECT id, name, email, avatar, prefix, created_at, updated_at, deleted_at, is_deleted
            WHERE id = $1
            AND is_deleted = false
            "#,
        );

        let users = sqlx::query_as::<_, User>(&query)
            .bind(user_id)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(users)
    }

    pub async fn fetch_user_by_id(state: &AppData, user_id: i32) -> Result<User, Error> {
        let query = format!(
            r#"
            SELECT * FROM users
            WHERE id = $1
            AND is_deleted = false
            "#,
        );

        let user = sqlx::query_as::<_, User>(&query)
            .bind(user_id)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(user)
    }

    pub async fn create_user_from_oauth(
        state: &AppData,
        google_user: &GoogleUserResult,
    ) -> Result<User, Error> {
        let mut tx = state.db_pool.begin().await?;

        let existing_user = sqlx::query_as::<_, User>(
            r#"
            SELECT * FROM users
            WHERE email = $1
            AND is_deleted = false
            "#,
        )
        .bind(google_user.email.clone())
        .fetch_optional(&mut *tx)
        .await?;

        if let Some(user) = existing_user {
            tx.commit().await?;
            return Ok(user);
        }
        let prefix = if !google_user.given_name.is_empty() {
            format!(
                "{}{}{}",
                google_user.given_name.chars().next().unwrap_or('u').to_lowercase(),
                google_user.family_name.chars().next().unwrap_or('s').to_lowercase(),
                thread_rng().gen_range(100..1000)
            )
        } else {
            let base = google_user.name.to_lowercase()
                .chars()
                .filter(|c| c.is_alphanumeric())
                .collect::<String>();
                
            let prefix_base = if base.len() > 8 {
                base[0..8].to_string()
            } else {
                base
            };
            
            format!("{}{}", prefix_base, thread_rng().gen_range(100..1000))
        };

        let now = Utc::now();

        let new_user = sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (name, email, avatar, prefix, created_at, updated_at, is_deleted)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            "#,
        )
        .bind(google_user.name.clone())
        .bind(google_user.email.clone())
        .bind(google_user.picture.clone())
        .bind(prefix)
        .bind(now)
        .bind(now)
        .bind(false)
        .fetch_one(&mut *tx)
        .await?;

        tx.commit().await?;

        Ok(new_user)
    }

    pub async fn create_user(
        state: &AppData,
        name: &str,
        email: &str,
        avatar: &str,
        prefix: &str,
    ) -> Result<User, Error> {
        let query = format!(
            r#"
            INSERT INTO users (name, email, avatar, prefix, created_at, updated_at, is_deleted)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            "#,
        );

        let user = sqlx::query_as::<_, User>(&query)
            .bind(name)
            .bind(email)
            .bind(avatar)
            .bind(prefix)
            .bind(Utc::now())
            .bind(Utc::now())
            .bind(false)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(user)
    }

    pub async fn delete_user(state: &AppData, user_id: i32) -> Result<(), Error> {
        let query = format!(
            r#"
            UPDATE users
            SET is_deleted = true, deleted_at = $1
            WHERE id = $2
            "#,
        );

        sqlx::query(&query)
            .bind(Utc::now())
            .bind(user_id)
            .execute(&state.db_pool)
            .await?;

        Ok(())
    }
}
