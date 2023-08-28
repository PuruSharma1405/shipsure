import React, { useEffect, useState } from 'react';
import AuthService from '@/services/authService';

export default function Home() {
  const authService = new AuthService();
  const [email, setEmail] = useState('');
  

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await authService.getUser();
    if(userData && userData.access_token && userData.profile && userData.profile.email){
      setEmail(userData.profile.email)
    }
  }

  useEffect(() => {
    if(email) {
      getMSTSToken(email)
    }
  }, [email]);

  const getMSTSToken = async (email: string) => {
    const logInDeatils = await authService.loginAuthorization(email);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      this is home page
    </main>
  )
}
