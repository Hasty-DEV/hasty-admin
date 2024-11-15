import { Suspense, lazy } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { DefaultLayout } from '../layout/DefaultLayout';
import { ROUTES } from './Routes';

const ListAllCoupons = lazy(() =>
  import('../screens/Coupons/ListAllCoupons').then((module) => ({
    default: module.ListAllCoupons,
  })),
);

export function BrowserRouter() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={ROUTES.home.call()} element={<Navigate to={ROUTES.coupons.listAll.call()} />} />

          <Route path={ROUTES.coupons.listAll.call()} element={<DefaultLayout />}>
            <Route index element={<ListAllCoupons />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
