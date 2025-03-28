import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CreateCropDto } from 'src/crop/dto/create-crop.dto';

@ValidatorConstraint({ name: 'isHarvestDateAfterPlantDate', async: false })
export class IsHarvestDateAfterPlantDate
  implements ValidatorConstraintInterface
{
  validate(harvestedAt: Date, args: ValidationArguments) {
    const object = args.object as CreateCropDto;

    if (!harvestedAt) return true;

    return harvestedAt > object.plantedAt;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Data zbioru musi być późniejsza niż data zasiewu';
  }
}
