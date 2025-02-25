import React from 'react';
import Draver from './Draver';
import useUserStore from '@/store';
import InstrumentSelector from './InstrumentSelector';

const Layout = () => {
  const { isSinglePlayer } = useUserStore();
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 transform">
      {!isSinglePlayer ? <Draver /> : <InstrumentSelector />}
    </div>
  );
};

export default Layout;
