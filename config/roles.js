//for mongoose enum validation
const rolesArray = [
    "admin",
    "super-admin",
    "manager"
]

//mimic an enum
//for using roles elsewhere
const roles =Object.freeze({
  Admin : "admin",
  Super_admin: "admin"
});

export {rolesArray as default, roles};