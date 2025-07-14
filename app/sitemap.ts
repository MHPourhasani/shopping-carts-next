import { IBanner, ICategory } from "@/interfaces/general";
import API from "@/shared/libs/api/endpoints";
import PATH from "@/shared/utils/path";
import fs from "fs";
import path from "path";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import { IPaginatedResponse } from "@/shared/interfaces";
import { get } from "@/shared/libs/api/axios";

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
    const data = await get<IBanner[]>(API.banners.banners_list());
    return data;
};

const getCategories = async () => {
    const data = await get<ICategory[]>(API.category.categories_list());
    return data;
};

const getProducts = async () => {
    const data = await get<IPaginatedResponse<IProduct[]>>(API.product.products());
    return data.results;
};

const getBlogs = async () => {
    try {
        const response = await fetch(API.blogs.posts(), {
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
    const banners = await getBanners();
    const categories = await getCategories();
    const products = await getProducts();
    const blogs = await getBlogs();

    const routesOfFolders = getAllFolders(baseDir)
        .map((folder) => folder.split("\\").join("/").replace(baseDir, "").replace("/(public)", ""))
        .filter((folder) => !folder.startsWith(PATH.dashboard.main()))
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
