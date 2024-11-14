import { Module } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { ChartsController } from './charts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { Products } from '../products/entities/products.entity';
import { Role } from '../role/entities/role.entity';
import { Reports } from '../reports/entities/report.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Products, Role, Reports])],
  controllers: [ChartsController],
  providers: [ChartsService, JwtService],
})
export class ChartsModule {}
