export interface MegaMenuLink {
  label: string;
  href: string;
}

export interface MegaMenuGroup {
  title: string;
  links: MegaMenuLink[];
}

export interface MegaMenuBanner {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  groups: MegaMenuGroup[];
  banner: MegaMenuBanner;
}

export const MEGA_MENU_ITEMS: Record<string, MegaMenuItem> = {
  men: {
    label: "MEN",
    href: "/products?category=men",
    groups: [
      {
        title: "Featured",
        links: [
          { label: "New Arrivals", href: "/products?category=men&sort=-createdAt" },
          { label: "Best Sellers", href: "/products?category=men&sort=-sold" },
          { label: "Sale", href: "/products?category=men&discount=true" },
        ],
      },
      {
        title: "Footwear",
        links: [
          { label: "Running Shoes", href: "/products?category=men&subcategory=running-shoes" },
          { label: "Training Shoes", href: "/products?category=men&subcategory=training-shoes" },
          { label: "Lifestyle Shoes", href: "/products?category=men&subcategory=lifestyle-shoes" },
          { label: "Sandals & Slides", href: "/products?category=men&subcategory=sandals" },
        ],
      },
      {
        title: "Clothing",
        links: [
          { label: "T-Shirts", href: "/products?category=men&subcategory=t-shirts" },
          { label: "Hoodies & Sweatshirts", href: "/products?category=men&subcategory=hoodies" },
          { label: "Jackets", href: "/products?category=men&subcategory=jackets" },
          { label: "Pants & Shorts", href: "/products?category=men&subcategory=pants" },
          { label: "Compression", href: "/products?category=men&subcategory=compression" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Bags & Backpacks", href: "/products?category=men&subcategory=bags" },
          { label: "Hats & Caps", href: "/products?category=men&subcategory=hats" },
          { label: "Socks", href: "/products?category=men&subcategory=socks" },
        ],
      },
    ],
    banner: {
      image: "",
      title: "NEW SEASON",
      subtitle: "Explore the latest drops for men.",
      href: "/products?category=men&sort=-createdAt",
    },
  },
  women: {
    label: "WOMEN",
    href: "/products?category=women",
    groups: [
      {
        title: "Featured",
        links: [
          { label: "New Arrivals", href: "/products?category=women&sort=-createdAt" },
          { label: "Best Sellers", href: "/products?category=women&sort=-sold" },
          { label: "Sale", href: "/products?category=women&discount=true" },
        ],
      },
      {
        title: "Footwear",
        links: [
          { label: "Running Shoes", href: "/products?category=women&subcategory=running-shoes" },
          { label: "Training Shoes", href: "/products?category=women&subcategory=training-shoes" },
          { label: "Lifestyle Shoes", href: "/products?category=women&subcategory=lifestyle-shoes" },
          { label: "Sandals & Slides", href: "/products?category=women&subcategory=sandals" },
        ],
      },
      {
        title: "Clothing",
        links: [
          { label: "T-Shirts & Tops", href: "/products?category=women&subcategory=t-shirts" },
          { label: "Hoodies & Sweatshirts", href: "/products?category=women&subcategory=hoodies" },
          { label: "Jackets", href: "/products?category=women&subcategory=jackets" },
          { label: "Leggings & Tights", href: "/products?category=women&subcategory=leggings" },
          { label: "Sports Bras", href: "/products?category=women&subcategory=sports-bras" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Bags & Backpacks", href: "/products?category=women&subcategory=bags" },
          { label: "Hats & Caps", href: "/products?category=women&subcategory=hats" },
          { label: "Socks", href: "/products?category=women&subcategory=socks" },
          { label: "Headbands & Hair", href: "/products?category=women&subcategory=headbands" },
        ],
      },
    ],
    banner: {
      image: "",
      title: "NEW COLLECTION",
      subtitle: "Discover what's new for women.",
      href: "/products?category=women&sort=-createdAt",
    },
  },
  kids: {
    label: "KIDS",
    href: "/products?category=kids",
    groups: [
      {
        title: "Featured",
        links: [
          { label: "New Arrivals", href: "/products?category=kids&sort=-createdAt" },
          { label: "Best Sellers", href: "/products?category=kids&sort=-sold" },
          { label: "Sale", href: "/products?category=kids&discount=true" },
        ],
      },
      {
        title: "Footwear",
        links: [
          { label: "Running Shoes", href: "/products?category=kids&subcategory=running-shoes" },
          { label: "Training Shoes", href: "/products?category=kids&subcategory=training-shoes" },
          { label: "Sandals & Slides", href: "/products?category=kids&subcategory=sandals" },
        ],
      },
      {
        title: "Clothing",
        links: [
          { label: "T-Shirts", href: "/products?category=kids&subcategory=t-shirts" },
          { label: "Hoodies & Sweatshirts", href: "/products?category=kids&subcategory=hoodies" },
          { label: "Jackets", href: "/products?category=kids&subcategory=jackets" },
          { label: "Pants & Shorts", href: "/products?category=kids&subcategory=pants" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Backpacks", href: "/products?category=kids&subcategory=backpacks" },
          { label: "Hats & Caps", href: "/products?category=kids&subcategory=hats" },
          { label: "Socks", href: "/products?category=kids&subcategory=socks" },
        ],
      },
    ],
    banner: {
      image: "",
      title: "PLAY HARD",
      subtitle: "Durable gear for active kids.",
      href: "/products?category=kids&sort=-createdAt",
    },
  },
};
