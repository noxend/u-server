import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IPaginatedResult,
  PaginationArgs,
} from 'src/pagination/pagination.dto';
import { paginate } from 'src/pagination/pagination.util';
import { Risk } from 'src/risks/risk.schema';
import { Category } from './category.schema';
import { CreateCategoryInput } from './dto/create-category.input';
import { DeletionResult } from './dto/deletion-result.dto';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Risk.name) private riskModel: Model<Risk>,
  ) {}

  async findAll(
    paginationArgs: PaginationArgs,
    name?: string,
  ): Promise<IPaginatedResult<Category>> {
    return paginate(this.categoryModel, paginationArgs, {
      name: { $regex: `^${name}`, $options: 'i' },
    });
  }

  async create(input: CreateCategoryInput): Promise<Category> {
    return this.categoryModel.create(input);
  }

  async update({ id, ...input }: UpdateCategoryInput): Promise<Category> {
    return this.categoryModel
      .findByIdAndUpdate(id, input, { new: true })
      .exec();
  }

  async delete(
    categoryId: string,
    confirm: boolean = false,
  ): Promise<DeletionResult> {
    const category = await this.categoryModel.findById(categoryId);

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const relatedRisksCount = await this.riskModel.countDocuments({
      categoryId,
    });

    if (relatedRisksCount > 0) {
      if (!confirm) {
        return {
          success: false,
          message: `This category is used in ${relatedRisksCount} risks and requires confirmation to be deleted.`,
          confirmationRequired: true,
        };
      }

      await this.riskModel.updateMany(
        { categoryId },
        { $set: { categoryId: null } },
      );
    }

    await this.categoryModel.findByIdAndDelete(categoryId);

    return {
      success: true,
      message: 'Category successfully deleted.',
    };
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    return this.categoryModel.find({ _id: { $in: ids } }).exec();
  }
}
