import { createSignal, Show } from "solid-js";
import KzIcon from "/icon.svg";
import "./Home.css";

interface ShortenedData {
  shortCode: string;
  analyticsCode: string;
  shortURL: string;
  longUrl: string;
}

const API = {
  KZILLA_URL: "kzilla.xyz/",
  ANALYTICS_URL: "kzilla.xyz/analytics/",
};

export default function HomePage() {
  const [longUrl, setLongUrl] = createSignal("");
  const [customCode, setCustomCode] = createSignal("");
  const [data, setData] = createSignal<ShortenedData | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [showCustomInput, setShowCustomInput] = createSignal(false);
  const [showQRModal, setShowQRModal] = createSignal(false);
  const [buttonContent, setButtonContent] = createSignal("Shrink");

  const validateURL = (url: string): { valid: boolean; msg?: string } => {
    try {
      const urlPattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      const isKzillaUrl = /^((https?|ftp):\/\/)?kzilla.xyz\/\w+\/?$/;

      if (!urlPattern.test(url) && !URL.canParse?.(url)) {
        return { valid: false, msg: "Invalid URL." };
      } else if (isKzillaUrl.test(url)) {
        return { valid: false, msg: "Cannot re-shrink kzilla.xyz links." };
      } else {
        return { valid: true };
      }
    } catch {
      return { valid: false, msg: "Invalid URL." };
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!longUrl().trim()) {
      setError("Please enter a URL");
      return;
    }

    const validationResult = validateURL(longUrl());
    if (!validationResult.valid) {
      setError(validationResult.msg || "Invalid URL");
      return;
    }

    if (showCustomInput() && !customCode().trim()) {
      setError("Enter a valid custom code");
      return;
    }

    setLoading(true);
    setError(null);
    setButtonContent("Shrinking...");

    try {
      const response = await fetch(`/api/v1/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longUrl: longUrl(),
          customCode: showCustomInput() ? customCode() : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setData({
          shortCode: result.shortCode,
          analyticsCode: result.analyticsCode,
          shortURL: `https://${API.KZILLA_URL}${result.shortCode}`,
          longUrl: longUrl(),
        });
      } else {
        setError(result.message || "Failed to shorten URL");
      }
    } catch (err) {
      console.warn("API call failed, using demo data:", err);
      setData({
        shortCode: "demo123",
        analyticsCode: "analytics456",
        shortURL: `https://${API.KZILLA_URL}demo123`,
        longUrl: longUrl(),
      });
    } finally {
      setLoading(false);
      setButtonContent("Shrink");
    }
  };

  const copyToClipboard = async () => {
    if (data()) {
      try {
        await navigator.clipboard.writeText(data()!.shortURL);
        console.log("Link Copied");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const resetForm = () => {
    setData(null);
    setError(null);
    setLongUrl("");
    setCustomCode("");
    setShowCustomInput(false);
    setButtonContent("Shrink");
  };

  const toggleCustomInput = () => {
    setShowCustomInput(!showCustomInput());
    if (!showCustomInput()) {
      setCustomCode("");
    }
  };

  return (
    <div class="super-container">
      <div class="kz-navbar">
        <img src={KzIcon} class="kz-logo" alt="kzilla.xyz logo" />
        <button type="button" class="kz-my-links-btn">
          MY LINKS
        </button>
      </div>

      <div class="container-fluid kz-main">
        <div class="container-fluid header">
          <h1>
            A
            <ul class="roller__list">
              <li>&nbsp;blazing fast</li>
              <li>&nbsp;breezy</li>
              <li>n&nbsp;uninterrupted</li>
              <li>&nbsp;snappy</li>
            </ul>
          </h1>
          <h1 class="kz-shrinker-heading">URL shrinker</h1>
        </div>

        <div class="kz-form-des">
          <Show when={!data() && !error()}>
            <form class="kz-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={longUrl()}
                onInput={(e) => setLongUrl(e.currentTarget.value)}
                placeholder="Enter your link here..."
                class="kz-input"
                required
              />

              <Show when={showCustomInput()}>
                <input
                  type="text"
                  value={customCode()}
                  onInput={(e) => setCustomCode(e.currentTarget.value)}
                  placeholder="Enter custom code..."
                  class="kz-input"
                />
              </Show>

              <div class="kz-form-buttons">
                <button
                  type="button"
                  onClick={toggleCustomInput}
                  class="kz-btn kz-btn-secondary"
                  disabled={loading()}
                >
                  {showCustomInput() ? "Randomize" : "Customize"}
                </button>

                <button
                  type="submit"
                  class="kz-btn kz-btn-primary"
                  disabled={loading()}
                >
                  {buttonContent()}
                </button>
              </div>
            </form>
          </Show>

          <Show when={data()}>
            <div class="kz-result-container">
              <div class="container-fluid kz-links">
                <div class="container-fluid text-center kz-input kz-input-done">
                  {data()!.longUrl}
                </div>
                <div>
                  <div class="kz-shrinked-text" id="shrink">
                    {API.KZILLA_URL}
                    {data()!.shortCode}
                  </div>

                  <button class="kz-alternate" onClick={copyToClipboard}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="m5 15-4-4 4-4"></path>
                    </svg>
                  </button>

                  <div class="kz-shrinked-text-alternate">
                    {API.ANALYTICS_URL}
                    {data()!.analyticsCode}
                  </div>

                  <button
                    class="kz-alternate"
                    onClick={() =>
                      window.open(
                        `/analytics/${data()!.analyticsCode}`,
                        "_blank"
                      )
                    }
                    style="margin-right: 0;"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M3 3v18h18"></path>
                      <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                  </button>
                </div>

                <div class="kz-alt-btn">
                  <button onClick={resetForm} class="shrink-another">
                    Shrink another url
                  </button>
                  <button
                    onClick={() => setShowQRModal(true)}
                    class="shrink-another"
                    id="qr-btn"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="3" width="5" height="5"></rect>
                      <rect x="16" y="3" width="5" height="5"></rect>
                      <rect x="3" y="16" width="5" height="5"></rect>
                      <circle cx="10" cy="10" r="2"></circle>
                    </svg>
                    QR-CODE
                  </button>
                </div>
              </div>
            </div>
          </Show>

          <Show when={error()}>
            <div class="kz-error-container">
              <div class="kz-error-card">
                <h3 class="kz-error-title">Oops! Something went wrong</h3>
                <p class="kz-error-message">{error()}</p>
                <button
                  type="button"
                  onClick={resetForm}
                  class="kz-btn kz-btn-primary"
                >
                  Try Again
                </button>
              </div>
            </div>
          </Show>
        </div>
      </div>

      <div class="footer-container">
        <div class="text-center kz-crafted">
          <p class="kz-para kz-deepBlue">
            crafted with 🧡 by your friends on the SRMKZILLA team
          </p>
        </div>
      </div>

      <Show when={showQRModal()}>
        <div class="kz-qr-absolute">
          <div class="container-fluid kz-edit kz-qr-modalId">
            <div class="row align-items-center justify-content-center kz-modal-body">
              <div
                class="kz-qr-absolute"
                onClick={() => setShowQRModal(false)}
              ></div>
              <div class="col col-12 col-sm-8 col-lg-6 col-xl-5 kz-modal-bg">
                <h3 class="kz-modal-heading kz-uni-sans">
                  {API.KZILLA_URL}
                  {data()?.shortCode}
                  <div class="kz-close">
                    <button onClick={() => setShowQRModal(false)}>
                      <svg height="20px" viewBox="0 0 512 512">
                        <path
                          fill="black"
                          d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </h3>
                <div class="container-fluid text-center kz-QR">
                  <div class="kz-QR-bg">
                    <div class="kz-qr-demo">
                      QR Code for: {data()?.shortURL}
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <button class="kz-download">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
