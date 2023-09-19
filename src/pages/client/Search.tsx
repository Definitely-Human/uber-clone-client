import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { gql } from "../../__generated__";
import { useLazyQuery } from "@apollo/client";

const SEARCH_RESTAURANT = gql(/* GraphQL */ `
    query searchRestaurant($input: SearchRestaurantInput!) {
        searchRestaurant(input: $input) {
            ok
            error
            totalPages
            totalResults
            restaurants {
                ...RestaurantParts
            }
        }
    }
`);

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [queryReadyToStart, { loading, data }] =
        useLazyQuery(SEARCH_RESTAURANT);
    useEffect(() => {
        const [_, query] = location.search.split("?term=");
        if (!query) {
            return navigate("/", { replace: true });
        }
        queryReadyToStart({
            variables: {
                input: {
                    page: 1,
                    query,
                },
            },
        });
    }, [history, location]);
    console.log(loading, data);
    return (
        <div>
            <Helmet>
                <title>Search | Uber</title>
            </Helmet>
            Search
        </div>
    );
};
export default Search;
