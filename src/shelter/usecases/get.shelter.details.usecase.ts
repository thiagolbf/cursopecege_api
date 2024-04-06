import { IUseCase } from 'src/domain/iusecase.interface';
import GetShelterDetailsUseCaseOutput from './dtos/get.shelter.details.usecase.output';
import IShelterRepository from '../interfaces/shelter.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import ShelterTokens from '../shelter.tokens';

@Injectable()
export default class GetShelterDetailsUseCase
  implements IUseCase<null, GetShelterDetailsUseCaseOutput>
{
  constructor(
    @Inject(ShelterTokens.shelterRepository)
    private readonly shelterRepository: IShelterRepository,
  ) {}

  async run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
    const shelter = await this.shelterRepository.get();
    // console.log(shelter);
    // console.log('aqui');

    return new GetShelterDetailsUseCaseOutput({
      shelterName: shelter.name,
      shelterEmail: shelter.email,
      shelterPhone: shelter.phone,
      shelterWhatsApp: shelter.whatsApp,
      createdAt: shelter.createdAt,
      updateAt: shelter.updateAt,
    });
    // return Promise.resolve(
    //   new GetShelterDetailsUseCaseOutput({
    //     shelterName: 'Abrigo da luz',
    //     shelterEmail: 'abrigodl@gmail.com',
    //     shelterPhone: '19998745231',
    //     shelterWhatsApp: '19998745231',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   }),
    // );
  }
}
