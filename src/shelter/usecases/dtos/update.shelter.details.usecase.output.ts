export default class UpdateShelterDetailsUseCaseOutput {
  name: string;
  whatsApp: string;
  email: string;
  phone: string;
  createdAt: Date;
  updateAt: Date;

  constructor(data: Partial<UpdateShelterDetailsUseCaseOutput>) {
    Object.assign(this, data);
  }
}
