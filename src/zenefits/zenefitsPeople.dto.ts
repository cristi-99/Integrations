export class ZenefitsPeopleDto {
  first_name: string;
  last_name: string;
  title: string;
  personal_email: string;
  date_of_birth: string;
  gender: string;
  city: string;
  state: string;
  street1: string;

  getPeople() {
    return this.first_name + ' ' + this.last_name;
  }
}
