use ::serde::Serialize;

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    pub data: Option<serde_json::Value>,
}
