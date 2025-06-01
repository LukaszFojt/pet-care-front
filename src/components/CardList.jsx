import React, { useEffect, useState } from "react";
import Card from "./Card";

const CardList = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/cards")
            .then((response) => response.json())
            .then((data) => setCards(data))
            .catch((error) => console.error("Błąd pobierania danych:", error));
    }, []);
    return (
        <div className="cardList">
            {cards.map((card) => (
                <Card key={card.id} {...card} />
            ))}
        </div>
    );
}
 
export default CardList;