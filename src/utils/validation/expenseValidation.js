export const validationCreateExpense = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "expense or income name is required";
  } else if (formData.name.trim().length < 3) {
    errors.name = "expense or income name should be greater than 3 characters";
  }
  if (!formData.amount) {
    errors.amount = "amount is required";
  }
  if (!formData.categoryName.trim()) {
    errors.categoryName = "category name is required";
  } else if (formData.categoryName.trim().length < 5) {
    errors.categoryName = "category name should be greater than 5 characters";
  }
  if (!formData.description.trim()) {
    errors.description = "description is required";
  } else if (formData.description.trim().length < 8) {
    errors.description = "Description should be greater than 8 character ";
  }
  if (!formData.type.trim()) {
    errors.type = "type is required";
  }
  return errors;
};
