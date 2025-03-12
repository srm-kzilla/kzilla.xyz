use chrono::Utc;
use sqlx::Error;

use crate::config::state::AppData;
use crate::database::schema::logs::LinkLog;

pub struct LogsRepository;

impl LogsRepository {
    pub async fn fetch_logs_by_link_id(state: &AppData, link_id: i32) -> Result<Vec<LinkLog>, Error> {
        let query = format!(
            r#"
            SELECT * FROM link_logs
            WHERE link_id = $1
            AND is_deleted = false
            ORDER BY id
            "#,
        );

        let logs = sqlx::query_as::<_, LinkLog>(&query)
            .bind(link_id)
            .fetch_all(&state.db_pool)
            .await?;

        Ok(logs)
    }

    pub async fn create_log(state: &AppData, link_id: i32, ip_address: &str) -> Result<LinkLog, Error> {
        let query = format!(
            r#"
            INSERT INTO link_logs (link_id, ip_address, created_at, updated_at, is_deleted)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            "#,
        );

        let log = sqlx::query_as::<_, LinkLog>(&query)
            .bind(link_id)
            .bind(ip_address)
            .bind(Utc::now())
            .bind(Utc::now())
            .bind(false)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(log)
    }

    pub async fn delete_log(state: &AppData, log_id: i32) -> Result<LinkLog, Error> {
        let query = format!(
            r#"
            UPDATE link_logs
            SET is_deleted = true, deleted_at = $1
            WHERE id = $2
            RETURNING *
            "#,
        );

        let log = sqlx::query_as::<_, LinkLog>(&query)
            .bind(Utc::now())
            .bind(log_id)
            .fetch_one(&state.db_pool)
            .await?;

        Ok(log)
    }
}