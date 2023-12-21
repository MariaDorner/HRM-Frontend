import { faker } from '@faker-js/faker/locale/en';

export function mockUsers(length: number) {
  const createRowData = (rowIndex: number) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = faker.name.findName(firstName, lastName);
    const avatar = faker.image.avatar();
    const address = faker.address.city();
    const email = faker.internet.email();
    const phone1 = faker.phone.number();
    const phone2 = faker.phone.number();

    const jobTitle = faker.name.jobTitle();
    const departments = ['IT', 'HR', 'Marketing', 'Finance', 'Sales', 'Customer Support'];
    const department = faker.datatype.number({ min: 0, max: departments.length - 1 });
    const selectedDepartment = departments[department];

    const workDescription = faker.lorem.sentence();
    const managerName = faker.name.findName();
    const startDate = faker.date.past().toLocaleDateString();
    const skillName = faker.random.word();
    const skillDescription = faker.lorem.words(5);
    const educationName = faker.random.word();
    const educationDuration = faker.datatype.number({ min: 2, max: 6 }) + ' years';
    const educationsDescription = faker.lorem.words(10);

    return {
      id: rowIndex + 1,
      name,
      firstName,
      lastName,
      avatar,
      address,
      email,
      phone1,
      phone2,
      jobTitle,
      department: selectedDepartment,
      workDescription,
      managerName,
      startDate,
      skillName,
      skillDescription,
      educationName,
      educationDuration,
      educationsDescription
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
