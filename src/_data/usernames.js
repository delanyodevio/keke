const Cache = require("@11ty/eleventy-cache-assets");
require("dotenv").config();

const CREDENTIAL = process.env.FIREBASE_CREDENTIAL;

/**
 * Grabs the remote data form firebase and returns back
 * an array users' uid which are as usernames to create pages
 * for each user.
 * @returns {Array} Empty or array of objects
 */

module.exports = async () => {
  try {
    // Grabs either a fresh data from remote or the cached data
    const { items } = await Cache(
      `https://keke-money-default-rtdb.firebaseio.com/usernames.json?auth=${CREDENTIAL}`,
      {
        duration: "15h",
        type: "json",
      }
    );

    return Object.values(items);
  } catch (ex) {
    console.log(ex);

    return [];
  }
};
