import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryLoader } from './categories/category.dataloader';
import { CategoryModule } from './categories/category.module';
import { RiskModule } from './risks/risk.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (categoryLoader: CategoryLoader) => ({
        autoSchemaFile: true,
        path: '/gql',
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        playground: false,
        context: () => ({
          categoryLoader: categoryLoader.createLoader(),
        }),
        autoTransformHttpErrors: true,
      }),
      inject: [CategoryLoader],
      imports: [CategoryModule],
    }),
    CategoryModule,
    RiskModule,
    SeedModule,
  ],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: CategoryLoaderInterceptor,
  //   },
  // ],
})
export class AppModule {}
