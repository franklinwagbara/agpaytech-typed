export class Country {
  id: number | undefined;
  name: string | undefined;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
