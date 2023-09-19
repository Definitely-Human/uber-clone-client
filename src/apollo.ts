import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    makeVar,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { createFragmentRegistry } from "@apollo/client/cache";
import { gql } from "./__generated__";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        },
                    },
                    token: {
                        read() {
                            return authTokenVar();
                        },
                    },
                },
            },
        },
        fragments: createFragmentRegistry(
            gql(/* GraphQL */ `
                fragment RestaurantParts on Restaurant {
                    id
                    name
                    coverImage
                    category {
                        name
                    }
                    address
                    isPromoted
                }
            `)
        ),
    }),
});
