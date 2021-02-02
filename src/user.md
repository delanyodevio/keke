---
layout: "layouts/user.html"
title: "More happiness."
pagination:
  data: usernames
  size: 1
  alias: user
permalink: "users/{{ user }}/"
scripts:
  - "https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"
  - "https://www.gstatic.com/firebasejs/8.2.0/firebase-auth.js"
  - "https://www.gstatic.com/firebasejs/8.2.0/firebase-firestore.js"
  - "https://www.gstatic.com/firebasejs/8.2.0/firebase-database.js"
  - "/scripts/firebase.js"
  - "/scripts/user.js"
  - "/scripts/ui.js"
classify: "r-pdt"
---
