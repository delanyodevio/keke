module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images");
  config.addPassthroughCopy("./src/scripts");
  config.addPassthroughCopy("./src/fonts");
  config.addPassthroughCopy("./src/manifest.json");
  config.addPassthroughCopy("./src/sw.js");

  // Transforms
  const htmlMinTransform = require("./src/transforms/html-min-transforms.js");

  // Create a helpful production flag
  const isProduction = process.env.NODE_ENV == "production";

  if (isProduction) {
    config.addTransform("htmlmin", htmlMinTransform);
  }

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore files
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
