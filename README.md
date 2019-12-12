# AngularEstay

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

<ul>
  <li> Import Library </li>
  <h6>1. Angular Material</h6>
  <pre>
    <code>ng add @angular/material</code>
  </pre>
  <p>Choose a prebuilt theme name, or "custom" for a custom theme: (Use arrow keys)</p>
  <p>=>Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]</p>
  <p>Set up HammerJS for gesture recognition? (Y/n) Y </p>
  <p>Set up browser animations for Angular Material? (Y/n) Y</p>
  
   <h6>2. Decode jwt</h6>
  <pre>
    <code>npm install jwt-decode</code>
  </pre>
</ul>

## Run Postgres
Open cmd:
<ul>
    <li><code>docker exec -it hoteldb psql -U postgres -d estay</code></li>
    <li><code>select Max(id) from users;</code></li>
    <li><code>select nextval('users_id_seq');</code></li>
    <li><code>select setval('users_id_seq',1785);</code></li>
</ul>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

