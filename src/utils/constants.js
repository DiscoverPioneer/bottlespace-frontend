export const Pages = {
    USERS: "users",
    LOCALITY: "locality",
    INCIDENT: "incident",
    EVENT: "events",
    POI: "point-of-interest",
    SCANNER_FEED:"scanner-feed",
    LINK: "links",
    SUB_LOCALITY: "sub-locality",
}

export const roleOptions = [
    { label: "Super Admin", value: "super"},
    { label: "Admin", value: "admin"},
    { label: "Sub Admin", value: "sub_admin"}
];

export const SuperPermissions = [ "admin", "super"]
export const AllPermission = ["super", "admin"]
export const adminRoles = ['super', "admin"]