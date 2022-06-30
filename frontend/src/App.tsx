import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MatchMakingProvider } from './context/MatchMaking/MatchMakingContext';

import Maps from './pages/Maps/Maps';

import MatchMakingForm from './components/MatchMakingForm/MatchMakingForm';

import './App.css';

function App() {
	return (
		<div className="App">
			<MatchMakingProvider>
				<BrowserRouter>
					<Routes>
						<Route path='*' element={<MatchMakingForm></MatchMakingForm>} />
						<Route path="maps" element={<Maps></Maps>} />
					</Routes>
				</BrowserRouter>
			</MatchMakingProvider>
		</div>
	);
}

export default App;
