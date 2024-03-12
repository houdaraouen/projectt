import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Sidebar from '../../components/sidebar';


const AdminLayout = ({ children }) => {
    return (
      <>
      <div className='main'>

       <Header/>
      
        <div>

          <Sidebar />
          <div  className="child-contain"style={{ flex: 2 , position: 'center' }}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
      </>
    );
  };
  
  export default AdminLayout;