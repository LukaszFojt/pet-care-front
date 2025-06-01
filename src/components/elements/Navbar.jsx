import { BsCalendar4Week } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { FaDog } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
    return (
        <div className="navbar">
            <button className="button"><BsGeoAlt/> Lokalizacja</button>
            <button className="button"><BsCalendar4Week/> pon. 1 cze. - pt. 6 cze.</button>
            <button className="button"><FaDog/> Pies <BsChevronDown/></button>
            <button className="search">Szukaj</button>
        </div>
    );
}
 
export default Navbar;