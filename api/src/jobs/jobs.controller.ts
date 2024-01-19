import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto, @Req() request: Request) {
    return this.jobsService.create(createJobDto, request);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('employer')
  findAllByEmployer(@Req() request: Request) {
    return this.jobsService.findAllByEmployer(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.jobsService.findOne(id, request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @Req() request: Request) {
    return this.jobsService.update(id, updateJobDto, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.jobsService.remove(id, request);
  }
}
