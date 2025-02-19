import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name can't be more than 50 characters")
    .required("Full name is required"),

  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  street: Yup.string()
    .min(5, "Street address must be at least 5 characters")
    .max(100, "Street address can't be more than 100 characters")
    .required("Street address is required"),

  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City can't be more than 50 characters")
    .required("City is required"),

  state: Yup.string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State can't be more than 50 characters")
    .required("State is required"),

  postalCode: Yup.string()
    .matches(/^\d{5,6}$/, "Postal code must be 5-6 digits")
    .required("Postal code is required"),

  country: Yup.string()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country can't be more than 50 characters")
    .required("Country is required"),
});
