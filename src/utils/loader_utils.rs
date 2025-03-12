// TODO: man I just generated some HTML here, replace with some kool styling :)
pub fn return_loader_html(long_url: String) -> String {
    format!(
        r#"<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Redirecting...</title>
                <style>
                    body {{
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background-color: #f5f5f5;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    }}
                    .container {{
                        text-align: center;
                        padding: 20px;
                    }}
                    .loader {{
                        border: 8px solid #f3f3f3;
                        border-radius: 50%;
                        border-top: 8px solid #3498db;
                        width: 60px;
                        height: 60px;
                        margin: 0 auto 20px;
                        animation: spin 1s linear infinite;
                    }}
                    @keyframes spin {{
                        0% {{ transform: rotate(0deg); }}
                        100% {{ transform: rotate(360deg); }}
                    }}
                    .message {{
                        margin-top: 20px;
                        color: #333;
                    }}
                </style>
                </head>
                <body>
                    <div class="container">
                        <div class="loader"></div>
                        <h2>Redirecting you to your destination</h2>
                        <p class="message">You'll be redirected in a moment...</p>
                    </div>
                    <script>
                        setTimeout(function() {{
                        window.location.href = "{}";
                        }}, 1500);
                    </script>
                </body>
            </html>"#,
        long_url
    )
}
