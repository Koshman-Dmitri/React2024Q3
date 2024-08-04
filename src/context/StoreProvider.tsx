'use client';

import { PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { setupStore, AppStore } from '../lib/store';

export default function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
