import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Hiring Job API! - (Jerome Villaruel - Veoscript)';
  }
}
