import { useState } from "react";
import {
  GraduationCap, Play, CheckCircle, Lock, Clock, Award,
  Star, Users, ChevronRight, BookOpen
} from "lucide-react";
import { BackButton } from "../components/BackButton";

const courses = [
  {
    id: 1,
    title: "Introduction to Nutrition Survey Methods",
    desc: "Learn the fundamentals of national nutrition surveys including sampling, questionnaire design, and field protocols.",
    duration: "4h 30min",
    modules: 8,
    enrolled: 1240,
    rating: 4.8,
    progress: 100,
    status: "completed",
    category: "Foundation",
    certified: true,
  },
  {
    id: 2,
    title: "Anthropometric Measurement Techniques",
    desc: "Hands-on training on proper measurement of weight, height, MUAC, and other nutritional indicators in children and adults.",
    duration: "3h 15min",
    modules: 6,
    enrolled: 980,
    rating: 4.9,
    progress: 65,
    status: "in_progress",
    category: "Technical",
    certified: false,
  },
  {
    id: 3,
    title: "E-Nutrition Platform — Enumerator Training",
    desc: "Complete guide to using the E-Nutrition mobile app for field data collection, offline sync, and quality control.",
    duration: "2h 00min",
    modules: 5,
    enrolled: 2100,
    rating: 4.7,
    progress: 0,
    status: "not_started",
    category: "Platform",
    certified: false,
  },
  {
    id: 4,
    title: "Data Quality and Validation",
    desc: "Best practices for ensuring data accuracy, handling outliers, and passing validation checks.",
    duration: "2h 45min",
    modules: 6,
    enrolled: 640,
    rating: 4.6,
    progress: 0,
    status: "locked",
    category: "Advanced",
    certified: false,
  },
  {
    id: 5,
    title: "Nutrition Analytics and Report Interpretation",
    desc: "Understanding Z-scores, malnutrition indicators, and how to interpret regional nutrition data for policy decisions.",
    duration: "5h 00min",
    modules: 10,
    enrolled: 420,
    rating: 4.8,
    progress: 0,
    status: "locked",
    category: "Advanced",
    certified: false,
  },
];

const quizQuestions = [
  {
    q: "At what age range is stunting most commonly assessed using height-for-age Z-scores?",
    options: ["0–59 months", "5–10 years", "10–15 years", "All ages"],
    correct: 0,
  },
  {
    q: "A child with a height-for-age Z-score below -2 is classified as:",
    options: ["Overweight", "Stunted", "Wasted", "Normal"],
    correct: 1,
  },
  {
    q: "What does MUAC stand for?",
    options: ["Mid-Upper Arm Circumference", "Measurement Unit for Age Calculation", "Multiple Underweight Age Criteria", "Malnutrition Under Age Criteria"],
    correct: 0,
  },
];

