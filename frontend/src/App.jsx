import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/courses">Courses</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Courses />} />

        <Route path="/courses" element={<Courses />} />

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        <Route
          path="/courses/:courseId/lessons/:lessonId"
          element={<Lesson />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;