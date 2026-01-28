const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up", 
    PROFILE: (id: string) => `/profile/${id}`,
    QUESTION: (id: string) => `/question/${id}`,
    TAGS: (id: string) => `/tags/${id}`,
    SIGN_IN_WITH_OAUTH: `/signin-with-oauth`,
    ASK_QUESTION: "/ask-question",
};
export default ROUTES;