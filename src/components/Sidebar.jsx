import { useState, useEffect } from "react";
import "./Sidebar.css";
import { FiRefreshCcw } from "react-icons/fi";

export default function Sidebar({ initialModifiers, onChange }) {
  const [modifiers, setModifiers] = useState(initialModifiers);

  useEffect(() => {
    onChange?.(modifiers);
  }, [modifiers, onChange]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setModifiers((prev) => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  const handleReset = () => {
    setModifiers(initialModifiers);
  };

  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Customização</h2>
        <button className="reset-button" onClick={handleReset}>
          <FiRefreshCcw size={20} />
        </button>
      </div>

      {Object.entries(modifiers).map(([key, value]) => (
        <div key={key}>
          <label>
            {key}: {value}
          </label>
          <input
            type="range"
            id={key}
            value={value}
            className="slider"
            onChange={handleChange}
          />
        </div>
      ))}
    </section>
  );
}
