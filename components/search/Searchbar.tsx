import { faLocation, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchbarProps {
    onLocation: () => void;
    text?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    tabIndex?: number;
}

const Searchbar = ({ onLocation, text, onChange, tabIndex }: SearchbarProps) => {
    // React Searchbar component with FontAwesome and daisyUI

    return (
        <div className="form-control w-max">
            <label className="input-group">
                <span className="btn-square bg-primary text-primary-content">
                    <FontAwesomeIcon icon={faSearch} className="w-5" />
                </span>
                <input type="text" placeholder="Enter a location" className="input focus:outline-none" onChange={onChange} tabIndex={tabIndex} />
                <button className="btn btn-square btn-primary" onClick={onLocation}>
                    <FontAwesomeIcon icon={faLocation} className="w-5" />
                </button>
            </label>
        </div>
    );
}

export default Searchbar;