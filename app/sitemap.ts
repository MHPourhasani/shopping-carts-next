import { RequestTypeEnum } from "@/interfaces/enums";
import { BannerInterface, BlogInterface, CategoryInterface, ProductInterface } from "@/interfaces/general";
import API from "@/utils/api";
import PATH from "@/utils/path";
import { get } from "@/utils/scripts/api";
import fs from "fs";
import path from "path";

const baseUrl = "https://mhp-shop.vercel.app";
const baseDir = "app";

function getAllFolders(dirPath: string) {
    let folders: string[] = [];

    const filesAndFolders = fs.readdirSync(dirPath);

    filesAndFolders.forEach((item) => {
        const fullPath = path.join(dirPath, item);
        if (fs.statSync(fullPath).isDirectory() && !item.startsWith("[")) {
            folders.push(fullPath);
            folders = folders.concat(getAllFolders(fullPath));
        }
    });

    return folders;
}

const getBanners = async () => {
    return get(API.banners.banners_list())
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
};

const getCategories = () => {
    return get(API.category.categories_list())
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
};

const getProducts = async () => {
    return get(API.product.products_list(RequestTypeEnum.SSR))
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
};

const getBlogs = async () => {
    try {
        const response = await fetch(API.blogs.blogs_list(), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        const { results } = await response.json();
        return results;
    } catch (error: any) {
        console.error(error);
    }
};

async function getRoutes() {
    const banners: BannerInterface[] = await getBanners();
    const categories: CategoryInterface[] = await getCategories();
    const products: ProductInterface[] = await getProducts();
    const blogs: BlogInterface[] = await getBlogs();

    const routesOfFolders = getAllFolders(baseDir)
        .map((folder) => folder.split("\\").join("/").replace(baseDir, "").replace("/(public)", ""))
        .filter((folder) => !folder.startsWith(PATH.profile.main()))
        .filter((folder) => !folder.startsWith("/api"))
        .filter((folder) => !folder.startsWith("/dashboard"))
        .filter((folder) => ![""].includes(folder));

    const routesOfBanners = banners.map((b) => PATH.singleBanner(b.name));
    const routesOfCategories = categories.map((c) => PATH.singleBrand(c.name.toLowerCase()));
    const routesOfProducts = products.map((p) => PATH.singleProduct(p._id.toString(), p.name));
    const routesOfBlogs = blogs.map((b) => PATH.singleBlog(b.link));

    const routes = [...routesOfFolders, ...routesOfBanners, ...routesOfCategories, ...routesOfProducts, ...routesOfBlogs];

    return [...new Set(routes)].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split("T")[0],
        changeFrequency: "weekly",
        priority: 1.0,
    }));
}

function sitemap() {
    return getRoutes();
}

export default sitemap;
