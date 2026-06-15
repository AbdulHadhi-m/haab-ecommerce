export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}
