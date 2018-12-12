import React from "react";
import classnames from "classnames";

const FormField = ({ field, onChangeHandler }) => {
  const generateFieldInstructions = message => {
    const messageTemplate = (
      <small className="form-text text-muted">{message}</small>
    );
    return messageTemplate;
  };
  const generateInputField = () => {
    let template;

    if (field.inputGroup) {
      let icon;
      if (field.icon === "twitter") icon = "fas fa-twitter";
      if (field.icon === "facebook") icon = "fas fa-facebook";
      if (field.icon === "youtube") icon = "fas fa-youtube";
      if (field.icon === "linkedin") icon = "fas fa-linkedin";
      if (field.icon === "github") icon = "fas fa-github";
      if (field.icon === "instagram") icon = "fas fa-instagram";
      console.log("inputGroup");
      template = (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className={icon} />
            </span>
          </div>
          <input
            type={field.type}
            className="form-control form-control-lg"
            placeholder={field.placeholder}
            name={field.name}
          />
        </div>
      );
      return template;
    }

    if (field.type === "select") {
      template = (
        <select
          name={field.name}
          value={field.value}
          onChange={onChangeHandler}
          className={classnames("form-control form-control-lg", {
            "is-invalid": field.validationMessage
          })}
        >
          <option value="">Select one...</option>
          {field.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      template = (
        <textarea
          value={field.value}
          name={field.name}
          onChange={onChangeHandler}
          placeholder={field.placeholder}
          className={classnames("form-control form-colontrol-lg", {
            "is-invalid": field.validationMessage
          })}
        />
      );
    }

    if (
      field.type === "text" ||
      field.type === "email" ||
      field.type === "number" ||
      field.type === "password"
    ) {
      template = (
        <input
          type={field.type}
          value={field.value}
          name={field.name}
          onChange={onChangeHandler}
          placeholder={field.placeholder}
          className={classnames("form-control form-control-lg", {
            "is-invalid": field.validationMessage
          })}
        />
      );
    }
    return template;
  };

  return (
    <div className="form-group">
      {generateInputField()}
      {field.instructions
        ? generateFieldInstructions(field.instructions)
        : null}
      {field.validationMessage && (
        <div className="invalid-feedback">{field.validationMessage}</div>
      )}
    </div>
  );
};

export default FormField;
