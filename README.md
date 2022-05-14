# *worldschoolingpopups.com* REST API - admin frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)&nbsp;![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)  


Date completed: April 30, 2022  

**Optimized for 📱 mobile and 🖥 desktop!**  

**See the main site live at (https://worldschoolingpopups.com)**  

**Admin repo (https://github.com/rusty-reebs/worldschoolingpopups-admin)**

Objectives: Build an Express REST API with JSON web token (`JWT`) authentication. The `JWT` is passed as a header cookie from the client to the server. Only registered users may post and edit events. Posting and editing events is only available on the admin frontend, not the public-facing frontend at (https://worldschoolingpopups.com).  

### TIL Things I Learned
----

- how to develop an Express REST API with `jwt` authentication.
- how to pass a token in the http header.
- gained a stronger understanding of Node `req`, `res`, and `next`.
- how to use the React `useContext` hook.
- some of the most challenging parts about this project were figuring out how to use the CORS middleware and http headers!