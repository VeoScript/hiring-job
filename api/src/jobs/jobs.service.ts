import { Injectable, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AppliedJobDto } from './dto/apply-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JobsService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createJobDto: CreateJobDto, request: Request) {
    try {
      const { title, description, company_details } = createJobDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) throw new UnauthorizedException();

      if (title.trim() === '') throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);

      if (description.trim() === '')
        throw new HttpException('Desciption is required', HttpStatus.BAD_REQUEST);

      if (company_details.trim() === '')
        throw new HttpException('Company details is required', HttpStatus.BAD_REQUEST);

      return await this.prismaService.job.create({
        data: {
          title,
          description,
          company_details,
          userId: cookieData.id,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async apply(appliedJobDto: AppliedJobDto, request: Request) {
    try {
      const { jobId } = appliedJobDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) throw new UnauthorizedException();

      return await this.prismaService.appliedJob.create({
        data: {
          status: 'PENDING',
          jobId,
          userId: cookieData.id,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async jobDetails(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const job = await this.prismaService.appliedJob.findFirst({
        where: {
          jobId: id,
        },
        select: {
          id: true,
          status: true,
          created_at: true,
          job: {
            select: {
              id: true,
              title: true,
              description: true,
              company_details: true,
            },
          },
          user: {
            select: {
              id: true,
              account_type: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return job;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async findAll(search: string) {
    try {
      const jobs = await this.prismaService.job.findMany({
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          company_details: true,
          created_at: true,
          user: {
            select: {
              id: true,
              account_type: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      return jobs;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async findAllByEmployer(request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const jobs = await this.prismaService.job.findMany({
        where: {
          userId: cookieData.id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          company_details: true,
          created_at: true,
          user: {
            select: {
              id: true,
              account_type: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      return jobs;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async findOne(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      const job = await this.prismaService.job.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          company_details: true,
          created_at: true,
          user: {
            select: {
              id: true,
              account_type: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return job;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async update(id: string, updateJobDto: UpdateJobDto, request: Request) {
    try {
      const { title, description, company_details, userId } = updateJobDto;

      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      if (title.trim() === '') throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);

      if (description.trim() === '')
        throw new HttpException('Desciption is required', HttpStatus.BAD_REQUEST);

      if (company_details.trim() === '')
        throw new HttpException('Company details is required', HttpStatus.BAD_REQUEST);

      return await this.prismaService.job.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          company_details,
          userId,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, request: Request) {
    try {
      const cookie = request.cookies[process.env.JWT_NAME];

      const cookieData = await this.jwtService.verifyAsync(cookie);

      if (!cookieData) {
        throw new UnauthorizedException();
      }

      return await this.prismaService.job.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
