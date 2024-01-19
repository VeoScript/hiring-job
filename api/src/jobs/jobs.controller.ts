import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AppliedJobDto } from './dto/apply-job.dto';

@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto, @Req() request: Request) {
    return this.jobsService.create(createJobDto, request);
  }

  @Post('apply')
  apply(@Body() appliedJobDto: AppliedJobDto, @Req() request: Request) {
    return this.jobsService.apply(appliedJobDto, request);
  }

  @Patch('applicant/update-status/:id')
  updateApplicantStatus(
    @Param('id') id: string,
    @Query('application_status') application_status: string,
    @Req() request: Request,
  ) {
    return this.jobsService.updateApplicantStatus(id, application_status, request);
  }

  @Get('applicant/:id')
  jobDetails(@Param('id') id: string, @Req() request: Request) {
    return this.jobsService.jobDetails(id, request);
  }

  @Get()
  findAll(@Query('search') search: string) {
    return this.jobsService.findAll(search);
  }

  @Get('employer')
  findAllByEmployer(@Req() request: Request) {
    return this.jobsService.findAllByEmployer(request);
  }

  @Get('employer/applicants')
  findAllApplicantsByEmployer(@Req() request: Request) {
    return this.jobsService.findAllApplicantsByEmployer(request);
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
