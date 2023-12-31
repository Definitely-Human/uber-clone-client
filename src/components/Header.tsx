import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMe } from "../hooks/useMe";
import logo from "../images/logo.svg";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
    const { data } = useMe();
    return (
        <>
            {!data?.me.verified && (
                <div className="bg-red-500 p-3 text-center text-xs">
                    Please verify your email.
                </div>
            )}
            <header className="py-4">
                <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-24" />
                    </Link>
                    <span className="text-xs">
                        <Link to="/edit-profile">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-xl"
                            />
                        </Link>
                    </span>
                </div>
            </header>
        </>
    );
};
export default Header;
