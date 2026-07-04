import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext, ACTIONS } from "../context/AppContext";
import "./WorkoutForm.css";

const WORKOUT_TYPES = [
  "Running",
  "Cycling",
  "Swimming",
  "Weight Training",
  "HIIT",
  "Yoga",
  "Walking",
  "Other",
];

const today = new Date().toISOString().split("T")[0];

export default function WorkoutForm() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    duration: "",
    date: today,
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  if (!state.currentUser) {
    return (
      <div className="form-page">
        <p className="not-logged">Please log in to add a workout.</p>
      </div>
    );
  }

  function validate() {
    const errs = {};
    if (!form.type) errs.type = "Please select a workout type.";
    if (!form.duration) errs.duration = "Duration is required.";
    else if (isNaN(Number(form.duration)) || Number(form.duration) <= 0)
      errs.duration = "Duration must be a positive number.";
    if (!form.date) errs.date = "Date is required.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    dispatch({
      type: ACTIONS.ADD_WORKOUT,
      payload: {
        type: form.type,
        duration: Number(form.duration),
        date: form.date,
        notes: form.notes.trim(),
      },
    });
    setSuccess(true);
    setTimeout(() => navigate("/"), 800);
  }

  return (
    <div className="form-page">
      <div className="form-card glass-card">
        <div className="form-header">
          <span className="form-icon">➕</span>
          <h1 className="form-title">Log a Workout</h1>
          <p className="form-subtitle">Keep the streak going 💪</p>
        </div>

        {success && (
          <div className="success-banner">
            ✅ Workout added! Redirecting…
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="type">Workout Type</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className={errors.type ? "input-error" : ""}
            >
              <option value="">Select a type…</option>
              {WORKOUT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type && (
              <span className="field-error">{errors.type}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                id="duration"
                type="number"
                name="duration"
                min="1"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 45"
                className={errors.duration ? "input-error" : ""}
              />
              {errors.duration && (
                <span className="field-error">{errors.duration}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                max={today}
                className={errors.date ? "input-error" : ""}
              />
              {errors.date && (
                <span className="field-error">{errors.date}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="How did it feel? Any personal bests?"
              rows={3}
            />
          </div>

          <button type="submit" className="auth-submit">
            Save Workout
          </button>
        </form>
      </div>
    </div>
  );
}
