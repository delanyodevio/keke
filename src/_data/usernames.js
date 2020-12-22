const Cache = require("@11ty/eleventy-cache-assets");
require("dotenv").config();
const PROJECT = process.env.FIREBASE_API_KEY;
const ID = process.env.FIREBASE_COLLECTION_ID;
const CREDENTIAL = process.env.FB_SECRET;

/**
 * Grabs the remote data form firebase and returns back
 * an array of usernames of objects. Usernames are use to create pages
 * for each user.
 * @returns {Array} Empty or array of objects
 */

module.exports = async () => {
  try {
    // Grabs either a fresh data from remote or cached data
    const { items } = await Cache(
      `https://${PROJECT}-default-rtdb.firebaseio.com/${ID}.json?auth=${CREDENTIAL}`,
      {
        duration: "100d",
        type: "json",
      }
    );

    return items;
  } catch (ex) {
    console.log(ex);

    return [];
  }
};
