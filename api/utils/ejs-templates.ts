import ejs from "ejs";
import path from "path";

/**
 * Renders an EJS redirect page
 * @param data an object passed on to EJS render engine
 */
export const generateRedirect = async (data: any) => {
  const viewPath = path.join(__dirname, "..", "views", "pages", "redirect.ejs");
  return ejs.renderFile(viewPath, {
    data: data,
  });
};

/**
 * Renders an EJS too many requests page
 */
export const generateTooManyRequests = async () => {
  const viewPath = path.join(__dirname, "..", "views", "pages", "429.ejs");
  return ejs.renderFile(viewPath, {
    data: {
      meta: {},
    },
  });
};

/**
 * Renders an EJS page not found page
 */
export const generatePageNotFound = async () => {
  const viewPath = path.join(__dirname, "..", "views", "pages", "404.ejs");
  return ejs.renderFile(viewPath, {
    data: {
      meta: {},
    },
  });
};
