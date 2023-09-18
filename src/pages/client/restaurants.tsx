import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";

const RESTAURANTS_QUERY = gql(/* GraphQL */ `
    query restaurantsPage($input: RestaurantsInput!) {
        allCategories {
            ok
            error
            categories {
                id
                name
                coverImage
                slug
                restaurantCount
            }
        }
        restaurants(input: $input) {
            ok
            error
            totalPages
            totalResults
            results {
                id
                name
                coverImage
                category {
                    name
                }
                address
                isPromoted
            }
        }
    }
`);

const Restaurants = () => {
    const { data, loading, error } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page: 1,
            },
        },
    });
    console.log(data, error);
    return <h1>Restaurants</h1>;
};
export default Restaurants;
