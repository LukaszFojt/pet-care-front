import React from 'react';

const BetterSelect = ({
  options,
  value,
  onChange,
  styles = {},
  getOptionLabel = (option) => option.label,
  getOptionValue = (option) => option.value,
}) => {
  return (
    <div className="relative block" style={styles}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
      >
        {options.map((option) => (
          <option key={getOptionValue(option)} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
      <div className="icons pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400">
        keyboard_arrow_down
      </div>
    </div>
  );
};

export default BetterSelect;