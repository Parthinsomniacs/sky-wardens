"use client";

import { useEffect, useRef, useState, useId } from "react";
import { CareerPosition } from "../data";
import styles from "./JobApplicationModal.module.css";

interface JobApplicationModalProps {
  position: CareerPosition | null;
  onClose: () => void;
}

export default function JobApplicationModal({
  position,
  onClose,
}: JobApplicationModalProps) {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverNote: "",
    agreed: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const nameInputId = useId();
  const emailInputId = useId();
  const phoneInputId = useId();
  const expInputId = useId();
  const noteInputId = useId();
  const agreeInputId = useId();

  useEffect(() => {
    if (!position) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [position, onClose]);

  if (!position) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.agreed) return;

    setIsSubmitting(true);

    // Simulate dossier transmission & generate official military reference number
    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const code = position.id.slice(0, 3).toUpperCase();
      setReferenceId(`SW-REC-${code}-${randomSuffix}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 750);
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-modal-title"
      data-lenis-prevent="true"
    >
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close application dialog"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ================================================================
            MODAL BODY: CANDIDATE APPLICATION FORM ONLY
            ================================================================ */}
        <div
          ref={modalBodyRef}
          className={styles.modalBody}
          data-lenis-prevent="true"
          tabIndex={0}
        >
          <div className={styles.formColumn}>
            {isSubmitted ? (
              <div className={styles.successCard} role="status">
                <div className={styles.successIconWrap}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h3 className={styles.successTitle}>
                  Application Transmitted Successfully
                </h3>
                <span className={styles.referenceBadge}>
                  Reference ID: {referenceId}
                </span>

                <p className={styles.successDescription}>
                  Your candidate profile for <strong>{position.title}</strong> has
                  been securely cataloged. A technical talent partner will
                  review your dossier within 48 to 72 operational hours.
                </p>

                <div className={styles.nextStepsList}>
                  <div className={styles.nextStepItem}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.nextStepCheck}
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>
                      Dossier routed to <strong>{position.department}</strong> lead
                    </span>
                  </div>
                  <div className={styles.nextStepItem}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.nextStepCheck}
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>
                      Confirmation dispatch queued for <strong>{formData.email}</strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.dismissBtn}
                  onClick={onClose}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formColumn}>
                <div className={styles.columnHeader}>
                  <h3 className={styles.columnTitle}>
                    Candidate Submission Dossier
                  </h3>
                  <p className={styles.columnSubtitle}>
                    Provide your technical credentials and background for immediate evaluation.
                  </p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label htmlFor={nameInputId} className={styles.fieldLabel}>
                      Full Name <span>*</span>
                    </label>
                    <input
                      id={nameInputId}
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={emailInputId} className={styles.fieldLabel}>
                      Email Address <span>*</span>
                    </label>
                    <input
                      id={emailInputId}
                      type="email"
                      name="email"
                      required
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={phoneInputId} className={styles.fieldLabel}>
                      Contact Phone <span>*</span>
                    </label>
                    <input
                      id={phoneInputId}
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor={expInputId} className={styles.fieldLabel}>
                      Total Experience <span>*</span>
                    </label>
                    <input
                      id={expInputId}
                      type="text"
                      name="experience"
                      required
                      placeholder="e.g. 7 Years (Aerospace/Defense)"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={styles.textInput}
                    />
                  </div>

                  {/* Resume File Upload Dropzone */}
                  <div className={styles.formFieldFull}>
                    <span className={styles.fieldLabel}>
                      Resume / CV Dossier <span>*</span>
                    </span>
                    <div
                      className={`${styles.fileDropzone} ${
                        selectedFile ? styles.fileDropzoneActive : ""
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className={styles.hiddenFileInput}
                        required={!selectedFile}
                      />

                      {selectedFile ? (
                        <div className={styles.fileSelectedBadge}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <span>{selectedFile.name}</span>
                          <button
                            type="button"
                            className={styles.removeFileBtn}
                            onClick={handleRemoveFile}
                            aria-label="Remove uploaded file"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={styles.fileIcon}
                            aria-hidden="true"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span className={styles.filePrompt}>
                            Click to upload PDF or DOCX Resume
                          </span>
                          <span className={styles.fileSubprompt}>
                            Maximum file size: 15 MB
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Cover Note / Specialization */}
                  <div className={styles.formFieldFull}>
                    <label htmlFor={noteInputId} className={styles.fieldLabel}>
                      Defense Focus / Brief Note
                    </label>
                    <textarea
                      id={noteInputId}
                      name="coverNote"
                      placeholder="Highlight relevant airframe, autonomy, or defense projects..."
                      value={formData.coverNote}
                      onChange={handleInputChange}
                      className={styles.textArea}
                    />
                  </div>

                  {/* Security Compliance Checkbox */}
                  <div className={styles.formFieldFull}>
                    <div className={styles.agreementRow}>
                      <input
                        id={agreeInputId}
                        type="checkbox"
                        name="agreed"
                        required
                        checked={formData.agreed}
                        onChange={handleInputChange}
                        className={styles.checkbox}
                      />
                      <label
                        htmlFor={agreeInputId}
                        className={styles.agreementText}
                      >
                        I confirm that the submitted technical credentials are
                        genuine and agree to Sky Wardens sovereign defense
                        confidentiality and NDA protocols.
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreed}
                  className={styles.submitButton}
                >
                  {isSubmitting ? (
                    <span>Transmitting Dossier...</span>
                  ) : (
                    <>
                      <span>Transmit Application</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 5H9M9 5L5.5 1.5M9 5L5.5 8.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
