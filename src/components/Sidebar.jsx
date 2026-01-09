import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <section className="sidebar">
      <h2>Customização</h2>

      <label htmlFor="slider1" className="slider-label">
        Slider 1
      </label>
      <input type="range" className="slider" id="slider1" />
    </section>
  );
}
