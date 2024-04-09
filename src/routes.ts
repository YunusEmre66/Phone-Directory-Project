import { AddressController } from "./controller/AddressController";
import { UserController } from "./controller/UserController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get", //! /:id url ile çakışma olmaması için önce /search yazıldı.
    route: "/users/search",
    controller: UserController,
    action: "search",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users/add",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/delete/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "put",
    route: "/users/update/:id",
    controller: UserController,
    action: "update",
  },

  //!address
  {
    method: "get",
    controller: AddressController,
    route: "/address/all", //! /:id urlsi ile çakışma olmaması için önce /all yazıldı. daima böyle yazılır
    action: "all",
  },
  {
    method: "get",
    controller: AddressController,
    route: "/address/:id",
    action: "one",
  },
  {
    method: "get",
    controller: AddressController,
    route: "/address/user/:userId",
    action: "userOne",
  },{
    method : "post",
    route : "/address/add",
    controller : AddressController,
    action :"save"
  }

  //   , {
  //     method: "get",
  //     route: "/search",
  //     controller: SearchController,
  //     action: "all"
  // }
];
