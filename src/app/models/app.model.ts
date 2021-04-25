export class User {
    username: string;
    password: string;
}

export class Employee {
    username: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    birthDate: Date = new Date()
    basicSalary: number = null;
    status: string = '';
    group: string = '';
    description: string = '';
}

export class EmployeeFormGrouping {
    uid: string;
    label: string; 
    type: string; //text, number, datepicker, radio, dropdown
    isRequired: boolean;
    options: string[] = null;
    value: any = null
}

export class EmployeeForm {
    title: string = "";
    items: EmployeeFormGrouping[] = []
}