export function Training() {
  const [activeTab, setActiveTab] = useState<"courses" | "quiz" | "certificates">("courses");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const score = quizSubmitted
    ? quizQuestions.filter((q, i) => answers[i] === q.correct).length
    : 0;

  const statusColor = (status: string) => {
    if (status === "completed") return "text-green-600 bg-green-50";
    if (status === "in_progress") return "text-blue-600 bg-blue-50";
    if (status === "locked") return "text-gray-400 bg-gray-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-gray-900 text-xl font-bold">Training & Certification</h1>
          <p className="text-gray-500 text-sm mt-0.5">LMS platform for enumerators and field researchers</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">Your Progress:</div>
          <div className="text-sm font-bold" style={{ color: "#1E3A8A" }}>1/5 Completed</div>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#eff6ff" }}>
            <GraduationCap size={22} style={{ color: "#1E3A8A" }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-800">Learning Path: Field Enumerator Certification</span>
              <span className="text-xs font-semibold text-gray-600">20% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: "20%", background: "#1E3A8A" }} />
            </div>
            <div className="text-xs text-gray-400 mt-1">1 of 5 required courses completed · 1 certificate earned</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["courses", "quiz", "certificates"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "courses" ? "📚 Courses" : tab === "quiz" ? "📝 Quiz" : "🏆 Certificates"}
          </button>
        ))}
      </div>

      {activeTab === "courses" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className={`bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow ${
              course.status === "locked" ? "opacity-70" : "cursor-pointer"
            } border-gray-100`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#eff6ff", color: "#1E3A8A" }}>
                      {course.category}
                    </span>
                    {course.certified && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-50 text-yellow-700 flex items-center gap-0.5">
                        <Award size={10} /> Certified
                      </span>
                    )}
                    {course.status === "locked" && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500 flex items-center gap-0.5">
                        <Lock size={10} /> Locked
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{course.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 flex-wrap">
                <span className="flex items-center gap-1"><Clock size={10} /> {course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen size={10} /> {course.modules} modules</span>
                <span className="flex items-center gap-1"><Users size={10} /> {course.enrolled.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Star size={10} className="text-yellow-400" /> {course.rating}</span>
              </div>

              {course.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-700">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${course.progress}%`,
                        background: course.progress === 100 ? "#10B981" : "#1E3A8A"
                      }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => course.status !== "locked" && setActiveTab("quiz")}
                disabled={course.status === "locked"}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                style={{
                  background: course.status === "locked" ? "#f3f4f6" : course.status === "completed" ? "#f0fdf4" : "#1E3A8A",
                  color: course.status === "locked" ? "#9ca3af" : course.status === "completed" ? "#166534" : "white",
                }}
              >
                {course.status === "locked" ? (
                  <><Lock size={13} /> Prerequisites Required</>
                ) : course.status === "completed" ? (
                  <><CheckCircle size={13} /> Completed — Review</>
                ) : course.status === "in_progress" ? (
                  <><Play size={13} /> Continue Learning</>
                ) : (
                  <><Play size={13} /> Start Course</>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={16} style={{ color: "#1E3A8A" }} />
              <h3 className="font-bold text-gray-900">Module Quiz: Anthropometric Measurements</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Answer all questions to complete the assessment. Minimum passing score: 70%</p>

            {quizQuestions.map((question, qi) => (
              <div key={qi} className="mb-5">
                <div className="text-sm font-medium text-gray-900 mb-2.5">
                  {qi + 1}. {question.q}
                </div>
                <div className="space-y-2">
                  {question.options.map((opt, oi) => {
                    const isSelected = answers[qi] === oi;
                    const isCorrect = quizSubmitted && oi === question.correct;
                    const isWrong = quizSubmitted && isSelected && oi !== question.correct;

                    return (
                      <button
                        key={oi}
                        onClick={() => !quizSubmitted && setAnswers({ ...answers, [qi]: oi })}
                        disabled={quizSubmitted}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm border transition-all ${
                          isCorrect ? "border-green-500 bg-green-50 text-green-800" :
                          isWrong ? "border-red-400 bg-red-50 text-red-800" :
                          isSelected ? "border-blue-500 bg-blue-50 text-blue-800" :
                          "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                            isCorrect ? "border-green-500 bg-green-500" :
                            isWrong ? "border-red-400 bg-red-400" :
                            isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}>
                            {(isSelected || isCorrect) && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          {opt}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {quizSubmitted ? (
              <div className={`p-4 rounded-xl text-center ${score >= 2 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <div className="text-xl font-bold mb-1" style={{ color: score >= 2 ? "#166534" : "#991b1b" }}>
                  {score}/{quizQuestions.length} Correct ({Math.round((score / quizQuestions.length) * 100)}%)
                </div>
                <div className={`text-sm font-medium ${score >= 2 ? "text-green-700" : "text-red-700"}`}>
                  {score >= 2 ? "🎉 Passed! Certificate will be generated." : "❌ Not Passed. Please review and retake."}
                </div>
                {score >= 2 && (
                  <button onClick={() => setActiveTab("certificates")} className="mt-3 px-4 py-2 text-sm text-white rounded-lg" style={{ background: "#1E3A8A" }}>
                    View Certificate →
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(answers).length < quizQuestions.length}
                className="w-full py-2.5 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50"
                style={{ background: "#1E3A8A" }}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === "certificates" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border-2 shadow-md p-6 max-w-2xl mx-auto" style={{ borderColor: "#1E3A8A" }}>
            <div className="text-center">
              <div className="flex justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: "#1E3A8A" }}>EN</div>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Certificate of Completion</div>
              <h2 className="text-xl font-bold" style={{ color: "#1E3A8A" }}>Introduction to Nutrition Survey Methods</h2>
              <div className="my-4 border-t border-b border-gray-100 py-4">
                <div className="text-gray-500 text-sm">This certifies that</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">Juan Dela Cruz</div>
                <div className="text-gray-500 text-sm mt-1">has successfully completed the course with a score of 92%</div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-4">
                <div>
                  <div className="font-medium text-gray-600">Date Issued</div>
                  <div>April 10, 2026</div>
                </div>
                <div className="text-center">
                  <Award size={28} className="mx-auto mb-1 text-yellow-500" />
                  <div className="font-medium text-gray-600">Verified</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-600">Certificate ID</div>
                  <div className="font-mono">CERT-EN-2026-0041</div>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 text-sm text-white rounded-lg" style={{ background: "#1E3A8A" }}>
                Download Certificate (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
