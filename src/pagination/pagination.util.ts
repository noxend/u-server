import { FilterQuery, Model } from 'mongoose';
import { IPaginatedResult, PaginationArgs } from './pagination.dto';

export async function paginate<T>(
  model: Model<T>,
  paginationArgs: PaginationArgs,
  filter: FilterQuery<T> = {},
): Promise<IPaginatedResult<T>> {
  const { page, limit } = paginationArgs;
  const skip = (page - 1) * limit;

  const [totalItems, items] = await Promise.all([
    model.countDocuments(filter).exec(),
    model.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).exec(),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    totalItems,
    totalPages,
    page,
  };
}
