import { PartialType } from '@nestjs/swagger';
import { CreateMinibarDto } from './create-minibar.dto';

export class UpdateMinibarDto extends PartialType(CreateMinibarDto) {}
