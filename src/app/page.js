'use client';
import { Button } from '@carbon/react';
import React from 'react';
import LandingPage from './home/page';
import RepoPage from './repos/page';

export default function Home() {
  return (
    <div>
      <LandingPage />
      <RepoPage />
    </div>
  );
}
