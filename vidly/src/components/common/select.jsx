import React from "react";

const Select = ({
  name,
  label,
  error,
  value,
  data,
  dataValue,
  dataLabel,
  onChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="" />
        {data.map(item => (
          <option key={item[dataValue]} value={item[dataValue]}>
            {item[dataLabel]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
