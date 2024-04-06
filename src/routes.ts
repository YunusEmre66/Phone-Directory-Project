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
  },{
    method: "put",
    route: "/users/update/:id",
    controller: UserController,
    action: "update",
  }, {
    method: "get",
    route: "/users/search",
    controller: UserController,
    action: "search"
},
  //!address
  {
    method: "get",
    controller: AddressController,
    route: "/address/:id",
    action: "one",
  }
  
//   , {
//     method: "get",
//     route: "/search",
//     controller: SearchController,
//     action: "all"
// }
];
