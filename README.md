# Supercode (LeetCode Tracker)

Supercode is a modern web application built with React and Vite to help you track your LeetCode progress, visualize your learning roadmap, and systematically conquer coding problems.

## Features

- **Interactive Roadmap**: Visualize your learning path across different data structures and algorithms concepts.
- **Problem Tracking**: Keep track of the problems you've solved, pending challenges, and those you want to review.
- **Modern UI**: Built with a sleek, responsive interface utilizing reusable UI components.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Standard CSS with modular UI components (Badge, Button, Card, Checkbox, Progress, Tabs, etc.)
- **Data**: Local state management with seeded roadmap and problem data.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone https://github.com/<your-username>/Supercode.git
   cd Supercode
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Project Structure

- `/src/components`: Contains the core React components including the `Roadmap` and various modular `ui` components.
- `/src/data`: Holds the static data (`roadmapData.js`, `seedProblems.js`) used to populate the initial state of the application.
- `leetcode.sh`: A shell script utility included in the repository.

## License

This project is open-source and available under the MIT License.
