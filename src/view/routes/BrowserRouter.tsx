import { Suspense, lazy } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Loader } from '../components/Loader';
import { DefaultLayout } from '../layout/DefaultLayout';
import { ListAllNewsletter } from '../screens/Newsletter/ListAllNewsletter';
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
            path={ROUTES.home.path}
            element={<Navigate to={ROUTES.coupons.listAll.path} />}
          />
          <Route path={ROUTES.home.path} element={<DefaultLayout />}>
            <Route
              path={ROUTES.coupons.listAll.path}
              element={<CouponsList />}
            />
            <Route
              path={ROUTES.coupons.create.path}
              element={<CouponsForm />}
            />
            <Route
              path={ROUTES.coupons.details.path}
              element={<CouponDetails />}
            />
            <Route
              path={ROUTES.newsletter.listAll.path}
              element={<ListAllNewsletter />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
