import { onAuthStateChanged } from 'firebase/auth';
import { lazy, Suspense, useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { auth } from '../../data/datasource/Firebase.datasource';
import { Loader } from '../components/Loader';
import { DefaultLayout } from '../layout/DefaultLayout';
import { SignIn } from '../screens/Auth/SignIn/SignIn';
import { SignUp } from '../screens/Auth/SignUp';
import { ListAllNewsletter } from '../screens/Newsletter/ListAllNewsletter';
import { DepositDetail } from '../screens/Report/DepositDetail';
import { Report } from '../screens/Report/Report';
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
const FAQCreate = lazy(() => import('../screens/FAQ/FAQCreate'));
const FAQList = lazy(() => import('../screens/FAQ/FAQList'));

const FAQView = lazy(() => import('../screens/FAQ/FAQView'));

export function BrowserRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<Loader />}>
        <Routes>
          {!isAuthenticated && (
            <>
              <Route
                path={ROUTES.home.path}
                element={<Navigate to="/sign-in" />}
              />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          )}
          {isAuthenticated && (
            <>
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
                <Route path={ROUTES.faq.create.path} element={<FAQCreate />} />
                <Route path={ROUTES.faq.listAll.path} element={<FAQList />} />
                <Route path={ROUTES.faq.viewFAQ.path} element={<FAQView />} />
                <Route path={ROUTES.report.path} element={<Report />} />
                <Route path="/report/:depositId" element={<DepositDetail />} />
                <Route path="*" element={<Navigate to={ROUTES.home.path} />} />
              </Route>
            </>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}
