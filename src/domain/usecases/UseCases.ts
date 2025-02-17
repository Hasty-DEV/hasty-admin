import { FirebaseDatasourceImpl } from '../../data/datasource/Firebase.datasource';
import { RemoteDataSource } from '../../data/datasource/Remote.datasource';
import { AuthRepositoryImpl } from '../../data/repositories/Auth.repository';
import { CouponRepositoryImpl } from '../../data/repositories/Coupons.repository';
import { NewsletterRepositoryImpl } from '../../data/repositories/Newsletter.repository';
import { ReportRepositoryImpl } from '../../data/repositories/Report.repository';
import { GoogleSignInUseCaseImpl } from './Auth/googleSignIn.usecase';
import { SignInUseCaseImpl } from './Auth/signIn.usecase';
import { InsertCouponUseCaseImpl } from './Coupons/insert.usecase';
import { ListAllCouponsUseCaseImpl } from './Coupons/list-all.usecase';
import { ListOneCouponsUseCaseImpl } from './Coupons/list-one.usecase';
import { ToggleCouponStatusUseCaseImpl } from './Coupons/toggle-status.usecase';
import { ListAllNewsletterUseCaseImpl } from './Newsletter/list-all.usecase';
import { ReportDepositUseCaseImpl } from './Report/deposit.usecase';

const API_URL = String(import.meta.env.VITE_API_URL);
const ALFRED_URL = String(import.meta.env.VITE_API_ALFRED);

const api = new RemoteDataSource(API_URL);
const apiAlfred = new RemoteDataSource(ALFRED_URL);
const authProvider = new FirebaseDatasourceImpl();

const CouponRepository = new CouponRepositoryImpl(api);
const newsletterRepository = new NewsletterRepositoryImpl(api);
const authRepository = new AuthRepositoryImpl(authProvider);
const reportRepository = new ReportRepositoryImpl(apiAlfred);

export const UseCases = {
  auth: {
    signIn: new SignInUseCaseImpl(authRepository),
    googleSignIn: new GoogleSignInUseCaseImpl(authRepository),
  },
  coupon: {
    insert: new InsertCouponUseCaseImpl(CouponRepository),
    listAll: new ListAllCouponsUseCaseImpl(CouponRepository),
    listOne: new ListOneCouponsUseCaseImpl(CouponRepository),
    toggleStatus: new ToggleCouponStatusUseCaseImpl(CouponRepository),
  },
  newsletter: {
    listAll: new ListAllNewsletterUseCaseImpl(newsletterRepository),
  },
  report: {
    deposit: new ReportDepositUseCaseImpl(reportRepository),
  },
};
