NHL Trade Tree Generator
A React-based web application that visualizes NHL trades and their interconnected relationships in a tree structure.

Features
Interactive Trade Trees: Visualize how trades cascade through multiple teams
Team Logos: All 32 NHL teams with distinctive logos and official colors
Expandable Nodes: Click to expand/collapse trade branches
Add/Delete Trades: Easy-to-use interface for managing trades
Responsive Design: Works on desktop and mobile devices
Live Demo
Visit the live application: https://YOUR_USERNAME.github.io/nhl-trade-tree

Local Development
Clone the repository:
bash
git clone https://github.com/YOUR_USERNAME/nhl-trade-tree.git
cd nhl-trade-tree
Install dependencies:
bash
npm install
Start the development server:
bash
npm start
Open http://localhost:3000 to view it in the browser.
Deployment
This project is automatically deployed to GitHub Pages using GitHub Actions whenever you push to the main branch.

How to Use
Add a Root Trade: Click "Add New Trade" to create a new trade tree
Add Sub-Trades: Click "Add Sub-Trade" on any existing trade to show what happens to the compensation
View the Tree: Expand/collapse nodes to see the full cascade of trades
Delete Trades: Remove trades you no longer need
Example Trade Tree
Connor McDavid (TOR → BOS)
├── Compensation: David Pastrnak, 2024 1st Round Pick
└── Sub-Trade: David Pastrnak (BOS → NYR)
    └── Compensation: Igor Shesterkin, 2024 2nd Round Pick
Built With
React 18
Tailwind CSS
Lucide React (icons)
GitHub Pages
Contributing
Fork the repository
Create a feature branch
Make your changes
Push to the branch
Open a Pull Request
License
This project is open source and available under the MIT License.

