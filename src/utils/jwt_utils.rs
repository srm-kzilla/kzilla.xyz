use jsonwebtoken::{encode, decode, DecodingKey, Validation, Header, EncodingKey};
use serde::{Serialize, Deserialize};

#[derive(Deserialize, Serialize)]
struct Claims {
    sub: i32,
    exp: usize,
}

pub fn encode_jwt_token(id: i32, jwt_secret: String) -> String {

    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::seconds(60 * 60))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: id,
        exp: expiration as usize,
    };

    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(jwt_secret.as_ref()))
        .expect("Error encoding token");

    return token;
}

pub fn decode_jwt_token(token: &str, jwt_secret: String) -> i32 {

    let token_data = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(&jwt_secret.as_ref()),
        &Validation::default(),
    );

    let token_user_id = token_data.unwrap().claims.sub;

    return token_user_id
}