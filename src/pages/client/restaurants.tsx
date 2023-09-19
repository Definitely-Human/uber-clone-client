import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import Restaurant from "../../components/Restaurant";
import { useState } from "react";
import Button from "../../components/Button";

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
    const [page, setPage] = useState(1);
    const { data, loading, error } = useQuery(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page,
            },
        },
    });
    const onNextPageClick = () => setPage((current) => current + 1);
    const onPrevPageClick = () => setPage((current) => current - 1);
    return (
        <div>
            <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
                <input
                    type="search"
                    className="input w-3/12 rounded-md border-0"
                    placeholder="Search restaurant..."
                />
            </form>
            {!loading && (
                <div className="max-w-screen-xl mx-auto mt-8">
                    <div className="flex justify-center max-w-sm mx-auto">
                        {data?.allCategories.categories?.map((category) => (
                            <div
                                key={category.id}
                                className="flex flex-col group cursor-pointer items-center"
                            >
                                <div
                                    className="w-14 h-14 mx-6 mb-3 bg-center bg-cover group-hover:bg-gray-200 rounded-full"
                                    style={{
                                        backgroundImage: `url(${category.coverImage})`,
                                    }}
                                ></div>
                                <span className="text-sm mt-1 text-center  font-bold">
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 mt-10 gap-x-5 gap-y-10">
                        {data?.restaurants.results?.map((restaurant) => {
                            console.log(restaurant);
                            return (
                                <Restaurant
                                    {...restaurant}
                                    categoryName={restaurant.category?.name}
                                />
                            );
                        })}
                    </div>
                    <div className="grid grid-cols-3 text-center max-w-md mx-auto items-center mt-10 pb-20">
                        {page > 1 ? (
                            <button
                                onClick={onPrevPageClick}
                                className="focus:outline-none font-medium text-2xl "
                            >
                                &larr;
                            </button>
                        ) : (
                            <div></div>
                        )}
                        <span className="mx-5">
                            Page {page} of {data?.restaurants.totalPages}
                        </span>
                        {page !== data?.restaurants.totalPages ? (
                            <button
                                onClick={onNextPageClick}
                                className="focus:outline-none font-medium text-2xl "
                            >
                                &rarr;
                            </button>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            )}
            <div></div>
        </div>
    );
};
export default Restaurants;
