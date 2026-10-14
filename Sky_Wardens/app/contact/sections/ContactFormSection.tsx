"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import {
  COUNTRIES,
  INDIAN_STATES,
  INQUIRY_TYPES,
  getInquiryConfig,
  getGroupedProducts,
} from "../contactData";
import styles from "./ContactFormSection.module.css";

export default function ContactFormSection() {
  const [inquiryType, setInquiryType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [tenderReference, setTenderReference] = useState("");
  const [mediaDeadline, setMediaDeadline] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [productNames, setProductNames] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Validation state
  type FieldKey =
    | "inquiryType"
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "company"
    | "designation"
    | "tenderReference"
    | "mediaDeadline"
    | "country"
    | "state"
    | "productNames"
    | "message"
    | "agreed";

  type FormErrors = Partial<Record<FieldKey, string>>;

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Product picker state
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const productPickerRef = useRef<HTMLDivElement>(null);

  const config = useMemo(() => getInquiryConfig(inquiryType), [inquiryType]);
  const productGroups = useMemo(() => getGroupedProducts(), []);

  // Filtered products for multi-select
  const filteredProductGroups = useMemo(() => {
    const query = productSearch.trim().toLowerCase();
    if (!query) return productGroups;

    return productGroups
      .map((group) => ({
        ...group,
        products: group.products.filter((p) =>
          p.name.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.products.length > 0);
  }, [productGroups, productSearch]);

  // Validation function for individual fields
  const validateField = (
    field: FieldKey,
    val: any,
    currentConfig = config,
    currentCountry = country
  ): string | undefined => {
    switch (field) {
      case "inquiryType":
        if (!val) return "Please choose an inquiry type.";
        break;
      case "firstName":
        if (!val || !val.trim()) return "First name is required.";
        if (val.trim().length < 2) return "First name must be at least 2 characters.";
        if (!/^[a-zA-Z\s.'-]+$/.test(val.trim()))
          return "Name should only contain letters.";
        break;
      case "lastName":
        if (currentConfig.requiresLastName) {
          if (!val || !val.trim()) return "Last name is required.";
          if (!/^[a-zA-Z\s.'-]+$/.test(val.trim()))
            return "Last name should only contain letters.";
        }
        break;
      case "email":
        if (!val || !val.trim()) return "Email address is required.";
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!emailRegex.test(val.trim()))
          return "Please enter a valid email address (e.g., name@company.com).";
        break;
      case "phone":
        if (currentConfig.requiresPhone) {
          if (!val || !val.trim()) return "Contact number is required.";
          const digitsOnly = val.replace(/\D/g, "");
          if (digitsOnly.length < 7 || digitsOnly.length > 15) {
            return "Please enter a valid phone number (7 to 15 digits).";
          }
        }
        break;
      case "company":
        if (currentConfig.requiresCompany) {
          if (!val || !val.trim()) return `${currentConfig.companyLabel} is required.`;
          if (val.trim().length < 2)
            return `${currentConfig.companyLabel} must be at least 2 characters.`;
        }
        break;
      case "designation":
        if (currentConfig.requiresDesignation) {
          if (!val || !val.trim()) return "Designation is required.";
        }
        break;
      case "tenderReference":
        if (currentConfig.requiresTenderReference) {
          if (!val || !val.trim()) return "Tender reference is required.";
        }
        break;
      case "mediaDeadline":
        if (currentConfig.requiresMediaDeadline) {
          if (!val) return "Response deadline is required.";
        }
        break;
      case "country":
        if (currentConfig.requiresCountry) {
          if (!val) return "Please select a country.";
        }
        break;
      case "state":
        if (currentConfig.requiresCountry && currentCountry === "India") {
          if (!val) return "Please select a state.";
        }
        break;
      case "productNames":
        if (currentConfig.requiresProducts) {
          if (!val || val.length === 0)
            return "Please select at least one product of interest.";
        }
        break;
      case "message":
        if (!val || !val.trim()) return "Inquiry message is required.";
        if (val.trim().length < 10)
          return "Please provide more details (minimum 10 characters).";
        break;
      case "agreed":
        if (!val) return "Please agree to the terms and conditions to proceed.";
        break;
      default:
        break;
    }
    return undefined;
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};

    const inquiryErr = validateField("inquiryType", inquiryType);
    if (inquiryErr) newErrors.inquiryType = inquiryErr;

    const fnErr = validateField("firstName", firstName);
    if (fnErr) newErrors.firstName = fnErr;

    if (config.requiresLastName) {
      const lnErr = validateField("lastName", lastName);
      if (lnErr) newErrors.lastName = lnErr;
    }

    const emailErr = validateField("email", email);
    if (emailErr) newErrors.email = emailErr;

    if (config.requiresPhone) {
      const phoneErr = validateField("phone", phone);
      if (phoneErr) newErrors.phone = phoneErr;
    }

    if (config.requiresCompany) {
      const compErr = validateField("company", company);
      if (compErr) newErrors.company = compErr;
    }

    if (config.requiresDesignation) {
      const desErr = validateField("designation", designation);
      if (desErr) newErrors.designation = desErr;
    }

    if (config.requiresTenderReference) {
      const tenderErr = validateField("tenderReference", tenderReference);
      if (tenderErr) newErrors.tenderReference = tenderErr;
    }

    if (config.requiresMediaDeadline) {
      const deadlineErr = validateField("mediaDeadline", mediaDeadline);
      if (deadlineErr) newErrors.mediaDeadline = deadlineErr;
    }

    if (config.requiresCountry) {
      const countryErr = validateField("country", country);
      if (countryErr) newErrors.country = countryErr;

      if (country === "India") {
        const stateErr = validateField("state", state);
        if (stateErr) newErrors.state = stateErr;
      }
    }

    if (config.requiresProducts) {
      const prodErr = validateField("productNames", productNames);
      if (prodErr) newErrors.productNames = prodErr;
    }

    const msgErr = validateField("message", message);
    if (msgErr) newErrors.message = msgErr;

    const agreedErr = validateField("agreed", agreed);
    if (agreedErr) newErrors.agreed = agreedErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: FieldKey, value: any) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleFieldChange = (
    field: FieldKey,
    value: any,
    setter: (val: any) => void
  ) => {
    setter(value);
    if (touched[field] || errors[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
    if (formError) setFormError("");
  };

  // Close product dropdown on outside click
  useEffect(() => {
    if (!isProductPickerOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        productPickerRef.current &&
        !productPickerRef.current.contains(event.target as Node)
      ) {
        setIsProductPickerOpen(false);
        setProductSearch("");
        handleBlur("productNames", productNames);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProductPickerOpen(false);
        setProductSearch("");
        handleBlur("productNames", productNames);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProductPickerOpen, productNames]);

  const toggleProduct = (name: string) => {
    const next = productNames.includes(name)
      ? productNames.filter((p) => p !== name)
      : [...productNames, name];
    setProductNames(next);
    setTouched((prev) => ({ ...prev, productNames: true }));
    const err = validateField("productNames", next);
    setErrors((prev) => ({ ...prev, productNames: err }));
    if (formError) setFormError("");
  };

  const handleInquiryTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setInquiryType(selected);
    setTouched((prev) => ({ ...prev, inquiryType: true }));
    const err = validateField("inquiryType", selected);
    setErrors((prev) => ({ ...prev, inquiryType: err }));
    if (formError) setFormError("");

    // Reset fields that are not applicable to the new type
    const newConfig = getInquiryConfig(selected);
    if (!newConfig.requiresProducts) setProductNames([]);
    if (!newConfig.requiresCountry) {
      setCountry("");
      setState("");
      setCity("");
    }
    if (!newConfig.requiresCompany) setCompany("");
    if (!newConfig.requiresPhone) setPhone("");
    if (!newConfig.requiresLastName) setLastName("");
    if (!newConfig.requiresTenderReference) setTenderReference("");
    if (!newConfig.requiresDesignation) setDesignation("");
    if (!newConfig.requiresMediaDeadline) setMediaDeadline("");
  };

  const handleReset = () => {
    setInquiryType("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneCountry("IN");
    setPhone("");
    setCompany("");
    setDesignation("");
    setTenderReference("");
    setMediaDeadline("");
    setCountry("");
    setState("");
    setCity("");
    setProductNames([]);
    setMessage("");
    setAgreed(false);
    setIsSubmitted(false);
    setFormError("");
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    // Mark all relevant fields as touched
    setTouched({
      inquiryType: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      company: true,
      designation: true,
      tenderReference: true,
      mediaDeadline: true,
      country: true,
      state: true,
      productNames: true,
      message: true,
      agreed: true,
    });

    const isValid = validateAll();
    if (!isValid) {
      setFormError("Please fill in all required fields accurately.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Determine combined full name
      const combinedName =
        config.requiresLastName && lastName.trim()
          ? `${firstName.trim()} ${lastName.trim()}`
          : firstName.trim();

      // Determine full contact phone number with country dial code
      const matchedDial = COUNTRIES.find((c) => c.iso2 === phoneCountry);
      const fullPhone = phone.trim()
        ? `${matchedDial ? matchedDial.dialCode : ""} ${phone.trim()}`.trim()
        : "";

      // Determine product division category
      const isDefenceProduct = productNames.some((pName) =>
        productGroups
          .find((g) => g.heading === "Defence")
          ?.products.some((p) => p.name.toLowerCase() === pName.toLowerCase())
      );
      const detectedCategory =
        inquiryType.includes("Defence") || isDefenceProduct
          ? "Defence"
          : inquiryType.includes("Aerospace") || productNames.length > 0
          ? "Aerospace"
          : "General";

      // Append tender ref or media deadline if applicable
      let finalMessage = message.trim();
      if (config.requiresTenderReference && tenderReference.trim()) {
        finalMessage = `[Tender Reference: ${tenderReference.trim()}]\n\n${finalMessage}`;
      }
      if (config.requiresMediaDeadline && mediaDeadline) {
        finalMessage = `[Response Deadline: ${mediaDeadline}]\n\n${finalMessage}`;
      }

      const payload = {
        name: combinedName,
        email: email.trim().toLowerCase(),
        phone: fullPhone,
        company: company.trim(),
        designation: designation.trim(),
        country: country || (phoneCountry === "IN" ? "India" : ""),
        state: state.trim(),
        city: city.trim(),
        productInquired:
          productNames.length > 0
            ? productNames.join(", ")
            : `${inquiryType} Inquiry`,
        category: detectedCategory,
        type: inquiryType,
        message: finalMessage,
      };

      const backendApiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const res = await fetch(`${backendApiUrl}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to submit inquiry. Please try again."
        );
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Lead submission error:", err);
      setFormError(
        err.message ||
          "Unable to transmit inquiry. Please check your network and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className={styles.section}
      aria-label="Contact Form"
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Left Column: Call to Action Heading & Subtitle */}
          <div className={styles.leftCol}>
            <AnimatedTitle className={styles.heading}>
              <span className={styles.headingLine}>START A</span>
              <span className={styles.headingLine}>STRATEGIC</span>
              <span className={styles.headingLine}>CONVERSATION</span>
            </AnimatedTitle>
            <p className={styles.subheading}>
              Join hands with Sky Wardens, where innovation meets
              mission-critical execution.
            </p>
          </div>

          {/* Right Column: Dynamic Underline Form */}
          <div className={styles.formCol}>
            {isSubmitted ? (
              <div className={styles.successBanner} role="status">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#55f187"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <h3 className={styles.successTitle}>MESSAGE RECEIVED</h3>
                <p className={styles.successText}>
                  Thank you for reaching out. A Sky Wardens representative will get
                  in touch with you shortly.
                </p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={handleReset}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className={styles.form}>
                {/* 1. Inquiry Type Dropdown */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>
                    Choose an inquiry type*
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      value={inquiryType}
                      onBlur={() => handleBlur("inquiryType", inquiryType)}
                      onChange={handleInquiryTypeChange}
                      className={`${styles.select} ${
                        touched.inquiryType && errors.inquiryType
                          ? styles.inputError
                          : ""
                      }`}
                      aria-label="Choose an inquiry"
                    >
                      <option value="" disabled>
                        Choose an inquiry
                      </option>
                      {INQUIRY_TYPES.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                    <svg
                      className={styles.selectChevron}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {touched.inquiryType && errors.inquiryType && (
                    <span className={styles.fieldError} role="alert">
                      {errors.inquiryType}
                    </span>
                  )}
                </div>

                {/* 2. Dynamic: Products of Interest (Searchable Multi-Select) */}
                {config.requiresProducts && (
                  <div className={styles.field} ref={productPickerRef}>
                    <label className={styles.fieldLabel}>
                      Products of Interest*
                    </label>
                    <div className={styles.productPicker}>
                      <button
                        type="button"
                        onClick={() =>
                          setIsProductPickerOpen((prev) => !prev)
                        }
                        className={`${styles.productTrigger} ${
                          touched.productNames && errors.productNames
                            ? styles.inputError
                            : ""
                        }`}
                        aria-haspopup="listbox"
                        aria-expanded={isProductPickerOpen}
                      >
                        <span
                          className={
                            productNames.length > 0
                              ? styles.productTriggerTextSelected
                              : styles.productTriggerText
                          }
                        >
                          {productNames.length === 0
                            ? "Select one or more products"
                            : productNames.length === 1
                            ? productNames[0]
                            : `${productNames.length} products selected`}
                        </span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isProductPickerOpen
                              ? "rotate(180deg)"
                              : "none",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {/* Selected Tags Display */}
                      {productNames.length > 0 && (
                        <div className={styles.productTags}>
                          {productNames.map((name) => (
                            <span key={name} className={styles.productTag}>
                              {name}
                              <button
                                type="button"
                                onClick={() => toggleProduct(name)}
                                className={styles.productTagRemove}
                                aria-label={`Remove ${name}`}
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Dropdown Menu */}
                      {isProductPickerOpen && (
                        <div className={styles.productDropdown}>
                          <div className={styles.productSearchWrapper}>
                            <input
                              type="text"
                              value={productSearch}
                              onChange={(e) => setProductSearch(e.target.value)}
                              placeholder="Search products..."
                              className={styles.productSearchInput}
                              autoFocus
                            />
                          </div>
                          <div className={styles.productList} role="listbox">
                            {filteredProductGroups.length > 0 ? (
                              filteredProductGroups.map((group) => (
                                <div key={group.heading}>
                                  <div className={styles.productGroupHeader}>
                                    {group.heading}
                                  </div>
                                  {group.products.map((prod) => {
                                    const isSelected = productNames.includes(
                                      prod.name
                                    );
                                    return (
                                      <button
                                        type="button"
                                        key={prod.id}
                                        onClick={() => toggleProduct(prod.name)}
                                        className={`${styles.productOption} ${
                                          isSelected
                                            ? styles.productOptionActive
                                            : ""
                                        }`}
                                      >
                                        <span>{prod.name}</span>
                                        <span
                                          className={styles.productCheckbox}
                                        >
                                          {isSelected ? "✓" : ""}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              ))
                            ) : (
                              <div className={styles.noProductsText}>
                                No products found.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {touched.productNames && errors.productNames && (
                      <span className={styles.fieldError} role="alert">
                        {errors.productNames}
                      </span>
                    )}
                  </div>
                )}

                {/* 3. Name Fields (First Name & Optional Last Name in 2 columns) */}
                {config.requiresLastName ? (
                  <div className={styles.twoColRow}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>First Name*</label>
                      <input
                        type="text"
                        value={firstName}
                        onBlur={() => handleBlur("firstName", firstName)}
                        onChange={(e) =>
                          handleFieldChange("firstName", e.target.value, setFirstName)
                        }
                        placeholder="Enter first name"
                        className={`${styles.input} ${
                          touched.firstName && errors.firstName
                            ? styles.inputError
                            : ""
                        }`}
                        aria-label="First name"
                      />
                      {touched.firstName && errors.firstName && (
                        <span className={styles.fieldError} role="alert">
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Last Name*</label>
                      <input
                        type="text"
                        value={lastName}
                        onBlur={() => handleBlur("lastName", lastName)}
                        onChange={(e) =>
                          handleFieldChange("lastName", e.target.value, setLastName)
                        }
                        placeholder="Enter last name"
                        className={`${styles.input} ${
                          touched.lastName && errors.lastName
                            ? styles.inputError
                            : ""
                        }`}
                        aria-label="Last name"
                      />
                      {touched.lastName && errors.lastName && (
                        <span className={styles.fieldError} role="alert">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Your Name*</label>
                    <input
                      type="text"
                      value={firstName}
                      onBlur={() => handleBlur("firstName", firstName)}
                      onChange={(e) =>
                        handleFieldChange("firstName", e.target.value, setFirstName)
                      }
                      placeholder="Enter your name"
                      className={`${styles.input} ${
                        touched.firstName && errors.firstName
                          ? styles.inputError
                          : ""
                      }`}
                      aria-label="Your name"
                    />
                    {touched.firstName && errors.firstName && (
                      <span className={styles.fieldError} role="alert">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                )}

                {/* 4. Dynamic: Company / Organisation / Publication */}
                {config.requiresCompany && (
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      {config.companyLabel}*
                    </label>
                    <input
                      type="text"
                      value={company}
                      onBlur={() => handleBlur("company", company)}
                      onChange={(e) =>
                        handleFieldChange("company", e.target.value, setCompany)
                      }
                      placeholder={`Enter ${config.companyLabel.toLowerCase()}`}
                      className={`${styles.input} ${
                        touched.company && errors.company
                          ? styles.inputError
                          : ""
                      }`}
                      aria-label={config.companyLabel}
                    />
                    {touched.company && errors.company && (
                      <span className={styles.fieldError} role="alert">
                        {errors.company}
                      </span>
                    )}
                  </div>
                )}

                {/* 5. Dynamic: Designation */}
                {config.requiresDesignation && (
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Designation*</label>
                    <input
                      type="text"
                      value={designation}
                      onBlur={() => handleBlur("designation", designation)}
                      onChange={(e) =>
                        handleFieldChange("designation", e.target.value, setDesignation)
                      }
                      placeholder="Enter your designation"
                      className={`${styles.input} ${
                        touched.designation && errors.designation
                          ? styles.inputError
                          : ""
                      }`}
                      aria-label="Designation"
                    />
                    {touched.designation && errors.designation && (
                      <span className={styles.fieldError} role="alert">
                        {errors.designation}
                      </span>
                    )}
                  </div>
                )}

                {/* 6. Dynamic: Tender Reference */}
                {config.requiresTenderReference && (
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      Tender Reference*
                    </label>
                    <input
                      type="text"
                      value={tenderReference}
                      onBlur={() => handleBlur("tenderReference", tenderReference)}
                      onChange={(e) =>
                        handleFieldChange("tenderReference", e.target.value, setTenderReference)
                      }
                      placeholder="Enter tender or procurement reference"
                      className={`${styles.input} ${
                        touched.tenderReference && errors.tenderReference
                          ? styles.inputError
                          : ""
                      }`}
                      aria-label="Tender reference"
                    />
                    {touched.tenderReference && errors.tenderReference && (
                      <span className={styles.fieldError} role="alert">
                        {errors.tenderReference}
                      </span>
                    )}
                  </div>
                )}

                {/* 7. Dynamic: Response Deadline */}
                {config.requiresMediaDeadline && (
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>
                      Response Deadline*
                    </label>
                    <input
                      type="date"
                      value={mediaDeadline}
                      onBlur={() => handleBlur("mediaDeadline", mediaDeadline)}
                      onChange={(e) =>
                        handleFieldChange("mediaDeadline", e.target.value, setMediaDeadline)
                      }
                      className={`${styles.input} ${styles.dateInput} ${
                        touched.mediaDeadline && errors.mediaDeadline
                          ? styles.inputError
                          : ""
                      }`}
                      aria-label="Response deadline"
                    />
                    {touched.mediaDeadline && errors.mediaDeadline && (
                      <span className={styles.fieldError} role="alert">
                        {errors.mediaDeadline}
                      </span>
                    )}
                  </div>
                )}

                {/* 8. Dynamic: Country & State & City */}
                {config.requiresCountry && (
                  <>
                    <div
                      className={
                        country === "India" ? styles.twoColRow : styles.field
                      }
                    >
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>
                          Select Country*
                        </label>
                        <div className={styles.selectWrapper}>
                          <select
                            value={country}
                            onBlur={() => handleBlur("country", country)}
                            onChange={(e) => {
                              const newCountry = e.target.value;
                              handleFieldChange("country", newCountry, setCountry);
                              if (newCountry !== "India") {
                                setState("");
                                setErrors((prev) => ({ ...prev, state: undefined }));
                              }
                              const matched = COUNTRIES.find(
                                (c) => c.name === newCountry
                              );
                              if (matched) setPhoneCountry(matched.iso2);
                            }}
                            className={`${styles.select} ${
                              touched.country && errors.country
                                ? styles.inputError
                                : ""
                            }`}
                            aria-label="Select country"
                          >
                            <option value="" disabled>
                              Choose a country
                            </option>
                            {COUNTRIES.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                          <svg
                            className={styles.selectChevron}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                        {touched.country && errors.country && (
                          <span className={styles.fieldError} role="alert">
                            {errors.country}
                          </span>
                        )}
                      </div>

                      {country === "India" && (
                        <div className={styles.field}>
                          <label className={styles.fieldLabel}>
                            Select State*
                          </label>
                          <div className={styles.selectWrapper}>
                            <select
                              value={state}
                              onBlur={() => handleBlur("state", state)}
                              onChange={(e) =>
                                handleFieldChange("state", e.target.value, setState)
                              }
                              className={`${styles.select} ${
                                touched.state && errors.state
                                  ? styles.inputError
                                  : ""
                              }`}
                              aria-label="Select state"
                            >
                              <option value="" disabled>
                                Choose a state
                              </option>
                              {INDIAN_STATES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                            <svg
                              className={styles.selectChevron}
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                          {touched.state && errors.state && (
                            <span className={styles.fieldError} role="alert">
                              {errors.state}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>City (Optional)</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                        className={styles.input}
                        aria-label="City"
                      />
                    </div>
                  </>
                )}

                {/* 9. Email Address */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>E-mail Address*</label>
                  <input
                    type="email"
                    value={email}
                    onBlur={() => handleBlur("email", email)}
                    onChange={(e) =>
                      handleFieldChange("email", e.target.value, setEmail)
                    }
                    placeholder="Enter email address"
                    className={`${styles.input} ${
                      touched.email && errors.email ? styles.inputError : ""
                    }`}
                    aria-label="E-mail address"
                  />
                  {touched.email && errors.email && (
                    <span className={styles.fieldError} role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* 10. Dynamic: Phone Number with Country Code */}
                {config.requiresPhone && (
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Contact Number*</label>
                    <div className={styles.phoneRow}>
                      <div className={styles.selectWrapper}>
                        <select
                          value={phoneCountry}
                          onChange={(e) => setPhoneCountry(e.target.value)}
                          className={styles.select}
                          aria-label="Country code"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.iso2} value={c.iso2}>
                              {c.iso2} ({c.dialCode})
                            </option>
                          ))}
                        </select>
                        <svg
                          className={styles.selectChevron}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onBlur={() => handleBlur("phone", phone)}
                        onChange={(e) =>
                          handleFieldChange("phone", e.target.value, setPhone)
                        }
                        placeholder="Enter phone number"
                        className={`${styles.input} ${
                          touched.phone && errors.phone ? styles.inputError : ""
                        }`}
                        aria-label="Phone number"
                      />
                    </div>
                    {touched.phone && errors.phone && (
                      <span className={styles.fieldError} role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                )}

                {/* 11. Message Field */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Message*</label>
                  <textarea
                    value={message}
                    onBlur={() => handleBlur("message", message)}
                    onChange={(e) =>
                      handleFieldChange("message", e.target.value, setMessage)
                    }
                    placeholder="Tell us about your enquiry (minimum 10 characters)"
                    className={`${styles.textarea} ${
                      touched.message && errors.message ? styles.inputError : ""
                    }`}
                    aria-label="Type message"
                  />
                  {touched.message && errors.message && (
                    <span className={styles.fieldError} role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Terms Agreement Checkbox */}
                <div>
                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) =>
                        handleFieldChange("agreed", e.target.checked, setAgreed)
                      }
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkboxLabel}>
                      I agree to the terms and conditions
                    </span>
                  </label>
                  {touched.agreed && errors.agreed && (
                    <span className={styles.fieldError} role="alert">
                      {errors.agreed}
                    </span>
                  )}
                </div>

                {formError && (
                  <p
                    style={{
                      margin: 0,
                      color: "#ff7b7b",
                      fontSize: "0.875rem",
                      lineHeight: "1.4",
                    }}
                    role="alert"
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? "TRANSMITTING..." : "SUBMIT INQUIRY"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
