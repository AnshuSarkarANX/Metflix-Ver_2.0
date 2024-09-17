import { useState } from "react";
import search from "./search.svg";
const SearchBar = ({ show,onSubmit }) => {
  const [btn, showBtn] = useState(false);
  const [input, setInput] = useState("")
  const handlebtn = () => {
    showBtn((btn) => !btn);
  };
  const handleSubmit= (e)=>{
  e.preventDefault();
  onSubmit(input);
}
const handleChange=(e)=>{
  setInput(e.target.value)
  console.log(e.target.value)
}
  return (
    <form
      className={`Search_container_hide m_Hide ${show && "Search_container"}`}
      onSubmit={handleSubmit}
    >
      <input autoFocus className={btn ? "input" : "Hide"} onChange={handleChange} value={input}></input>
      <span>
        <img
          className={!btn ? "Search m_Hide" : "Hide"}
          src={search}
          alt="Search"
        />
      </span>
      <span
        className={!btn ? "Search_text m_Hide" : "Hide"}
        onClick={handlebtn}
      >
        Search
      </span>
    </form>
  );
};

export default SearchBar;
