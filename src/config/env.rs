use viperus;
use std::env;

#[derive(Debug, Clone)]
pub struct Environment {
    pub port: u16,
    pub host: String,
    pub db_url: String,
    pub environment: String,
    pub log_level: String,
    pub google_client_id: String,
    pub google_client_secret: String,
    pub google_redirect_uri: String,
    pub jwt_secret: String,
}

impl Environment {
    pub fn new() -> Result<Self, env::VarError> {

        viperus::automatic_env(true);

        let fallback_port: u16 = 8080;
        let port = viperus::get::<String>("PORT")
            .unwrap_or_else(|| fallback_port.to_string())
            .parse()
            .unwrap_or(fallback_port);

        let fallback_host = "0.0.0.0";
        let host = viperus::get::<String>("HOST").unwrap_or_else(|| fallback_host.to_string());

        let fallback_db_url = "postgres://postgres:postgres@localhost:5432/postgres";
        let db_url = viperus::get::<String>("DATABASE_URL").unwrap_or_else(|| fallback_db_url.to_string());

        let environment = viperus::get::<String>("ENVIRONMENT").unwrap_or_else(|| "development".to_string());
        let log_level = viperus::get::<String>("LOG_LEVEL").unwrap_or_else(|| "info".to_string());
        
        let google_client_id = viperus::get::<String>("GOOGLE_CLIENT_ID").unwrap_or_else(|| "".to_string());
        let google_client_secret = viperus::get::<String>("GOOGLE_CLIENT_SECRET").unwrap_or_else(|| "".to_string());
        let google_redirect_uri = viperus::get::<String>("GOOGLE_REDIRECT_URI").unwrap_or_else(|| "".to_string());

        let jwt_secret = viperus::get
            ::<String>("JWT_SECRET")
            .expect("JWT_SECRET must be set");

        Ok(Self {
            port,
            host,
            db_url,
            environment,
            log_level,
            google_client_id,
            google_client_secret,
            google_redirect_uri,
            jwt_secret,
        })
    }
}