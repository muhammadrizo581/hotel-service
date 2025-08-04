import { PartialType } from '@nestjs/swagger';
import { CreateLoyaltyClientDto } from './create-loyalty-client.dto';

export class UpdateLoyaltyClientDto extends PartialType(CreateLoyaltyClientDto) {}
