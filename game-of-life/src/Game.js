import React from 'react';
import './Game.css';

// Model the game world

// Comprised of rows and columns which can be represented using a multidimensional array
// The values in the array would be onjects containing that cell's state
// That state includes what the cell contains, its coordinates in the grid, and perhaps other information for diagnostic purposes
// Using an object to store the state will allow you to add more properties later that you didn't consider at first, reducing rewrite
// Once you have grid set up you can bind UI to it