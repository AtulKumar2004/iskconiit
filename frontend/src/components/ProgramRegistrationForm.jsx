import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";

const programTypes = [
  "Spiritual Session (Gita & Bhagavatam)",
  "Prasadam Request",
  "House Program",
  "Mentorship",
  "Invitation Program",
];

const schema = z.object({
  programType: z.enum(programTypes, { required_error: "Please select a program type" }),
  fullName: z.string().min(3, "Name must be at least 3 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),

  // Dynamic Fields (Made optional here, validated in superRefine)
  sessionType: z.string().optional(),
  preferredMode: z.string().optional(),
  occupation: z.string().optional(),
  message: z.string().optional(),

  participants: z.coerce.number().optional(),
  eventDate: z.string().optional(),
  deliveryAddress: z.string().optional(),
  occasion: z.string().optional(),

  preferredDate: z.string().optional(),
  completeAddress: z.string().optional(),
  attendees: z.coerce.number().optional(),
  requirement: z.string().optional(),

  areasOfGuidance: z.array(z.string()).optional(),

  invitationType: z.string().optional(),
  institutionName: z.string().optional(),
  audienceSize: z.coerce.number().optional(),
  proposedDate: z.string().optional(),
  venueAddress: z.string().optional(),
  programDetails: z.string().optional(),
}).superRefine((data, ctx) => {
  const isFutureDate = (dateString) => new Date(dateString) > new Date();

  if (data.programType === "Spiritual Session (Gita & Bhagavatam)") {
    if (!data.sessionType) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["sessionType"], message: "Required" });
    if (!data.preferredMode) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["preferredMode"], message: "Required" });
    if (!data.occupation) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["occupation"], message: "Required" });
  }

  if (data.programType === "Prasadam Request") {
    if (!data.participants || data.participants < 1 || data.participants > 1000) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["participants"], message: "Must be between 1 and 1000" });
    }
    if (!data.eventDate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["eventDate"], message: "Required" });
    } else if (!isFutureDate(data.eventDate)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["eventDate"], message: "Must be a future date" });
    }
    if (!data.deliveryAddress || data.deliveryAddress.length < 5) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["deliveryAddress"], message: "Required" });
    if (!data.occasion) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["occasion"], message: "Required" });
  }

  if (data.programType === "House Program") {
    if (!data.preferredDate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["preferredDate"], message: "Required" });
    } else if (!isFutureDate(data.preferredDate)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["preferredDate"], message: "Must be a future date" });
    }
    if (!data.completeAddress || data.completeAddress.length < 5) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["completeAddress"], message: "Required" });
    if (!data.attendees || data.attendees < 1) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["attendees"], message: "Required" });
    if (!data.requirement) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["requirement"], message: "Required" });
  }

  if (data.programType === "Mentorship") {
    if (!data.occupation) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["occupation"], message: "Required" });
    if (!data.areasOfGuidance || data.areasOfGuidance.length === 0) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["areasOfGuidance"], message: "Select at least one" });
    if (!data.preferredMode) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["preferredMode"], message: "Required" });
  }

  if (data.programType === "Invitation Program") {
    if (!data.invitationType) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["invitationType"], message: "Required" });
    if (!data.institutionName) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["institutionName"], message: "Required" });
    if (!data.audienceSize || data.audienceSize < 1) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["audienceSize"], message: "Required" });
    if (!data.proposedDate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["proposedDate"], message: "Required" });
    } else if (!isFutureDate(data.proposedDate)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["proposedDate"], message: "Must be a future date" });
    }
    if (!data.venueAddress || data.venueAddress.length < 5) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["venueAddress"], message: "Required" });
    if (!data.programDetails || data.programDetails.length < 10) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["programDetails"], message: "Provide more details" });
  }
});

const InputField = ({ label, name, type = "text", register, errors, placeholder }) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-semibold text-[#2a1b22] mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white/50 px-4 py-2 text-sm text-[#2a1b22] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${errors[name] ? 'border-red-500' : 'border-[#4A1F2D]/20'}`}
        rows="3"
      />
    ) : (
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white/50 px-4 py-2 text-sm text-[#2a1b22] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${errors[name] ? 'border-red-500' : 'border-[#4A1F2D]/20'}`}
      />
    )}
    {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]?.message}</p>}
  </div>
);

