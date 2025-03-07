use viperus;

pub struct Env {
    pub port: u16,
    pub host: String,
}

pub fn load_env() -> Env {
    viperus::automatic_env(true);

    let fallback_port: u16 = 8080;
    let port = viperus::get::<String>("PORT")
        .unwrap_or_else(|| fallback_port.to_string())
        .parse()
        .unwrap_or(fallback_port);

    let fallback_host = "0.0.0.0";
    let host = viperus::get::<String>("HOST").unwrap_or_else(|| fallback_host.to_string());
    let host = host.to_string();

    Env { port, host }
}
