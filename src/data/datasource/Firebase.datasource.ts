import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

export class FirebaseDatasourceImpl {
  private readonly app: FirebaseApp;
  // private readonly analytics!: Analytics;
  private readonly auth: Auth;
  private readonly provider: GoogleAuthProvider;

  constructor() {
    this.app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
      measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    });
    this.auth = getAuth(this.app);
    this.provider = new GoogleAuthProvider();
  }

  public async signInWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  public async signInWithGoogle() {
    return await signInWithPopup(this.auth, this.provider);
  }
}
