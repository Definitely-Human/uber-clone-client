interface IRestaurantProps {
    id: number;
    coverImage: string;
    name: string;
    categoryName?: string;
}

const Restaurant: React.FC<IRestaurantProps> = ({
    id,
    coverImage,
    name,
    categoryName,
}) => {
    return (
        <div key={id} className="flex flex-col">
            <div
                style={{
                    backgroundImage: `url(${coverImage})`,
                }}
                className=" py-28 bg-cover bg-center "
            ></div>
            <h3 className="text-lg">{name}</h3>
            <span className="border-t-2 py-2 mt-3 capitalize text-xs text-gray-500 border-gray-200">
                {categoryName}
            </span>
        </div>
    );
};
export default Restaurant;
