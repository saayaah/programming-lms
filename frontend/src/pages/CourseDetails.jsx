import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`courses/${id}/`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load course.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading course...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>{course.title}</h1>

      <p>{course.description}</p>

      <p>Difficulty: {course.difficulty}</p>

      <h2>Course Content</h2>

      {course.modules.map((module) => (
        <div key={module.id}>
          <h3>
            {module.order}. {module.title}
          </h3>

          <p>{module.description}</p>

          <ul>
            {module.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  to={`/courses/${course.id}/lessons/${lesson.id}`}
                >
                  {lesson.order}. {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CourseDetails;