import { ConflictException, Injectable } from '@nestjs/common';
import { StaffRequestEnum, user } from '@prisma/client';
import * as dayjs from 'dayjs';
import { CreateStaffRequestDto } from './_utils/dtos/requests/create-staff-request.dto';
import { StaffRequestsRepository } from './staff-requests.repository';

@Injectable()
export class StaffRequestsService {
  constructor(
    private readonly staffRequestsRepository: StaffRequestsRepository,
  ) {}

  getLastRequestForUser(user: user) {
    return this.staffRequestsRepository
      .getLastRequestForUser(user.id)
      .then((x) => ({
        role: user.role,
        request: x,
      }));
  }

  async createRequest(
    user: user,
    createStaffRequestDto: CreateStaffRequestDto,
  ) {
    const lastRequest =
      await this.staffRequestsRepository.getLastRequestForUser(user.id);
    if (lastRequest && lastRequest.status === StaffRequestEnum.WAITING)
      throw new ConflictException(
        'Une demande est déjà en cours de traitement',
      );
    if (
      lastRequest &&
      !dayjs(lastRequest.createdAt).isBefore(dayjs().subtract(30, 'day'))
    )
      throw new ConflictException('Vous avez déjà fait une demande ce mois-ci');

    return this.staffRequestsRepository.createRequest(
      user.id,
      createStaffRequestDto,
    );
  }
}
