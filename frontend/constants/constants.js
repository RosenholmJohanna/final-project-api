const actions = {
  CREATE_QUESTION: "CREATE_QUESTION", //user
  MODIFY_QUESTION: "MODIFY_QUESTION", //user
  DELETE_QUESTION: "DELETE_QUESTION", //user(owner!), admin
  SAVE_QUESTION: "SAVE_QUESTION" // all users
  };
  
  const roles = {
    ADMIN: "ADMIN",
    USER: "USER",
    GUEST: "GUEST"
  };
  
  export { actions, roles };