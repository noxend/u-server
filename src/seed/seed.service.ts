import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../categories/category.schema';
import { Risk } from '../risks/risk.schema';

@Injectable()
export class SeedService {
  private logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Risk.name) private riskModel: Model<Risk>,
  ) {}

  async seed() {
    this.logger.log('Seeding started');

    await this.categoryModel.deleteMany({});
    await this.riskModel.deleteMany({});

    const categories = [];

    for (let i = 0; i < 100; i++) {
      categories.push({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        createdBy: faker.internet.userName(),
        createdAt: new Date(Date.now() - i * 1000),
        color: faker.internet.color(),
      });
    }

    const savedCategories = await this.categoryModel.insertMany(categories);

    const risks = [];

    for (let i = 0; i < 10000; i++) {
      const category =
        savedCategories[Math.floor(Math.random() * savedCategories.length)];

      risks.push({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        resolved: faker.datatype.boolean(),
        createdBy: faker.internet.userName(),
        createdAt: new Date(Date.now() - i * 1000),
        categoryId: category.id,
      });
    }

    await this.riskModel.insertMany(risks);

    this.logger.log('Seeding completed');
  }
}
