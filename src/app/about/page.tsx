import React from "react";

const About = () => {
  return (
    <div className="mx-auto my-4 w-5/6">
      <p className="mb-4">
        Your ultimate destination for the latest in tech gadgets, accessories,
        and innovations!
      </p>

      <section className="mb-4">
        <h2 className="text-xl font-bold">Our Story</h2>
        <p>
          At <strong>NextShop</strong>, we believe in bringing the most
          exciting, cutting-edge products to tech enthusiasts around the world.
          Our journey began in 2025 with a small team of passionate tech lovers
          who wanted to make the newest gadgets accessible to everyone. Today,
          we’ve grown into a global brand with a dedicated team working
          tirelessly to ensure you find exactly what you’re looking for.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold">Our Mission</h2>
        <p>
          To empower people with the technology they need to enhance their lives
          and stay connected in an ever-evolving digital world.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Why Choose Us?</h2>
        <ul>
          <li>
            <strong>Curated Selection:</strong> We handpick every product in our
            catalog to ensure quality and value.
          </li>
          <li>
            <strong>Fast Shipping:</strong> Your order is processed and shipped
            as quickly as possible, so you can start enjoying your new gadgets
            right away.
          </li>
          <li>
            <strong>Customer-Centric:</strong> We’re here for you – with 24/7
            support and a no-questions-asked return policy.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
