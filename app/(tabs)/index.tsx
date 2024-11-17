import { setupDatabase } from '@/database';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {

  useEffect(() => {
    setupDatabase();
  }, []);

  return <Redirect href="/loginScreen" />;
}