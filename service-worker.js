if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return a[e]||(i=new Promise((async i=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},i=(i,a)=>{Promise.all(i.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(i)};self.define=(i,s,c)=>{a[i]||(a[i]=Promise.resolve().then((()=>{let a={};const b={uri:location.origin+i.slice(1)};return Promise.all(s.map((i=>{switch(i){case"exports":return a;case"module":return b;default:return e(i)}}))).then((e=>{const i=c(...e);return a.default||(a.default=i),a}))})))}}define("./service-worker.js",["./workbox-648c07bb"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"12b98e07b5216293eb0d269bbb53d2d2"},{url:"500.html",revision:"a48126225a7fd8df5105e4753928abe4"},{url:"about/index.html",revision:"1be8bc8d4074b3fbd0b678c4097aa1e4"},{url:"archives/2021/08/index.html",revision:"b0455628317a94e194c2d90a63c5a2cb"},{url:"archives/2021/index.html",revision:"814df7d09da40c8768472903b06a57f3"},{url:"archives/2022/02/index.html",revision:"1d2d4351cae9c40d06296e7340343ca1"},{url:"archives/2022/08/index.html",revision:"1bc6559b0a456f34561024047d228645"},{url:"archives/2022/index.html",revision:"9f0bc60627fd42da85c5e7c46c7a80a7"},{url:"archives/2023/08/index.html",revision:"26b6bf261d49051830730474fac01ae2"},{url:"archives/2023/08/page/2/index.html",revision:"5c0027ddfee3e0223fbf87a54b512afc"},{url:"archives/2023/index.html",revision:"4714ea47f4763a8e08e25b9df0e73563"},{url:"archives/2023/page/2/index.html",revision:"9499e79e61e46e3552bb6dcb2551077c"},{url:"archives/index.html",revision:"384cc8ecaf84b784b0e1150e7ef19140"},{url:"archives/page/2/index.html",revision:"64a46eae5b0355994078110d07f09fff"},{url:"categories/Blog記事/index.html",revision:"0b8f6d27cb7315322c86570f70219b04"},{url:"categories/index.html",revision:"721a9a89ca6db477972c383e5fcc6807"},{url:"categories/往人權學者的路/index.html",revision:"882ea0c281498241fbf42c301c30b903"},{url:"categories/政治學小白/index.html",revision:"709148d87083817ea87ff8f7060e4682"},{url:"categories/敬自由/index.html",revision:"30d8784c66507320500f08376b4a2ed4"},{url:"categories/會議隨記/index.html",revision:"a5e56522d205855c4c8e7a7608dda7a1"},{url:"categories/與人有關的工作/index.html",revision:"86e2b0fb60fee34adf212da2dd34dbd3"},{url:"categories/資訊工程屍/index.html",revision:"2b266a117523a1183d40585cffcbe176"},{url:"css/hbe.style.css",revision:"a8bc819e01e001d3bc6ae03a2afad957"},{url:"css/main.css",revision:"8e16b4b76a0fba5c29311dfa781c54ab"},{url:"css/style.css",revision:"e13341c745352853291d492e35d8876f"},{url:"dist/APlayer.min.css",revision:"fbe994054426fadb2dff69d824c5c67a"},{url:"dist/APlayer.min.js",revision:"8f1017e7a73737e631ff95fa51e4e7d7"},{url:"dist/music.js",revision:"2157b302c045b43ad56fa1b4ea40fc9e"},{url:"images/algolia_logo.svg",revision:"fd40b88ac5370a5353a50b8175c1f367"},{url:"images/apple-touch-icon-next.png",revision:"fce961f0bd3cd769bf9c605ae6749bc0"},{url:"images/avatar.gif",revision:"7a2fe6b906600a9354cece6d9ced2992"},{url:"images/bg.jpg",revision:"311d54469b882cd46407bfa7012230d1"},{url:"images/bitcoin.png",revision:"a4dac8740ea845ff39a5ba0fb13edb24"},{url:"images/cc-by-nc-nd.svg",revision:"1c681acc4a150e7236254c464bb5a797"},{url:"images/cc-by-nc-sa.svg",revision:"12b4b29e8453be5b7828b524d3feabce"},{url:"images/cc-by-nc.svg",revision:"dd9cfe99ed839a4a548114f988d653f4"},{url:"images/cc-by-nd.svg",revision:"2d80546af20128215dc1e23ef42d06c2"},{url:"images/cc-by-sa.svg",revision:"c696b3db81cbbfba32f66c1dc88b909a"},{url:"images/cc-by.svg",revision:"6c4f8422b3725cb9f26b6c00e95fc88b"},{url:"images/cc-zero.svg",revision:"79deee77a07fcb79ff680ac0125eacb9"},{url:"images/favicon-16x16-next.png",revision:"b8975923a585dbaa8519a6068e364947"},{url:"images/favicon-32x32-next.png",revision:"5a029563fe3214c96f68b46556670ea1"},{url:"images/icons/GooglePlayStore.png",revision:"0d33504bb0a255f11fed9a0737d9a934"},{url:"images/icons/icon-128x128.png",revision:"97882b77dcb43563f8e2ad3680cf2daa"},{url:"images/icons/icon-144x144.png",revision:"7dc7dd34e3dfbef15955e404c8739e79"},{url:"images/icons/icon-64x64.png",revision:"3e08be0bc5508e58ec05915045efc166"},{url:"images/icons/icon.png",revision:"0c837df053a1186d6f9c9a9c0614fadd"},{url:"images/icons/iTunesArtwork.png",revision:"0d33504bb0a255f11fed9a0737d9a934"},{url:"images/logo.svg",revision:"ddad9027e42111ccd5b466bc18188970"},{url:"images/paypal.png",revision:"a7f1bb51f66392b36bcf64c77f6f0ca3"},{url:"images/quote-l.svg",revision:"1238a4baccd02c6025ec85b58f4282d4"},{url:"images/quote-r.svg",revision:"85787c6fa27965c81f7be70252b43bed"},{url:"index.html",revision:"c580297266f126bacbc5734cef828329"},{url:"izooto.html",revision:"9cb491cb19e3bd47929cd5f8bf59ac41"},{url:"js/algolia-search.js",revision:"eef725f1fcfecc74f39864dc414f14a1"},{url:"js/bookmark.js",revision:"9631924f730be981fe8f8c14eb2c0afe"},{url:"js/local-search.js",revision:"326384c0ac108beb082a3527c874858b"},{url:"js/motion.js",revision:"e8073e03493feb145528c4bdbe613d70"},{url:"js/next-boot.js",revision:"3e28949cf979b211ee729596d0c5743f"},{url:"js/schemes/muse.js",revision:"00003a337eaddaf997e3a3ca2b9958e6"},{url:"js/schemes/pisces.js",revision:"a6b493cad5467017b961202302b25c91"},{url:"js/tw_cn.js",revision:"03051392cd1967791588e449130c271e"},{url:"js/utils.js",revision:"f39e1889c51f1ad467e12f6be25c1f94"},{url:"lib/anime.min.js",revision:"864a144dbbc956381a47679ec57ab06c"},{url:"lib/fancybox/README.html",revision:"573b580d0ed6f66d7b5da890ffd9fbf6"},{url:"lib/fancybox/source/jquery.fancybox.css",revision:"caf7c408bb13e802cc3566b94f6c6d8d"},{url:"lib/fancybox/source/jquery.fancybox.min.css",revision:"a2d42584292f64c5827e8b67b1b38726"},{url:"lib/fancybox/source/jquery.fancybox.min.js",revision:"49a6b4d019a934bcf83f0c397eba82d8"},{url:"lib/fancybox/source/jquery.fancybox.pack.js",revision:"b63c7cca1b5e4bd57bd854c444b895c9"},{url:"lib/font-awesome/css/font-awesome.css",revision:"c495654869785bc3df60216616814ad1"},{url:"lib/font-awesome/css/font-awesome.min.css",revision:"269550530cc127b6aa5a35925a7de6ce"},{url:"lib/font-awesome/fonts/fontawesome-webfont.eot",revision:"674f50d287a8c48dc19ba404d20fe713"},{url:"lib/font-awesome/fonts/fontawesome-webfont.woff",revision:"fee66e712a8a08eef5805a46892932ad"},{url:"lib/font-awesome/fonts/fontawesome-webfont.woff2",revision:"af7ae505a9eed503f8b8e6982036873e"},{url:"lib/hbe.js",revision:"4a7e94ac7224adfce4b0572ca5c57fef"},{url:"lib/pace/pace-theme-barber-shop.min.css",revision:"e8dc66cf2d88abc25fbc89b8a0529abb"},{url:"lib/pace/pace-theme-big-counter.min.css",revision:"db2b8fe31e60f19021545277d2f6e05e"},{url:"lib/pace/pace-theme-bounce.min.css",revision:"ad954aa0bace4b213eeb19d6e89a0bda"},{url:"lib/pace/pace-theme-center-atom.min.css",revision:"8f6bc803acefc6f93afc98fb38201456"},{url:"lib/pace/pace-theme-center-circle.min.css",revision:"93c72298781226a80a9c66b27b21a57d"},{url:"lib/pace/pace-theme-center-radar.min.css",revision:"f0099bdd1cd42e9476bd7abc417c0328"},{url:"lib/pace/pace-theme-center-simple.min.css",revision:"eddff4756dbf21dbbff1c543bd894dde"},{url:"lib/pace/pace-theme-corner-indicator.min.css",revision:"776826157cb28ac1ee5e78771292b9ba"},{url:"lib/pace/pace-theme-fill-left.min.css",revision:"965859b39001da08e1e92327fe3d8e12"},{url:"lib/pace/pace-theme-flash.min.css",revision:"aab39b436e1fa0fdc51df06f2d53c38a"},{url:"lib/pace/pace-theme-flat-top.min.css",revision:"8f55d5d3e9b4e2aba049efb6dd4e861c"},{url:"lib/pace/pace-theme-loading-bar.min.css",revision:"4e05877f1f9efb9c1e7dd75cb78c764f"},{url:"lib/pace/pace-theme-mac-osx.min.css",revision:"29ae030ceaa8158352c5472218375b91"},{url:"lib/pace/pace-theme-material.min.css",revision:"13d3271ff84c55fad0427b586e574a44"},{url:"lib/pace/pace-theme-minimal.min.css",revision:"f48f04d370993b55a2745e548cc82743"},{url:"lib/pace/pace.min.js",revision:"24d2d5e3e331c4efa3cda1e1851b31a7"},{url:"lib/pace/README.html",revision:"73215b7249695a641fccb6a7fa5358e9"},{url:"lib/pjax/CHANGELOG.html",revision:"a394d10d1bccb4b3a3fe0efe32b5259e"},{url:"lib/pjax/example/example.js",revision:"693e793ab23257ba91ba22933172555d"},{url:"lib/pjax/example/forms.html",revision:"e507d705e53d43c1c9aef175bae113a6"},{url:"lib/pjax/example/index.html",revision:"4dcb35fd31bae63db2cf2581d203d791"},{url:"lib/pjax/example/page2.html",revision:"80399e1319c9aafde8bbd2d50e14dfbe"},{url:"lib/pjax/example/page3.html",revision:"678c434ed2008519caf19b1cef2c6794"},{url:"lib/pjax/index.js",revision:"3ef2531a2c7a333d0f7a232dee4ef9e8"},{url:"lib/pjax/lib/abort-request.js",revision:"4bdc59dae5e5b29ee8484873804d1f8c"},{url:"lib/pjax/lib/eval-script.js",revision:"43601f1c12e67f29197cd09304078739"},{url:"lib/pjax/lib/events/off.js",revision:"a32b62a0efb066d81d1aac58c90fb3bd"},{url:"lib/pjax/lib/events/on.js",revision:"a77e3da8fecd8a92550152189c6c6986"},{url:"lib/pjax/lib/events/trigger.js",revision:"bfb14e27ee61ce0fd3ac52af0726c663"},{url:"lib/pjax/lib/execute-scripts.js",revision:"8ff50f47e6593e4c060d6fabc09a0b7f"},{url:"lib/pjax/lib/foreach-els.js",revision:"cc92a783c79bf1a9c29cdbf152b104c5"},{url:"lib/pjax/lib/foreach-selectors.js",revision:"59e887fda038986c2f6418d281e3beb3"},{url:"lib/pjax/lib/is-supported.js",revision:"3a3ac8e8cba4b4e4d29a7894a4d06177"},{url:"lib/pjax/lib/parse-options.js",revision:"0287c332b98fb1ebe2e6c2793ddcc85e"},{url:"lib/pjax/lib/proto/attach-form.js",revision:"e976eb2a5bdc97c6237876bd88f6cbdb"},{url:"lib/pjax/lib/proto/attach-link.js",revision:"3671625d0900e7c630b6785c85527e84"},{url:"lib/pjax/lib/proto/handle-response.js",revision:"05556fa655572885181e9caa2295d08c"},{url:"lib/pjax/lib/proto/log.js",revision:"40caea5f9f971381fc5204416d06dfcc"},{url:"lib/pjax/lib/proto/parse-element.js",revision:"e2f6b3d683bb6bd3d7d3acc2bfbb93dd"},{url:"lib/pjax/lib/send-request.js",revision:"77e4c002534f12d39817326a372db618"},{url:"lib/pjax/lib/switches-selectors.js",revision:"2246ad5dd990e5eefbe6e6c11ea7d59d"},{url:"lib/pjax/lib/switches.js",revision:"ef5ed5e542dbb93be1a5c1b72d8b63db"},{url:"lib/pjax/lib/uniqueid.js",revision:"b47ca3fddf0a67c9cc5f0c7dcb56f974"},{url:"lib/pjax/lib/util/clone.js",revision:"43f6c73e044eebcdd6d3088075b17f90"},{url:"lib/pjax/lib/util/contains.js",revision:"ec87af9c5172cb2872b764997bd07c6f"},{url:"lib/pjax/lib/util/extend.js",revision:"07c19e94a35ea2f0ce68163b42f7ddd4"},{url:"lib/pjax/lib/util/noop.js",revision:"8c3b460cdce5a650e3369c63bfccb8e5"},{url:"lib/pjax/lib/util/update-query-string.js",revision:"4cf0e29017b579458950b03985fa4b91"},{url:"lib/pjax/pjax.js",revision:"eb7c2c878aaf7e40958477eaf9362fd1"},{url:"lib/pjax/pjax.min.js",revision:"5c48eff0fe69a3b607b51c597eb33951"},{url:"lib/pjax/README.html",revision:"6889a40290e5a811eae97efc043c8629"},{url:"lib/pjax/tests/lib/abort-request.js",revision:"92fa92a19a0f515f3b615ea6a63511b8"},{url:"lib/pjax/tests/lib/eval-scripts.js",revision:"162f3f8090aa2d9b232539750306fcae"},{url:"lib/pjax/tests/lib/events.js",revision:"0f8b44484c6a6ee7106b6133e8cee88a"},{url:"lib/pjax/tests/lib/execute-scripts.js",revision:"2bdfd4dbcc3ef5f76538ad7e1217b4a5"},{url:"lib/pjax/tests/lib/foreach-els.js",revision:"86e9dbb444e0b632ee944cfa827037f5"},{url:"lib/pjax/tests/lib/foreach-selectors.js",revision:"fee45340269c39818ea3a051cda931ab"},{url:"lib/pjax/tests/lib/is-supported.js",revision:"50b479ea4bb3d042d90db8700eebcee1"},{url:"lib/pjax/tests/lib/parse-options.js",revision:"30f8242970dfb2a059de4ffb68594070"},{url:"lib/pjax/tests/lib/proto/attach-form.js",revision:"1208c9d6f04612dbdc9b6b1a4c104226"},{url:"lib/pjax/tests/lib/proto/attach-link.js",revision:"f8ad9b826c96e283497e4962e329e14a"},{url:"lib/pjax/tests/lib/proto/handle-response.js",revision:"39cdab7ddcf315ddfcea09068c26b93c"},{url:"lib/pjax/tests/lib/proto/parse-element.js",revision:"aa0b73c0a2ed1b8846933f8040d8c1ba"},{url:"lib/pjax/tests/lib/send-request.js",revision:"263fc784b516f2a7abc12b72de951aee"},{url:"lib/pjax/tests/lib/switch-selectors.js",revision:"95d4a0b423d581e86daf60d94e3b0c49"},{url:"lib/pjax/tests/lib/switches.js",revision:"a6df597650eaad447047430e643f12ea"},{url:"lib/pjax/tests/lib/uniqueid.js",revision:"d69cb621ac17b33d7d5ea90c3b12834d"},{url:"lib/pjax/tests/lib/util/clone.js",revision:"7fb4097648cc8b252399ea1f6445caa9"},{url:"lib/pjax/tests/lib/util/contains.js",revision:"7d0d2235138f9fa6f5694176c6aea149"},{url:"lib/pjax/tests/lib/util/extend.js",revision:"487ff1562ba80eed3fb90e97831105c1"},{url:"lib/pjax/tests/lib/util/noop.js",revision:"59e3460d4f796c9222b11de27dc4b177"},{url:"lib/pjax/tests/lib/util/update-query-string.js",revision:"e9d8c6590f7a49acf8cfbc8c2e6fb662"},{url:"lib/pjax/tests/setup.js",revision:"dcf8474136e082831fbbb3c2c5f583e0"},{url:"lib/reading_progress/reading_progress.js",revision:"4532bad6f74d2abbad00ae166ced99a5"},{url:"lib/reading_progress/reading_progress.min.js",revision:"abbebb6c477b3a170cb6aea8fc2915e9"},{url:"lib/reading_progress/README.html",revision:"fd569321df54b6d2c21f1ecddc7d4216"},{url:"lib/velocity/velocity.min.js",revision:"c1b8d079c7049879838d78e0b389965e"},{url:"lib/velocity/velocity.ui.min.js",revision:"444faf512fb24d50a5dec747cbbe39bd"},{url:"live2dw/assets/moc/chitose.2048/texture_00.png",revision:"792d7ce14129275aa940798f3fcad987"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"music/cover/一事無成的偉大.jpg",revision:"9a4495b938b58323fd625d2782e643aa"},{url:"music/cover/不完美小孩.jpg",revision:"ef30e93643550bb08a3dcef6cc8b873b"},{url:"music/cover/聲聲慢.jpg",revision:"919474d335e1c633e908ef1267fd5be5"},{url:"nodeppt/dist/css/chunk-vendors.4e4765ff.css",revision:"bc25c7cac8bf76850c3199e0d27809fd"},{url:"nodeppt/dist/img/swipe.svg",revision:"38b4a5b3b7bdd9ee7a91c2b24f3d97aa"},{url:"nodeppt/dist/js/chunk-vendors.js",revision:"ad055881d751631fffdb71d1ed9fedcd"},{url:"nodeppt/dist/js/slide.js",revision:"d40b783a91e5a98fef9463cafff0c240"},{url:"nodeppt/dist/slide.html",revision:"d6de3b7e2d850fe58334267f843029f9"},{url:"page/2/index.html",revision:"7860bf38822d0c48fa9ed16b9505fef5"},{url:"post/2023-Taiwan-White-Paper-LGBT-Policies.html",revision:"c75363f29f39f48300f20e528d8a831f"},{url:"post/CAT-in-Taiwan.html",revision:"ded277af4b68090199f4c83626d5fab9"},{url:"post/child-right-no-26-draft.html",revision:"ba187ab4d4c366f7468f3492b3dc7d75"},{url:"post/fifi_point.html",revision:"1483eced95a8564cb3dd51c037674212"},{url:"post/filed-back.html",revision:"8c5d9863fbb5332b93be8e97a7cec191"},{url:"post/Freshman Review - Your Own Way.html",revision:"77d25286b4e5c1937c1e40287f9dc374"},{url:"post/hello-world.html",revision:"15c5b3da6e8f6a75005687ac7ad108aa"},{url:"post/hexo-web-rss-push.html",revision:"de5a2803d82d51593e943383cbe705c4"},{url:"post/Imbalance-Perspective-in-International-Relations.html",revision:"df9d29ccb86f48ddc03ab2aa4802c313"},{url:"post/korea-jp-timeline.html",revision:"5cbf1cda853290f8cfe82bdcf043b04f"},{url:"post/Lao Yan Dongfei--Facing the real world.html",revision:"b360ec625fa55599d71cf300bf9e1142"},{url:"post/new-speech.html",revision:"32d8532077a49f508d20cdbedf0aa433"},{url:"post/Presidential-Election-Continental-Policy-Cooperation-vs-Conflict.html",revision:"f9c0a0cfc7101f6aeb3161dc857ec49d"},{url:"post/Taiwan-US-China-ship.html",revision:"9f63f5ad5c7180d3b9803df8efdcf8da"},{url:"post/the-right-scoop.html",revision:"b5aedabb2a2ef503e026a37745978d90"},{url:"post/Universalism-Right-Protection-in-Practice.html",revision:"e8dd4f4e2b4ff2bc4a0548713afb4aed"},{url:"post/War-Peace-Based-MPT.html",revision:"d866e270067643270d51335366c25ae7"},{url:"post/write-first-time.html",revision:"de87a352ccaae7dbbe7411d1fb69b6d0"},{url:"post/year2-book-list.html",revision:"b09efeaae3522a0dd24442806a9bf7a8"},{url:"tags/AI生成/index.html",revision:"f9bbe292c905344aea764ab8f4bcdd2e"},{url:"tags/Fiti/index.html",revision:"91fc42d9abbe552ce7be4c81315c2378"},{url:"tags/Hexo/index.html",revision:"5da4d30adbbaa2deed792a178a7535b7"},{url:"tags/index.html",revision:"a6e29c454d01fc2bfcd3b9dfd93adcae"},{url:"tags/一般性意見書/index.html",revision:"10ce6e0307b5e9ec347fea4711ddb969"},{url:"tags/中國/index.html",revision:"aee0da856c0ef0e39319e3603e583d97"},{url:"tags/修正的權力轉移理論/index.html",revision:"cda71f01777856c5efb77391c401f645"},{url:"tags/兒童公約/index.html",revision:"f51d5972f6d940f710afbda5e66430e1"},{url:"tags/兒童與環境/index.html",revision:"6fcd820f63012afa93fbf4231d1fc022"},{url:"tags/公投入聯/index.html",revision:"66a7bb87b06a06e48b434d73efe3b96f"},{url:"tags/冷戰和平/index.html",revision:"7fc247bca375e0b45912c305ca418f05"},{url:"tags/原住民/index.html",revision:"7920a4ee71871f522029011559ba34a3"},{url:"tags/台灣文學史/index.html",revision:"43e52496aaf757757be8c3f80d14dc93"},{url:"tags/台灣的對中政策/index.html",revision:"edc7a3c5c68aaa6f67e258cf4c9293f3"},{url:"tags/台灣電影/index.html",revision:"2c48333d3e08734c19101b21df0a78e9"},{url:"tags/同志友善環境/index.html",revision:"55c67566caa9777dd3f060b6a378fb35"},{url:"tags/同志友善醫療/index.html",revision:"fa7b71183f46ba75aac160c525b67e48"},{url:"tags/同志平權/index.html",revision:"0df9bcd8f66d341d6ffa6d4b5336a702"},{url:"tags/國民健康政策白皮書/index.html",revision:"a1b066b8086faba2bbd509add55db008"},{url:"tags/國際政治/index.html",revision:"50d8385371ff95288c7cac949eb2c91f"},{url:"tags/國際關係/index.html",revision:"42a93214d68800d676be08fbb7343081"},{url:"tags/失衡觀點/index.html",revision:"bb6b8f9091d1e0375b08ad4c4f85793a"},{url:"tags/學習/index.html",revision:"ee07875568037ca79dba47a41728b5fb"},{url:"tags/小白教學/index.html",revision:"9b9e69a0011875f7659c5fa126d4083c"},{url:"tags/就業歧視/index.html",revision:"ef544774554b7ec380127f4fecd59520"},{url:"tags/後冷戰和平之/index.html",revision:"2a2cf4fc92644ccfa1739048a4e32a2c"},{url:"tags/微感測系統/index.html",revision:"b999f916f2c743f86b207f221bbe371b"},{url:"tags/性-別平權/index.html",revision:"74e32a0ae0ad0af5d8c54b81cf28fe20"},{url:"tags/托福/index.html",revision:"9bc3b748924b0baf67f88ad0bad08aa9"},{url:"tags/拜登政府/index.html",revision:"c56015d50cb320e75991dd71cb0376c8"},{url:"tags/政策白皮書/index.html",revision:"2f56575ac4cf615c80a1dfbd40cc50ed"},{url:"tags/新現實主義/index.html",revision:"d412e5be617fec108626b2e216f059ad"},{url:"tags/新聞學/index.html",revision:"0d39508675f07dbae02a174b9cb6a091"},{url:"tags/普同主義/index.html",revision:"a6a0a75c78bf62807c54aad8410ae8d2"},{url:"tags/東奧/index.html",revision:"825a6bf9bc2f9645d3edfd6d4d98f457"},{url:"tags/權益保障/index.html",revision:"6fccc2ae44583c249c250797b7115ce7"},{url:"tags/民主/index.html",revision:"fd9d562e4778e673907cc02f42bda392"},{url:"tags/特殊選材/index.html",revision:"7397f3f083d7778387b7fba746799ccd"},{url:"tags/環境/index.html",revision:"1216da526592d3fd080b88be0f92582f"},{url:"tags/生活/index.html",revision:"819169acdac74304e48065ff9ec8786d"},{url:"tags/社會學/index.html",revision:"1f500c975a6b69e139cf443ac784be5b"},{url:"tags/紀念/index.html",revision:"eb50017cc3d4d8243dec62d326bcf952"},{url:"tags/紀錄/index.html",revision:"071626e58b16a084e52c8ba5b60f65f8"},{url:"tags/總統選舉/index.html",revision:"3f41f98dd197c81d4d79112deb78f8e0"},{url:"tags/美、中、台關係/index.html",revision:"f17fb1fe195d47f74fe8394a8f3e2121"},{url:"tags/美國單極論/index.html",revision:"db35d516e392f810be834854e4db9aa5"},{url:"tags/自己的路/index.html",revision:"ca99d2cc32bbc0ac6961cb861478615e"},{url:"tags/自由/index.html",revision:"bb4bb6a379d32422c4d6a7d156a03bea"},{url:"tags/被中國牆文備份/index.html",revision:"a9b795bd39c18ea9ca91fec3f902a860"},{url:"tags/課程回顧/index.html",revision:"aef54fe45af29eb118fe78c06724d3c4"},{url:"tags/論文摘要/index.html",revision:"e3facfeee90ed4a3ca7da70c75d3ac19"},{url:"tags/身心障礙/index.html",revision:"478704b2f3ed473cee463fa2a6f46a27"},{url:"tags/軟體開發、AI同溫層/index.html",revision:"07d2e62fd3936cf6634b9a8eeddaba64"},{url:"tags/轉型正義/index.html",revision:"184dd13cc317be07b1a756da84c8708f"},{url:"tags/選舉合作或衝突/index.html",revision:"db0da9b1b98ae6626cc90e3bf57c28f0"},{url:"tags/音樂製作/index.html",revision:"428c6139a6fe9370cda01887323e592a"},{url:"tags/點台灣/index.html",revision:"6b5c3634d2524e7b52f85af26821cafd"}],{})}));
//# sourceMappingURL=service-worker.js.map
