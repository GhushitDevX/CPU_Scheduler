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
    <div className="relative text-white">
      <div className="relative flex flex-col bg-neutral-900 bg-gray-90 min-h-screen items-center">
      <div className="text-center bg bg-black border-b-4 w-full p-5">
          <h1 className="text-2xl md:text-5xl uppercase font-mono font-bold text-violet-500 mb-2">CPU Scheduler Simulator</h1>
          <p className="md:text-xl opacity-90">Let's visualize and analyze different CPU scheduling algorithms</p>
      </div>
        
        <div className="border border-neutral-500 px-20 rounded-xl bg-black rounde shadow-2xl md:h-[700px md:w-[1350px] p-10 mt-14">
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
              className="px-8 py-3 button"
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
        
        <div className="text-center w-full p-8 mt-6">
          <h1 className="text-3xl font-mono uppercase font-bold text-red-500">You can see the visulaizations below</h1>
          <h2 className='font-mono text-xl'>Just scroll down ⬇︎</h2>
      </div>
       
      </div>
      {results && <SimulationResults results={results} />}
    </div>
  );
}

export default App;
