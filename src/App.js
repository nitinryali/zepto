import React, { useState} from "react";
import "./App.css";
function App() {
  const initialEmails = [
    "Nitin@example.com",
    "Eswar@example.com",
    "Bhargav sai@example.com",
    "Ms Dhoni@example.com",
    "Rc@example.com",
    "Prabhas@example.com",
    "Pspk@jsp.com",
  ];

  const [emails, setEmails] = useState(initialEmails);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [c, setC] = useState(0);
  const Heading = "Pick Users";

  const handleSelect = (email) => {
    setSelectedItems([...selectedItems, email]);
    setSearch("");
    setFilteredEmails(filteredEmails.filter((item) => item !== email));
    setShowDropdown(false);
  };

  const handleChipRemove = (removedItem) => {
    const updatedItems = selectedItems.filter((item) => item !== removedItem);
    setSelectedItems(updatedItems);
  };

  const handleInputClick = () => {
    if (filteredEmails.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Backspace" && search === "" && selectedItems.length > 0) {
      e.preventDefault();
      const lastChip = selectedItems[selectedItems.length - 1];
      setSearch(lastChip);
      setC(1);
    } else if (e.key === "Backspace" && selectedItems.length > 0 && c) {
      setSelectedItems(selectedItems.slice(0, -1));
      setC(0);
      setSearch("");
    }
  };

  const onChange = (e) => {
    setSearch(e.target.value);
    const updatedEmails = emails.filter((email) =>
      email.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredEmails(
      updatedEmails.filter((item) => !selectedItems.includes(item))
    );
    setShowDropdown(true);
  };

  return (
    <div style={{ textAlign: "center", margin: "0 100px" }}>
      <h1 style={{ color: "#000080", textShadow: "2px 2px grey" }}>
        {Heading}
      </h1>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div
          style={{
            margin: "20px",
            flex: "1",
            borderBottom: "2px solid blue",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              {selectedItems.map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "5px",
                    margin: "5px",
                    cursor: "pointer",
                    backgroundColor: search === item ? "gray" : "lightgrey",
                    borderRadius: "25px",
                  }}
                  onClick={() => handleChipRemove(item)}
                >
                  {item}{" "}
                  <span style={{ marginLeft: "5px", cursor: "pointer" }}>
                    X
                  </span>
                </div>
              ))}
            </div>
            <input
              value={search}
              onChange={onChange}
              onClick={handleInputClick}
              onKeyDown={handleInputKeyDown}
              placeholder="Add User.."
            />
          </div>
          {showDropdown && (
            <ul className="list">
              {search.length > 0 &&
                filteredEmails.map((email) => (
                  <li key={email} onClick={() => handleSelect(email)}>
                    {email}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="map-container"></div>
      </div>
    </div>
  );
}

export default App;
