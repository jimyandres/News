import React from 'react';
import EnhancedTable from './EnhancedTableWithConditionalRendering';
import PropTypes from 'prop-types';
import Search from './Search';
import './Page.css';

const Page = (props) => {
	const {
		// Search Component
		value,
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
					value={value}
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
};

Page.propTypes = {
	// Search Component
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	// EnhancedTable Component
	isError: PropTypes.bool.isRequired,
	error: PropTypes.object,
	list: PropTypes.array,
	onDismiss: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

Page.defaultProps = {
	// Search Component
	value: '',
	onChange: () => {},
	onSubmit: () => {},
	// EnhancedTable Component
	isError: false,
	error: null,
	list: null,
	onDismiss: () => {},
	isLoading: false,
	onClick: () => {},
};

export default Page;
