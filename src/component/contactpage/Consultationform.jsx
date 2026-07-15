import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";

import contactData from "./contactData";
import { formReveal, buttonHover } from "./contactVariants";
import axiosInstance from "../../api/axiosInstance";

let timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

let inputClasses =
  "block w-full rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-[#C8A96A] placeholder:text-[#999]";

function ConsultationForm() {
  let { form } = contactData;

  let [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectType: "",
    service: "",
    budget: "",
    date: "",
    time: "",
    message: "",
  });

  let [submitting, setSubmitting] = useState(false);
  let [submitted, setSubmitted] = useState(false);
  let [error, setError] = useState("");

  function handleChange(e) {
    let { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await axiosInstance.post("/consultation", {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        projectType: values.projectType,
        service: values.service,
        budget: values.budget,
        preferredDate: values.date,
        preferredTime: values.time,
        message: values.message,
      });

      setSubmitted(true);
      setValues({
        fullName: "",
        email: "",
        phone: "",
        projectType: "",
        service: "",
        budget: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      variants={formReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="consultation"
    >
      <h2 className="mb-2 font-serif text-3xl text-[#111111] md:text-4xl">{form.title}</h2>
      <div className="mb-8 h-px w-14 bg-[#C8A96A]" />

      {submitted ? (
        <div className="flex flex-col items-center rounded-2xl border border-[#E8E2D9] bg-[#F8F5F0] px-6 py-16 text-center">
          <CheckCircle2 size={40} className="mb-4 text-[#C8A96A]" />
          <h3 className="mb-2 font-serif text-2xl text-[#111111]">Request Received</h3>
          <p className="max-w-sm text-sm leading-6 text-[#666]">
            Thank you for reaching out! We've received your consultation request
            and will be in touch within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm font-medium text-[#C8A96A] underline"
          >
            Submit another request
          </button>
        </div>
      ) : (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className={inputClasses}
            />
          </Field>

          <Field label="Email Address" required>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Phone Number" required>
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className={inputClasses}
            />
          </Field>

          <Field label="Project Type" required>
            <select name="projectType" value={values.projectType} onChange={handleChange} required className={inputClasses}>
              <option value="" disabled>Select project type</option>
              {form.projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Service Needed" required>
          <select name="service" value={values.service} onChange={handleChange} required className={inputClasses}>
            <option value="" disabled>Select services</option>
            {form.services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Budget Range (Optional)">
            <select name="budget" value={values.budget} onChange={handleChange} className={inputClasses}>
              <option value="" disabled>Select budget range</option>
              {form.budgets.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </Field>

          <Field label="Preferred Date">
            <div className="relative">
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                className={`${inputClasses} pr-10`}
              />
              <Calendar size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#999]" />
            </div>
          </Field>
        </div>

        <Field label="Preferred Time">
          <select name="time" value={values.time} onChange={handleChange} className={inputClasses}>
            <option value="" disabled>Select time</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Tell us about your project" required>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Share details about your project, space, style preferences, etc."
            required
            rows={4}
            className={`${inputClasses} resize-none`}
          />
        </Field>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] py-4 text-sm font-semibold uppercase tracking-[1px] text-white transition hover:bg-[#C8A96A] hover:text-black disabled:opacity-60"
        >
          {submitting ? "Submitting..." : form.button}
          <ArrowRight size={16} />
        </motion.button>
      </form>
      )}
    </motion.div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#111111]">
        {label} {required && <span className="text-[#C8A96A]">*</span>}
      </span>
      {children}
    </label>
  );
}

export default ConsultationForm;