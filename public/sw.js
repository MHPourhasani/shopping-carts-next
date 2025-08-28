if (!self.define) {
    let e,
        n = {};
    const i = (i, s) => (
        (i = new URL(i + ".js", s).href),
        n[i] ||
            new Promise((n) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    ((e.src = i), (e.onload = n), document.head.appendChild(e));
                } else ((e = i), importScripts(i), n());
            }).then(() => {
                let e = n[i];
                if (!e) throw new Error(`Module ${i} didn’t register its module`);
                return e;
            })
    );
    self.define = (s, a) => {
        const c = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (n[c]) return;
        let r = {};
        const o = (e) => i(e, c),
            t = { module: { uri: c }, exports: r, require: o };
        n[c] = Promise.all(s.map((e) => t[e] || o(e))).then((e) => (a(...e), r));
    };
}
define(["./workbox-4754cb34"], function (e) {
    "use strict";
    (importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                { url: "/_next/app-build-manifest.json", revision: "b8e02d20d3fcce43f42d1f83c9358684" },
                { url: "/_next/static/chunks/1178-6baeb3994484c6e0.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/1411.586c80a744a2e4bd.js", revision: "586c80a744a2e4bd" },
                { url: "/_next/static/chunks/1455-88ef0a91b87a10a7.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/164f4fb6-398e9375d697aef2.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/174-37aa4126c9463a50.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/1802-8538a3751591fd46.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/2117-235825ca578f3422.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/2735-b36c5d1075639dab.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/2757-4bc829bb2698be12.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/2972-bebcaeaaf087ad3f.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/3013-05951f54bb2af24c.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/3408-8bfc05122bf26b36.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/3614-ebcc4ace469a78eb.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/3969.4005609b45e4ef55.js", revision: "4005609b45e4ef55" },
                { url: "/_next/static/chunks/4216-d264b79e54bdea3d.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/4815-89dcb1f84eb57d1c.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/5698-8da52815144f4ccf.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/5796-1b8026169d6debc1.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/5854.d1a1e04a7a04a7b8.js", revision: "d1a1e04a7a04a7b8" },
                { url: "/_next/static/chunks/5861-1ecfcb031ed9c30e.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/5878-0e040fb00e8d67fb.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/6137-eaf7b6db0f76248f.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/6496-d4261b5bd0cad105.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/7261-3d2da3f59738db56.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/7575-179ce1324abc317b.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/7617-ff726aa633091715.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/8210-39716e7940ed4ff9.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/8575-8db4c585d546e80d.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/8938-6498df2b8d7f2add.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/9344-09c637f1673996d1.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/9964-a9721a3b33934362.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/ad2866b8.1fd5edbd6b1bba26.js", revision: "1fd5edbd6b1bba26" },
                { url: "/_next/static/chunks/app/(home)/layout-6286cfee89f485a1.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(home)/loading-77b8bdd6af745b2d.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(home)/page-98e07a1c45bf08b8.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(private)/profile/address/page-b9163822f477da5f.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                {
                    url: "/_next/static/chunks/app/(private)/profile/blogs/add-post/page-4443936c59efe23c.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                {
                    url: "/_next/static/chunks/app/(private)/profile/blogs/edit-post/%5Bslug%5D/page-1dda5055c511ddad.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                { url: "/_next/static/chunks/app/(private)/profile/blogs/page-6cae69a5e7d69f88.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                {
                    url: "/_next/static/chunks/app/(private)/profile/change-password/page-6d7f22ee7c64a75e.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                {
                    url: "/_next/static/chunks/app/(private)/profile/edit-personal/page-45c61d96301d1491.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                { url: "/_next/static/chunks/app/(private)/profile/favorites/page-0e0904055b524cf3.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(private)/profile/layout-6c4bcfe749d74415.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(private)/profile/loading-0d01b7418e899a50.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                {
                    url: "/_next/static/chunks/app/(private)/profile/notifications/page-35e033659428b3e1.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                {
                    url: "/_next/static/chunks/app/(private)/profile/orders/%5Bid%5D/page-41655ee873eef0ab.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                { url: "/_next/static/chunks/app/(private)/profile/orders/page-aba8871172f0caaa.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(private)/profile/page-9d05cc1301e5ee5a.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                {
                    url: "/_next/static/chunks/app/(private)/profile/personal-info/page-cebece041cc851c9.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                {
                    url: "/_next/static/chunks/app/(private)/profile/products/add-product/page-79a52cd071eaff41.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                {
                    url: "/_next/static/chunks/app/(private)/profile/products/edit-product/%5Bslug%5D/page-dc68a637e2109359.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                { url: "/_next/static/chunks/app/(private)/profile/products/page-54c180b759ce9ad7.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(private)/profile/settings/page-6b871d75638dfb77.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(private)/profile/support/page-e6f33a171a778c2f.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                {
                    url: "/_next/static/chunks/app/(private)/profile/users/%5Bid%5D/page-bb2063b81daf206c.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                {
                    url: "/_next/static/chunks/app/(private)/profile/users/create-user/page-a22d9a1981e05b8a.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                { url: "/_next/static/chunks/app/(private)/profile/users/page-0a55d5d4c0af68a7.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/auth/login/page-3b88db4059460842.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/auth/register/page-5d423b74fed73e51.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/blogs/%5Bslug%5D/page-798b3775fa74d853.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/blogs/page-ba0fd8129085f4b0.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                {
                    url: "/_next/static/chunks/app/(public)/blogs/users/%5Bid%5D/page-d72686f4f2b2eaef.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                { url: "/_next/static/chunks/app/(public)/brands/%5Bname%5D/page-ec4cf5bc7639f74d.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/carts/page-dbedb02d4fef0c3b.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/checkout/page-6c1e9c5fec1f6a2d.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/layout-ba295e96145f90c3.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/loading-32b1faa5a35d37ef.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/payment/page-ab603bf7f19ce8ee.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                {
                    url: "/_next/static/chunks/app/(public)/products/%5Bslug%5D/%5B%5B...name%5D%5D/page-c92eef1e5906a69b.js",
                    revision: "f4l_nvKy9nutejUyOCF0W",
                },
                { url: "/_next/static/chunks/app/(public)/products/page-ad3f588329e401f6.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/(public)/search/page-f485efac7cd492a6.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/_not-found/page-28a09c390b287de8.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/error-2face3e435445126.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/layout-a01cd61451998b0d.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/loading-cebf53e2c74bb501.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/app/not-found-62f388ac57f3d4cf.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/bc98253f.f10a81626b6284df.js", revision: "f10a81626b6284df" },
                { url: "/_next/static/chunks/f31aec94.67b97c3723af956d.js", revision: "67b97c3723af956d" },
                { url: "/_next/static/chunks/fd9d1056-1eaaf5cbd7513eb1.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/framework-56dfd39ab9a08705.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/main-app-fec2a7562188f7c9.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/main-eb0ce07a0586dd25.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/pages/_app-3c9ca398d360b709.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/pages/_error-cf5ca766ac8f493f.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/chunks/polyfills-42372ed130431b0a.js", revision: "846118c33b2c0e922d7b3a7676f81f6f" },
                { url: "/_next/static/chunks/webpack-7276b18caf7c614d.js", revision: "f4l_nvKy9nutejUyOCF0W" },
                { url: "/_next/static/css/58d67ca3ac8da6d8.css", revision: "58d67ca3ac8da6d8" },
                { url: "/_next/static/css/abf37bdbe3dfbc05.css", revision: "abf37bdbe3dfbc05" },
                { url: "/_next/static/f4l_nvKy9nutejUyOCF0W/_buildManifest.js", revision: "a4cf9692f75ffefd2dbf1f8502478d31" },
                { url: "/_next/static/f4l_nvKy9nutejUyOCF0W/_ssgManifest.js", revision: "b6652df95db52feb4daf4eca35380933" },
                { url: "/_next/static/media/1b54c636b750b005-s.p.ttf", revision: "cb2ad2322140b8c86f1acb43710f9ad1" },
                { url: "/_next/static/media/1d22a303e4823781-s.p.ttf", revision: "bd26f02a2febca2229ccf2c4d37ee3f7" },
                { url: "/_next/static/media/2d1ff7140c4d101d-s.p.ttf", revision: "ff320f78af3a0fd44f2ee2993559fa9f" },
                { url: "/_next/static/media/404-page.1b824a56.svg", revision: "b478a18f743d13b55c3edeeff5e4217b" },
                { url: "/_next/static/media/android-launchericon-512-512.d2288684.png", revision: "c5466c21e72e4f34feb333d02511f5a3" },
                { url: "/_next/static/media/app-store.36c9673f.svg", revision: "aec77821dfcb6e1e64addc616e880c8e" },
                { url: "/_next/static/media/arrow.2cdeb10d.svg", revision: "490189c2d15ba08fef5e99b0784eef56" },
                { url: "/_next/static/media/b916d5a7944c70e5-s.p.ttf", revision: "20f2dc0a09e36bed1b999d5236ec4014" },
                { url: "/_next/static/media/bag.46f4a1fa.svg", revision: "36237c41101e54e2f6f9849c645cc401" },
                { url: "/_next/static/media/bee1d0d3bdeed0f7-s.p.ttf", revision: "e9908f05e5771638e40913309b784a17" },
                { url: "/_next/static/media/c539e137f560e1dc-s.p.ttf", revision: "8789622647008ae1b00f6a890b49916e" },
                { url: "/_next/static/media/close.83aca5ac.svg", revision: "fc51ffb88f746204c507d9de912a9333" },
                { url: "/_next/static/media/empty-square.f0000bbe.svg", revision: "f6cfe700ac90d104d0fa95f23d3e00dd" },
                { url: "/_next/static/media/google-logo.c13b41a4.svg", revision: "ff06f978f42aa2a2211365bf869913a8" },
                { url: "/_next/static/media/google-play.b688bca5.svg", revision: "69a3cd14e2e83100aa48d988997898c8" },
                { url: "/_next/static/media/login-page.253d5821.svg", revision: "95ffc237075517e7e6e450044f00c869" },
                { url: "/_next/static/media/not-images.51dd91b8.svg", revision: "98ff1ac2de23a962c384638ec26f432f" },
                { url: "/_next/static/media/notificationPage.e10f56a5.svg", revision: "24ed388d1725a778f5a611c51e69ce89" },
                { url: "/_next/static/media/receipt-page.83ea1c6f.svg", revision: "333a691a995873dd2df9f1c30454211d" },
                { url: "/_next/static/media/refresh.2ce85f61.svg", revision: "856837b3e3f68fcb9bd19078f51f6706" },
                { url: "/_next/static/media/signup-page.a980abc2.svg", revision: "d5784544d19dcc17909378365a5d19fa" },
                { url: "/_next/static/media/successfully-order.ebe58277.png", revision: "4eac82b028655b27fe29d2a02d04097c" },
                { url: "/_next/static/media/user.0e414fbd.svg", revision: "a47f7271ec452b18b4bdd12f48e8b841" },
                { url: "/icons/android/android-launchericon-144-144.png", revision: "a54032327642d4d6651a690b3b2133f3" },
                { url: "/icons/android/android-launchericon-192-192.png", revision: "95b7f314915649a8effbf19902379004" },
                { url: "/icons/android/android-launchericon-48-48.png", revision: "f1a8383e438d9f8394bbd3e92ede2938" },
                { url: "/icons/android/android-launchericon-512-512.png", revision: "c5466c21e72e4f34feb333d02511f5a3" },
                { url: "/icons/android/android-launchericon-72-72.png", revision: "59a6cdd7a2131a5c407078bbbfc52adb" },
                { url: "/icons/android/android-launchericon-96-96.png", revision: "2a8fce5a184b5e237b859fba5fb6624a" },
                { url: "/icons/ios/100.png", revision: "6180a08712cf6da97b1a40e1856d740d" },
                { url: "/icons/ios/1024.png", revision: "f33d02bf4d75157a7c264156c5273fd6" },
                { url: "/icons/ios/114.png", revision: "131325684643dcd5c2f549c81f8925a3" },
                { url: "/icons/ios/120.png", revision: "2c4a5ade9b92257c7800f43c52394c3c" },
                { url: "/icons/ios/128.png", revision: "ae039e76e37f129fa6feadde75f0e514" },
                { url: "/icons/ios/144.png", revision: "a54032327642d4d6651a690b3b2133f3" },
                { url: "/icons/ios/152.png", revision: "0fb10a33e6934dfe1fa3a82687aac1c6" },
                { url: "/icons/ios/16.png", revision: "d74ed059c184a59ae57316e196a41e6c" },
                { url: "/icons/ios/167.png", revision: "20dc9649633323b49a6bd475eb0f5c14" },
                { url: "/icons/ios/180.png", revision: "5aa1f0c346226d6ddf8a6b066669d9f0" },
                { url: "/icons/ios/192.png", revision: "95b7f314915649a8effbf19902379004" },
                { url: "/icons/ios/20.png", revision: "ee5b77b859054eb7919205a7f13e676b" },
                { url: "/icons/ios/256.png", revision: "8da2476687a2fe994ebd0124ffda5969" },
                { url: "/icons/ios/29.png", revision: "7662c8dee378f9b0ad13fef639e2633d" },
                { url: "/icons/ios/32.png", revision: "22b3a2cac78568c630e679928588f549" },
                { url: "/icons/ios/40.png", revision: "199b7f36b8b346d5339b69dc6a6b0022" },
                { url: "/icons/ios/50.png", revision: "4636f116be49c68a4d5c74a40127d6cb" },
                { url: "/icons/ios/512.png", revision: "c5466c21e72e4f34feb333d02511f5a3" },
                { url: "/icons/ios/57.png", revision: "df0747847b37f9919c02773b413622f5" },
                { url: "/icons/ios/58.png", revision: "215265edff866d43efa0fdcf78cc4cb4" },
                { url: "/icons/ios/60.png", revision: "caa1d0cf772690427ee5393b13cbf155" },
                { url: "/icons/ios/64.png", revision: "90661deeb9c89404f02d62ab66bc8bcd" },
                { url: "/icons/ios/72.png", revision: "59a6cdd7a2131a5c407078bbbfc52adb" },
                { url: "/icons/ios/76.png", revision: "a74008177d1ecc03d1e5f4b640e8b599" },
                { url: "/icons/ios/80.png", revision: "3f111176eb6c28e09b76353117616c73" },
                { url: "/icons/ios/87.png", revision: "c8f0003d740950e87cdf53ac242b773c" },
                { url: "/icons/windows11/LargeTile.scale-100.png", revision: "2ff96d73475b15d6e7af50f33c405010" },
                { url: "/icons/windows11/LargeTile.scale-125.png", revision: "cc142db6be803407c4326f1b697f9409" },
                { url: "/icons/windows11/LargeTile.scale-150.png", revision: "2b4ed0525c4f9b5491a2744fe4684402" },
                { url: "/icons/windows11/LargeTile.scale-200.png", revision: "a6b20cc78da82304d5cb918515a1f45e" },
                { url: "/icons/windows11/LargeTile.scale-400.png", revision: "771e8dafaefabddb5fc6182099b4f281" },
                { url: "/icons/windows11/SmallTile.scale-100.png", revision: "e5e5dc9fc7a2502b37ac945da9829e47" },
                { url: "/icons/windows11/SmallTile.scale-125.png", revision: "e65ea59dc5904b8e457ac9c765ccc1b8" },
                { url: "/icons/windows11/SmallTile.scale-150.png", revision: "26a33b6d2633c8e32f1dcd7b2dc5abb4" },
                { url: "/icons/windows11/SmallTile.scale-200.png", revision: "fe91e02f4c973aa90b4fd7bc15b95390" },
                { url: "/icons/windows11/SmallTile.scale-400.png", revision: "aa4db50b1198be2607e8b6613ec2f104" },
                { url: "/icons/windows11/SplashScreen.scale-100.png", revision: "67c271875db3f4ef588e45b18d7e180b" },
                { url: "/icons/windows11/SplashScreen.scale-125.png", revision: "73a9579534866fdc84d71d6328f0b282" },
                { url: "/icons/windows11/SplashScreen.scale-150.png", revision: "d9eeeb32e8c478a6cae607346b039fda" },
                { url: "/icons/windows11/SplashScreen.scale-200.png", revision: "8b092fa06aa9b6db88a54e6bcdbb281a" },
                { url: "/icons/windows11/SplashScreen.scale-400.png", revision: "2150718028b0c5578e6856b14987a90e" },
                { url: "/icons/windows11/Square150x150Logo.scale-100.png", revision: "f549038ac36900cd27db89ebe2a8a278" },
                { url: "/icons/windows11/Square150x150Logo.scale-125.png", revision: "1693371b05b133fdad25b6cb924a0d04" },
                { url: "/icons/windows11/Square150x150Logo.scale-150.png", revision: "c180c9195f7257de335b71cc342794b3" },
                { url: "/icons/windows11/Square150x150Logo.scale-200.png", revision: "9920d0a2f489350ecb965f8b448be66c" },
                { url: "/icons/windows11/Square150x150Logo.scale-400.png", revision: "884eb611febb7977064768e37d5ec5a5" },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
                    revision: "16254869e49a9188b904c3196d37149b",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
                    revision: "153f52c65fd189751bd471b3e241badb",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
                    revision: "94a12c30df2c3f3e6b08ce7febd568f2",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
                    revision: "c97479639bcb774c6297fe97a4d273e7",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
                    revision: "279f5566a7e6df2e965beb033d17278e",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
                    revision: "f1f48cf22aa80690d7b81b383214955f",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
                    revision: "114d857abb6780299e693ef52cf14556",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
                    revision: "b1ad81e856d50c6918884da1a452a8e6",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
                    revision: "1129a6c7a4fbdcda774d35f53d97b05d",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
                    revision: "69d02f20e25b22c34c357c260c604ef9",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
                    revision: "7a6482f00d6afb03ecd3521cd8ffaaaa",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
                    revision: "b0118ad2cae0301d0ef3d2f5d896c47c",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
                    revision: "10298b04b94b187cc6726dbe8b68abaf",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
                    revision: "19cc049f2b6bca9b04b340f633995a82",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
                    revision: "c11e8eb92e2e3afdae1807ebfef3ca8f",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
                    revision: "16254869e49a9188b904c3196d37149b",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
                    revision: "153f52c65fd189751bd471b3e241badb",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
                    revision: "94a12c30df2c3f3e6b08ce7febd568f2",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
                    revision: "c97479639bcb774c6297fe97a4d273e7",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
                    revision: "279f5566a7e6df2e965beb033d17278e",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
                    revision: "f1f48cf22aa80690d7b81b383214955f",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
                    revision: "114d857abb6780299e693ef52cf14556",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
                    revision: "b1ad81e856d50c6918884da1a452a8e6",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
                    revision: "1129a6c7a4fbdcda774d35f53d97b05d",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
                    revision: "69d02f20e25b22c34c357c260c604ef9",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
                    revision: "7a6482f00d6afb03ecd3521cd8ffaaaa",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
                    revision: "b0118ad2cae0301d0ef3d2f5d896c47c",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
                    revision: "10298b04b94b187cc6726dbe8b68abaf",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
                    revision: "19cc049f2b6bca9b04b340f633995a82",
                },
                {
                    url: "/icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
                    revision: "c11e8eb92e2e3afdae1807ebfef3ca8f",
                },
                { url: "/icons/windows11/Square44x44Logo.scale-100.png", revision: "1129a6c7a4fbdcda774d35f53d97b05d" },
                { url: "/icons/windows11/Square44x44Logo.scale-125.png", revision: "e4e9562fb33b0f2955c56451d5043ec5" },
                { url: "/icons/windows11/Square44x44Logo.scale-150.png", revision: "8f0ea7e2f18ab525e82c3b2b0c339194" },
                { url: "/icons/windows11/Square44x44Logo.scale-200.png", revision: "88308145bd983ae4f06891db1a53f356" },
                { url: "/icons/windows11/Square44x44Logo.scale-400.png", revision: "e7b42869f9997c4f8cfdde7ac00566df" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-16.png", revision: "16254869e49a9188b904c3196d37149b" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-20.png", revision: "153f52c65fd189751bd471b3e241badb" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-24.png", revision: "94a12c30df2c3f3e6b08ce7febd568f2" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-256.png", revision: "c97479639bcb774c6297fe97a4d273e7" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-30.png", revision: "279f5566a7e6df2e965beb033d17278e" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-32.png", revision: "f1f48cf22aa80690d7b81b383214955f" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-36.png", revision: "114d857abb6780299e693ef52cf14556" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-40.png", revision: "b1ad81e856d50c6918884da1a452a8e6" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-44.png", revision: "1129a6c7a4fbdcda774d35f53d97b05d" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-48.png", revision: "69d02f20e25b22c34c357c260c604ef9" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-60.png", revision: "7a6482f00d6afb03ecd3521cd8ffaaaa" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-64.png", revision: "b0118ad2cae0301d0ef3d2f5d896c47c" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-72.png", revision: "10298b04b94b187cc6726dbe8b68abaf" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-80.png", revision: "19cc049f2b6bca9b04b340f633995a82" },
                { url: "/icons/windows11/Square44x44Logo.targetsize-96.png", revision: "c11e8eb92e2e3afdae1807ebfef3ca8f" },
                { url: "/icons/windows11/StoreLogo.scale-100.png", revision: "4636f116be49c68a4d5c74a40127d6cb" },
                { url: "/icons/windows11/StoreLogo.scale-125.png", revision: "8132cd07574f0e24f08fadd3ca2e30ee" },
                { url: "/icons/windows11/StoreLogo.scale-150.png", revision: "fff024c95fd913de66db9b93a9771b86" },
                { url: "/icons/windows11/StoreLogo.scale-200.png", revision: "6180a08712cf6da97b1a40e1856d740d" },
                { url: "/icons/windows11/StoreLogo.scale-400.png", revision: "c3b53854d742ac1a26e15c7a9ba71481" },
                { url: "/icons/windows11/Wide310x150Logo.scale-100.png", revision: "a65f1d8549619a6387a5cdec337cc8b8" },
                { url: "/icons/windows11/Wide310x150Logo.scale-125.png", revision: "02797d0a0a0fbef5aec179b43e3382ff" },
                { url: "/icons/windows11/Wide310x150Logo.scale-150.png", revision: "fcfacf6ce77b3ded58f62d3261bfe6be" },
                { url: "/icons/windows11/Wide310x150Logo.scale-200.png", revision: "67c271875db3f4ef588e45b18d7e180b" },
                { url: "/icons/windows11/Wide310x150Logo.scale-400.png", revision: "8b092fa06aa9b6db88a54e6bcdbb281a" },
                { url: "/images/png/desktop-screenshot1.png", revision: "8ffab30582b66ad374e170635afa9b84" },
                { url: "/images/png/desktop-screenshot2.png", revision: "c151d1c13b2d18db9bdac3c31c8409ac" },
                { url: "/images/png/splash_screens/10.2__iPad_portrait.png", revision: "f0768349218868b7d0de34ddd5c6c81f" },
                { url: "/images/png/splash_screens/10.5__iPad_Air_portrait.png", revision: "d3c1444d018905a28626c0ada6981922" },
                { url: "/images/png/splash_screens/10.9__iPad_Air_portrait.png", revision: "8fdaa62f111eff3b521960677f0cef47" },
                { url: "/images/png/splash_screens/11__iPad_Pro_M4_portrait.png", revision: "f6ab40366ad921cc80345ba3aa6949a0" },
                {
                    url: "/images/png/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
                    revision: "e56a209f896cc921a75cb8d02d212602",
                },
                { url: "/images/png/splash_screens/12.9__iPad_Pro_portrait.png", revision: "22c938233ca1f6e45562d1817c9206f3" },
                { url: "/images/png/splash_screens/13__iPad_Pro_M4_portrait.png", revision: "f570cd0fa7638262591fc9c70612485c" },
                {
                    url: "/images/png/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
                    revision: "8fd4a0178421c6aaa8754d599daafc25",
                },
                { url: "/images/png/splash_screens/8.3__iPad_Mini_portrait.png", revision: "dc5fb3aca542943478ded7c015b51deb" },
                {
                    url: "/images/png/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
                    revision: "162a7e3ace5a4a0dbe20c628b9a442f3",
                },
                {
                    url: "/images/png/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
                    revision: "3c6255865d22e1cdc2faf4aa689d7ad5",
                },
                { url: "/images/png/splash_screens/iPhone_11__iPhone_XR_portrait.png", revision: "25ea59fce2fec3d17f4f2273347694b9" },
                {
                    url: "/images/png/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
                    revision: "c0bb46732429428c57d9b97007da1def",
                },
                {
                    url: "/images/png/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
                    revision: "6b2a0ac2f6d16b724fa04c90dacf0836",
                },
                {
                    url: "/images/png/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
                    revision: "99f4faa54c39c74781876e534eff9ffd",
                },
                {
                    url: "/images/png/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
                    revision: "3781066fad06fbb3171809762503a909",
                },
                { url: "/images/png/splash_screens/iPhone_16_Pro_Max_portrait.png", revision: "82ccbd97437b6d363da5d7a15620d0f0" },
                { url: "/images/png/splash_screens/iPhone_16_Pro_portrait.png", revision: "08f9ff5fd3f082fae1904433f6030a9a" },
                {
                    url: "/images/png/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
                    revision: "ded90ea0ee197abbacb7e8b00a31325c",
                },
                {
                    url: "/images/png/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
                    revision: "84c4ca4069e10f6f874f2787c0370220",
                },
                {
                    url: "/images/png/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
                    revision: "4d776b21806f22b0194a182bf9678e3e",
                },
                { url: "/images/png/successfully-order.png", revision: "4eac82b028655b27fe29d2a02d04097c" },
                { url: "/manifest.json", revision: "f2cd9dc12ed1f09fa64d76a82b26a2cb" },
            ],
            { ignoreURLParametersMatching: [] },
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({ request: e, response: n, event: i, state: s }) =>
                            n && "opaqueredirect" === n.type
                                ? new Response(n.body, { status: 200, statusText: "OK", headers: n.headers })
                                : n,
                    },
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                const n = e.pathname;
                return !n.startsWith("/api/auth/") && !!n.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                return !e.pathname.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "others",
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
            }),
            "GET",
        ));
});
