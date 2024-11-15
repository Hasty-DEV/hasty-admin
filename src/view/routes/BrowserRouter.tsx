import { Suspense, lazy } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Loader } from '../components/Loader';
import { DefaultLayout } from '../layout/DefaultLayout';
import { ROUTES } from './Routes';

const CouponsList = lazy(() =>
  import('../screens/Coupons/CouponsList').then((module) => ({
    default: module.CouponsList,
  })),
);
const CouponsForm = lazy(() =>
  import('../screens/Coupons/CouponForm').then((module) => ({
    default: module.CouponForm,
  })),
);
const CouponDetails = lazy(() =>
  import('../screens/Coupons/CouponDetails').then((module) => ({
    default: module.CouponDetails,
  })),
);

export function BrowserRouter() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path={ROUTES.home.call()}
            element={<Navigate to={ROUTES.coupons.listAll.call()} />}
          />
          <Route path={ROUTES.home.call()} element={<DefaultLayout />}>
            <Route
              path={ROUTES.coupons.listAll.call()}
              element={<CouponsList />}
            />
            <Route
              path={ROUTES.coupons.create.call()}
              element={<CouponsForm />}
            />
            <Route path="/coupons/details/:id" element={<CouponDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
