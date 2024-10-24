import { Json } from "./json";
import { Permission } from "./permission.model";

export class UserRole {
  public permissions: Permission[] = [];
  constructor(readonly id: string, readonly name: string) {}

  static createFromApi(json: Json): UserRole {
    const obj = new UserRole(json.id, json.name);
    obj.permissions = json.permissions
      ? json.permissions.map((val: Json) => Permission.createFromApi(val))
      : [];
    return obj;
  }

  static createFromObject(value: UserRole): UserRole {
    const obj = new UserRole(value.id, value.name);
    obj.permissions = value.permissions
      ? value.permissions.map((val) => Permission.createFromObject(val))
      : [];
    return obj;
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
