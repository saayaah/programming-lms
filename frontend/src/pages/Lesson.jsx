import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function Lesson() {
  const { courseId, lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`lessons/${lessonId}/`)
      .then((response) => {
        setLesson(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load lesson.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lessonId]);

  if (loading) {
    return <h2>Loading lesson...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <Link to={`/courses/${courseId}`}>
        ← Back to Course
      </Link>

      <h1>{lesson.title}</h1>

      <div>
        {lesson.content}
      </div>

      {lesson.video_url && (
        <p>
          <a
            href={lesson.video_url}
            target="_blank"
            rel="noreferrer"
          >
            Watch Video
          </a>
        </p>
      )}

      <button>
        Mark as Complete
      </button>
    </div>
  );
}

export default Lesson;