import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import PetTokens from './pet.tokens';
import GetPetByIdUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/get.pet.id.usecase.output';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetByIdUseCaseInput from './usecases/dtos/update.pet.by.id.usecase.input';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/update.pet.by.id.usecase.output';
import DeletePetByIdUseCaseInput from './usecases/dtos/delete.pet.by.id.usecase.input';
import DeletePetByIdUseCaseOutput from './usecases/dtos/delete.pet.by.id.usecase.output';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multer.config';
import UpdatePetPhotoByIdUseCaseInput from './usecases/dtos/update.pet.photo.by.id.usecase.input';
import UpdatePetPhotoByIdUseCaseOutput from './usecases/dtos/update.pet.photo.by.id.usecase.output';

@Controller('pet')
export class PetController {
  @Inject(PetTokens.createPetUseCase)
  private readonly createPetUseCase: IUseCase<
    CreatePetUseCaseInput,
    CreatePetUseCaseOutput
  >;

  @Inject(PetTokens.getPetByIdUseCase)
  private readonly getPetByIdUseCase: IUseCase<
    GetPetByIdUseCaseInput,
    GetPetByIdUseCaseOutput
  >;

  @Inject(PetTokens.updatePetByIdUseCase)
  private readonly updatePetByIdUseCase: IUseCase<
    UpdatePetByIdUseCaseInput,
    UpdatePetByIdUseCaseOutput
  >;

  @Inject(PetTokens.deletePetByIdUseCase)
  private readonly deletePetByIdUseCase: IUseCase<
    DeletePetByIdUseCaseInput,
    DeletePetByIdUseCaseOutput
  >;

  @Inject(PetTokens.updatePetPhotoByIdUseCase)
  private readonly updatePetPhotoByIdUseCase: IUseCase<
    UpdatePetPhotoByIdUseCaseInput,
    UpdatePetPhotoByIdUseCaseOutput
  >;

  @Post()
  async createPet(
    @Body() input: CreatePetControllerInput,
  ): Promise<CreatePetUseCaseOutput> {
    const useCaseInput = new CreatePetUseCaseInput({ ...input });

    return await this.createPetUseCase.run(useCaseInput);
  }

  @Get(':id')
  async getPetById(@Param('id') id: string): Promise<GetPetByIdUseCaseInput> {
    try {
      const useCaseInput = new GetPetByIdUseCaseInput({ id });
      return await this.getPetByIdUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  @Put(':id')
  async updatePetById(
    @Body() input: UpdatePetControllerInput,
    @Param('id') id: string,
  ): Promise<UpdatePetByIdUseCaseOutput> {
    try {
      const useCaseInput = new UpdatePetByIdUseCaseInput({
        ...input,
        id,
      });
      return await this.updatePetByIdUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  @Delete(':id')
  async deletePet(@Param('id') id: string) {
    try {
      const useCaseInput = new DeletePetByIdUseCaseInput({ id });
      return await this.deletePetByIdUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }

  @Patch(':id/photo')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  async updatePhoto(
    @UploadedFile() photo: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<UpdatePetPhotoByIdUseCaseOutput> {
    // console.log(photo, id);
    try {
      const useCaseInput = new UpdatePetPhotoByIdUseCaseInput({
        id,
        photoPath: photo.path,
      });

      return await this.updatePetPhotoByIdUseCase.run(useCaseInput);
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message));
    }
  }
}
