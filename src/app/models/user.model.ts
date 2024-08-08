export interface User {
    id: number; // Add id property
    name: string;
    email: string;
    phoneNumber?: string; // Optional
    password: string;
    organization: string; // New property
    designation?: string; // Optional property
    birthDate?: string; // Optional property
    city?: string; // Optional property
    pincode?: string; // Optional property
}
