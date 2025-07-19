if (!self.define) {
    let e,
        i = {};
    const a = (a, s) => (
        (a = new URL(a + ".js", s).href),
        i[a] ||
            new Promise((i) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    ((e.src = a), (e.onload = i), document.head.appendChild(e));
                } else ((e = a), importScripts(a), i());
            }).then(() => {
                let e = i[a];
                if (!e) throw new Error(`Module ${a} didn’t register its module`);
                return e;
            })
    );
    self.define = (s, n) => {
        const o = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (i[o]) return;
        let c = {};
        const r = (e) => a(e, o),
            t = { module: { uri: o }, exports: c, require: r };
        i[o] = Promise.all(s.map((e) => t[e] || r(e))).then((e) => (n(...e), c));
    };
}
define(["./workbox-4754cb34"], function (e) {
    "use strict";
    (importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                { url: "/_next/app-build-manifest.json", revision: "d3dc55d322d88911253116f92521df6d" },
                { url: "/_next/static/8Ib9UQNP-SexppqIom2u9/_buildManifest.js", revision: "a4cf9692f75ffefd2dbf1f8502478d31" },
                { url: "/_next/static/8Ib9UQNP-SexppqIom2u9/_ssgManifest.js", revision: "b6652df95db52feb4daf4eca35380933" },
                { url: "/_next/static/chunks/1411.586c80a744a2e4bd.js", revision: "586c80a744a2e4bd" },
                { url: "/_next/static/chunks/1455-88ef0a91b87a10a7.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/164f4fb6-398e9375d697aef2.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/2001-c5e82b5c9e8ff531.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/2117-ab73ddb1cdaabb8d.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/2735-b114053f0bb3827a.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/2972-3f5f872420b09fcd.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/3969.092aefe9274acf1e.js", revision: "092aefe9274acf1e" },
                { url: "/_next/static/chunks/4663-ce8fbbf308b9218d.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/5203-b6fbf7caebda7b83.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/5566.b6624855c35164a4.js", revision: "b6624855c35164a4" },
                { url: "/_next/static/chunks/56-9815310c85ab6f50.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/5654-26d28b089a89364b.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/5698-8da52815144f4ccf.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/5854.d1a1e04a7a04a7b8.js", revision: "d1a1e04a7a04a7b8" },
                { url: "/_next/static/chunks/5878-0a70d038ded65a4f.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/6137-eaf7b6db0f76248f.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/6269-acbedb408f59d599.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/7006-7e3d28e726502302.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/7389-a7f77e3f65303106.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/7649-672cae6dbd092d15.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/7778-0277f43a396a74ca.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/8565-7fc3cfad2b1078a3.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/8575-8db4c585d546e80d.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/862-616a01b74c6fa113.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/8651-b4db74c3018c8d5f.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/9033-750860b55deed227.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/9915-48d2a1c617cc9572.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/ad2866b8.1fd5edbd6b1bba26.js", revision: "1fd5edbd6b1bba26" },
                { url: "/_next/static/chunks/app/(home)/layout-02a5ee78b5c67d07.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(home)/loading-99df79c72548b655.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(home)/page-291240dd682d25ad.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(private)/dashboard/address/page-f436195a59114a13.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/blogs/add-blog/page-a6eab3cbfcdc83ee.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/blogs/edit-blog/%5Burl%5D/page-b9c71d02f4a9798a.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                { url: "/_next/static/chunks/app/(private)/dashboard/blogs/page-e7da1558d15cc82d.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/change-password/page-416956de96f81bbb.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/edit-personal/page-30f3432d8239f44a.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/favorites/page-7755f7354435b7d2.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                { url: "/_next/static/chunks/app/(private)/dashboard/layout-80394498b1159f31.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(private)/dashboard/loading-7d49ff148af2d97e.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/notifications/page-c8fce0fc395c7a30.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/orders/%5Bid%5D/page-4830cb89f12c1da0.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                { url: "/_next/static/chunks/app/(private)/dashboard/orders/page-1d3475c01f2daa74.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(private)/dashboard/page-1a7bce755ef2e449.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/personal-info/page-ef3853484d170a89.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/products/add-product/page-e60c3eb7b5ad2cfd.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/products/edit-product/%5Bslug%5D/page-99ee976badc103f2.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/products/page-082af6fd735010a7.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                { url: "/_next/static/chunks/app/(private)/dashboard/profile/page-1f5ba830b45fa231.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/settings/page-01ff5ffae56f9f23.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                { url: "/_next/static/chunks/app/(private)/dashboard/support/page-0ff63b1522247ef3.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/users/%5Bid%5D/page-83d55fba1f6ae1d7.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                {
                    url: "/_next/static/chunks/app/(private)/dashboard/users/create-user/page-dcff0a201a83fd66.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                { url: "/_next/static/chunks/app/(private)/dashboard/users/page-0a0c5e0e9ca35bc5.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/auth/login/page-0ecc4e56daf3f17e.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/auth/register/page-3152a1476a1fd7e7.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/blogs/%5Bslug%5D/page-fdeb86977c2c1505.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/blogs/page-1ad97df7e2f720a2.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                {
                    url: "/_next/static/chunks/app/(public)/blogs/users/%5Bid%5D/page-0294ff1318197cb2.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                { url: "/_next/static/chunks/app/(public)/brands/%5Bname%5D/page-90293bdc1763aa21.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/carts/page-1de19a89d5dd827f.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/checkout/page-d774592ab1f8036d.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/compare/page-9e4ea3db83ec6536.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/layout-c7203518974617b5.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/loading-e5b9d4b4328f1525.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/payment/page-ab603bf7f19ce8ee.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                {
                    url: "/_next/static/chunks/app/(public)/products/%5Bslug%5D/%5B%5B...name%5D%5D/page-c0f44ff448811df1.js",
                    revision: "8Ib9UQNP-SexppqIom2u9",
                },
                { url: "/_next/static/chunks/app/(public)/products/page-9a710976598252a8.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/(public)/search/page-58afff6c45c609c4.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/_not-found/page-f7931a9da2ac4330.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/error-bce8f7cd3a54c53e.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/layout-9adf5bde64ceb3ed.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/loading-7725f3b69c78ceb7.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/app/not-found-62f388ac57f3d4cf.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/bc98253f.f10a81626b6284df.js", revision: "f10a81626b6284df" },
                { url: "/_next/static/chunks/f31aec94.67b97c3723af956d.js", revision: "67b97c3723af956d" },
                { url: "/_next/static/chunks/fd9d1056-1eaaf5cbd7513eb1.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/framework-56dfd39ab9a08705.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/main-100b8b5c4172ba3c.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/main-app-fec2a7562188f7c9.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/pages/_app-3c9ca398d360b709.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/pages/_error-cf5ca766ac8f493f.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/chunks/polyfills-42372ed130431b0a.js", revision: "846118c33b2c0e922d7b3a7676f81f6f" },
                { url: "/_next/static/chunks/webpack-f250f2fa00d1e2b3.js", revision: "8Ib9UQNP-SexppqIom2u9" },
                { url: "/_next/static/css/abf37bdbe3dfbc05.css", revision: "abf37bdbe3dfbc05" },
                { url: "/_next/static/css/d0490fbacd9cab90.css", revision: "d0490fbacd9cab90" },
                { url: "/_next/static/media/1b54c636b750b005-s.p.ttf", revision: "cb2ad2322140b8c86f1acb43710f9ad1" },
                { url: "/_next/static/media/1d22a303e4823781-s.p.ttf", revision: "bd26f02a2febca2229ccf2c4d37ee3f7" },
                { url: "/_next/static/media/2d1ff7140c4d101d-s.p.ttf", revision: "ff320f78af3a0fd44f2ee2993559fa9f" },
                { url: "/_next/static/media/404-page.1b824a56.svg", revision: "b478a18f743d13b55c3edeeff5e4217b" },
                { url: "/_next/static/media/add.b945d4b8.svg", revision: "f271319172a52990cba0ee0929b5365a" },
                { url: "/_next/static/media/android-launchericon-512-512.d2288684.png", revision: "c5466c21e72e4f34feb333d02511f5a3" },
                { url: "/_next/static/media/app-store.36c9673f.svg", revision: "aec77821dfcb6e1e64addc616e880c8e" },
                { url: "/_next/static/media/arrow.2cdeb10d.svg", revision: "490189c2d15ba08fef5e99b0784eef56" },
                { url: "/_next/static/media/b916d5a7944c70e5-s.p.ttf", revision: "20f2dc0a09e36bed1b999d5236ec4014" },
                { url: "/_next/static/media/bag.46f4a1fa.svg", revision: "36237c41101e54e2f6f9849c645cc401" },
                { url: "/_next/static/media/bee1d0d3bdeed0f7-s.p.ttf", revision: "e9908f05e5771638e40913309b784a17" },
                { url: "/_next/static/media/c539e137f560e1dc-s.p.ttf", revision: "8789622647008ae1b00f6a890b49916e" },
                { url: "/_next/static/media/cart-illustration.79d42525.svg", revision: "e1c656b3551b11e8fc1d797b3f28b904" },
                { url: "/_next/static/media/close.83aca5ac.svg", revision: "fc51ffb88f746204c507d9de912a9333" },
                { url: "/_next/static/media/empty-square.f0000bbe.svg", revision: "f6cfe700ac90d104d0fa95f23d3e00dd" },
                { url: "/_next/static/media/google-logo.c13b41a4.svg", revision: "ff06f978f42aa2a2211365bf869913a8" },
                { url: "/_next/static/media/google-play.b688bca5.svg", revision: "69a3cd14e2e83100aa48d988997898c8" },
                { url: "/_next/static/media/login-page.253d5821.svg", revision: "95ffc237075517e7e6e450044f00c869" },
                { url: "/_next/static/media/minus.1775d646.svg", revision: "68fdca36ff1383e93bc74bb046ca6a2e" },
                { url: "/_next/static/media/no-image.ec938c76.jpg", revision: "f03976171fec7b42252c542d07b80293" },
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
                        cacheWillUpdate: async ({ request: e, response: i, event: a, state: s }) =>
                            i && "opaqueredirect" === i.type
                                ? new Response(i.body, { status: 200, statusText: "OK", headers: i.headers })
                                : i,
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
                const i = e.pathname;
                return !i.startsWith("/api/auth/") && !!i.startsWith("/api/");
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
