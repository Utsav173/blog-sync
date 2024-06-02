"use strict";exports.id=873,exports.ids=[873],exports.modules={64873:(e,s,t)=>{t.r(s),t.d(s,{default:()=>r});var d=t(9807),l=t(91512),o=t(82628),n=t(60561);let a=(0,o.default)(()=>t.e(75).then(t.bind(t,8075)),{loadableGenerated:{modules:["components\\CommentSec.tsx -> @/components/CreateComment"]}}),r=async({blogId:e})=>{await (0,l.sql)`CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    "blogId" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author TEXT,
    comment TEXT
  )`;let s=await (0,l.sql)(`SELECT * FROM comments WHERE "blogId" = '${e}' ORDER BY "createdAt" DESC`);return(0,d.jsxs)("div",{className:"p-4",children:[(0,d.jsxs)(n.Suspense,{fallback:d.jsx("div",{children:"Loading..."}),children:[d.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Comments"}),d.jsx(a,{blogId:e})]}),d.jsx("div",{children:s?.length>0&&s?.map(e=>d.jsxs("div",{className:"border border-gray-300 p-4 mb-4 rounded-lg prose-orange",children:[d.jsx("h3",{className:"text-xl font-bold mb-2",children:e.author}),d.jsx("p",{children:e.comment})]},e.id))})]})}}};