import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { of, Observable } from 'rxjs';
import { Organization } from '../models/organization.model';
import { mockOrganizations, mockUsers } from '../mocks/mock-data';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private users: User[] = mockUsers; // Use mock data for users
    private organizations: Organization[] = mockOrganizations; // Use mock data for organizations

    /**
     * Checks if a user exists by email or phone number.
     * @param emailOrPhone The email or phone number of the user.
     * @returns An observable indicating whether the user exists.
     */
    checkUser(emailOrPhone: string): Observable<boolean> {
        const userExists = this.users.some(u => u.email === emailOrPhone || u.phoneNumber === emailOrPhone);
        return of(userExists);
    }

    /**
     * Validates user credentials for login.
     * @param emailOrPhone The email or phone number of the user.
     * @param password The password provided by the user.
     * @returns An observable indicating whether the credentials are valid.
     */
    validateUser(emailOrPhone: string, password: string): Observable<boolean> {
        // First, check in local storage
        const usersFromLocalStorage: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        
        const userValidInLocalStorage = usersFromLocalStorage.some(u =>
            (u.email === emailOrPhone || u.phoneNumber === emailOrPhone) && u.password === password
        );
    
        // If the user is found in local storage, return the result
        if (userValidInLocalStorage) {
            return of(true);
        }
    
        // If not found, check in mock data
        const userValidInMockData = this.users.some(u =>
            (u.email === emailOrPhone || u.phoneNumber === emailOrPhone) && u.password === password
        );
    
        return of(userValidInMockData);
    }
    

    /**
     * Retrieves the list of organizations.
     * @returns An observable containing the list of organizations.
     */
    getOrganizations(): Observable<Organization[]> {
        return of(this.organizations);
    }

    /**
     * Saves user data in local storage after signup.
     * @param user The user data to be saved.
     */
    saveUserData(user: User): void {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        existingUsers.push(user);
        localStorage.setItem('users', JSON.stringify(existingUsers));
    }

    /**
     * Retrieves the user data from local storage.
     * @param emailOrPhone The email or phone number of the user.
     * @returns The user data if found, null otherwise.
     */
    getUserData(emailOrPhone: string): User | null {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find((u: User) => u.email === emailOrPhone || u.phoneNumber === emailOrPhone) || null;
    }

    /**
     * Logs out the user by removing their data from local storage.
     */
    logout(): void {
        localStorage.removeItem('users'); // Or implement a more specific logout logic if needed
    }
    getNextUserId(): number {
        return this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
    }
}
