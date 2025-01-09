import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

// components
import Layout from '@client/components/Layout';

const Root: FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Root;
