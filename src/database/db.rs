use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

use crate::config::env::Environment;

pub type DbPool = Pool<Postgres>;

pub async fn init_pool(env: &Environment) -> Result<DbPool, sqlx::Error> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&env.db_url)
        .await?;

    Ok(pool)
}