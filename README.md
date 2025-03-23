Title: Intelligent CPU Scheduler Simulator

A web-based simulator that visualizes various CPU scheduling algorithms with interactive graphs and real-time performance metrics.

🚀 Features

📌 Multiple Scheduling Algorithms<br>
1. First-Come-First-Served (FCFS)<br>
2. Shortest Job First (SJF) (Preemptive & Non-Preemptive)<br>
3. Round Robin (Configurable Time Quantum)<br>
4. Priority Scheduling (Preemptive & Non-Preemptive)<br>

🔧 Interactive Process Management<br>
1. Add, edit, and remove processes<br>
2. Specify process details: Process ID, Arrival Time, Burst Time, Priority<br>
3. Import & Export process configurations<br>

📊 Real-time Visualizations<br>
1. Gantt Chart - Shows execution sequence<br>
2. Timeline View - Displays process states (Ready, Running, Waiting, Completed)<br>
3. Automatic Updates - Live adjustments on data/algorithm changes<br>

📈 Performance Metrics<br>
1. Average Waiting Time<br>
2. Average Turnaround Time<br>
3. CPU Utilization<br>
4. Throughput Calculations<br>

🔍 Algorithm Comparison<br>
1. Compare multiple scheduling algorithms side by side<br>
2. Identify the most efficient scheduling strategy<br>

🛠️ Tech Stack<br>

1. Frontend: React with Vite, TailwindCSS, Lucide React for icons<br>
2. Backend: Go<br>
3. Development Tools: ESLint, npm/yarn, Go modules<br>

📦 Installation<br>

Prerequisites<br>
1. Node.js (v16.0 or higher)<br>
2. Go (v1.18 or higher)<br>
3. git<br>
    
Setup Instructions<br>
1. Clone the repository: git clone https://github.com/GhushitDevX/CPU_Scheduler<br>
2. cd CPU_Scheduler<br>
    
Install frontend dependencies:<br>
1. cd frontend<br>
2. npm install<br>
    
Install backend dependencies:<br>
1. cd ../backend<br>
2. go mod download<br>

Create .env file:<br>
1. cd ../frontend<br>
2. cp .env.example .env<br>

Start development servers:<br>
  
Backend:<br>
1. cd ../backend<br>
2. go run main.go<br>

Frontend (in a separate terminal):<br>
1. cd ../frontend<br>
2. npm run dev<br>

Access the application: Open your browser and navigate to http://localhost:5173<br>

Usage Guide<br>

Adding Processes:<br>
1. Use the process input form to add process details<br>
2. Each process requires an ID, arrival time, and burst time<br>
3. Priority is optional and only needed for Priority Scheduling<br>


Selecting an Algorithm:<br>
1. Choose an algorithm from the dropdown menu<br>
2. Configure algorithm-specific parameters if needed (e.g., time quantum for Round Robin)<br>


Running the Simulation:<br>
1. Click the "Run Simulation" button to see the results<br>
2. The Gantt chart will display the execution sequence<br>
3. Performance metrics will be calculated and displayed<br>


Comparing Algorithms:<br>
1. Switch between algorithms to compare their performance<br>
2. Use the "Compare All" option to see metrics side by side<br>

Project Structure:<br>

├── backend/<br>
│   ├── go.mod<br>
│   ├── go.sum<br>
│   └── main.go<br>
├── frontend/<br>
│   ├── node_modules/<br>
│   ├── public/<br>
│   ├── src/<br>
│   ├── .gitignore<br>
│   ├── eslint.config.js<br>
│   ├── index.html<br>
│   ├── package-lock.json<br>
│   ├── package.json<br>
│   ├── README.md<br>
│   ├── vite.config.js<br>
│   └── .env<br>
└── README.md<br>

Contributing:<br>
Contributions are welcome! Please feel free to submit a Pull Request.<br>

Fork the repository<br>
1. Create your feature branch (git checkout -b feature/amazing-feature)<br>
2. Commit your changes (git commit -m 'Add some amazing feature')<br>
3. Push to the branch (git push origin feature/amazing-feature)<br>
4. Open a Pull Request<br>

Development Guidelines<br>
1. Follow the existing code style<br>
2. Add comments for complex logic<br>
3. Update documentation when adding new features<br>
4. Write tests for new functionality<br>

License<br>
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments<br>
1. CPU scheduling algorithm implementations based on concepts from Operating System textbooks<br>
2. UI design inspired by modern educational tools<br>
3. Special thanks to all contributors who have helped improve this project<br>

Contact<br>
For any questions or suggestions, please open an issue on this repository or contact the maintainers directly.<br>

Note: This project is created for educational purposes to help understand CPU scheduling algorithms. It may not reflect all the complexities of real-world operating system schedulers.