const SelectField = ({ label, name, options, register, errors }) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-semibold text-[#2a1b22] mb-1">{label}</label>
    <select
      {...register(name)}
      className={`w-full rounded-lg border bg-white/50 px-4 py-2 text-sm text-[#2a1b22] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${errors[name] ? 'border-red-500' : 'border-[#4A1F2D]/20'}`}
    >
      <option value="">Select...</option>
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]?.message}</p>}
  </div>
);

export default function ProgramRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      areasOfGuidance: []
    }
  });

  const selectedProgramType = watch("programType");
  const areasOfGuidanceWatch = watch("areasOfGuidance") || [];

  const handleCheckboxChange = (area) => {
    const current = getValues("areasOfGuidance") || [];
    if (current.includes(area)) {
      setValue("areasOfGuidance", current.filter((a) => a !== area), { shouldValidate: true });
    } else {
      setValue("areasOfGuidance", [...current, area], { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Extract common fields
      const { programType, fullName, email, phone, city, state, ...rest } = data;
      
      // Filter formData based on programType to avoid sending irrelevant data
      let formData = {};
      if (programType === "Spiritual Session (Gita & Bhagavatam)") {
        formData = { sessionType: rest.sessionType, preferredMode: rest.preferredMode, occupation: rest.occupation, message: rest.message };
      } else if (programType === "Prasadam Request") {
        formData = { participants: rest.participants, eventDate: rest.eventDate, deliveryAddress: rest.deliveryAddress, occasion: rest.occasion };
      } else if (programType === "House Program") {
        formData = { preferredDate: rest.preferredDate, completeAddress: rest.completeAddress, attendees: rest.attendees, requirement: rest.requirement };
      } else if (programType === "Mentorship") {
        formData = { occupation: rest.occupation, areasOfGuidance: rest.areasOfGuidance, preferredMode: rest.preferredMode };
      } else if (programType === "Invitation Program") {
        formData = { invitationType: rest.invitationType, institutionName: rest.institutionName, audienceSize: rest.audienceSize, proposedDate: rest.proposedDate, venueAddress: rest.venueAddress, programDetails: rest.programDetails };
      }

      const payload = { programType, fullName, email, phone, city, state, formData };
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${baseUrl}/api/program-registrations`, payload);
      
      toast.success("Thank you for registering. Our team will contact you soon.");
      setShowSuccess(true);
      reset();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Please fill all required fields correctly.");
      } else {
        toast.error("Network error. Please check your internet connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative mx-auto max-w-3xl">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl bg-white/95 backdrop-blur p-8 shadow-xl text-center"
          >
            <div>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-display font-semibold text-[#2a1b22] mb-2">Registration Submitted</h3>
              <p className="text-[#4b4246] mb-8">Thank you for your interest. A representative from ISKCON IIT-BBSR will contact you shortly.</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="rounded-full bg-[#D4AF37] px-6 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A1F2D] transition hover:-translate-y-0.5"
                >
                  Register Another Program
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="rounded-full border border-[#4A1F2D]/20 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A1F2D] transition hover:-translate-y-0.5"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-white/60 bg-[#F8F5EF]/90 p-6 md:p-10 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl">
        
        <SelectField label="What would you like to register for?" name="programType" options={programTypes} register={register} errors={errors} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-4 pt-4 border-t border-[#4A1F2D]/10">
          <InputField label="Full Name" name="fullName" register={register} errors={errors} placeholder="Enter your full name" />
          <InputField label="Email Address" name="email" type="email" register={register} errors={errors} placeholder="your@email.com" />
          <InputField label="Mobile Number" name="phone" register={register} errors={errors} placeholder="10-digit number" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="City" name="city" register={register} errors={errors} placeholder="City" />
            <InputField label="State" name="state" register={register} errors={errors} placeholder="State" />
          </div>
        </div>

        {selectedProgramType && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 pt-4 border-t border-[#4A1F2D]/10 overflow-hidden"
          >
            <h4 className="text-lg font-display text-[#D4AF37] mb-4 font-semibold uppercase tracking-wider text-sm">Program Details</h4>
            
            {selectedProgramType === "Spiritual Session (Gita & Bhagavatam)" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <SelectField label="Session Type" name="sessionType" options={["Bhagavad Gita", "Srimad Bhagavatam", "Both"]} register={register} errors={errors} />
                <SelectField label="Preferred Mode" name="preferredMode" options={["Online", "Offline", "Either"]} register={register} errors={errors} />
                <SelectField label="Occupation" name="occupation" options={["Student", "Faculty", "Professional", "Homemaker", "Other"]} register={register} errors={errors} />
                <InputField label="Message (Optional)" name="message" type="textarea" register={register} errors={errors} placeholder="Any specific topics you are interested in?" />
              </div>
            )}

            {selectedProgramType === "Prasadam Request" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField label="Number of Participants" name="participants" type="number" register={register} errors={errors} />
                <InputField label="Event Date" name="eventDate" type="date" register={register} errors={errors} />
                <InputField label="Occasion" name="occasion" register={register} errors={errors} placeholder="e.g. Birthday, Office Event" />
                <InputField label="Delivery Address" name="deliveryAddress" type="textarea" register={register} errors={errors} placeholder="Complete address for delivery" />
              </div>
            )}

            {selectedProgramType === "House Program" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputField label="Preferred Date" name="preferredDate" type="date" register={register} errors={errors} />
                <InputField label="Approximate Attendees" name="attendees" type="number" register={register} errors={errors} />
                <SelectField label="Program Requirement" name="requirement" options={["Bhajan", "Kirtan", "Gita Talk", "Bhagavatam Talk", "Full Program"]} register={register} errors={errors} />
                <InputField label="Complete Address" name="completeAddress" type="textarea" register={register} errors={errors} placeholder="Where will the program be held?" />
              </div>
            )}

            {selectedProgramType === "Mentorship" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <SelectField label="Occupation" name="occupation" options={["Student", "Faculty", "Professional", "Other"]} register={register} errors={errors} />
                <SelectField label="Preferred Mode" name="preferredMode" options={["Online", "Offline", "Either"]} register={register} errors={errors} />
                <div className="col-span-1 md:col-span-2 mb-4">
                  <label className="block text-sm font-semibold text-[#2a1b22] mb-2">Areas of Guidance (Select multiple)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {["Spiritual Growth", "Career Guidance", "Student Life", "Stress Management", "Bhakti Practices", "Personal Development"].map((area) => (
                      <label key={area} className="flex items-center space-x-2 text-sm text-[#4b4246] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={areasOfGuidanceWatch.includes(area)}
                          onChange={() => handleCheckboxChange(area)}
                          className="rounded border-[#4A1F2D]/20 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span>{area}</span>
                      </label>
                    ))}
                  </div>
                  {errors.areasOfGuidance && <p className="mt-1 text-xs text-red-500">{errors.areasOfGuidance.message}</p>}
                </div>
              </div>
            )}

            {selectedProgramType === "Invitation Program" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <SelectField label="Invitation Type" name="invitationType" options={["School Program", "College Program", "Corporate Program", "Village Program", "Other"]} register={register} errors={errors} />
                <InputField label="Institution/Organization Name" name="institutionName" register={register} errors={errors} />
                <InputField label="Expected Audience Size" name="audienceSize" type="number" register={register} errors={errors} />
                <InputField label="Proposed Date" name="proposedDate" type="date" register={register} errors={errors} />
                <InputField label="Venue Address" name="venueAddress" type="textarea" register={register} errors={errors} />
                <InputField label="Program Details" name="programDetails" type="textarea" register={register} errors={errors} placeholder="Please describe what kind of program you are looking for." />
              </div>
            )}
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-[#4A1F2D] px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(74,31,45,0.7)] disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Register Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
