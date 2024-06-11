import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(RiskService.name);

  constructor(@InjectModel(Risk.name) private riskModel: Model<Risk>) {}

  async create(input: CreateRiskInput) {
    try {
      return await this.riskModel.create(input);
    } catch (error) {
      this.logger.error('Error creating risk', error.stack);
      throw new Error('Error creating risk');
    }
  }

  async findAll(paginationArgs: PaginationArgs, filterArgs: RiskFilterArgs) {
    try {
      return await paginate(this.riskModel, paginationArgs, filterArgs);
    } catch (error) {
      this.logger.error('Error finding risks', error.stack);
      throw new Error('Error finding risks');
    }
  }

  async update({ id, ...input }: UpdateRiskInput) {
    try {
      return await this.riskModel
        .findByIdAndUpdate(id, input, { new: true })
        .exec();
    } catch (error) {
      this.logger.error(`Error updating risk with id: ${id}`, error.stack);
      throw new Error('Error updating risk');
    }
  }

  async delete(id: string) {
    try {
      return await this.riskModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(`Error deleting risk with id: ${id}`, error.stack);
      throw new Error('Error deleting risk');
    }
  }
}
