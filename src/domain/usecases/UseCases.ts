import { RemoteDataSource } from '../../data/datasource/Remote.datasource';
import { CouponRepositoryImpl } from '../../data/repositories/Coupons.repository';
import { NewsletterRepositoryImpl } from '../../data/repositories/Newsletter.repository';
import { InsertCouponUseCaseImpl } from './Coupons/insert.usecase';
import { ListAllCouponsUseCaseImpl } from './Coupons/list-all.usecase';
import { ListOneCouponsUseCaseImpl } from './Coupons/list-one.usecase';
import { ToggleCouponStatusUseCaseImpl } from './Coupons/toggle-status.usecase';
import { ListAllNewsletterUseCaseImpl } from './Newsletter/list-all.usecase';

const API_URL = String(import.meta.env.VITE_API_URL);

const api = new RemoteDataSource(API_URL);

const CouponRepository = new CouponRepositoryImpl(api);
const newsletterRepository = new NewsletterRepositoryImpl(api);

export const UseCases = {
  coupon: {
    insert: new InsertCouponUseCaseImpl(CouponRepository),
    listAll: new ListAllCouponsUseCaseImpl(CouponRepository),
    listOne: new ListOneCouponsUseCaseImpl(CouponRepository),
    toggleStatus: new ToggleCouponStatusUseCaseImpl(CouponRepository),
  },
  newsletter: {
    listAll: new ListAllNewsletterUseCaseImpl(newsletterRepository),
  },
};
