import React from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';

function DashboardLayout({ children }) {
  return (
    <div>
   <Header />
      <main className="container px-4 mx-auto my-8">
        {children}
      
      </main>

    </div>
  );
}

export default DashboardLayout;
