import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StructuredData from '../common/StructuredData';

const Layout = () => {
  return (
    <>
      <StructuredData />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
