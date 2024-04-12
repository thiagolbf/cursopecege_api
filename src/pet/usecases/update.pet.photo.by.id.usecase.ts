import { IUseCase } from 'src/domain/iusecase.interface';
import UpdatePetPhotoByIdUseCaseInput from './dtos/update.pet.photo.by.id.usecase.input';
import UpdatePetPhotoByIdUseCaseOutput from './dtos/update.pet.photo.by.id.usecase.output';
import { Pet } from '../schemas/pet.schema';
import PetNotFoundError from 'src/domain/errors/pet.not.found.error';
import { Inject, Injectable } from '@nestjs/common';
import PetTokens from '../pet.tokens';
import IPetRepository from '../interfaces/pet.repository.interface';
import AppTokens from 'src/app.tokens';
import IFileService from 'src/interfaces/file.server.interface';

@Injectable()
export default class UpdatePetPhotoByIdUseCase
  implements
    IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput>
{
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,

    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService,
  ) {}

  async run(
    input: UpdatePetPhotoByIdUseCaseInput,
  ): Promise<UpdatePetPhotoByIdUseCaseOutput> {
    const pet = await this.findPetById(input.id);

    if (!pet) {
      throw new PetNotFoundError();
    }

    await this.petRepository.updateById({
      _id: input.id,
      photo: input.photoPath,
    });

    const photo = await this.fileService.readFile(input.photoPath);

    return new UpdatePetPhotoByIdUseCaseOutput({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photo: photo.toString('base64'),
      createdAt: pet.createdAt,
      updateAt: pet.createdAt,
    });
  }

  private async findPetById(id: string): Promise<Pet> {
    try {
      return await this.petRepository.getById(id);
    } catch (error) {
      return null;
    }
  }
}
