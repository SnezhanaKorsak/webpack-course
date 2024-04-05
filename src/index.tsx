import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./components/App";

const AboutPage = lazy(() => import("@/pages/about"));
const ShopPage = lazy(() => import("@/pages/shop"));

const root = document.getElementById('root');

if(!root) {
    throw new Error('root not found')
}

const container = createRoot(root);

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "/about",
            element: <Suspense fallback={'...Loading'}><AboutPage/></Suspense>
        },
        {
            path: "/shop",
            element: <Suspense fallback={'...Loading'}><ShopPage/></Suspense>
        }
      ],
    },
]);

container.render(
    <RouterProvider router={router} />
)