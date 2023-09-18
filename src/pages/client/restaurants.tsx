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
                <div className="max-w-screen-2xl mx-auto mt-8">
                    <div className="flex justify-center max-w-sm mx-auto">
                        {data?.allCategories.categories?.map((category) => (
                            <div className="flex flex-col items-center">
                                <div
                                    key={category.id}
                                    className="w-14 h-14 mx-6 cursor-pointer bg-cover hover:bg-gray-200 rounded-full"
                                    style={{
                                        backgroundImage: `url(${category.coverImage})`,
                                    }}
                                ></div>
                                <span className="text-sm mt-1 text-center font-bold">
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div></div>
        </div>
    );
};
export default Restaurants;
