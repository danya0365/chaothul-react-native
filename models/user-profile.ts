import { ImageSourcePropType } from "react-native";
import { Json } from "./json";
import { Permission } from "./permission.model";
import { UserRole } from "./user-role";

export class UserProfile {
  public permissions: Permission[] = [];
  public roles: UserRole[] = [];
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly photo: string,
    readonly location?: string
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get photoUrl(): ImageSourcePropType {
    if (!this.photo) {
      const fullName = this.fullName;
      const name = fullName ? fullName : "UN";
      return {
        uri: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=200`,
      };
    }
    return { uri: this.photo };
  }

  static createFromApi(json: Json): UserProfile {
    const obj = new UserProfile(
      json.id,
      json.first_name,
      json.last_name,
      json.email,
      json.profile_image,
      json.location
    );
    obj.roles = json.roles
      ? json.roles.map((val: Json) => UserRole.createFromApi(val))
      : [];
    obj.permissions = json.permissions
      ? json.permissions.map((val: Json) => Permission.createFromApi(val))
      : [];
    return obj;
  }

  static createFromObject(user: UserProfile): UserProfile {
    return new UserProfile(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.photo,
      user.location
    );
  }

  isPermission(permissionSlug: Permission.Slug): boolean {
    const permission = this.permissions.find(
      (val) => val.slug === permissionSlug
    );
    if (permission) {
      return permission.data;
    }
    return false;
  }
}
