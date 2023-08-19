// Import Styles
import './searchBar.scss';

const SearchBar = ({ getFilter }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, tag, keyword } = e.target;

        let filter = false;
        let objectKey = name.id;
        if (tag.checked) {
            objectKey = tag.id;
        }

        if (keyword.value !== "") {
            filter = {};
            filter[objectKey] = keyword.value;
        }

        getFilter(filter);
    };


    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <h3>Filters</h3>
            <div className="search-form__parameters">
                <div className="search-form__parameters-type">
                    <input type="radio" name="typeFilter" id="name" defaultChecked />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="search-form__parameters-type">
                    <input type="radio" name="typeFilter" id="tag" />
                    <label htmlFor="tag">Tag</label>
                </div>
                <div>
                    <input type="text" name="keyword" id="keyword" placeholder="Type keyword..." />
                    <button className="search-button">Search</button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
