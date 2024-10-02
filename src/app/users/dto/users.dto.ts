export class GetUserResponse {
  readonly id: string;
  readonly full_name: string;
  readonly employee_number: string;
  readonly birthday_date: Date;
  readonly place_of_birth: string;
  readonly phone_number: string;
  readonly gender: string;
  readonly address: string;
  readonly photo: string;
  readonly email: string;
  readonly role: {
    readonly id: string;
    readonly role_name: string;
  };
}
