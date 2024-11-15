import { RemoteDataSource } from '../../data/datasource/Remote.datasource';
import { CouponRepositoryImpl } from '../../data/repositories/Coupons.repository';
import { InsertCouponUseCaseImpl } from './Coupons/insert.usecase';
import { ListAllCouponsUseCaseImpl } from './Coupons/list-all.usecase';

const API_URL = String(import.meta.env.VITE_API_URL);

const api = new RemoteDataSource(API_URL);

const CouponRepository = new CouponRepositoryImpl(api);

export const UseCases = {
  coupon: {
    insert: new InsertCouponUseCaseImpl(CouponRepository),
    listAll: new ListAllCouponsUseCaseImpl(CouponRepository),
  },
};