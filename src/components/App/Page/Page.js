import React from 'react';
import EnhancedTable from './EnhancedTableWithConditionalRendering';
import Search from '../../Search';

const Page = (props) => {
  const {
    // Search Component
    searchTerm,
    onChange,
    onSubmit,
    // EnhancedTable Component
    isError,
    error,
    list,
    onDismiss,
    isLoading,
    onClick,
  } = props;

  return (
    <div className="page">
      <div className="interactions">
        <Search
          value={searchTerm}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <span>Search </span>
        </Search>
      </div>
      <EnhancedTable
        isError={isError}
        error={error}
        list={list}
        onDismiss={onDismiss}
        isLoading={isLoading}
        onClick={onClick}
        buttonText="Try Again"
      />
    </div>
  );
}

export default Page;

export {
  Search,
};
