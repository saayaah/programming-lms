import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("courses/")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load courses.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading courses...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Programming Courses</h1>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id}>
            <h2>{course.title}</h2>

            <p>{course.description}</p>

            <p>Difficulty: {course.difficulty}</p>

            <Link to={`/courses/${course.id}`}>
              View Course
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Courses;