import React from 'react';
import CategoryList from './CategoryList';

export default function CategoryPanel() {
	return (
		<div>
			<div className="w-full px-12 mt-8 mb-6 flex flex-col">
				<h1 className="mb-6 text-4xl text-buletinDarkBlue font-medium"> Categories </h1>
				<CategoryList />
			</div>
		</div>
	);
}

