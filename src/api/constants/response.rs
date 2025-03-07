use ::serde::Serialize;

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    pub status: i32,
    pub message: String,
    pub pretty_message: String,
    pub data: Option<serde_json::Value>,
}
