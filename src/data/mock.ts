import { faker } from '@faker-js/faker/locale/en';

export function mockUsers(length: number) {
  const createRowData = rowIndex => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = faker.name.findName(firstName, lastName);
    const avatar = faker.image.avatar();

    //const department = faker.department.department();

    const address = faker.address.city();
    const email = faker.internet.email();
    const phone1 = faker.phone.number();
    const phone2 = faker.phone.number();

    return {
      id: rowIndex + 1,
      name,
      firstName,
      lastName,
      avatar,
      address,
      email,
      phone1,
      phone2
      //jobTitle,
      //department,
      //workDescription,
      //managerName,
      //startDate,
      //skillName,
      //skillDescription,
      //educationName,
      //duration,
      //educationsDescription
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}

export function mockTreeData(options: {
  limits: number[];
  labels: string | string[] | ((layer: number, value: string, faker) => string);
  getRowData?: (layer: number, value: string) => any[];
}) {
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue?: string, layer = 0) => {
    const length = limits[layer];

    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;

      let row: any = {
        label: typeof label === 'function' ? label(layer, value, faker) : label + ' ' + value,
        value
      };

      if (getRowData) {
        row = {
          ...row,
          ...getRowData(layer, value)
        };
      }

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}
