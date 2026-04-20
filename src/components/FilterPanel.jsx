import React from 'react';
import { Filter } from 'lucide-react';
import './FilterPanel.css';

const FilterPanel = ({ selectedTypes, onTypeChange }) => {
  const types = ['Full-time', 'Part-time', 'Internship'];

  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  return (
    <aside className="filter-panel">
      <div className="filter-header flex items-center gap-2 mb-4">
        <Filter size={20} className="text-primary" />
        <h3 className="font-medium">Filter Jobs</h3>
      </div>

      <div className="filter-group">
        <h4 className="filter-title mb-2">Job Type</h4>
        <div className="filter-options flex-col gap-2">
          {types.map((type) => (
            <label key={type} className="custom-checkbox flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleCheckboxChange(type)}
              />
              <span className="checkmark"></span>
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
