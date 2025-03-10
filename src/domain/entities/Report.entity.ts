import {
  ReportedDepositModel,
  ReportedDepositPaginationModel,
} from '../../data/model/Report.model';

export class ReportedDepositPagination {
  data!: ReportedDeposit[];
  totalPages?: number;

  public static fromModel(
    model: ReportedDepositPaginationModel,
  ): ReportedDepositPagination {
    const entity = new ReportedDepositPagination();

    entity.data = model.data.map((item) => ReportedDeposit.fromModel(item));

    entity.totalPages = model.totalPages;

    return entity;
  }
}

export class ReportedDeposit {
  id!: string;
  transactionId!: string;
  phone!: string;
  coldWallet!: string;
  network!: string;
  paymentMethod!: string;
  documentId!: string | null;
  transactionDate!: string;
  coupon!: string | undefined;
  valueBRL!: number;
  valueBTC!: number;
  status!: string;
  discountType!: string;
  discountValue!: number;
  valueCollected!: number;

  public static fromModel(model: ReportedDepositModel): ReportedDeposit {
    const entity = new ReportedDeposit();

    entity.id = model.id;

    entity.transactionId = model.transactionId;

    entity.phone = model.phone;

    entity.coldWallet = model.coldWallet;

    entity.network = model.network;

    entity.paymentMethod = model.paymentMethod;

    entity.documentId = model.documentId;

    entity.transactionDate = model.transactionDate;

    if (model.cupom) {
      entity.coupon = model.cupom;
    }

    entity.valueBRL = model.valueBRL;

    entity.valueBTC = model.valueBTC;

    entity.status = model.status;

    entity.discountType = model.discountType ?? 'percentege';

    entity.discountValue = model.discountValue ?? 0;

    entity.valueCollected = model.valueCollected ?? 0;

    return entity;
  }
}
