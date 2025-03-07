use serde::Serialize;

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Error {
    pub code: i32,
    pub message: &'static str,
    pub display_message: &'static str,
}

pub const ERR_BAD_REQUEST: Error = Error {
    code: 400,
    message: "Bad Request",
    display_message: "Bad Request",
};

pub const ERR_UNAUTHORIZED: Error = Error {
    code: 401,
    message: "Unauthorized",
    display_message: "Unauthorized",
};

pub const ERR_NOT_FOUND: Error = Error {
    code: 404,
    message: "Not Found",
    display_message: "Not Found",
};

pub const ERR_METHOD_NOT_ALLOWED: Error = Error {
    code: 405,
    message: "Method Not Allowed",
    display_message: "Method Not Allowed",
};

pub const ERR_CONFLICT: Error = Error {
    code: 409,
    message: "Conflict",
    display_message: "Conflict",
};

pub const ERR_INTERNAL_SERVER_ERROR: Error = Error {
    code: 500,
    message: "Internal Server Error",
    display_message: "Internal Server Error",
};
