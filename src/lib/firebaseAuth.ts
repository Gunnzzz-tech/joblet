import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'jobseeker' | 'employer';
  phoneNumber?: string;
  address?: string;
  company?: string;
  createdAt: any;
  updatedAt: any;
}

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  role: 'jobseeker' | 'employer',
  additionalData?: { phoneNumber?: string; address?: string; company?: string }
): Promise<User> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update profile
    await updateProfile(user, { displayName });

    // Try to create user document in Firestore, but don't fail if offline
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        role,
        phoneNumber: additionalData?.phoneNumber || '',
        address: additionalData?.address || '',
        company: additionalData?.company || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (firestoreError: any) {
      console.warn('Firestore operation failed (may be offline):', firestoreError.message);
      // User is still created in Auth, just Firestore sync failed
    }

    return user;
  } catch (error: any) {
    console.error('Error signing up:', error);
    throw new Error(error.message);
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in:', error);
    throw new Error(error.message);
  }
};

// Sign in with Google
export const signInWithGoogle = async (
  role?: 'jobseeker' | 'employer'
): Promise<User> => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Try to get/create user document, but don't fail if Firestore is offline
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        // Create new user document if it doesn't exist
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'User',
          role: role || 'jobseeker',
          phoneNumber: user.phoneNumber || '',
          address: '',
          company: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        // Update last login time
        await setDoc(
          doc(db, 'users', user.uid),
          { updatedAt: serverTimestamp() },
          { merge: true }
        );
      }
    } catch (firestoreError: any) {
      // Log but don't fail authentication if Firestore is offline
      console.warn('Firestore operation failed (may be offline):', firestoreError.message);
      // Authentication still succeeded even if Firestore sync failed
    }

    return user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    
    // Provide more helpful error messages
    if (error.code === 'auth/unauthorized-domain') {
      throw new Error('Please add localhost to authorized domains in Firebase Console (Authentication > Settings > Authorized domains)');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Pop-up was blocked. Please allow pop-ups for this site.');
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in cancelled.');
    }
    
    throw new Error(error.message || 'Google sign-in failed');
  }
};

// Sign out
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error(error.message);
  }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    // Handle offline error gracefully
    if (error.code === 'unavailable' || error.message?.includes('offline')) {
      console.warn('Firestore is offline, user profile unavailable');
      return null;
    }
    console.error('Error getting user profile:', error);
    throw new Error(error.message);
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw new Error(error.message);
  }
};
