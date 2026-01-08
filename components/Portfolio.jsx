"use client";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";

const categories = ["All", "WordPress", "Webflow", "Squarespace", "Shopify", "Mockups"];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    client.fetch(`*[_type=="project"]`).then(setProjects);
  }, []);

  const filtered =
    active === "All"
      ? projects
      : projects.filter(p => p.category === active);

  return (
    <section>
      <h2>Portfolio</h2>

      <div style={{ marginBottom: 20 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{ marginRight: 10 }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
        {filtered.map(item => (
          <div key={item._id} style={{ border: "1px solid #222", padding: 20 }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.url} target="_blank">View</a>
          </div>
        ))}
      </div>
    </section>
  );
}
