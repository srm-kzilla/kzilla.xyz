use chrono::Utc;
use sqlx::Error;

use crate::config::state::AppData;
use crate::database::schema::links::Link;

pub struct LinkRepository;

impl LinkRepository {
    pub async fn create_link(state: &AppData, user_id: Option<i32>, analytics_code: &str, long_url: &str, custom_code: Option<String>) -> Result<Link, Error> {
        let query = format!(
            r#"
            INSERT INTO links (user_id, analytics_code, long_url, custom_code, enabled, created_at, updated_at, is_deleted)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            "#,
        );

        let link = sqlx::query_as::<_, Link>(&query)
            .bind(user_id)
            .bind(analytics_code)
            .bind(long_url)
            .bind(custom_code)
            .bind(true)
            .bind(Utc::now())
            .bind(Utc::now())
            .bind(false)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(link)
    }

    pub async fn find_link_by_code(state: &AppData, custom_code: &str) -> Result<Link, Error> {
        let query = format!(
            r#"
            SELECT * FROM links
            WHERE custom_code = $1
            AND is_deleted = false
            "#,
        );

        let link = sqlx::query_as::<_, Link>(&query)
            .bind(custom_code)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(link)
    }

    pub async fn find_links_by_user_id(state: &AppData, user_id: i32) -> Result<Vec<Link>, Error> {
        let query = format!(
            r#"
            SELECT * FROM links
            WHERE user_id = $1
            AND is_deleted = false
            "#,
        );

        let links = sqlx::query_as::<_, Link>(&query)
            .bind(user_id)
            .fetch_all(&state.db_pool)
            .await?;

        Ok(links)
    }

    pub async fn update_link(state: &AppData, link_id: i32, long_url: Option<&str>, custom_code: Option<String>, enabled: Option<bool>) -> Result<Link, Error> {
        let query = format!(
            r#"
            UPDATE links
            SET long_url = COALESCE($1, long_url), custom_code = COALESCE($2, custom_code), enabled = $3, updated_at = $4
            WHERE id = $5
            RETURNING *
            "#,
        );

        let link = sqlx::query_as::<_, Link>(&query)
            .bind(long_url)
            .bind(custom_code)
            .bind(enabled)
            .bind(Utc::now())
            .bind(link_id)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(link)
    }

    pub async fn delete_link(state: &AppData, link_id: i32) -> Result<Link, Error> {
        let query = format!(
            r#"
            UPDATE links
            SET is_deleted = true, deleted_at = $1
            WHERE id = $2
            RETURNING *
            "#,
        );

        let link = sqlx::query_as::<_, Link>(&query)
            .bind(Utc::now())
            .bind(link_id)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(link)
    }
}