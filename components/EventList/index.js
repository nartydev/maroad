import classnames from 'classnames';

import './index.css';

import { useState, useEffect, useRef, useCallback } from 'react';

const EventList = () => (
	<div className="agenda">
		<div className="title">
			Liste des <span className="color-primary">événements</span>
		</div>
		<FiltersAgenda />
	</div>
);

export const FiltersAgenda = () => <div className="filters" />;

export default EventList;
