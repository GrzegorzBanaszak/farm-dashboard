import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiResponse } from '@nestjs/swagger';
import GetStatsDto from './dto/get-stats.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiResponse({ status: 200, type: GetStatsDto })
  @Get()
  async getStats(): Promise<GetStatsDto> {
    return await this.statsService.getStats();
  }
}
