
const SearchCard = ({title,type,year,image}) => {
  return (
    <div
      className="container"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="container__info">
        <span>
          <img src=""></img>{year}
        </span>
      </div>
      <div className="container__profile">
        <div className="container__profile__text">
          <h2>{title}</h2>
          <p>{type}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchCard