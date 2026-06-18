import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import type { Language } from "./components/data/storyType";

import HomePage from "./pages/HomePage";
import StoriesPage from "./pages/StoriesPage";
import StoryDetailsPage from "./pages/StoryDetailsPage";

export default function App() {
  const [lang, setLang] = useState<Language>("en");

  return (
    <MainLayout
      lang={lang}
      setLang={setLang}
    >
      <Routes>

        <Route
          path="/"
          element={<HomePage lang={lang} />}
        />

        <Route
          path="/stories"
          element={<StoriesPage lang={lang} />}
        />

        <Route
          path="/story/:id"
          element={<StoryDetailsPage lang={lang} />}
        />

      </Routes>
    </MainLayout>
  );
}