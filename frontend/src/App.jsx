import { useState } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector';
import ProcessInputForm from './components/ProcessInputForm';
import SimulationResults from './components/SimulationResults';

function App() {
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [isPreemptive, setIsPreemptive] = useState(false);
  const [timeQuantum, setTimeQuantum] = useState(1);
  const [processes, setProcesses] = useState([
    { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 1 }
  ]);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAlgorithmChange = (algo) => {
    setAlgorithm(algo);
    setIsPreemptive(false);
    setResults(null);
  };

  const handlePreemptiveChange = (value) => {
    setIsPreemptive(value);
  };

  const handleTimeQuantumChange = (value) => {
    setTimeQuantum(value);
  };

  const handleProcessChange = (newProcesses) => {
    setProcesses(newProcesses);
  };

  const runSimulation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const payload = {
        algorithm,
        isPreemptive,
        timeQuantum: algorithm === 'RR' ? parseInt(timeQuantum) : undefined,
        processes: processes.map(p => ({
          id: p.id,
          arrivalTime: parseInt(p.arrivalTime),
          burstTime: parseInt(p.burstTime),
          priority: algorithm === 'Priority' ? parseInt(p.priority) : undefined
        }))
      };
      
      const response = await fetch('http://localhost:8080/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Simulation failed');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">CPU Scheduler Simulator</h1>
          <p className="text-xl opacity-80">Visualize and analyze different CPU scheduling algorithms</p>
        </header>
        
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-8">
          <AlgorithmSelector 
            algorithm={algorithm} 
            onAlgorithmChange={handleAlgorithmChange} 
            isPreemptive={isPreemptive}
            onPreemptiveChange={handlePreemptiveChange}
            timeQuantum={timeQuantum}
            onTimeQuantumChange={handleTimeQuantumChange}
          />
          
          <ProcessInputForm 
            algorithm={algorithm}
            isPreemptive={isPreemptive}
            processes={processes}
            onProcessesChange={handleProcessChange}
          />
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={runSimulation}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50"
            >
              {isLoading ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-500 bg-opacity-30 border border-red-500 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
        
        {results && <SimulationResults results={results} />}
      </div>
    </div>
  );
}

export default App;