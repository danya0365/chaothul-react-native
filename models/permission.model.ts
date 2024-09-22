import { Json } from "./json";

export namespace Permission {
  export type Slug =
    | "access_backend"
    | "manage_permission"
    | "manage_role"
    | "create_recruit"
    | "create_work"
    | "review_work"
    | "reply_review";
}

export class Permission {
  constructor(
    readonly slug: Permission.Slug,
    readonly name: string,
    readonly data: boolean
  ) {}

  static createFromApi(row: Json): Permission {
    return new Permission(row.slug, row.name, row.pivot?.data ?? true);
  }

  static createFromObject(row: Permission): Permission {
    return new Permission(row.slug, row.name, row.data);
  }
}
