import { User } from '../models/user.model';
import { Organization } from '../models/organization.model';

export const mockUsers: User[] = [
    {
        id: 1,
        name: 'John Doe', // Add name property
        email: 'user@example.com',
        phoneNumber: '1234567890', // Add phoneNumber for consistency
        password: 'password123',
        organization: 'Organization 1', // Add organization property
        designation: 'Developer', // Optional properties
        birthDate: '1990-01-01',
        city: 'City A',
        pincode: '123456'
    },
    {
        id: 2,
        name: 'Jane Smith', // Add name property
        email: 'jane@example.com',
        phoneNumber: '0987654321', // Add phoneNumber for consistency
        password: 'password123',
        organization: 'Organization 2', // Add organization property
        designation: 'Manager', // Optional properties
        birthDate: '1992-02-02',
        city: 'City B',
        pincode: '654321'
    }
];

export const mockOrganizations: Organization[] = [
    { id: 'org1', name: 'Organization 1' },
    { id: 'org2', name: 'Organization 2' }
];
