import { Controller, Post } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('test')
export class TestUtilsController {
  constructor(private readonly DataSouce: DataSource) {}

  @Post('reset')
  async reset() {
    try {
      await this.DataSouce.synchronize(true);
      return { success: true };
    } catch (error) {
      console.log('error: ', error);
      return { success: false };
    }
  }
}
