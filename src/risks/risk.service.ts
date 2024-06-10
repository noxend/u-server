import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationArgs } from 'src/pagination/pagination.dto';
import { paginate } from 'src/pagination/pagination.util';
import { CreateRiskInput } from './dto/create-risk.input';
import { RiskFilterArgs } from './dto/risk-filter.args';
import { UpdateRiskInput } from './dto/update-risk.input';
import { Risk } from './risk.schema';

@Injectable()
export class RiskService {
  constructor(@InjectModel(Risk.name) private categoryModel: Model<Risk>) {}

  create(input: CreateRiskInput) {
    return this.categoryModel.create(input);
  }

  findAll(paginationArgs: PaginationArgs, filterArgs: RiskFilterArgs) {
    return paginate(this.categoryModel, paginationArgs, filterArgs);
  }

  update({ id, ...input }: UpdateRiskInput) {
    return this.categoryModel
      .findByIdAndUpdate(id, input, { new: true })
      .exec();
  }

  delete(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
