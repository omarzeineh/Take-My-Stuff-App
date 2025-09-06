# Take My Stuff

A community platform to give unwanted items a second life. Users can post items, request what they need, browse a smart feed, schedule pickups, and find locations via Google Maps. Built with Angular + Ionic, Firebase (Auth, Firestore, Storage), and Google Maps services.

## Features

- Post items with images, details, and availability  
- Browse/search a dynamic feed with simple filters  
- Request specific items and contact posters
- Authentication with Firebase (email/password or provider)  
- Real‑time data via Firestore  
- Image uploads to Firebase Storage  
- Google Maps for item locations and pickup coordination  
- Responsive UI (mobile/desktop via Ionic)

## Tech Stack

- Angular + Ionic (TypeScript, HTML, SCSS)  
- Firebase: Authentication, Cloud Firestore, Storage  
- Google Maps Platform (Maps/Places)  
- Capacitor (optional Android/iOS builds)

## Repository Layout

- `TMS/` – application source
  - `src/app/` – Angular modules, pages, services, guards
  - `src/environments/` – environment configs (firebase, keys)
  - `src/assets/` – static assets
- `Take_My_Stuff_Project_Report.pdf` – course report with background, design, and results

## Quick Start

1) Prerequisites  
   - Node.js LTS + npm  
   - Ionic CLI  
   - A Firebase project (enable Auth, Firestore, Storage)  
   - A Google Maps API key (enable Maps JavaScript API and Places API)

2) Clone and install  
```bash
git clone https://github.com/omarzeineh/Take-My-Stuff-App.git
cd Take-My-Stuff-App/TMS
npm install
```

3) Configure environments  
Create/edit `src/environments/environment.ts` and (optionally) `environment.prod.ts`:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'your-app.firebaseapp.com',
    projectId: 'your-app',
    storageBucket: 'your-app.appspot.com',
    messagingSenderId: '...',
    appId: '...'
  },
  googleMaps: {
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
  }
};
```

If the app uses the Maps JS loader in `index.html`, add your key there as needed.

4) Run the app  
```bash
ionic serve
```
Open the local URL shown in the terminal.

## Environment & Secrets

- Never commit real API keys. Use environment files (`src/environments`) which are excluded by default from version control, or inject via CI.  
- For production, add `environment.prod.ts` with the prod credentials and build using:
```bash
ionic build --prod
```

## Script

- `ionic serve` for local dev  

## Architecture Notes

- Core services typically include:
  - `AuthService` for Firebase auth flows
  - `ItemsService` for listing/posting, Firestore queries, and Storage uploads
  - `MapsService` (or helper) for geocoding/Places  
- Guards (e.g., `AuthGuard`) protect routes/pages that require login  
- Pages: e.g., `home`, `post-item`, `item-detail`, `profile`, `map`

## Data Model (example)

```text
users/{uid}
  displayName, email, photoURL, createdAt

items/{itemId}
  ownerUid, title, description, category, condition,
  images[], location{lat,lng,address}, isAvailable, createdAt

requests/{requestId}
  itemId, requesterUid, status(pending|accepted|declined), createdAt
```

## Testing

- Unit tests with Angular TestBed/Jasmine/Karma (if provided)  
- E2E via Cypress or Playwright (optional)



## License

The repository is for academic purposes.

## Acknowledgements

Course: CEN333 Cross‑Platform Mobile Application Development, Abu Dhabi University  
Team: see project report for contributors
```
