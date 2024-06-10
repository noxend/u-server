import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RiskResolver } from './risk.resolver';
import { Risk, RiskSchema } from './risk.schema';
import { RiskService } from './risk.service';

@Module({
  providers: [RiskResolver, RiskService],
  imports: [
    MongooseModule.forFeature([{ name: Risk.name, schema: RiskSchema }]),
  ],
})
export class RiskModule {}
