"use client";

import { useEffect, useState } from "react";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(localStorage.getItem("jwcd-age-ok") !== "yes"));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!visible) return null;
  return (
    <div className="ageGate" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="ageCard">
        <span className="ageLeaf">19+</span>
        <h2 id="age-title">Welcome to Jane Wilson Cannabis</h2>
        <p>You must be 19 years of age or older to enter.</p>
        <button onClick={() => { localStorage.setItem("jwcd-age-ok", "yes"); setVisible(false); }}>I am 19 or older</button>
        <a href="https://www.google.com">Exit</a>
      </div>
    </div>
  );
}
