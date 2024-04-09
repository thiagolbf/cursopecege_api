export default class CreatePetUseCaseOutput {
  id: string;
  name: string;
  type: string;
  size: string;
  gender: string;
  bio: string;
  photo: string;
  createdAt: Date;
  updateAt: Date;

  constructor(data: Partial<CreatePetUseCaseOutput>) {
    Object.assign(this, data);
  }
}
