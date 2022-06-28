import { useState } from 'react';
import { Box} from '@mui/material';
import  DashboardNavbar  from '@components/Navigation/DashboardNavbar';
import DashboardSidebar from '@components/Navigation/DashboardSidebar';
import { Footer } from '@components/Footer/Footer';
import { styled, experimental_sx as sx } from '@mui/system';
import { TechnicalSupportButton } from "@components/Navigation/TechnicalSupportButton";

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

const DashboardLayoutRootBox = styled(Box)((props)  => sx({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <DashboardLayoutRoot>
        <DashboardLayoutRootBox>
          {children}
          <Footer/>
        </DashboardLayoutRootBox>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
      <TechnicalSupportButton/>
    </>
  );
};
