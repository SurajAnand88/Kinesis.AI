import { useDisclosure } from "@chakra-ui/react";

var initialState = {
  models: null,
  user: null,
  token: null,
  onOpen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "onOpen":
      return {
        ...state,
        onOpen: true,
      };
    case "onClose":
      return {
        ...state,
        onOpen: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export { reducer };
