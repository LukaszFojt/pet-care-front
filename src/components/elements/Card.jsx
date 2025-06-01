import { Rating } from "@mui/material";

const Card = ({ image, userName, stars, completedOrders, city, price }) => {
    return (
        <div className="border rounded p-4" style={{ backgroundColor: 'var(--light-accents)' }}>
            <img src={image} alt="User" className="w-full h-full object-cover rounded" />
            <div className="mt-2 font-bold text-lg">{userName}</div>
            <Rating name="half-rating" defaultValue={stars} precision={0.5} />
            <div>Completed Orders: {completedOrders}</div>
            <div>City: {city}</div>
            {price && <div>Price: {price} zł</div>}
        </div>
    );
};

export default Card;
