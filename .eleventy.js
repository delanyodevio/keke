module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/images");
  config.addPassthroughCopy("./src/scripts");
  config.addPassthroughCopy("./src/webfonts");
  config.addPassthroughCopy("./src/styles");

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