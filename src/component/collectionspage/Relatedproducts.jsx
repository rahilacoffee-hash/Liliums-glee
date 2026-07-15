import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className="border-t border-[#E8E2D9] py-20">
      <div className="container-custom mx-auto px-6">
        <h2 className="mb-10 font-serif text-3xl text-[#111111] md:text-4xl">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/shop/${product.slug}`}
                className="group block overflow-hidden rounded-[24px] border border-[#E8E2D9] bg-white transition hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="mb-1 text-xs uppercase tracking-[2px] text-[#C8A96A]">
                    {product.category}
                  </p>
                  <h3 className="mb-2 font-serif text-lg text-[#111111]">{product.name}</h3>

                  <div className="mb-3 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < product.rating ? "fill-[#C8A96A] text-[#C8A96A]" : "text-[#E8E2D9]"}
                      />
                    ))}
                  </div>

                  <span className="font-serif text-lg text-[#111111]">{product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;