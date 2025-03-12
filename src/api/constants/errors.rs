use serde::Serialize;

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Error {
    pub code: i32,
    pub message: &'static str,
    pub pretty_message: &'static str,
}

pub const ERR_BAD_REQUEST: Error = Error {
    code: 400,
    message: "BAD_REQUEST",
    pretty_message: "A bad request was received",
};

pub const ERR_UNAUTHORIZED: Error = Error {
    code: 401,
    message: "UNAUTHORIZED",
    pretty_message: "You are not authorized to access this resource",
};

pub const ERR_NOT_FOUND: Error = Error {
    code: 404,
    message: "NOT_FOUND",
    pretty_message: "The requested resource was not found",
};

pub const ERR_METHOD_NOT_ALLOWED: Error = Error {
    code: 405,
    message: "METHOD_NOT_ALLOWED",
    pretty_message: "The requested method is not allowed",
};

pub const ERR_CONFLICT: Error = Error {
    code: 409,
    message: "CONFLICT",
    pretty_message: "A conflict occurred while processing the request",
};

pub const ERR_INTERNAL_SERVER_ERROR: Error = Error {
    code: 500,
    message: "INTERNAL_SERVER_ERROR",
    pretty_message: "An internal server error occurred",
};

pub const ERR_OAUTH_ERROR: Error = Error {
    code: 500,
    message: "OAuth Error",
    pretty_message: "An error occurred while processing the OAuth request",
};

pub const ERR_MISSING_CODE: Error = Error {
    code: 400,
    message: "Missing Authorization Code",
    pretty_message: "No authorization code was received",
};

pub const ERR_OAUTH_INVALID_GRANT: Error = Error {
    code: 400,
    message: "Invalid Grant",
    pretty_message: "The authorization grant is invalid",
};

pub const ERR_LINK_DISABLED: Error = Error {
    code: 400,
    message: "Link Disabled",
    pretty_message: "The requested link is disabled",
};

pub const ERR_LINK_NOT_FOUND: Error = Error {
    code: 404,
    message: "Link Not Found",
    pretty_message: "The requested link was not found",
};