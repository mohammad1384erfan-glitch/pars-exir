import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileContactBar } from './MobileContactBar';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 pb-16 lg:pb-0" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}
