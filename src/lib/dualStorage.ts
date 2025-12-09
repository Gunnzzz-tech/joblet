import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { saveContactToSupabase, saveUserToSupabase } from './supabase';

/**
 * Dual storage utility - saves data to both Firebase and Supabase
 */

// Save contact form to both databases
export async function saveContactDual(data: {
  name: string;
  email: string;
  message: string;
  subject?: string;
}) {
  const results = {
    firebase: null as any,
    supabase: null as any,
    errors: [] as string[],
  };

  // Try Firebase
  try {
    results.firebase = await addDoc(collection(db, 'contacts'), {
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: serverTimestamp(),
      status: 'new',
    });
  } catch (err) {
    console.error('Firebase save failed:', err);
    results.errors.push('Firebase: ' + (err as Error).message);
  }

  // Try Supabase
  try {
    results.supabase = await saveContactToSupabase({
      name: data.name,
      email: data.email,
      subject: data.subject || 'Contact Form Submission',
      message: data.message,
    });
  } catch (err) {
    console.error('Supabase save failed:', err);
    results.errors.push('Supabase: ' + (err as Error).message);
  }

  // If both failed, throw error
  if (!results.firebase && !results.supabase) {
    throw new Error('Both databases failed: ' + results.errors.join(', '));
  }

  return results;
}

// Save user profile to both databases
export async function saveUserDual(data: {
  uid: string;
  email: string;
  name?: string;
  role?: string;
}) {
  const results = {
    firebase: null as any,
    supabase: null as any,
    errors: [] as string[],
  };

  // Try Firebase
  try {
    results.firebase = await addDoc(collection(db, 'users'), {
      uid: data.uid,
      email: data.email,
      name: data.name,
      role: data.role,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Firebase user save failed:', err);
    results.errors.push('Firebase: ' + (err as Error).message);
  }

  // Try Supabase
  try {
    results.supabase = await saveUserToSupabase(data);
  } catch (err) {
    console.error('Supabase user save failed:', err);
    results.errors.push('Supabase: ' + (err as Error).message);
  }

  // If both failed, throw error
  if (!results.firebase && !results.supabase) {
    throw new Error('Both databases failed: ' + results.errors.join(', '));
  }

  return results;
}
