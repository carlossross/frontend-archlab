import { UserDto } from './user.dto';
import { User } from './user.model';

export function mapUserDtoToUser(dto: UserDto): User {
  return {
    id: dto.id,
    name: dto.full_name,
    email: dto.email_address,
  };
}

export function mapUsersDtoToUsers(dtos: UserDto[]): User[] {
  return dtos.map(mapUserDtoToUser);
}
