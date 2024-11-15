import { RemoteDataSource } from '../../data/Remote.datasource';
import { CouponRepositoryImpl } from '../../data/repositories/Coupons.repository';
import { ListAllCouponsUseCaseImpl } from './Coupons/validate.usecase';

const API_URL = String(import.meta.env.VITE_API_URL);

const api = new RemoteDataSource(API_URL);

const CouponRepository = new CouponRepositoryImpl(api);

export const UseCases = {
  coupon: {
    listAll: new ListAllCouponsUseCaseImpl(CouponRepository),
  },
};
