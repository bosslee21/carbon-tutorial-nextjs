'use client';

import TutorialHeader from '@/components/TutorialHeader/TutorialHeader';
import { Content, Theme } from '@carbon/react';

export function Providers({ children }) {
  return (
    <div>
      <Theme theme="g100">
        <TutorialHeader />
        <Content>{children}</Content>
        {/* this is page button and content */}
      </Theme>
    </div>
  );
}
